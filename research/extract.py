"""Archive public company pages and their original Wix media for the redesign."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests, json, re, hashlib, time

ROOT = Path(__file__).resolve().parent
SITE = ROOT.parent / 'al-sheikh'
MEDIA = SITE / 'asset-library' / 'originals'
MEDIA.mkdir(parents=True, exist_ok=True)
BASE = 'https://www.alsheikhinvestmentgroup.com'

class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.images = []; self.links = []; self.copy = []; self.skip = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ('script', 'style'): self.skip += 1
        if tag == 'img': self.images.append(a)
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.skip = max(0, self.skip - 1)
    def handle_data(self, data):
        if not self.skip and data.strip(): self.copy.append(data.strip())

queue = ['/']; seen = set(); assets = {}; pages = []
while queue and len(seen) < 20:
    path = queue.pop(0)
    if path in seen: continue
    seen.add(path)
    url = BASE + path
    try:
        r = requests.get(url, timeout=45); r.raise_for_status()
        name = path.strip('/').replace('/', '-') or 'home'
        (ROOT / (name + '.html')).write_text(r.text, encoding='utf-8')
        parser = Parser(); parser.feed(r.text)
        (ROOT / (name + '.txt')).write_text('\n'.join(parser.copy), encoding='utf-8')
        pages.append({'url':url,'archive':name+'.html','text':name+'.txt','images':len(parser.images)})
        for href in parser.links:
            u = urlsplit(href)
            if u.netloc in ('www.alsheikhinvestmentgroup.com', 'alsheikhinvestmentgroup.com') and not u.query:
                p = u.path.rstrip('/') or '/'
                if p not in seen and p not in queue: queue.append(p)
        for img in parser.images:
            source = img.get('src', '')
            m = re.search(r'https://static\.wixstatic\.com/media/([^/\s?"<>]+)', source)
            if m:
                key = unquote(m.group(1))
                item = assets.setdefault(key, {'original_url':'https://static.wixstatic.com/media/'+key,'alts':[],'pages':[]})
                if img.get('alt') and img['alt'] not in item['alts']: item['alts'].append(img['alt'])
                if url not in item['pages']: item['pages'].append(url)
        # Include backgrounds, gallery frames and full-resolution media from Wix data.
        for m in re.finditer(r'(?:https?:)?(?://|\\u002F\\u002F)static\.wixstatic\.com(?:/|\\u002F)media(?:/|\\u002F)([^/\s?"<>\\]+)', r.text):
            key = unquote(m.group(1))
            if not re.search(r'\.(?:jpg|jpeg|png|webp|avif|gif|svg)$',key,re.I): continue
            item=assets.setdefault(key, {'original_url':'https://static.wixstatic.com/media/'+key,'alts':[],'pages':[]})
            if url not in item['pages']: item['pages'].append(url)
        print('Archived', path, 'images:',len(parser.images), flush=True)
    except Exception as e: print('PAGE ERROR',url,str(e),flush=True)

def download(pair):
    key,item=pair
    ext=Path(key).suffix.lower()
    label=re.sub(r'[^a-z0-9]+','-', '-'.join(item['alts'][:1]).lower()).strip('-')[:70] or 'gallery'
    filename=label+'-'+hashlib.sha1(key.encode()).hexdigest()[:8]+ext
    dest=MEDIA/filename
    try:
        if not dest.exists():
            r=requests.get(item['original_url'],timeout=60);r.raise_for_status();dest.write_bytes(r.content)
        item.update({'file':'asset-library/originals/'+filename,'bytes':dest.stat().st_size,'status':'downloaded'})
        try:
            from PIL import Image
            with Image.open(dest) as im: item['width'],item['height']=im.size
        except Exception: pass
    except Exception as e: item.update({'status':'failed','error':str(e)})
    return key,item

with ThreadPoolExecutor(max_workers=8) as pool:
    assets=dict(pool.map(download, assets.items()))
manifest={'source_site':BASE,'extracted_at_utc':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'pages':pages,'assets':assets}
(SITE/'asset-library'/'manifest.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False),encoding='utf-8')
(ROOT/'pages.json').write_text(json.dumps(pages,indent=2),encoding='utf-8')
print('Complete:',len(pages),'pages;',len(assets),'unique media;',sum(a['bytes'] for a in assets.values() if a.get('bytes')),'bytes',flush=True)
for a in assets.values():
    if a['alts']: print(a.get('file'),a.get('width'),a.get('height'),a['alts'])
