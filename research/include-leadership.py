from pathlib import Path
from html.parser import HTMLParser
from PIL import Image,ImageOps
from urllib.parse import unquote
import requests,re,json,subprocess
root=Path(__file__).resolve().parent.parent;site=root/'al-sheikh'
url='https://www.alsheikhinvestmentgroup.com/about-7'
r=requests.get(url,timeout=40);r.raise_for_status();(root/'research/about-7.html').write_text(r.text,encoding='utf-8')
class P(HTMLParser):
 def __init__(self):super().__init__();self.images=[];self.copy=[];self.skip=0
 def handle_starttag(self,t,attrs):
  if t=='img':self.images.append(dict(attrs))
  if t in ('script','style'):self.skip+=1
 def handle_endtag(self,t):
  if t in ('script','style'):self.skip=max(0,self.skip-1)
 def handle_data(self,d):
  if not self.skip and d.strip():self.copy.append(d.strip())
p=P();p.feed(r.text);(root/'research/about-7.txt').write_text('\n'.join(p.copy),encoding='utf-8')
m=json.loads((site/'asset-library/manifest.json').read_text(encoding='utf-8'))
for a in p.images:
 match=re.search(r'https://static\.wixstatic\.com/media/([^/\s?"<>]+)',a.get('src',''))
 if not match:continue
 key=unquote(match.group(1))
 if key in m['assets']:
  if url not in m['assets'][key]['pages']:m['assets'][key]['pages'].append(url)
  continue
 source='https://static.wixstatic.com/media/'+key;ext=Path(key).suffix
 orig=site/'asset-library/originals'/('kussay-al-sheikh'+ext);resp=requests.get(source,timeout=40);resp.raise_for_status();orig.write_bytes(resp.content)
 im=ImageOps.exif_transpose(Image.open(orig)).convert('RGB')
 m['assets'][key]={'original_url':source,'alts':[a.get('alt','Kussay Al Sheikh')],'pages':[url],'file':'asset-library/originals/'+orig.name,'bytes':len(resp.content),'status':'downloaded','width':im.width,'height':im.height}
 for width in [480,1000]:
  copy=im.copy();copy.thumbnail((width,width*2),Image.Resampling.LANCZOS);dest=site/'dist/assets/images'/('chairman-'+str(width)+'.webp');copy.save(dest,'WEBP',quality=85,method=6)
  subprocess.run([str(root/'tools/impeccable-cache/bin/0.1.18/impeccable.exe'),'embed-prompt',str(dest),'--prompt','Original company portrait of Kussay Al Sheikh. Source: '+source+' . From '+url+' . Resized and WebP encoded for delivery.'],capture_output=True,check=True)
 delivery=json.loads((site/'asset-library/delivery-manifest.json').read_text(encoding='utf-8'));delivery['images'].append({'name':'chairman','original_file':'asset-library/originals/'+orig.name,'source':source,'width':im.width,'height':im.height});(site/'asset-library/delivery-manifest.json').write_text(json.dumps(delivery,indent=2),encoding='utf-8')
if not any(a['url']==url for a in m['pages']):m['pages'].append({'url':url,'archive':'about-7.html','text':'about-7.txt','images':len(p.images)})
(site/'asset-library/manifest.json').write_text(json.dumps(m,indent=2,ensure_ascii=False),encoding='utf-8')
(root/'research/pages.json').write_text(json.dumps(m['pages'],indent=2),encoding='utf-8')
print('Archive now contains',len(m['pages']),'pages and',len(m['assets']),'unique assets.')
