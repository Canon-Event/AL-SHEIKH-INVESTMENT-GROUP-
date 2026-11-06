"""Download self-hosted, character-subset fonts from Google Fonts."""
from pathlib import Path
import json,requests,re
root=Path(__file__).resolve().parent.parent;site=root/'al-sheikh';out=site/'dist/assets/fonts'
records=[];rules=[]
agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
for locale,folder,family,cssname,filename in [('ar','notosansarabic','Noto Sans Arabic','NotoArabic','noto-sans-arabic'),('zh','notosanssc','Noto Sans SC','NotoSC','noto-sans-sc')]:
 texts=json.loads((site/'src/locales'/f'{locale}.json').read_text(encoding='utf-8'))
 chars=sorted(set(''.join(texts.values())+' العربية中文EnglishFrançaisAkan0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@+.,:;—–(){} /&%ɛɔƐƆ'))
 for n,start in enumerate(range(0,len(chars),320)):
  part=''.join(chars[start:start+320]);params={'family':family+':wght@400..700','text':part,'display':'swap'}
  css=requests.get('https://fonts.googleapis.com/css2',params=params,headers={'User-Agent':agent},timeout=40);css.raise_for_status()
  urls=re.findall(r'url\((https://[^)]+)\)',css.text)
  if not urls:raise RuntimeError(css.text)
  response=requests.get(urls[0],timeout=40);response.raise_for_status()
  kind='woff2' if response.content[:4]==b'wOF2' else 'ttf'
  name=filename+('-'+str(n) if n else '')+'.'+kind;(out/name).write_bytes(response.content)
  unicode=','.join('U+'+format(ord(c),'X') for c in part)
  rules.append('@font-face{font-family:'+cssname+';src:url("/assets/fonts/'+name+'") format("'+('woff2' if kind=='woff2' else 'truetype')+'");font-weight:400 700;font-style:normal;font-display:swap;unicode-range:'+unicode+';}')
  records.append({'family':family,'file':name,'source':urls[0],'provider':'Google Fonts CSS2 character-subset API','bytes':len(response.content)})
  print(name,len(response.content),'bytes',flush=True)
 lic=requests.get('https://raw.githubusercontent.com/google/fonts/main/ofl/'+folder+'/OFL.txt',timeout=30);lic.raise_for_status();(site/'licenses'/(folder+'-OFL.txt')).write_text(lic.text,encoding='utf-8')
(out/'locales.css').write_text('\n'.join(rules),encoding='utf-8')
(site/'asset-library/locale-fonts.json').write_text(json.dumps(records,indent=2),encoding='utf-8')
