(() => {
  const config=window.SiteConfig;
  const memory=new Map();
  window.LessonStorage={
    available:true,
    getItem(key) {if(memory.has(key))return memory.get(key);try{return localStorage.getItem(key);}catch{this.available=false;return null;}},
    setItem(key,value) {memory.set(key,String(value));try{localStorage.setItem(key,String(value));return true;}catch{this.available=false;return false;}},
    removeItem(key) {memory.delete(key);try{localStorage.removeItem(key);}catch{this.available=false;}}
  };
  const requested=new URLSearchParams(location.search).get('lang');
  if(config.locales.includes(requested)) {
    const next=new URL(`${config.prefix}${requested==='uk'?'':`${requested}/`}${config.page}.html`,location.href);
    const params=new URLSearchParams(location.search);params.delete('lang');next.search=params;next.hash=location.hash;
    if(next.pathname!==location.pathname || location.search.includes('lang=')) location.replace(next.href);
  }
})();
