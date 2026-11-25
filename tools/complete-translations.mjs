// Maintenance helper. Translates public lesson text only; never runs in visitors' browsers.
// Existing repository translation endpoint; generated results are cached for offline builds.
import fs from 'node:fs/promises';
import {JSDOM} from 'jsdom';
const auto=JSON.parse(await fs.readFile('i18n-auto-data.json','utf8'));
const gaps=JSON.parse(await fs.readFile('.qa/translation-gaps.json','utf8'));
const overrides=await fs.readFile('translation-overrides.json','utf8').then(JSON.parse).catch(()=>({}));
const dom=new JSDOM('<main></main>',{url:'https://code-lessons.netlify.app/html.html?lang=uk',runScripts:'outside-only'});
const practice=(await fs.readFile('practice.js','utf8')).replace('  const pageTasks = tasks[page];','  window.__tasks=tasks; return;\n  const pageTasks = tasks[page];');
dom.window.eval(practice);
const taskText=new Set();
for(const tasks of Object.values(dom.window.__tasks)) for(const task of tasks) for(const text of [task.title.uk,task.body.uk,...task.hints.uk])taskText.add(text);
dom.window.close();
const normalize=s=>s.replace(/\s+/g,' ').trim();
const jobs=[];
for(const lang of ['en','ru','id','ja']) {
  overrides[lang] ||= {};
  const existing=new Set(Object.keys({...auto[lang],...overrides[lang]}).map(normalize));
  for(const text of new Set([...gaps[lang],...taskText])) {
    if(existing.has(normalize(text))) continue;
    jobs.push({lang,text});
  }
}
console.log(`${jobs.length} missing public strings to translate`);
let done=0;
let cursor=0;
let writes=Promise.resolve();
async function worker() {
while(cursor<jobs.length) {
  const job=jobs[cursor++];
  const url=new URL('https://translate.googleapis.com/translate_a/single');
  url.search=new URLSearchParams({client:'gtx',sl:'uk',tl:job.lang,dt:'t',q:job.text});
  let translated;
  for(let attempt=0;attempt<3;attempt++) {
    try {
      const response=await fetch(url,{signal:AbortSignal.timeout(20000)});
      if(!response.ok) throw new Error(`HTTP ${response.status}`);
      const data=await response.json();translated=data[0].map(part=>part[0]||'').join('').trim();
      if(!translated) throw new Error('Empty translation');break;
    } catch(error) {if(attempt===2)throw error;await new Promise(resolve=>setTimeout(resolve,1000*(attempt+1)));}
  }
  overrides[job.lang][job.text]=translated;done++;
  if(done%20===0) {const snapshot=JSON.stringify(overrides,null,2);writes=writes.then(()=>fs.writeFile('translation-overrides.json',snapshot));await writes;console.log(`${done}/${jobs.length}`);}
  await new Promise(resolve=>setTimeout(resolve,80));
}
}
const workers=await Promise.allSettled([worker(),worker(),worker()]);
await writes;
await fs.writeFile('translation-overrides.json',JSON.stringify(overrides,null,2));
for(const result of workers)if(result.status==='rejected')throw result.reason;
Object.assign(overrides.en,{'Масив':'Array','Масиви':'Arrays','Цикли':'Loops','Скинути':'Reset','Макет':'Layout','Довідник':'Reference','Відступи':'Indentation','Регістр':'Case','Рядки str':'Strings (str)','Рядок тексту.':'A text string.'});
Object.assign(overrides.id,{'Масив':'Array','Масиви':'Array','Цикли':'Perulangan','Скинути':'Atur ulang','Макет':'Tata letak','Відступи':'Indentasi'});
Object.assign(overrides.ja,{'Масив':'配列','Масиви':'配列','Цикли':'ループ','Скинути':'リセット','Макет':'レイアウト','Відступи':'インデント'});
await fs.writeFile('translation-overrides.json',JSON.stringify(overrides,null,2));
console.log(`Saved ${done} translations and terminology corrections.`);
