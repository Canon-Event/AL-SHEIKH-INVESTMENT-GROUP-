import {chromium} from '@playwright/test';
import path from 'node:path';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
try{
 await page.goto('https://www.alsheikhinvestmentgroup.com/',{waitUntil:'domcontentloaded',timeout:45000});
 await page.waitForTimeout(4000);
 await page.screenshot({path:path.resolve('../al-sheikh/.impeccable/review/original-desktop.png')});
 console.log('Original site captured for pitch comparison.');
}catch(e){console.log('Original screenshot unavailable:',e.message);}
await browser.close();
