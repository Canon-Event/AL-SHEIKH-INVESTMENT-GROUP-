from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json
root=Path(__file__).resolve().parent.parent
site=root/'al-sheikh'
source=root/'al-sheikh-website.zip'
with ZipFile(source,'w',ZIP_DEFLATED,compresslevel=6) as z:
 for p in sorted(site.rglob('*')):
  if not p.is_file():continue
  rel=p.relative_to(site)
  if any(x in rel.parts for x in ('.git','node_modules','.sites-runtime','.sites-checkout')):continue
  if rel.parts[:2] in [('asset-library','originals'),('.impeccable','review'),('.impeccable','questions'),('.impeccable','mocks')]:continue
  if p.suffix in ('.zip','.gz'):continue
  z.write(p,Path('al-sheikh')/rel)
original=root/'al-sheikh-original-assets.zip'
with ZipFile(original,'w',ZIP_DEFLATED,compresslevel=6) as z:
 for p in sorted((site/'asset-library/originals').iterdir()):
  if p.is_file():z.write(p,Path('original-assets')/p.name)
 z.write(site/'asset-library/manifest.json','manifest.json')
 pages=json.loads((root/'research/pages.json').read_text(encoding='utf-8'))
 for page in pages:
  for k in ('archive','text'):
   p=root/'research'/page[k]
   if p.exists():z.write(p,Path('original-pages')/p.name)
 z.write(root/'research/pages.json','original-pages/pages.json')
for p in [source,original]:
 with ZipFile(p) as z:
  bad=z.testzip()
  if bad:raise RuntimeError('Invalid archive member '+bad)
  print(p.name,len(z.namelist()),'files',p.stat().st_size,'bytes')
