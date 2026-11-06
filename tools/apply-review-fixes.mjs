import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('../al-sheikh');const file=path.join(root,'src/build.mjs');let s=fs.readFileSync(file,'utf8');
const changes=[
 ['<h2>Our mission</h2><p class="lead">Lasting value begins<br>with strong partnerships.</p>','<h2>Lasting value begins<br><span class="serif">with strong partnerships.</span></h2>'],
 ['<h2>Our vision</h2><p class="lead">Progress with<br>a broader purpose.</p>','<h2>Progress with<br><span class="serif">a broader purpose.</span></h2>'],
 ['}</div>${intro}<section class="purpose-section">','}</div>${intro.replace(link("/about/", "Discover Al Sheikh"), link("/businesses/", "Explore our businesses"))}<section class="purpose-section">'],
 ['Opens a draft in your email app.<br>You review it before sending.','Prepares a draft for your email app.<br>Then choose to open or copy it.']
];
for(const [from,to] of changes){if(!s.includes(from))throw new Error('Expected review target missing: '+from);s=s.replace(from,to);}fs.writeFileSync(file,s);
const css=path.join(root,'src/styles.css');let c=fs.readFileSync(css,'utf8');
c=c.replace(/\.purpose-grid h2 \{[^}]+\}/,'.purpose-grid h2 {font-size:33px;color:var(--paper);font-weight:400;line-height:1.3;letter-spacing:-.02em;margin-bottom:24px;}');
c+='\n@media(max-width:800px){.purpose-grid h2{font-size:28px;color:var(--paper)}}\n@media(max-width:540px){.purpose-grid h2{font-size:28px;color:var(--paper);margin-bottom:23px}}\n';
fs.writeFileSync(css,c);console.log('Applied all three material review fixes.');
