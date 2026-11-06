import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';
const project=path.resolve('../al-sheikh');
const out=path.join(project,'.impeccable/review');fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-first-run','--disable-gpu']});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage();
const errors=[];const badResponses=[];
page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)badResponses.push({url:r.url(),status:r.status()});});
const base='http://localhost:4173';
const routes=['/','/about/','/businesses/','/businesses/petroleum/','/businesses/properties/','/businesses/gemstones/','/businesses/maritime/','/businesses/luxury/','/businesses/metals/','/businesses/chemicals/','/gallery/','/contact/','/privacy/'];
const assert=(value,message)=>{if(!value)throw new Error(message);};
const checks=[];const overflow=[];const a11y=[];
async function settle(){await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.querySelectorAll('img[src]')].map(async img=>{img.loading='eager';try{await img.decode();}catch{}}));});}
async function top(){await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'});});await page.waitForTimeout(80);}
await page.goto(base,{waitUntil:'networkidle'});await settle();
await page.screenshot({path:path.join(out,'desktop.png'),fullPage:true});
await page.screenshot({path:path.join(out,'desktop-hero.png')});
for(const route of routes){
 await page.goto(base+route,{waitUntil:'networkidle'});await settle();
 assert(await page.locator('h1').count()===1,route+' needs exactly one h1');
 const broken=await page.locator('img[src]').evaluateAll(els=>els.filter(e=>e.complete&&e.naturalWidth===0).map(e=>e.src));
 assert(broken.length===0,route+' broken images '+broken.join(','));
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});await page.waitForTimeout(30);const bounds=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));if(bounds.scroll>bounds.width+1)overflow.push({route,width,...bounds});}
 await page.setViewportSize({width:1440,height:1000});
 if(['/','/contact/','/gallery/','/businesses/petroleum/'].includes(route)){
   const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();a11y.push({route,violations:result.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({html:n.html,summary:n.failureSummary}))}))});
 }
 checks.push({route,status:'loaded'});
}
await page.goto(base,{waitUntil:'networkidle'});
await page.locator('[data-business="properties"]').focus();await page.waitForTimeout(400);
assert(await page.locator('[data-business-company]').textContent()==='KAS Properties','Business focus should update company');
assert((await page.locator('.business-image').getAttribute('src')).includes('skyscrapers'),'Business focus should update image');
await page.locator('.businesses-section').screenshot({path:path.join(out,'business-explorer.png')});
await page.goto(base+'/gallery/?category=Gemstones',{waitUntil:'networkidle'});
assert(await page.locator('.gallery-item:visible').count()===5,'Gallery URL filter should show five gemstone images');
await page.locator('.gallery-item:visible').first().click();assert(await page.locator('dialog').isVisible(),'Lightbox should open');
const first=await page.locator('[data-lightbox-title]').textContent();await page.keyboard.press('ArrowRight');assert(await page.locator('[data-lightbox-title]').textContent()!==first,'Arrow should move lightbox');
await page.screenshot({path:path.join(out,'gallery-lightbox.png')});await page.keyboard.press('Escape');assert(!(await page.locator('dialog').isVisible()),'Escape closes lightbox');
await page.locator('[data-filter="Metals"]').click();assert(await page.locator('.gallery-item:visible').count()===10,'Metals filter has ten images');
await settle();await top();await page.screenshot({path:path.join(out,'gallery-desktop.png'),fullPage:true});
await page.goto(base+'/contact/?division=petroleum',{waitUntil:'networkidle'});
assert(await page.locator('#division').inputValue()==='petroleum','Division query should select petroleum');
await page.locator('#full-name').fill('Alex Example');await page.locator('#email').fill('alex@example.com');await page.locator('#company').fill('Example & Partners');await page.locator('#message').fill('Please discuss a potential LPG supply enquiry with our team.');await page.locator('[name="consent"]').check();
await page.getByRole('button',{name:'Prepare email enquiry'}).click();
assert(await page.locator('#form-result').isVisible(),'Form result should appear');assert((await page.locator('#email-draft-link').getAttribute('href')).includes('alex%40example.com'),'Email draft includes email');
assert((await page.locator('#form-result').innerText()).includes('No message has been sent'),'Form must not claim to send');
await settle();await top();await page.screenshot({path:path.join(out,'contact-desktop.png'),fullPage:true});
await page.goto(base+'/businesses/petroleum/',{waitUntil:'networkidle'});await settle();await top();await page.screenshot({path:path.join(out,'division-desktop.png'),fullPage:true});
await page.setViewportSize({width:390,height:844});await page.goto(base,{waitUntil:'networkidle'});await settle();await page.screenshot({path:path.join(out,'mobile.png'),fullPage:true});await page.screenshot({path:path.join(out,'mobile-hero.png')});
await page.getByRole('button',{name:'Menu'}).click();assert(await page.locator('#primary-navigation').isVisible(),'Mobile menu opens');await page.locator('.business-menu summary').click();assert(await page.getByRole('link',{name:'Maritime & shipping',exact:true}).first().isVisible(),'Mobile business dropdown visible');await page.screenshot({path:path.join(out,'mobile-menu.png')});await page.keyboard.press('Escape');assert(!(await page.locator('#primary-navigation').isVisible()),'Escape closes mobile menu');
await page.goto(base+'/contact/',{waitUntil:'networkidle'});await settle();await page.screenshot({path:path.join(out,'contact-mobile.png'),fullPage:true});
await page.goto(base+'/gallery/',{waitUntil:'networkidle'});await settle();await page.screenshot({path:path.join(out,'gallery-mobile.png'),fullPage:true});
const links=new Set();
for(const route of routes){await page.goto(base+route);for(const href of await page.locator('a[href^="/"]').evaluateAll(a=>a.map(x=>x.getAttribute('href'))))links.add(href.split('?')[0].split('#')[0]||'/');}
for(const route of links){const response=await context.request.get(base+route);assert(response.status()===200,'Broken internal link '+route);}
const report={routes:checks.length,internalLinks:links.size,checks,overflow,a11y,errors,badResponses};
fs.writeFileSync(path.join(out,'qa-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
await browser.close();
assert(!overflow.length,'Horizontal overflow detected');assert(!errors.length,'Browser errors detected');assert(!badResponses.length,'Failed responses detected');assert(!a11y.some(r=>r.violations.some(v=>v.impact==='critical'||v.impact==='serious')),'Serious accessibility failures');
