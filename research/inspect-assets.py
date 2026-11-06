from PIL import Image, ImageOps, ImageDraw
from pathlib import Path
import json
root=Path(__file__).resolve().parent.parent
manifest=json.loads((root/'al-sheikh/asset-library/manifest.json').read_text(encoding='utf-8'))
items=[a for a in manifest['assets'].values() if a['status']=='downloaded']
canvas=Image.new('RGB',(1200, ((len(items)+4)//5)*190),'#e5e2db')
draw=ImageDraw.Draw(canvas)
for i,a in enumerate(items):
    im=Image.open(root/'al-sheikh'/a['file']).convert('RGB')
    im=ImageOps.contain(im,(228,150))
    x=(i%5)*240+6;y=(i//5)*190+6
    canvas.paste(im,(x+(228-im.width)//2,y+(150-im.height)//2))
    draw.text((x,y+154),str(i)+' '+Path(a['file']).name[:28],fill='black')
canvas.save(root/'research/contact-sheet.jpg')
(root/'research/asset-index.json').write_text(json.dumps(items,indent=2),encoding='utf-8')
print('Contact sheet ready')
