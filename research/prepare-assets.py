"""Create small, self-hosted delivery images; retain untouched originals."""
from PIL import Image, ImageOps
from pathlib import Path
import json, re, requests

root=Path(__file__).resolve().parent.parent
site=root/'al-sheikh'
out=site/'dist/assets/images';out.mkdir(parents=True,exist_ok=True)
items=json.loads((root/'research/asset-index.json').read_text(encoding='utf-8'))
names={0:'brand-seal',1:'dubai-night',2:'abjar-tower',3:'petroleum',4:'emeralds',5:'luxury-auction',6:'gold',7:'tanker',8:'chemical-drums',9:'offshore',40:'refinery',41:'cargo-ship',42:'cargo-containers',43:'skyscrapers',44:'rough-emerald'}
gallery_names={10:'chemical-warehouse',11:'bulk-materials',12:'bagged-materials',13:'residential-towers',14:'villa',15:'dubai-marina',16:'gold-bars',17:'gold-reserves',18:'cut-emerald',19:'rough-diamond',20:'rough-gemstones',21:'sulphur-granules',22:'sulphur-stock',23:'bulk-cargo',24:'bulk-bags',25:'steel-coils',26:'metal-ingots',27:'steel-rebar',28:'aluminium-ingots',29:'metal-billets',30:'copper-cathodes',31:'copper-wire',32:'copper-plates',33:'storage-silos',34:'industrial-storage',35:'chemical-containers',36:'warehouse',37:'greenhouse',38:'agriculture',39:'linkedin-source-icon'}
names.update(gallery_names)
index=[]
for i,a in enumerate(items):
    name=names[i];src=site/a['file']
    im=ImageOps.exif_transpose(Image.open(src))
    if i==0:
        im.thumbnail((160,164),Image.Resampling.LANCZOS)
        im.save(out/(name+'.png'),optimize=True)
        print('Logo:',im.mode)
        Image.open(src).save(out/'favicon.png')
    elif i!=39:
        im=im.convert('RGB')
        for width in ([900,1600,2400] if i==1 else [480,1000,1600] if i in (5,9,40,41,42,43) else [480,1000]):
            copy=im.copy();copy.thumbnail((width,width*2),Image.Resampling.LANCZOS)
            dest=out/(name+'-'+str(width)+'.webp')
            copy.save(dest,'WEBP',quality=83,method=6,exif=Image.Exif())
        index.append({'id':i,'name':name,'original_file':a['file'],'source':a['original_url'],'width':im.width,'height':im.height})

fontdir=site/'dist/assets/fonts';fontdir.mkdir(parents=True,exist_ok=True)
font_records=[]
for family,filename in [('Hanken+Grotesk:wght@400;500;600;700','hanken-grotesk'),('Gloock','gloock')]:
    url='https://fonts.googleapis.com/css2?family='+family+'&display=swap'
    css=requests.get(url,headers={'User-Agent':'Mozilla/5.0'},timeout=30).text
    latin=css.split('/* latin */')[-1]
    matches=re.findall(r'url\((https://[^)]+)\)',latin)
    if not matches: raise RuntimeError('No font URLs: '+css[:200])
    for n,fu in enumerate(dict.fromkeys(matches)):
        r=requests.get(fu,timeout=30);r.raise_for_status()
        ext='.woff2' if 'woff2' in fu else '.ttf'
        dest=fontdir/(filename+('-'+str(n) if n else '')+ext);dest.write_bytes(r.content)
        font_records.append({'family':filename,'file':dest.name,'source':fu,'stylesheet':url})
(site/'asset-library/delivery-manifest.json').write_text(json.dumps({'images':index,'fonts':font_records},indent=2),encoding='utf-8')
print('Prepared',len(index),'web images; fonts:',[f['file'] for f in font_records])
print('Delivery images total:',sum(p.stat().st_size for p in out.iterdir()),'bytes')
