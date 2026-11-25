import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {JSDOM,VirtualConsole} from 'jsdom';
import {locales,guides} from '../tools/ui.mjs';
const root=path.resolve('dist');
const file=(page,lang)=>`${lang==='uk'?'':lang+'/'}${page}.html`;
const read=(name)=>fs.readFile(path.join(root,name),'utf8');
async function runtime(page,lang,{seed={},blocked=false}={}) {
  const name=file(page,lang);
  const errors=[];
  const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
  const dom=new JSDOM(await read(name),{url:'https://code-lessons.netlify.app/'+name,runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
  const win=dom.window;
  Object.defineProperty(win.HTMLElement.prototype,'innerText',{get(){return this.textContent},set(v){this.textContent=v}});
  win.HTMLElement.prototype.scrollIntoView=()=>{};
  for(const [key,value] of Object.entries(seed))win.localStorage.setItem(key,value);
  if(blocked)Object.defineProperty(win,'localStorage',{get(){throw new Error('Storage blocked')}});
  for(const script of [...win.document.querySelectorAll('script')]) {
    if(script.type==='application/ld+json')continue;
    const src=script.getAttribute('src');if(src?.startsWith('https:'))continue;
    const code=src?await fs.readFile(path.resolve(root,path.dirname(name),src),'utf8'):script.textContent;
    win.eval(code);
  }
  await new Promise(resolve=>setTimeout(resolve,5));
  assert.deepEqual(errors,[],`${name}: browser script errors`);
  return dom;
}

test('all 100 static pages have indexable content, correct locale URLs and intact styles',async()=>{
  const urls=new Set();
  for(const page of ['index',...Object.keys(guides)]) {
    const original=new JSDOM(await fs.readFile(`${page}.html`,'utf8'));
    const originalCss=[...original.window.document.querySelectorAll('style')].map(el=>el.textContent);
    let code;
    for(const lang of locales) {
      const name=file(page,lang);const html=await read(name);const dom=new JSDOM(html);const doc=dom.window.document;
      assert.ok(html.indexOf('charset="UTF-8"')<1024,`${name}: late character encoding`);
      assert.equal(doc.documentElement.lang,lang,name);
      assert.equal(doc.querySelectorAll('h1').length,1,name);
      assert.ok(doc.title.length>15,name);
      assert.ok(doc.querySelector('meta[name="description"]').content.length>(lang==='ja'?30:60),name);
      const canonical=doc.querySelector('link[rel="canonical"]').href;assert.ok(!urls.has(canonical));urls.add(canonical);
      assert.equal(doc.querySelectorAll('link[hreflang]').length,6,name);
      assert.equal(doc.querySelector(`link[hreflang="${lang}"]`).href,canonical,name);
      const schema=JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);
      assert.equal(schema['@graph'][1].inLanguage,lang,name);
      assert.equal(doc.querySelectorAll('#world-language option').length,249,name);
      assert.ok(doc.querySelectorAll('main article').length>5,`${name} requires JavaScript for content`);
      assert.ok(!doc.querySelector('script[src$="i18n-auto.js"]'));
      originalCss.forEach((css,i)=>assert.equal(doc.querySelectorAll('style')[i].textContent,css,`${name} CSS`));
      if(page==='index' && lang==='uk') assert.deepEqual(
        [...doc.querySelectorAll('.language-card p')].map(el=>el.textContent),
        [...original.window.document.querySelectorAll('.language-card p')].map(el=>el.textContent),
        'Ukrainian homepage descriptions must remain Ukrainian'
      );
      const examples=[...doc.querySelectorAll('pre code')].map(el=>el.textContent);
      if(lang==='uk')code=examples;else assert.deepEqual(examples,code,`${name} changed executable examples`);
      for(const link of doc.querySelectorAll('a[href],script[src],link[rel="stylesheet"],img[src]')) {
        const href=link.getAttribute('href')||link.getAttribute('src');
        if(/^(https?:|mailto:|#)/.test(href))continue;
        const target=path.resolve(root,path.dirname(name),decodeURIComponent(href.split(/[?#]/)[0]));
        await assert.doesNotReject(fs.access(target),`${name}: broken asset/link ${href}`);
      }
      dom.window.close();
    }
    original.window.close();
  }
  const sitemap=new JSDOM(await read('sitemap.xml'),{contentType:'application/xml'});
  assert.equal(sitemap.window.document.querySelectorAll('url').length,100);
  for(const loc of sitemap.window.document.querySelectorAll('loc'))assert.ok(urls.has(loc.textContent));
  sitemap.window.close();
});

test('all guides initialize, filter translated content, and clear search',async()=>{
  for(const page of Object.keys(guides)) {
    const dom=await runtime(page,'en');const {document:doc,Event}=dom.window;
    assert.ok(doc.querySelector('#practice-code'),page);
    const input=doc.querySelector('#searchInput');
    input.value='zzzznoresultszzzz';input.dispatchEvent(new Event('input',{bubbles:true}));
    assert.match(doc.querySelector('#searchCount').textContent,/No matches/,page);
    assert.equal([...doc.querySelectorAll('main article')].filter(el=>!el.hidden).length,0,page);
    doc.querySelector('#clearSearch').click();
    assert.equal(input.value,'');assert.ok([...doc.querySelectorAll('main article')].every(el=>!el.hidden),page);
    const title=doc.querySelector('main article h3')?.textContent.trim();
    if(title){input.value=title;input.dispatchEvent(new Event('input',{bubbles:true}));assert.ok([...doc.querySelectorAll('main article')].some(el=>!el.hidden),page);}
    dom.window.close();
  }
});

test('progress and per-task drafts persist across reload and language changes',async()=>{
  const dom=await runtime('python','en');const win=dom.window;const doc=win.document;
  const complete=doc.querySelector('[data-complete]');complete.click();assert.equal(complete.getAttribute('aria-pressed'),'true');
  const editor=doc.querySelector('#practice-code');editor.value='print("draft one")';editor.dispatchEvent(new win.Event('input',{bubbles:true}));
  doc.querySelector('#practice-next').click();editor.value='print("draft two")';editor.dispatchEvent(new win.Event('input',{bubbles:true}));
  const seed=Object.fromEntries(Object.keys(win.localStorage).map(k=>[k,win.localStorage.getItem(k)]));dom.window.close();
  const restored=await runtime('python','ja',{seed});const next=restored.window.document;
  assert.equal(next.querySelector('[data-complete]').getAttribute('aria-pressed'),'true');
  assert.equal(next.querySelector('#practice-code').value,'print("draft two")');
  next.querySelector('#practice-next').click();assert.equal(next.querySelector('#practice-code').value,'print("draft one")');
  next.querySelector('#practice-reset').click();assert.equal(next.querySelector('#practice-code').value,'');
  restored.window.close();
});

test('blocked or corrupt storage does not break lessons or practice',async()=>{
  for(const opts of [{blocked:true},{seed:{'lessons:practice:python:v1':'{broken','lessons:progress:v1':'null'}}]) {
    const dom=await runtime('python','en',opts);const doc=dom.window.document;
    doc.querySelector('[data-complete]').click();
    const editor=doc.querySelector('#practice-code');editor.value='x = 1';editor.dispatchEvent(new dom.window.Event('input'));
    doc.querySelector('#practice-check').click();assert.ok(doc.querySelector('#practice-result').textContent);
    if(opts.blocked)assert.match(doc.querySelector('#practice-save-status').textContent,/blocked/);
    dom.window.close();
  }
});

test('search indexes link to real localized topics',async()=>{
  for(const lang of locales) {
    const source=await read(`assets/search-${lang}.js`);
    const data=JSON.parse(source.slice(source.indexOf('=')+1).trim().replace(/;$/,''));
    assert.ok(data.length>500,lang);
    for(const page of Object.keys(guides)) {
      const dom=new JSDOM(await read(file(page,lang)));const doc=dom.window.document;
      for(const item of data.filter(item=>item.page===page))assert.ok(doc.getElementById(item.hash),`${lang}/${page}#${item.hash}`);
      dom.window.close();
    }
  }
});

test('all locales initialize on the homepage and JSON page',async()=>{
  for(const lang of locales)for(const page of ['index','json']) {
    const dom=await runtime(page,lang);assert.equal(dom.window.document.documentElement.lang,lang);
    assert.equal(dom.window.document.querySelectorAll('.language-picker').length,1,`${lang}/${page}`);
    dom.window.close();
  }
});

test('global search finds translated topics and clears stale results',async()=>{
  const dom=await runtime('index','en');const win=dom.window;const doc=win.document;
  win.eval(await read('assets/search-en.js'));
  const input=doc.querySelector('#global-search');input.value='flexbox';input.dispatchEvent(new win.Event('input'));
  await new Promise(resolve=>setTimeout(resolve,180));
  assert.ok(doc.querySelectorAll('#global-results a').length>0);
  assert.match(doc.querySelector('#global-results a').getAttribute('href'),/^css\.html#topic-/);
  input.value='zzzznoresultszzzz';input.dispatchEvent(new win.Event('input'));
  await new Promise(resolve=>setTimeout(resolve,180));
  assert.equal(doc.querySelectorAll('#global-results a').length,0);
  assert.match(doc.querySelector('#global-status').textContent,/No matches/);
  doc.querySelector('#global-clear').click();assert.equal(input.value,'');assert.equal(doc.querySelector('#global-status').textContent,'');
  dom.window.close();
});
