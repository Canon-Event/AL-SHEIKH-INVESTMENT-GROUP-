from pathlib import Path
root=Path(__file__).resolve().parent.parent
file=root/'al-sheikh/src/build.mjs'
s=file.read_text(encoding='utf-8')
needle='</div></section><section class="wrap history-section">'
replacement='</div></section><section class="wrap leadership-section"><div class="leadership-image">${img(\'chairman\',\'Kussay Al Sheikh, President and Chairman of Al Sheikh Investment Group\',\'\',\'1000\')}</div><div class="leadership-copy"><h2>A vision shaped<br><span class="serif">by experience.</span></h2><h3>Kussay Al Sheikh</h3><span class="company-name">President &amp; Chairman</span><p>Kussay Al Sheikh leads Al Sheikh Investment Group with experience spanning real estate, petroleum and precious materials. His business journey began in 1997, laying the foundation for an outlook that connects industries, markets and people.</p><p>Today, that perspective informs the group’s commitment to partnerships, responsible growth and the opportunities ahead.</p>${link(\'/contact/\',\'Connect with the group\')}</div></section><section class="wrap history-section">'
if 'leadership-section' not in s:
 if needle not in s:raise RuntimeError('About insert point missing')
 s=s.replace(needle,replacement,1);file.write_text(s,encoding='utf-8')
css=root/'al-sheikh/src/styles.css'
text=css.read_text(encoding='utf-8')
if '.leadership-section{' not in text:
 text+='\n.leadership-section{display:grid;grid-template-columns:.85fr 1fr;gap:12%;align-items:center;padding-block:100px 0}.leadership-image{height:510px;overflow:hidden;background:var(--stone)}.leadership-image img{width:100%;height:100%;object-fit:cover;object-position:center 30%}.leadership-copy h2{font-size:48px;line-height:1.2;margin-bottom:35px}.leadership-copy h3{font-size:23px;letter-spacing:-.02em}.leadership-copy .company-name{margin-top:10px}.leadership-copy>p{font-size:14px;color:var(--muted);line-height:1.9;margin-top:23px;max-width:490px}.leadership-copy>.text-link{margin-top:24px}@media(max-width:800px){.leadership-section{gap:7%;padding-top:65px}.leadership-image{height:430px}.leadership-copy h2{font-size:36px;margin-bottom:28px}.leadership-copy>p{font-size:13px}}@media(max-width:540px){.leadership-section{grid-template-columns:1fr;gap:32px;padding-top:55px}.leadership-image{height:420px;max-width:390px}.leadership-copy h2{font-size:36px}.leadership-copy>p{font-size:14px}.leadership-copy>.text-link{font-size:12px}}\n'
 css.write_text(text,encoding='utf-8')
print('Leadership included in the group profile.')
