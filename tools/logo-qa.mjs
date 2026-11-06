import {chromium} from '@playwright/test';import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('../al-sheikh'),out=path.join(root,'.impeccable/review/languages');const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const c=await b.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),p=await c.newPage();const bad=[];p.on('response',r=>{if(r.status()>=400)bad.push(r.url());});
for(const locale of ['en','ar','fr','ak','zh']){
 await p.setViewportSize({width:1440,height:1000});await p.goto('http://localhost:4173'+(locale==='en'?'/':`/${locale}/`),{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);
 const logos=await p.locator('.brand img').evaluateAll(els=>els.map(e=>({src:e.getAttribute('src'),loaded:e.complete&&e.naturalWidth>0})));if(logos.length!==2||logos.some(l=>!l.loaded||!l.src.endsWith('brand-seal-transparent.png')))throw new Error('Logo replacement '+locale);
 await p.screenshot({path:path.join(out,`${locale}-hero-desktop.png`)});await p.locator('.site-header').screenshot({path:path.join(out,`${locale}-logo-header.png`)});
 await p.setViewportSize({width:390,height:844});await p.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(100);await p.screenshot({path:path.join(out,`${locale}-hero-mobile.png`)});if(locale==='ar')await p.locator('.site-header').screenshot({path:path.join(out,'ar-logo-mobile.png')});
}
const result={locales:5,headerAndFooter:'transparent logo loaded on all five homepages',favicon:'favicon-transparent.png',badResponses:bad};fs.writeFileSync(path.join(out,'logo-report.json'),JSON.stringify(result,null,2));console.log(result);await b.close();if(bad.length)throw new Error('Missing resource');
