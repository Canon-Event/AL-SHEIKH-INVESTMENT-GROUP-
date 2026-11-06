import {chromium} from '@playwright/test';import fs from 'node:fs';import path from 'node:path';
const out=path.resolve('../al-sheikh/.impeccable/review/languages');const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),p=await c.newPage();const issues=[];const base='http://localhost:4173';
for(const locale of ['en','ar','fr','ak','zh']){
 for(const width of [320,390,768,1024,1440]){
  await p.setViewportSize({width,height:844});await p.goto(base+(locale==='en'?'/':`/${locale}/`),{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(100);
  await p.locator('.language-menu summary').click();
  const bounds=await p.locator('.language-options').boundingBox();if(bounds.x<0||bounds.x+bounds.width>width)issues.push({locale,width,kind:'popover bounds',bounds});
  if(width===390||width===1440)await p.screenshot({path:path.join(out,`${locale}-picker-${width}.png`)});
  await p.keyboard.press('Escape');if(await p.locator('.language-menu').getAttribute('open')!==null)issues.push({locale,width,kind:'Escape'});
  if(width<=1024){
   await p.locator('.menu-toggle').click();await p.keyboard.press('Tab');if(!(await p.locator('.primary-nav').evaluate(el=>el.contains(document.activeElement))))issues.push({locale,width,kind:'Menu Tab does not enter navigation'});
   for(let i=0;i<16;i++){await p.keyboard.press('Tab');if(!(await p.locator('.site-header').evaluate(el=>el.contains(document.activeElement))))issues.push({locale,width,kind:'Focus escaped mobile menu'});}
   await p.keyboard.press('Escape');
  }
 }
}
fs.writeFileSync(path.join(out,'picker-report.json'),JSON.stringify({checks:25,issues},null,2));console.log(JSON.stringify({checks:25,issues},null,2));await b.close();if(issues.length)process.exitCode=1;
