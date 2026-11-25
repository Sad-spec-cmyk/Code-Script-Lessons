(() => {
  'use strict';
  const config=window.SiteConfig;
  if(!config) return;
  const {ui,lang,page,prefix,dictionary}=config;
  const storage=window.LessonStorage;
  const normalize=value=>String(value).normalize('NFKC').replace(/\s+/g,' ').trim();
  const translate=value=>{
    const result=dictionary[normalize(value)];
    return result ? value.replace(value.trim(),result) : value;
  };
  window.LessonI18n={translate};
  const read=(key,fallback)=>{try{const value=JSON.parse(storage.getItem(key));return value && typeof value==='object' && !Array.isArray(value)?value:fallback;}catch{return fallback;}};
  const localUrl=(slug,hash='',level=activeLevel)=>`${slug}.html${level==='all'?'':`?level=${level}`}${hash?'#'+encodeURIComponent(hash):''}`;

  function translateTree(root) {
    if(root.nodeType===Node.TEXT_NODE) {
      if(root.parentElement?.closest('script,style,code,pre,textarea,[translate="no"]')) return;
      const next=translate(root.nodeValue);if(next!==root.nodeValue) root.nodeValue=next;
      return;
    }
    if(root.nodeType!==Node.ELEMENT_NODE || root.closest('script,style,code,pre,textarea,[translate="no"]')) return;
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) translateTree(walker.currentNode);
    for(const el of [root,...root.querySelectorAll('[placeholder],[aria-label],[title]')]) {
      for(const attr of ['placeholder','aria-label','title']) {
        const old=el.getAttribute(attr);if(old){const value=translate(old);if(old!==value) el.setAttribute(attr,value);}
      }
    }
  }
  translateTree(document.body);
  new MutationObserver(mutations=>{
    for(const mutation of mutations) {
      if(mutation.type==='characterData') translateTree(mutation.target);
      else for(const node of mutation.addedNodes) translateTree(node);
    }
  }).observe(document.body,{childList:true,subtree:true,characterData:true});
  document.documentElement.lang=lang;
  document.querySelectorAll('pre,code,textarea').forEach(el=>{el.setAttribute('translate','no');el.classList.add('notranslate');});
  document.querySelectorAll('main article').forEach((article,i)=>{if(!article.id)article.id=`topic-${i+1}`;});
  document.querySelectorAll('a[href]').forEach(link=>{
    const href=link.getAttribute('href');
    if(!/^(https?:|mailto:|#)/.test(href)) link.setAttribute('href',href.replace(/\?lang=[^#]*/,''));
  });

  const validLevels=['all','beginner','intermediate','professional'];
  const requestedLevel=new URLSearchParams(location.search).get('level');
  const savedLevel=storage.getItem('lessons:level:v1');
  let activeLevel=validLevels.includes(requestedLevel)?requestedLevel:validLevels.includes(savedLevel)?savedLevel:'all';
  if(validLevels.includes(requestedLevel))storage.setItem('lessons:level:v1',activeLevel);
  const levelSelect=document.querySelector('#learning-level');
  function syncLevelLinks() {
    for(const link of document.querySelectorAll('a[href]')) {
      if(link.hasAttribute('data-start-level'))link.setAttribute('href',`#${activeLevel==='all'||activeLevel==='beginner'?'intro':activeLevel}`);
      const raw=link.getAttribute('href');
      if(raw.startsWith('#') || link.hasAttribute('data-select-level'))continue;
      let url;try{url=new URL(raw,location.href);}catch{continue;}
      if(url.origin!==location.origin || !url.pathname.endsWith('.html'))continue;
      if(link.closest('#global-results'))continue;
      if(activeLevel==='all')url.searchParams.delete('level');else url.searchParams.set('level',activeLevel);
      if(link.closest('.language-picker')) {
        url.hash=location.hash;
        const query=new URLSearchParams(location.search).get('q');
        if(query)url.searchParams.set('q',query);else url.searchParams.delete('q');
      }
      // Keep relative file links usable when opening the built site from disk.
      const base=raw.split(/[?#]/)[0];link.setAttribute('href',base+url.search+url.hash);
    }
  }
  function setLevel(value,{preserveHash=false}={}) {
    if(!validLevels.includes(value))return;
    activeLevel=value;levelSelect.value=value;storage.setItem('lessons:level:v1',value);
    const url=new URL(location.href);
    if(value==='all')url.searchParams.delete('level');else url.searchParams.set('level',value);
    if(!preserveHash && value!=='all') {
      let target;try{target=document.getElementById(decodeURIComponent(url.hash.slice(1)));}catch{}
      const targetLevel=target?.closest('[data-level]')?.dataset.level;
      if(targetLevel && targetLevel!==value)url.hash='';
    }
    try{history.replaceState(null,'',url);}catch{}
    syncLevelLinks();
    window.dispatchEvent(new CustomEvent('lessonlevelchange',{detail:value}));
  }
  window.LessonLevel={get:()=>activeLevel,set:setLevel};
  levelSelect.value=activeLevel;syncLevelLinks();
  levelSelect.addEventListener('change',()=>setLevel(levelSelect.value));
  document.querySelectorAll('[data-select-level]').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();setLevel(link.dataset.selectLevel);
    const hash=new URL(link.href).hash;
    if(location.hash!==hash)location.hash=hash;else revealHash();
  }));

  document.querySelector('#world-language')?.addEventListener('change',event=>{
    const target=event.target.value;
    if(config.locales.includes(target)) {
      const next=new URL(`${prefix}${target==='uk'?'':target+'/'}${page}.html`,location.href);
      next.hash=location.hash;
      const q=new URLSearchParams(location.search).get('q');if(q)next.searchParams.set('q',q);
      if(activeLevel!=='all')next.searchParams.set('level',activeLevel);
      location.assign(next.href);
    } else if(config.languages.includes(target)) {
      const source=new URL(document.querySelector('link[rel="canonical"]').href);
      source.hash=location.hash;
      if(activeLevel!=='all')source.searchParams.set('level',activeLevel);
      const translation=new URL('https://translate.google.com/translate');
      translation.search=new URLSearchParams({sl:lang,tl:target,hl:lang,u:source.href});
      location.assign(translation.href);
    }
  });

  document.addEventListener('click',async event=>{
    const button=event.target.closest('.copy-btn');
    if(!button)return;
    event.preventDefault();event.stopImmediatePropagation();
    const code=button.parentElement.querySelector('code')?.textContent;
    if(code===undefined)return;
    try {
      if(navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(code);
      else {
        const input=document.createElement('textarea');input.value=code;input.setAttribute('aria-hidden','true');
        input.style.cssText='position:fixed;left:-9999px';document.body.append(input);input.select();
        const copied=document.execCommand('copy');input.remove();button.focus();if(!copied)throw new Error('Copy unavailable');
      }
      button.textContent=ui.copied;
    } catch {button.textContent=ui.copyFailed;}
    setTimeout(()=>{button.textContent=ui.copy;},2000);
  },true);

  const progressKey='lessons:progress:v1';
  const sections=[...document.querySelectorAll('[data-complete]')];
  function showProgress() {
    const progress=read(progressKey,{});
    let count=0;
    for(const button of sections) {
      const done=progress[`${page}:${button.dataset.complete}`]===true;
      button.setAttribute('aria-pressed',String(done));button.textContent=done?ui.unmark:ui.mark;if(done)count++;
    }
    const status=document.querySelector('#lesson-progress');
    if(status)status.textContent=`${ui.completed}: ${count} / ${sections.length}${storage.available?'':'. '+ui.storageUnavailable}`;
  }
  sections.forEach(button=>button.addEventListener('click',()=>{
    const progress=read(progressKey,{});const key=`${page}:${button.dataset.complete}`;
    progress[key]=progress[key]!==true;storage.setItem(progressKey,JSON.stringify(progress));
    storage.setItem('lessons:last',JSON.stringify({page,hash:button.dataset.complete}));showProgress();
  }));
  showProgress();
  if(page!=='index') {
    const remember=()=>storage.setItem('lessons:last',JSON.stringify({page,hash:location.hash.slice(1)}));
    remember();window.addEventListener('hashchange',remember);
  } else {
    const last=read('lessons:last',{});
    if(/^[a-z]+$/.test(last.page) && [...document.querySelectorAll('.language-card a')].some(link=>new URL(link.href).pathname.endsWith(`/${last.page}.html`))) {
      const resume=document.querySelector('#resume-learning');resume.hidden=false;
      const link=document.createElement('a');link.href=localUrl(last.page,typeof last.hash==='string'?last.hash:'');link.textContent=ui.resume;resume.append(link);
    }
  }

  // Search the rendered, localized content instead of rebuilding Ukrainian data arrays.
  const localSearch=document.querySelector('#searchInput');
  if(localSearch) {
    const cards=[...document.querySelectorAll('main article')];
    const contentSections=[...document.querySelectorAll('main .section[id]')].filter(el=>el.id!=='search');
    const empty=[...document.querySelectorAll('.empty-state,#emptyMessage')];
    const originalCollapsed=new Set(contentSections.filter(el=>el.classList.contains('is-collapsed')));
    const applySearch=()=>{
      const query=normalize(localSearch.value).toLocaleLowerCase(lang);
      const words=query.split(' ').filter(Boolean);
      const matches=el=>words.every(word=>normalize(el.textContent).toLocaleLowerCase(lang).includes(word));
      const matchesLevel=el=>activeLevel==='all' || el.closest('[data-level]')?.dataset.level===activeLevel;
      let count=0;
      cards.forEach(card=>{card.hidden=!matchesLevel(card)||(Boolean(query)&&!matches(card));if(!card.hidden)count++;});
      contentSections.forEach(section=>{
        const children=cards.filter(card=>section.contains(card));
        section.hidden=!matchesLevel(section)||(Boolean(query)&&(children.length?!children.some(card=>!card.hidden):!matches(section)));
        if(query && !section.hidden) section.classList.remove('is-collapsed');
        else if(!query) section.classList.toggle('is-collapsed',originalCollapsed.has(section));
        section.querySelector('.section-header')?.setAttribute('aria-expanded',String(!section.classList.contains('is-collapsed')));
      });
      empty.forEach(el=>{el.hidden=true;el.style.display='none';});
      const status=document.querySelector('#searchCount');
      if(status) status.textContent=query?(count?`${ui.results}: ${count}`:ui.noResults):activeLevel==='all'?ui.all:`${ui.levelResults}: ${count}`;
    };
    localSearch.addEventListener('input',event=>{event.stopImmediatePropagation();applySearch();},true);
    document.querySelector('#clearSearch')?.addEventListener('click',event=>{event.stopImmediatePropagation();localSearch.value='';applySearch();localSearch.focus();},true);
    const query=new URLSearchParams(location.search).get('q');if(query)localSearch.value=query;
    window.addEventListener('lessonlevelchange',applySearch);applySearch();
  }

  const globalSearch=document.querySelector('#global-search');
  if(globalSearch) {
    let loading;
    const loadIndex=()=>loading ||= new Promise((resolve,reject)=>{
      if(window.LessonSearchIndex){resolve(window.LessonSearchIndex);return;}
      const script=document.createElement('script');script.src=`${prefix}assets/search-${lang}.js`;
      script.onload=()=>resolve(window.LessonSearchIndex);
      script.onerror=()=>{script.remove();loading=null;reject(new Error('Search index unavailable'));};document.head.append(script);
    });
    let generation=0;
    const performSearch=async()=>{
      const current=++generation;
      const query=normalize(globalSearch.value).toLocaleLowerCase(lang);
      const results=document.querySelector('#global-results');const status=document.querySelector('#global-status');
      results.replaceChildren();status.textContent='';
      const url=new URL(location.href);if(query)url.searchParams.set('q',query);else url.searchParams.delete('q');
      try{history.replaceState(null,'',url);}catch{}
      if(!query)return;
      try {
        const index=await loadIndex();if(current!==generation)return;
        const terms=query.split(' ');
        const matches=index.filter(item=>(activeLevel==='all'||item.level===activeLevel)&&terms.every(term=>normalize(`${item.guide} ${item.title} ${item.text}`).toLocaleLowerCase(lang).includes(term)))
          .sort((a,b)=>Number(b.title.toLocaleLowerCase(lang).includes(query))-Number(a.title.toLocaleLowerCase(lang).includes(query)));
        status.textContent=matches.length?`${ui.results}: ${matches.length}`:ui.noResults;
        for(const item of matches.slice(0,30)) {
          const li=document.createElement('li');const link=document.createElement('a');link.href=localUrl(item.page,item.hash,item.level);link.textContent=`${item.guide}: ${item.title} · ${ui[item.level]}`;
          const text=document.createElement('p');text.textContent=item.text.slice(0,180)+(item.text.length>180?'…':'');li.append(link,text);results.append(li);
        }
      } catch {if(current===generation)status.textContent=ui.searchHelp;}
    };
    let timer;
    globalSearch.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(performSearch,120);});
    document.querySelector('#global-clear').addEventListener('click',()=>{globalSearch.value='';performSearch();globalSearch.focus();});
    window.addEventListener('lessonlevelchange',performSearch);
    const q=new URLSearchParams(location.search).get('q');if(q){globalSearch.value=q;performSearch();}
  }
  document.addEventListener('keydown',event=>{
    if(event.key==='/' && !event.ctrlKey && !event.metaKey && !event.altKey && !event.target.closest('input,textarea,select,[contenteditable]')) {
      const input=globalSearch || localSearch;if(input){event.preventDefault();input.focus();input.scrollIntoView({block:'center'});}
    }
  });
  // Anchor links and search results should reveal collapsed learning sections.
  function revealHash() {
    let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
    const target=document.getElementById(id);if(!target)return;
    const targetLevel=target.closest('[data-level]')?.dataset.level;
    if(targetLevel && activeLevel!=='all' && targetLevel!==activeLevel)setLevel(targetLevel,{preserveHash:true});
    if(target.hidden && localSearch){localSearch.value='';localSearch.dispatchEvent(new Event('input',{bubbles:true}));}
    const section=target.closest('.section');if(section){section.classList.remove('is-collapsed');section.querySelector('.section-header')?.setAttribute('aria-expanded','true');}
    syncLevelLinks();
    requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
  }
  window.addEventListener('hashchange',revealHash);if(location.hash)revealHash();
})();
