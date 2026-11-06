import fs from 'node:fs';import path from 'node:path';
const p=path.resolve('../al-sheikh/src/styles.css');
fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('.leadership-image img{width:100%;height:100%;object-fit:cover;object-position:center 30%}', '.leadership-image img{width:100%;height:100%;object-fit:cover;object-position:center 8%}'));
