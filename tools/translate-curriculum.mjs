// Explicit maintenance command; builds consume this cache without network access.
import fs from 'node:fs/promises';
import {curriculum} from './curriculum.mjs';
const file='curriculum-translations.json';
const translations=await fs.readFile(file,'utf8').then(JSON.parse).catch(()=>({}));
const jobs=[];
for(const lang of ['uk','ru','id','ja']) {
  translations[lang] ||= {};
  for(const lessons of Object.values(curriculum))for(const lesson of lessons) {
    const strings=Object.values(lesson.text).flat();
    const missing=strings.filter(text=>!translations[lang][text]);
    if(missing.length)jobs.push({lang,strings:missing});
  }
}
let cursor=0,done=0,writes=Promise.resolve();
console.log(`${jobs.length} lesson translation batches`);
async function worker() {
  while(cursor<jobs.length) {
    const {lang,strings}=jobs[cursor++];
    const input=strings.map((s,i)=>`===${123000+i}===\n${s}`).join('\n');
    const url=new URL('https://translate.googleapis.com/translate_a/single');
    url.search=new URLSearchParams({client:'gtx',sl:'en',tl:lang,dt:'t',q:input});
    let output;
    for(let attempt=0;attempt<3;attempt++) {
      try {
        const response=await fetch(url,{signal:AbortSignal.timeout(25000)});
        if(!response.ok)throw new Error(`Translation HTTP ${response.status}`);
        const data=await response.json();const text=data[0].map(part=>part[0]||'').join('');
        const parts=[...text.matchAll(/===\s*(\d+)\s*===\s*([\s\S]*?)(?====\s*\d+\s*===|$)/g)];
        if(parts.length!==strings.length)throw new Error('Translation field markers were not preserved');
        output=parts.map((part,i)=>{if(Number(part[1])!==123000+i||!part[2].trim())throw new Error('Invalid translation field');return part[2].trim();});
        break;
      }catch(error){if(attempt===2)throw error;await new Promise(r=>setTimeout(r,1000));}
    }
    strings.forEach((text,i)=>translations[lang][text]=output[i]);done++;
    const snapshot=JSON.stringify(translations,null,2);
    writes=writes.then(()=>fs.writeFile(file,snapshot));await writes;
    if(done%10===0)console.log(`${done}/${jobs.length}`);
  }
}
const results=await Promise.allSettled([worker(),worker(),worker()]);await writes;
for(const result of results)if(result.status==='rejected')throw result.reason;
console.log('All curriculum translations cached.');
