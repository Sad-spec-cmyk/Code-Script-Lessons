import {levels} from './levels.mjs';
import {guides} from './ui.mjs';

function el(parent,tag,attrs={},text) {
  const node=parent.ownerDocument.createElement(tag);
  for(const [key,value] of Object.entries(attrs))node.setAttribute(key,value);
  if(text!==undefined)node.textContent=text;
  parent.append(node);return node;
}

export function renderLevels(doc,page,copy,lessons) {
  const main=doc.querySelector('main');
  const panel=doc.querySelector('.learning-panel');
  const controls=doc.createElement('div');controls.className='level-controls';
  el(controls,'label',{for:'learning-level'},copy.level);
  const row=el(controls,'div',{class:'learning-row'});
  const select=el(row,'select',{id:'learning-level',class:'learning-input','aria-describedby':'level-help'});
  for(const value of ['all',...levels])el(select,'option',{value},value==='all'?copy.allLevels:copy[value]);
  el(controls,'p',{id:'level-help'},copy.levelHelp);
  panel.prepend(controls);
  if(page==='index') {
    doc.querySelector('.hero h1').textContent=copy.hero;
    doc.querySelector('.info-panel > p').textContent=copy.about;
    const practiceSummary=doc.querySelector('.info-grid .info-card:nth-child(3) p');
    if(practiceSummary)practiceSummary.textContent=copy.reviewIntro;
    const paths=el(panel,'div',{class:'learning-paths',id:'learning-levels'});
    for(const level of levels) {
      const card=el(paths,'article');el(card,'h3',{},copy[level]);el(card,'p',{},copy[`${level}Plan`]);
      el(card,'a',{href:`?level=${level}#${main.id}`,'data-select-level':level},copy.openLevel);
    }
    el(panel,'p',{},copy.chooseGuide);
    return;
  }
  doc.querySelectorAll('main .section[id]').forEach(section=>{if(section.id!=='search')section.dataset.level='beginner';});
  const hero=doc.querySelector('.hero');
  const description=hero.querySelector('p');
  if(description)description.textContent=copy.guideDescription.replace('{name}',guides[page]);
  const start=hero.querySelector('a[href="#intro"]');
  if(start)start.dataset.startLevel='true';
  el(hero,'p',{class:'learning-status'},`${copy.beginner} · ${copy.intermediate} · ${copy.professional}`);
  for(const lesson of lessons) {
    const {level,id,text,code,reference}=lesson;
    const section=el(main,'section',{class:'section',id:level,'data-level':level});
    const header=el(section,'button',{class:'section-header',type:'button','aria-expanded':'true'});
    el(header,'h2',{},copy[level]);el(header,'span',{'aria-hidden':'true'},'⌄');
    const content=el(section,'div',{class:'section-content'});
    const article=el(content,'article',{class:'info-card curriculum-lesson',id:`${level}-${id}`,'data-level':level});
    el(article,'h3',{},text.title);
    for(const key of ['prerequisites','environment']) {
      const p=el(article,'p');el(p,'strong',{},`${copy[key]}: `);p.append(doc.createTextNode(text[key]));
    }
    el(article,'p',{},text.explanation);
    el(article,'h4',{},copy.workedExample);
    const wrap=el(article,'div',{class:'code-wrap'});
    el(wrap,'button',{class:'copy-btn',type:'button'},copy.copy);
    el(el(wrap,'pre'),'code',{translate:'no',class:'notranslate'},code);
    el(article,'h4',{},copy.pitfall);el(article,'p',{},text.pitfall);
    el(article,'h4',{},copy.assignment);el(article,'p',{},text.task);
    el(article,'h4',{},copy.criteria);
    const criteria=el(article,'ul',{class:'acceptance-criteria'});
    for(const item of text.criteria)el(criteria,'li',{},item);
    el(el(article,'p'),'a',{href:`?level=${level}#practice`,'data-select-level':level},`${copy.practice}: ${copy[level]}`);
    el(el(article,'p'),'a',{href:reference,target:'_blank',rel:'noopener noreferrer'},copy.source);
    const sidebar=doc.querySelector('.sidebar');
    if(sidebar)el(sidebar,'a',{href:`#${level}`,'data-level-link':level},copy[level]);
  }
}
