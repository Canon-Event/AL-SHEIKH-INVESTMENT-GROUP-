import {chromium} from '@playwright/test';import AxeBuilder from '@axe-core/playwright';import fs from 'node:fs';import path from 'node:path';
const project=path.resolve('../al-sheikh'),out=path.join(project,'.impeccable/review/languages');fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const c=await b.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),p=await c.newPage();
const errors=[],bad=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)bad.push({url:r.url(),status:r.status()});});
const base='http://localhost:4173',languages=['en','ar','fr','ak','zh'],routes=['/','/about/','/businesses/','/businesses/petroleum/','/businesses/properties/','/businesses/gemstones/','/businesses/maritime/','/businesses/luxury/','/businesses/metals/','/businesses/chemicals/','/gallery/','/contact/','/privacy/'];
const localized=(l,r)=>l==='en'?r:`/${l}${r}`;const assert=(v,s)=>{if(!v)throw new Error(s);};
const overflow=[],collisions=[],a11y=[],linkTargets=new Set(),missingText=[];
async function settle(images=false){await p.evaluate(async eager=>{await document.fonts.ready;if(eager)await Promise.all([...document.querySelectorAll('img[src]')].map(async i=>{i.loading='eager';try{await i.decode();}catch{}}));await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));},images);await p.waitForTimeout(100);}
for(const locale of languages){
 for(const route of routes){
  await p.goto(base+localized(locale,route),{waitUntil:'load'});await settle();
  assert(await p.locator('html').getAttribute('lang')===locale,'Wrong language '+locale+route);
  assert(await p.locator('html').getAttribute('dir')===(locale==='ar'?'rtl':'ltr'),'Wrong direction');
  assert(await p.locator('[data-language]').count()===5,'Missing language option');
  assert(await p.locator('h1').count()===1,'Wrong h1 count');
  for(const href of await p.locator('a[href^="/"]').evaluateAll(a=>a.map(el=>el.getAttribute('href')))){const u=new URL(href,base);linkTargets.add(u.pathname);if(locale!=='en'&&!u.pathname.startsWith('/'+locale+'/')&&!u.pathname.startsWith('/assets/')){const isLanguage=await p.locator(`a[href="${href}"][data-language]`).count();assert(isLanguage>0,'Language reset in internal link '+locale+route+' '+href);}}
  for(const width of [320,390,768,1024,1440]){
   await p.setViewportSize({width,height:900});await settle();
   const o=await p.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth,offenders:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1||e.getBoundingClientRect().left<-1).filter(e=>getComputedStyle(e).position!=='fixed').slice(0,5).map(e=>({tag:e.tagName,cls:e.className}))}));
   if(o.scroll>o.width+1)overflow.push({locale,route,width,...o});
   const rect=await p.evaluate(()=>{const els=['.brand','.primary-nav','.header-controls'].map(s=>document.querySelector(s)).filter(e=>e.getClientRects().length&&getComputedStyle(e).position!=='absolute').map(e=>({class:e.className,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right})).sort((a,b)=>a.left-b.left);return els.filter((e,i)=>i&&els[i-1].right>e.left+1);});
   if(rect.length)collisions.push({locale,route,width,rect});
  }
  await p.setViewportSize({width:1440,height:1000});
  if(route==='/'||route==='/contact/'){
   await settle(true);await p.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(40);
   await p.screenshot({path:path.join(out,`${locale}-${route==='/'?'home':'contact'}-desktop.png`),fullPage:true});
   if(route==='/')await p.screenshot({path:path.join(out,`${locale}-hero-desktop.png`)});
   const ax=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();a11y.push({locale,route,violations:ax.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({html:n.html,summary:n.failureSummary}))}))});
   await p.setViewportSize({width:390,height:844});await settle(true);await p.screenshot({path:path.join(out,`${locale}-${route==='/'?'home':'contact'}-mobile.png`),fullPage:true});
   if(route==='/')await p.screenshot({path:path.join(out,`${locale}-hero-mobile.png`)});
  }
 }
 console.log(locale,'routes checked');
 await p.setViewportSize({width:1440,height:1000});await p.goto(base+localized(locale,'/gallery/?category=Gemstones'),{waitUntil:'load'});await settle();assert(await p.locator('.gallery-item:visible').count()===5,'Gallery filter '+locale);
 await p.locator('.gallery-item:visible').first().click();assert(await p.locator('.lightbox').isVisible(),'Lightbox '+locale);if(locale!=='en')assert((await p.locator('[data-lightbox-category]').textContent())!=='Gemstones','Untranslated lightbox category');await p.keyboard.press('ArrowRight');await p.keyboard.press('Escape');
 await p.goto(base+localized(locale,'/contact/?division=petroleum'),{waitUntil:'load'});assert(await p.locator('#division').inputValue()==='petroleum','Preselection '+locale);
 await p.locator('#full-name').fill('Alex Example');await p.locator('#email').fill('alex@example.com');await p.locator('#message').fill('Please discuss a potential petroleum opportunity with our team.');await p.locator('[name=consent]').check();await p.locator('[type=submit]').click();assert(await p.locator('#form-result').isVisible(),'Draft result '+locale);const draft=decodeURIComponent(await p.locator('#email-draft-link').getAttribute('href'));assert(draft.includes('alex@example.com'),'Email draft lost contact');if(locale!=='en')assert(!draft.includes('Enquiry for Al Sheikh Investment Group'),'Untranslated draft '+locale);
 await p.locator('.language-menu summary').click();const switchLink=p.locator(`[data-language="${locale==='ar'?'fr':'ar'}"]`);const href=await switchLink.getAttribute('href');assert(href.includes('/contact/?division=petroleum'),'Switch loses context '+href);await switchLink.click();assert(await p.locator('#division').inputValue()==='petroleum','Cross-language preselection lost');
}
for(const target of linkTargets){const r=await c.request.get(base+target);assert(r.status()===200,'Broken link '+target);}
const report={contentRoutes:65,viewportChecks:325,internalLinkTargets:linkTargets.size,overflow,collisions,a11y,errors,bad};fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await b.close();
assert(!overflow.length,'Horizontal overflow');assert(!collisions.length,'Header collisions');assert(!errors.length&&!bad.length,'Browser errors or missing resources');assert(!a11y.some(v=>v.violations.length),'Accessibility findings');
