import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM, VirtualConsole } from 'jsdom';
import { locales, names, guides, ui } from './ui.mjs';
import {curriculum} from './curriculum.mjs';
import {levelUi,localizedLessons} from './levels.mjs';
import {renderLevels} from './render-levels.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');
const origin = (process.env.SITE_URL || 'https://code-lessons.netlify.app').replace(/\/$/, '');
if (!/^https:\/\/[^/]+$/.test(origin)) throw new Error('SITE_URL must be an HTTPS origin without a path.');
await fs.mkdir(path.join(out, 'assets'), {recursive:true});
const read = name => fs.readFile(path.join(root, name), 'utf8');
const write = (name, value) => fs.writeFile(path.join(out, name), value);
const auto = JSON.parse(await read('i18n-auto-data.json'));
const languageList = JSON.parse(await read('translation-languages.json'));
const curriculumTranslations=JSON.parse(await read('curriculum-translations.json'));
const curriculumOverrides=JSON.parse(await read('curriculum-overrides.json'));
for(const [lang,values] of Object.entries(curriculumOverrides))Object.assign(curriculumTranslations[lang],values);
const patches = await read('translation-overrides.json').then(JSON.parse).catch(() => ({}));
const legacy = (await read('i18n.js')).replace(/  addStyles\(\);[\s\S]*$/, '  window.__legacy = {dict, translateValue, translateIndexCards};\n})();');
const practiceSource = await read('practice.js');
const normalize = value => value.replace(/\s+/g, ' ').trim();
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
const route = (page, lang) => `${lang === 'uk' ? '/' : `/${lang}/`}${page === 'index' ? '' : `${page}.html`}`;
const fileRoute = (page, lang) => `${lang === 'uk' ? '' : `${lang}/`}${page}.html`;
const sources = {
  html:'https://developer.mozilla.org/en-US/docs/Web/HTML', css:'https://developer.mozilla.org/en-US/docs/Web/CSS',
  javascript:'https://developer.mozilla.org/en-US/docs/Web/JavaScript', python:'https://docs.python.org/3/tutorial/',
  csharp:'https://learn.microsoft.com/dotnet/csharp/', cpp:'https://isocpp.org/get-started', java:'https://dev.java/learn/',
  rust:'https://doc.rust-lang.org/book/', go:'https://go.dev/learn/', ruby:'https://www.ruby-lang.org/en/documentation/',
  swift:'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/', dart:'https://dart.dev/guides',
  assembler:'https://www.nasm.us/docs.php', c:'https://www.open-std.org/jtc1/sc22/wg14/', sql:'https://www.postgresql.org/docs/current/tutorial-sql.html',
  json:'https://www.json.org/json-en.html', typescript:'https://www.typescriptlang.org/docs/', php:'https://www.php.net/manual/en/',
  powershell:'https://learn.microsoft.com/powershell/'
};
const allUrls = [];
const searchIndexes = Object.fromEntries(locales.map(l => [l, []]));
const missing = Object.fromEntries(locales.filter(l => l !== 'uk').map(l => [l, new Set()]));
const metrics = {pages:0, languages:Object.keys(languageList).length, searchEntries:0, addedModules:Object.values(curriculum).flat().length, learningLevels:3, originalCssPreserved:true};

function append(parent, tag, attrs = {}, content) {
  const el = parent.ownerDocument.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  if (content !== undefined) el.textContent = content;
  parent.append(el); return el;
}

for (const page of ['index', ...Object.keys(guides)]) {
  const source = await read(`${page}.html`);
  for (const lang of locales) {
    const copy = {...ui[lang],...levelUi[lang]};
    const lessons=localizedLessons(page,lang,curriculum,curriculumTranslations);
    const prefix = lang === 'uk' ? '' : '../';
    const vc = new VirtualConsole();
    const dom = new JSDOM(source, {url:`${origin}/${page}.html?lang=uk`, runScripts:'outside-only', pretendToBeVisual:true, virtualConsole:vc});
    const {window} = dom;
    const doc = window.document;
    const originalCss = [...doc.querySelectorAll('style')].map(style => style.textContent);
    // The existing data/renderers are the source of truth. No remote scripts run during builds.
    Object.defineProperty(window.HTMLElement.prototype, 'innerText', {get() {return this.textContent;}, set(v) {this.textContent=v;}});
    window.localStorage.setItem('siteLanguage', 'uk');
    window.localStorage.setItem('siteLanguageChoiceVersion', '2');
    for (const script of [...doc.querySelectorAll('script:not([src])')]) {
      if (script.type && script.type !== 'text/javascript') continue;
      try { window.eval(`(()=>{${script.textContent}\n})()`); }
      catch (error) { throw new Error(`${page}: rendering failed: ${error.message}`); }
      // Source scripts are retained for interactive demos. Their storage is guarded and
      // their source locale is fixed; the small per-page dictionary localizes new nodes.
      const runtimeSource=script.textContent.replace(/^(\s*)addLanguagePicker\(\);/gm,'$1// The shared language picker is emitted by the build.');
      script.textContent = `(()=>{const localStorage = {getItem(k){return k==='siteLanguage'?'uk':k==='siteLanguageChoiceVersion'?'2':window.LessonStorage.getItem(k)},setItem(k,v){if(!k.startsWith('siteLanguage'))window.LessonStorage.setItem(k,v)}};\n${runtimeSource}\n})()`;
    }
    dom.reconfigure({url:`${origin}/${page}.html?lang=${lang}`});
    window.I18N_AUTO_TRANSLATIONS = auto;
    window.eval(legacy);
    const dictionary = Object.fromEntries(Object.entries({...window.__legacy.dict[lang], ...patches[lang]}).map(([k,v]) => [normalize(k),v]));
    const pageDictionary = {};
    const translate = value => {
      const key = normalize(value);
      if (lang === 'uk' || !key) return value;
      const result = dictionary[key];
      if (result) {
        pageDictionary[key] = result;
        return value.replace(value.trim(), result);
      }
      if (/[А-Яа-яІіЇїЄєҐґ]/.test(key)) missing[lang].add(key);
      return value;
    };
    for (const [key, value] of Object.entries(dictionary)) {
      if (source.includes(key) || source.includes(JSON.stringify(key).slice(1,-1)) || practiceSource.includes(key) || practiceSource.includes(JSON.stringify(key).slice(1,-1))) pageDictionary[key] = value;
    }
    const walker = doc.createTreeWalker(doc.body, window.NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.parentElement.closest('script,style,pre,code,textarea,svg')) node.nodeValue = translate(node.nodeValue);
    }
    for (const el of doc.body.querySelectorAll('[placeholder],[aria-label],[title],[alt]')) {
      for (const attr of ['placeholder','aria-label','title','alt']) if (el.hasAttribute(attr)) el.setAttribute(attr, translate(el.getAttribute(attr)));
    }
    if(lang!=='uk') window.__legacy.translateIndexCards();
    doc.documentElement.lang = lang;
    doc.documentElement.dataset.page = page;
    doc.documentElement.dataset.prerendered = 'true';
    doc.querySelectorAll('script[src="i18n-auto.js"],script[src="i18n.js"],script[src="practice.js"],.language-picker,.lang-switch').forEach(el => el.remove());
    doc.querySelectorAll('pre,code,textarea').forEach(el => {el.setAttribute('translate','no'); el.classList.add('notranslate');});
    doc.querySelectorAll('img').forEach((el,i) => {el.decoding='async'; if(i>2) el.loading='lazy';});
    const supportTitle = doc.querySelector('#support-title');
    if (supportTitle?.tagName === 'H1') {
      const h2=doc.createElement('h2'); h2.id=supportTitle.id; h2.innerHTML=supportTitle.innerHTML;
      // Retain the existing h1 presentation while fixing the document outline.
      h2.className='support-heading'; supportTitle.replaceWith(h2);
      const supportCss=originalCss.join('\n').match(/\.support-inner h1\s*\{([^}]+)\}/)?.[1] || '';
      append(doc.head,'style',{},`.support-inner .support-heading {${supportCss}}`);
    }
    const main=doc.querySelector('main');
    if (!main.id) main.id='main-content';
    main.setAttribute('tabindex','-1');
    const skip=doc.createElement('a'); skip.className='skip-link'; skip.href=`#${main.id}`; skip.textContent=copy.skip; doc.body.prepend(skip);

    // A normal, crawlable link for each built-in locale, plus all provider languages.
    const picker=append(doc.querySelector('.header-inner'),'nav',{'class':'language-picker','aria-label':copy.languages});
    for(const locale of locales) append(picker,'a',{href:`${prefix}${fileRoute(page,locale)}`,hreflang:locale,lang:locale,'class':locale===lang?'is-active':'',...(locale===lang?{'aria-current':'page'}:{})},({uk:'UKR',en:'ENG',ru:'RU',id:'ID',ja:'JA'})[locale]);
    const details=append(picker,'details',{'class':'world-languages'});
    append(details,'summary',{},copy.languages);
    const menu=append(details,'form',{'class':'language-menu',action:'https://translate.google.com/translate',method:'get'});
    for(const [name,value] of Object.entries({sl:lang,hl:lang,u:origin+route(page,lang)})) append(menu,'input',{type:'hidden',name,value});
    append(menu,'label',{for:'world-language'},copy.languages);
    const select=append(menu,'select',{id:'world-language',name:'tl','aria-describedby':'translation-note'});
    const native=append(select,'optgroup',{label:copy.native});
    for(const locale of locales) append(native,'option',{value:locale,...(locale===lang?{selected:''}:{})},names[locale]);
    const automatic=append(select,'optgroup',{label:copy.automatic});
    const displayNames=new Intl.DisplayNames([lang],{type:'language'});
    for(const [locale,name] of Object.entries(languageList)) {
      if(locales.includes(locale)) continue;
      let translatedName=name;
      try {const label=displayNames.of(locale); if(label!==locale) translatedName=label;} catch {}
      let nativeName=name;
      try {const label=new Intl.DisplayNames([locale],{type:'language'}).of(locale); if(label!==locale) nativeName=label;} catch {}
      append(automatic,'option',{value:locale},translatedName===nativeName?translatedName:`${translatedName} · ${nativeName}`);
    }
    append(menu,'p',{id:'translation-note'},copy.translationNote);
    const noscript=append(menu,'noscript');
    append(noscript,'button',{type:'submit','class':'learning-button'},({uk:'Відкрити переклад',en:'Open translation',ru:'Открыть перевод',id:'Buka terjemahan',ja:'翻訳を開く'})[lang]);

    const tools=doc.createElement('section'); tools.className='learning-tools';
    if(page==='index') {
      tools.innerHTML=`<div class="learning-panel"><h2>${escape(copy.search)}</h2><label for="global-search">${escape(copy.searchHelp)}</label><div class="learning-row"><input class="learning-input" type="search" id="global-search" placeholder="${escape(copy.searchHint)}" autocomplete="off" aria-controls="global-results"><button type="button" class="learning-button" id="global-clear">${escape(copy.clear)}</button></div><p id="global-status" role="status" aria-live="polite"></p><ol class="learning-results" id="global-results"></ol><p id="resume-learning" hidden></p></div>`;
      doc.querySelector('.hero').after(tools);
      renderLevels(doc,page,copy,lessons);
      const info=doc.querySelector('.info-grid .info-card:last-child p'); if(info) info.textContent=copy.languageInfo;
      const paths=append(doc.querySelector('.info-panel'),'div',{'class':'learning-paths'});
      for(const [key,items] of Object.entries({web:['html','css','javascript'],automation:['python','powershell'],data:['json','sql','python'],systems:['c','cpp','rust']})) {
        const card=append(paths,'article'); append(card,'h3',{},copy[key]); append(card,'p',{},copy[`${key}Hint`]);
        const list=append(card,'ol'); for(const item of items) append(append(list,'li'),'a',{href:`${item}.html`},guides[item]);
      }
    } else {
      tools.innerHTML=`<div class="learning-panel"><h2>${escape(copy.progress)}</h2><p>${escape(copy.progressHelp)}</p><p id="lesson-progress" role="status"></p><a href="#practice">${escape(copy.practice)}</a> · <a href="${sources[page]}" target="_blank" rel="noopener noreferrer">${escape(copy.source)}</a></div>`;
      doc.querySelector('.hero').after(tools);
      renderLevels(doc,page,copy,lessons);
      doc.querySelectorAll('main .section[id]').forEach(section=>{
        if(section.id==='search') return;
        const content=section.querySelector('.section-content') || section;
        append(append(content,'div',{'class':'lesson-progress'}),'button',{'class':'learning-button','type':'button','data-complete':section.id,'aria-pressed':'false'},copy.mark);
      });
      doc.querySelectorAll('main article').forEach((article,i)=>{if(!article.id) article.id=`topic-${i+1}`;});
      for(const el of doc.querySelectorAll('main article')) {
        const title=normalize(el.querySelector('h3,h4')?.textContent || '');
        if(!title) continue;
        searchIndexes[lang].push({page,guide:guides[page],title,hash:el.id,level:el.closest('[data-level]')?.dataset.level||'beginner',text:normalize(el.textContent.replace(copy.mark,'')).slice(0,1800)});
      }
      const input=doc.querySelector('#searchInput'); if(input) input.setAttribute('aria-describedby','searchCount');
      doc.querySelector('#searchCount')?.setAttribute('role','status');
    }

    for(const link of doc.querySelectorAll('a[href]')) {
      const raw=link.getAttribute('href');
      if(raw.startsWith('#') || /^(https?:|mailto:|tel:)/.test(raw) || link.closest('.language-picker')) continue;
      if(/\.html/.test(raw)) link.setAttribute('href', raw.replace(/\?lang=[^#]*/,''));
    }
    doc.querySelectorAll('[src^="icon/"],link[href^="icon/"]').forEach(el=>{const attr=el.hasAttribute('src')?'src':'href';el.setAttribute(attr,prefix+el.getAttribute(attr));});
    const url=origin+route(page,lang);
    const title=page==='index'?copy.homeTitle:`${guides[page]} — ${copy.guide} | Programming Lessons`;
    const description=page==='index'?copy.description:copy.guideDescription.replace('{name}',guides[page]);
    doc.title=title;
    doc.querySelectorAll('meta[name="description"],meta[name="keywords"],link[rel="canonical"],link[hreflang],script[type="application/ld+json"]').forEach(el=>el.remove());
    append(doc.head,'meta',{name:'description',content:description});
    append(doc.head,'meta',{name:'robots',content:'index, follow, max-image-preview:large'});
    append(doc.head,'link',{rel:'canonical',href:url});
    for(const locale of locales) append(doc.head,'link',{rel:'alternate',hreflang:locale,href:origin+route(page,locale)});
    append(doc.head,'link',{rel:'alternate',hreflang:'x-default',href:origin+route(page,'en')});
    for(const [property,content] of Object.entries({'og:type':'website','og:site_name':'Programming Lessons','og:title':title,'og:description':description,'og:url':url,'og:locale':({uk:'uk_UA',en:'en_US',ru:'ru_RU',id:'id_ID',ja:'ja_JP'})[lang],'og:image':`${origin}/icon/index.png`,'og:image:alt':'Programming Lessons'})) append(doc.head,'meta',{property,content});
    for(const [name,content] of Object.entries({'twitter:card':'summary','twitter:title':title,'twitter:description':description,'twitter:image':`${origin}/icon/index.png`})) append(doc.head,'meta',{name,content});
    const schema={'@context':'https://schema.org','@graph':[
      {'@type':'WebSite','@id':`${origin}/#website`,url:origin+'/',name:'Programming Lessons',inLanguage:locales},
      {'@type':page==='index'?'CollectionPage':'LearningResource','@id':url+'#page',url,name:title,description,inLanguage:lang,isAccessibleForFree:true,isPartOf:{'@id':`${origin}/#website`},...(page==='index'?{}:{learningResourceType:'Tutorial',educationalLevel:['Beginner','Intermediate','Advanced'],about:guides[page]})}
    ]};
    if(page!=='index') schema['@graph'].push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:copy.home,item:origin+route('index',lang)},{'@type':'ListItem',position:2,name:guides[page],item:url}]});
    append(doc.head,'script',{type:'application/ld+json'},json(schema));
    append(doc.head,'link',{rel:'stylesheet',href:`${prefix}assets/enhancements.css`});
    const config={page,lang,prefix,origin,locales,ui:copy,dictionary:pageDictionary,languages:Object.keys(languageList),curriculum:lessons};
    // Load guarded storage before the original inline event handlers.
    const configScript=doc.createElement('script'); configScript.textContent=`window.SiteConfig=${json(config)};`;
    const boot=doc.createElement('script');boot.src=`${prefix}assets/boot.js`;
    doc.querySelector('meta[charset]').after(configScript,boot);
    append(doc.body,'script',{src:`${prefix}assets/site.js`,defer:''});
    if(page!=='index') append(doc.body,'script',{src:`${prefix}assets/practice.js`,defer:''});
    if(lang!=='uk') await fs.mkdir(path.join(out,lang),{recursive:true});
    // Keep the source CSS byte-for-byte (serialized style text is unchanged).
    const generatedCss=[...doc.querySelectorAll('style')].slice(0,originalCss.length).map(s=>s.textContent);
    if(originalCss.some((css,i)=>css.replace(/\r\n/g,'\n')!==generatedCss[i])) throw new Error(`Original CSS changed: ${page}`);
    await write(fileRoute(page,lang),dom.serialize());
    allUrls.push({page,lang,url});metrics.pages++;
    dom.window.close();
  }
  console.log(`Built ${page}: ${locales.length} locales`);
}
for(const lang of locales) {
  await write(`assets/search-${lang}.js`,`window.LessonSearchIndex=${json(searchIndexes[lang])};\n`);
  metrics.searchEntries+=searchIndexes[lang].length;
}
for(const file of ['enhancements.css','boot.js','site.js','practice.js']) await write(`assets/${file}`,await read(file));
await fs.cp(path.join(root,'icon'),path.join(out,'icon'),{recursive:true});
await write('googlec7793e5e023147f2.html',await read('googlec7793e5e023147f2.html'));
await write('robots.txt',`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
await write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${allUrls.map(({page,url})=>`  <url><loc>${url}</loc>${[...locales,'x-default'].map(locale=>`<xhtml:link rel="alternate" hreflang="${locale}" href="${origin+route(page,locale==='x-default'?'en':locale)}"/>`).join('')}</url>`).join('\n')}\n</urlset>\n`);
const redirects=[];
for(const {page,lang} of allUrls) {
  const from=page==='index'?'/':`/${page}.html`;
  redirects.push(`${from} lang=${lang} ${route(page,lang)}? 301!`);
  if(page==='index') redirects.push(`/index.html lang=${lang} ${route(page,lang)}? 301!`);
}
await write('_redirects',redirects.join('\n')+'\n');
await write('404.html',`<!doctype html><html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>404 — Programming Lessons</title><style>body{font:16px/1.6 Arial,sans-serif;background:#f6f7f8;color:#1f2328;max-width:760px;margin:12vh auto;padding:24px}a{color:inherit}</style></head><body><h1>404 — ${ui.uk.notFound}</h1><p><a href="/">${ui.uk.returnHome}</a> · <a href="/en/">${ui.en.returnHome}</a></p></body></html>`);
await fs.mkdir(path.join(root,'.qa'),{recursive:true});
await fs.writeFile(path.join(root,'.qa','translation-gaps.json'),JSON.stringify(Object.fromEntries(Object.entries(missing).map(([l,set])=>[l,[...set]])),null,2));
await fs.writeFile(path.join(root,'.qa','build-report.json'),JSON.stringify(metrics,null,2));
console.log(JSON.stringify({...metrics,untranslated:Object.fromEntries(Object.entries(missing).map(([l,set])=>[l,set.size]))},null,2));
