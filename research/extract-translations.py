from pathlib import Path
from html.parser import HTMLParser
import json,re
root=Path(__file__).resolve().parent.parent
site=root/'al-sheikh'
values=set()
def add(s):
 s=re.sub(r'\s+',' ',s).strip()
 if not s or not re.search('[A-Za-z]',s) or re.match(r'^(?:https?://|mailto:|tel:|info@|\+?\d[\d /—–.-]*)',s):return
 if s in ['AL SHEIKH','INVESTMENT GROUP']:return
 values.add(s)
class P(HTMLParser):
 def __init__(self):super().__init__(convert_charrefs=True);self.skip=0
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t in ('script','style'):self.skip+=1
  for k in ['alt','title','aria-label','placeholder','data-summary','data-company','data-alt','data-title']:
   if a.get(k):add(a[k])
  if t=='meta' and (a.get('name')=='description' or a.get('property') in ['og:title','og:description']):add(a.get('content',''))
 def handle_endtag(self,t):
  if t in ('script','style'):self.skip=max(0,self.skip-1)
 def handle_data(self,d):
  if not self.skip:add(d)
for p in sorted((site/'dist').rglob('*.html')):
 if any(part in ['ar','fr','ak','zh'] for part in p.relative_to(site/'dist').parts):continue
 parser=P();parser.feed(p.read_text(encoding='utf-8'))
dynamic=['Language','Select language','English','French','Arabic','Akan','Chinese','Explore {company}','Please enter your name.','Please describe your enquiry in at least 10 characters.','Enquiry for Al Sheikh Investment Group','Business','Name','Email','Company','Phone','Not provided','enquiry from','I agree to share these details for this enquiry.','Enquiry copied. Paste it into an email to info@alsheikhinvestmentgroup.com.','Enquiry copied. Paste it into your email.','Copy is unavailable in this browser. Use “Open email draft” or email info@alsheikhinvestmentgroup.com directly.']
for v in dynamic:add(v)
strings={str(i):v for i,v in enumerate(sorted(values))}
out=site/'src/locales';out.mkdir(exist_ok=True)
(out/'source.json').write_text(json.dumps(strings,ensure_ascii=False,indent=2),encoding='utf-8')
print(len(strings),'unique content and interface strings extracted')
