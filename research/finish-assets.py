"""Normalize small functional type and embed origin metadata in delivery assets."""
from pathlib import Path
import re,json,subprocess
root=Path(__file__).resolve().parent.parent
site=root/'al-sheikh'
css=site/'src/styles.css'
text=css.read_text(encoding='utf-8')
text=re.sub(r'font-size:([\d.]+)px',lambda m:'font-size:11px' if float(m.group(1))<11 else m.group(0),text)
text=text.replace('letter-spacing:-.045em','letter-spacing:-.04em')
text+='\n@media(max-width:540px){.intro-copy>p,.energy-copy>p,.purpose-grid article>p:last-child,.history-list p,.directory-copy p,.division-hero-copy>p,.division-intro>div>p:last-child,.capability-list p,.form-intro{font-size:14px}.office p{font-size:13px}.field input,.field select,.field textarea{font-size:16px}.field label,.check-field{font-size:12px}.brand>span>span{letter-spacing:.12em}.hero-location{max-width:130px}.hero-index>.wrap{column-gap:12px}}\n@media(max-width:360px){.menu-toggle>span{display:none}.brand>span>span{letter-spacing:.09em}.hero-location{max-width:120px}.hero-index>.wrap{column-gap:9px;font-size:11px}}\n'
css.write_text(text,encoding='utf-8')
build=site/'src/build.mjs'
build.write_text(build.read_text(encoding='utf-8').replace('together.<br>An independent','together.<br> An independent'),encoding='utf-8')
manifest=json.loads((site/'asset-library/delivery-manifest.json').read_text(encoding='utf-8'))
original=json.loads((site/'asset-library/manifest.json').read_text(encoding='utf-8'))
engine=root/'tools/impeccable-cache/bin/0.1.18/impeccable.exe'
count=0
for f in (site/'dist/assets/images').iterdir():
    if f.suffix not in ('.webp','.png'):continue
    name=re.sub(r'-\d+$','',f.stem)
    record=next((a for a in manifest['images'] if a['name']==name),None)
    source=record['source'] if record else next(a['original_url'] for a in original['assets'].values() if 'logo' in a.get('file',''))
    prompt='Original company website asset. Source: '+source+' . Preserved from https://www.alsheikhinvestmentgroup.com/ ; resized and WebP encoded for delivery. No AI-generated imagery.'
    run=subprocess.run([str(engine),'embed-prompt',str(f),'--prompt',prompt],capture_output=True,text=True,cwd=site)
    if run.returncode!=0:print('METADATA ERROR',f.name,run.stderr or run.stdout)
    else:count+=1
print('Embedded provenance in',count,'delivery images')
