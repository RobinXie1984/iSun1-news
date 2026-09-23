const $=s=>document.querySelector(s),main=$('#main');
const params=new URLSearchParams(location.search),preview=params.get('preview')==='1';
const safeGet=(k)=>{try{return localStorage.getItem(k);}catch{return null;}},safeSet=(k,v)=>{try{localStorage.setItem(k,v);}catch{}};
let lang=safeGet('isun1-language')||'en',consent=safeGet('isun1-signals')==='yes'&&!preview,stories=[],view='stories',selected=0,platform='x',cleanup=()=>{};
const sent=new Set(),queues=new Map(),seenHeadlines=new Set();let activeReader=null;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const t=(en,zh)=>lang==='zh'?zh:en;
const text=x=>typeof x==='string'?x:(x?.[lang]||x?.en||'');
const formatDate=d=>new Date(d+'T00:00:00Z').toLocaleDateString(lang==='zh'?'zh-CN':'en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});
const illustrations={
 'eviltokens-real-login-trap':['eviltokens','A brass key casts its shadow toward an envelope through a doorway; a conceptual access-trap illustration','黄铜钥匙的影子穿过门框，指向信封；授权陷阱概念插画'],
 'mars-rocks-three-water-stories':['mars','A conceptual study of Martian rock strata','火星岩层概念插画'],
 'ff-robots-american-dream':['robot','An industrial robot arm, a conceptual illustration','工业机械臂概念插画'],
 'roman-cosmic-blind-spot':['galaxy','A spiral galaxy, a conceptual illustration','螺旋星系概念插画'],
 'anthropic-paid-watchdog':['oversight','A magnifying lens and a glass computing cube','放大镜与玻璃计算方块概念插画'],
 'hotel-wifi-spy-trap':['security','A hotel key and a network device, a conceptual illustration','酒店钥匙与网络设备概念插画']
};
function art(s,hero=false){const [file,en,zh]=illustrations[s.id]||['galaxy','Editorial illustration','编辑插画'];return `<figure class="story-image${hero?' hero-image':''}"><img src="/images/${file}.jpg" alt="${esc(t(en,zh))}" width="${hero?1200:640}" height="${hero?900:640}" ${hero?'fetchpriority="high"':'loading="lazy"'} decoding="async"><figcaption>${t('AI illustration','AI 插画')}</figcaption></figure>`;}
function setTheme(value){const theme=value==='night'?'night':'day';document.documentElement.setAttribute('data-theme',theme);safeSet('isun1-theme',theme);$('#theme-day').setAttribute('aria-pressed',String(theme==='day'));$('#theme-night').setAttribute('aria-pressed',String(theme==='night'));}
setTheme(safeGet('isun1-theme'));
$('#theme-day').onclick=()=>setTheme('day');$('#theme-night').onclick=()=>setTheme('night');
function toast(msg){$('#toast').textContent=msg;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),2800);}
function signal(story,kind){
 if(!consent||preview||!story.ticket)return Promise.resolve();
 const key=story.ticket+':'+kind;if(sent.has(key))return queues.get(story.ticket)||Promise.resolve();sent.add(key);
 const job=(queues.get(story.ticket)||Promise.resolve()).then(async()=>{
   try{const r=await fetch('/api/signal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ticket:story.ticket,kind}),keepalive:true});if(!r.ok)sent.delete(key);}catch{sent.delete(key);}
 });queues.set(story.ticket,job);return job;
}
function apiPath(path){const q=new URLSearchParams({lang,utm_source:params.get('utm_source')||'direct'});if(preview)q.set('preview','1');if(consent)q.set('measure','1');return path+'?'+q;}
function meta(s){return `<div class="meta"><span class="tag">${esc(lang==='zh'?({'AI & business':'AI 与商业','AI & power':'AI 与权力','Science & wonder':'科学与惊奇','Security & ordinary life':'安全与生活'}[s.category]||s.category):s.category)}</span><span>${esc(formatDate(s.event_date))}</span><span>${esc(lang==='zh'?({'RESEARCH':'研究发表','ROBOTICS':'机器人','ANNOUNCEMENT':'已公布计划','MISSION':'航天任务','REPORTED INVESTIGATION':'调查报告'}[s.label.toUpperCase()]||s.label):s.label)}</span></div>`;}
function setNav(){const latest=stories.map(s=>s.event_date).sort().at(-1);$('#edition-date').textContent=latest?t('LATEST EVENT · ','最新事件 · ')+formatDate(latest):t('SOURCED STORIES','有据可查的故事');document.documentElement.lang=lang;$('.brand-line').textContent=t('The story inside the news.','新闻里，藏着故事。');document.querySelector('[data-view=stories]').textContent=t('The stories','故事');document.querySelector('[data-view=lab]').textContent=t('Hook lab 20×','标题实验室 20×');document.querySelector('[data-view=pulse]').textContent=t('The pulse','读者脉搏');$('#language').textContent=lang==='en'?'中文':'EN';document.querySelectorAll('[data-view]').forEach(b=>{b.setAttribute('aria-current',b.dataset.view===view?'page':'false');});$('#privacy').textContent=preview?t('Preview · signals excluded','预览 · 不计入数据'):t(`Anonymous signals: ${consent?'on':'off'}`,`匿名信号：${consent?'开启':'关闭'}`);}
async function load(){
 try{const r=await fetch(apiPath('/api/feed'));if(!r.ok)throw Error();const data=await r.json();stories=data.stories;renderRoute();}
 catch{main.innerHTML=`<div class="empty">${t('The stories could not load. Your connection or our service may be taking a break.','故事暂时无法加载。可能是网络或服务暂时中断。')} <button id="retry">${t('Try again','重试')}</button></div>`;$('#retry').onclick=load;}
}
function navigate(v){cleanup();view=v;location.hash=v==='stories'?'':v;renderRoute();}
function renderRoute(){
 cleanup();cleanup=()=>{};const hash=decodeURIComponent(location.hash.slice(1));
 if(hash.startsWith('story/')){const story=stories.find(s=>s.id===hash.slice(6));if(story){view='stories';setNav();renderStory(story);return;}}
 view=['lab','pulse'].includes(hash)?hash:'stories';document.title=view==='lab'?t('Hook Lab | iSun1.news','标题实验室 | iSun1.news'):view==='pulse'?t('The Pulse | iSun1.news','读者脉搏 | iSun1.news'):'iSun1.news — '+t('The story inside the news.','新闻里，藏着故事。');setNav();if(view==='lab')renderLab();else if(view==='pulse')renderPulse();else renderStories();
}
function openStory(id,fromFeed=false){const s=stories.find(s=>s.id===id);if(!s)return;activeReader=fromFeed&&seenHeadlines.has(id)?id:null;if(activeReader)signal(s,'open');location.hash='story/'+id;}
function bindReaders(fromFeed=false){document.querySelectorAll('[data-read]').forEach(b=>b.onclick=()=>openStory(b.dataset.read,fromFeed));}
function watchCards(){
 const visible=new Map(),totals=new Map(),observed=new Set();
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{const id=e.target.dataset.story;const on=e.isIntersecting&&e.intersectionRatio>=.6;visible.set(id,on);if(!on)totals.set(id,0);if(on&&!document.hidden){seenHeadlines.add(id);const s=stories.find(x=>x.id===id);if(s)signal(s,'impression');}}),{threshold:[0,.6,1]});
 document.querySelectorAll('[data-story]').forEach(el=>observer.observe(el));
 const timer=setInterval(()=>{if(document.hidden){for(const id of totals.keys())totals.set(id,0);return;}for(const [id,on]of visible){if(!on)continue;const s=stories.find(x=>x.id===id);if(!s)continue;seenHeadlines.add(id);if(!observed.has(id)){observed.add(id);signal(s,'impression');}totals.set(id,(totals.get(id)||0)+250);if(totals.get(id)>=5000)signal(s,'hold5');}},250);
 const resetStop=()=>{for(const id of totals.keys())totals.set(id,0);};document.addEventListener('visibilitychange',resetStop);
 cleanup=()=>{observer.disconnect();clearInterval(timer);document.removeEventListener('visibilitychange',resetStop);};
}
function renderStories(){
 const [lead,...rest]=stories;if(!lead){main.innerHTML='<div class="empty">No verified stories yet.</div>';return;}
 main.innerHTML=`<div class="intro"><h1>${t('The story inside the news.','新闻里，藏着故事。')}</h1><small>${t(`${stories.length} ${stories.length===1?'STORY':'STORIES'} WORTH YOUR TIME`,`${stories.length} 个值得停下来的故事`)}</small></div>
 <article class="lead"><div class="lead-content">${meta(lead)}<h2 data-story="${esc(lead.id)}">${esc(lead.headline)}</h2><p>${esc(text(lead.summary))}</p><div class="lead-actions"><button class="read-link" data-read="${esc(lead.id)}">${t('Read the story','读这个故事')}</button><span class="source-count">${lead.sources.length} ${t('primary sources','个一手来源')} · ${t('2 min','2 分钟')}</span></div></div>${art(lead,true)}</article>
 <section class="cards">${rest.map((s,i)=>`<article class="card">${art(s)}<div class="card-copy">${meta(s)}<h2 data-story="${esc(s.id)}">${esc(s.headline)}</h2><p>${esc(text(s.summary))}</p><div class="card-actions"><button data-read="${esc(s.id)}">${t('Read the story','读这个故事')}</button><button data-hide="${esc(s.id)}">${t('Not for me','不感兴趣')}</button></div></div></article>`).join('')}</section>`;
 bindReaders(true);document.querySelectorAll('[data-hide]').forEach(b=>b.onclick=()=>{const s=stories.find(x=>x.id===b.dataset.hide);if(seenHeadlines.has(s.id))signal(s,'hide');b.closest('.card').innerHTML=`<p>${t('Got it. This story is hidden for this visit.','收到。本次浏览已隐藏此故事。')}</p>`;});watchCards();
}
function renderStory(original){
 const s=activeReader===original.id?original:{...original,ticket:null};
 document.title=s.headline+' | iSun1.news';
 const next=stories[(stories.findIndex(x=>x.id===s.id)+1)%stories.length];
 main.innerHTML=`<article class="read-view"><button class="back" id="back">← ${t('All stories','所有故事')}</button>${meta(s)}<h1 data-story="${esc(s.id)}">${esc(s.headline)}</h1><p class="standfirst">${esc(text(s.summary))}</p>${art(s,true)}<div class="article-text">${s.paragraphs[lang].map(p=>`<p>${esc(p)}</p>`).join('')}</div><div class="boundary"><strong>${t('THE LINE WE WON’T CROSS','事实边界')}</strong>${esc(text(s.uncertainty))}</div><div id="read-end"></div><section class="sources"><h3>${t('Go to the evidence','查看原始证据')}</h3>${s.sources.map((x,i)=>`<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer" data-source="${i}">${String(i+1).padStart(2,'0')} &nbsp; ${esc(x.title)} ↗</a>`).join('')}</section><div class="reader-actions"><button id="share" class="primary">${t('Pass it on','分享故事')} ↗</button><button id="save">${t('Save story','收藏')}</button><button id="misleading">${t('Hook overpromised','标题言过其实')}</button><button id="see-hooks">${t('See the other 19 hooks','看看另外 19 个标题')}</button></div><div class="next">${art(next)}<div><small>${t('ONE MORE STRANGE THING','再看一件离奇事')}</small><button data-read="${esc(next.id)}">${esc(next.headline)}</button></div></div></article>`;
 $('#back').onclick=()=>navigate('stories');$('#see-hooks').onclick=()=>{selected=stories.findIndex(x=>x.id===s.id);navigate('lab');};bindReaders();
 // Direct and next-story entries are excluded from the feed headline experiment.
 document.querySelectorAll('[data-source]').forEach(a=>a.onclick=()=>signal(s,'source'));
 $('#save').onclick=()=>{const saved=JSON.parse(safeGet('isun1-saved')||'[]');if(!saved.includes(s.id))saved.push(s.id);safeSet('isun1-saved',JSON.stringify(saved));signal(s,'save');toast(t('Saved in this browser.','已收藏在此浏览器。'));};
 $('#misleading').onclick=()=>{signal(s,'misleading');toast(t('Recorded. A hook should repay the click.','已记录。标题必须兑现点击的承诺。'));};
 $('#share').onclick=async()=>{signal(s,'share_intent');const url=new URL(location.href);url.search='';url.hash='story/'+s.id;try{if(navigator.share){await navigator.share({title:s.headline,url:url.href});await signal(s,'share_handoff');}else{await navigator.clipboard.writeText(url.href);await signal(s,'copy_link');toast(t('Story link copied.','故事链接已复制。'));}}catch(e){if(e.name!=='AbortError')toast(t('Sharing unavailable. You can copy the address bar.','暂时无法分享，可复制浏览器地址。'));}};
 let active=0,lastInput=Date.now(),bottom=false,headlineVisible=false;
 const wake=()=>{lastInput=Date.now();};for(const name of ['pointerdown','keydown','scroll','touchstart'])window.addEventListener(name,wake,{passive:true});
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.target.id==='read-end')bottom=e.isIntersecting;else headlineVisible=e.isIntersecting&&e.intersectionRatio>=.6;}),{threshold:.6});observer.observe($('#read-end'));observer.observe($('[data-story]'));
 let hold=0;const timer=setInterval(()=>{if(document.hidden||Date.now()-lastInput>30000){hold=0;return;}if(!headlineVisible)hold=0;active+=250;if(headlineVisible){hold+=250;if(hold>=5000)signal(s,'hold5');}if(active>=15000){signal(s,'qualified').then(()=>{if(bottom)signal(s,'complete');});}},250);
 const resetReadStop=()=>{hold=0;};document.addEventListener('visibilitychange',resetReadStop);
 cleanup=()=>{document.removeEventListener('visibilitychange',resetReadStop);clearInterval(timer);observer.disconnect();for(const name of ['pointerdown','keydown','scroll','touchstart'])window.removeEventListener(name,wake);};
 window.scrollTo(0,0);
}
function renderLab(){
 const s=stories[selected]||stories[0];
 main.innerHTML=`<div class="eyebrow">${t('THE STORY ENGINE','故事引擎')}</div><h1 class="page-heading">${t('One event. Twenty ways in.','一个事件。二十个入口。')}</h1><p class="page-deck">${t('Same facts. Different tension. Two hooks meet readers; the rest wait their turn. These are editorial bets, not measured winners.','事实不变，张力不同。两个标题面对读者，其余等待下一轮。以下是编辑判断，不是实测赢家。')}</p><div class="toolbar">${stories.map((x,i)=>`<button data-select="${i}" class="${selected===i?'active':''}">${String(i+1).padStart(2,'0')} ${esc(x.category)}</button>`).join('')}</div><section class="lab-story"><div class="lab-heading">${art(s)}<h2>${esc(text(s.title))}</h2></div><p class="experiment-note">${esc(s.experiment.hypothesis)}<br>${t('Fixed 50/50 allocation. Review qualified reads per observed visitor.','固定 50/50 分配。比较每位实际曝光读者的有效阅读。')}</p><div class="hooks">${s.hooks.map((h,i)=>`<div class="hook"><span class="hook-num">${String(i+1).padStart(2,'0')}</span><div><h3>${esc(h[lang])}</h3><small class="${s.experiment.variants.includes(h.id)?'test':''}">${esc(h.angle)} · ${s.experiment.variants.includes(h.id)?t('IN THE TEST','测试中'):t('CANDIDATE','候选')} · ${t('Editorial','编辑分')} ${h.editorial_score}/100</small><button data-copy="${h.id}">${t('Copy','复制')}</button></div></div>`).join('')}</div></section><section class="drafts"><span class="draft-status">${t('READY TO ADAPT · NOT POSTED','待适配草稿 · 尚未发布')}</span><h3>${t('Same story. Native to the surface.','同一个故事，各有各的表达。')}</h3><div class="toolbar">${['x','linkedin','wechat','video'].map(p=>`<button data-platform="${p}" class="${platform===p?'active':''}">${{x:'X',linkedin:'LinkedIn',wechat:'WeChat 微信',video:'Short video'}[p]}</button>`).join('')}</div><pre id="draft-text">${esc(text(s.surfaces[platform]))}</pre><button id="copy-draft">${t('Copy draft','复制草稿')}</button></section>`;
 document.querySelectorAll('[data-select]').forEach(b=>b.onclick=()=>{selected=Number(b.dataset.select);renderLab();});document.querySelectorAll('[data-platform]').forEach(b=>b.onclick=()=>{platform=b.dataset.platform;renderLab();});
 document.querySelectorAll('[data-copy]').forEach(b=>b.onclick=()=>copy(s.hooks.find(h=>h.id===b.dataset.copy)[lang]));$('#copy-draft').onclick=()=>copy(text(s.surfaces[platform]));
}
async function copy(value){try{await navigator.clipboard.writeText(value);toast(t('Copied.','已复制。'));}catch{toast(t('Copy unavailable in this browser.','当前浏览器无法复制。'));}}
async function renderPulse(){
 main.innerHTML=`<div class="eyebrow">${t('OBSERVATIONS, NOT WISHFUL THINKING','看证据，不靠想象')}</div><h1 class="page-heading">${t('Did the story earn it?','这个故事，留住人了吗？')}</h1><p class="page-deck">${t('Clicks are the start. Reading, sharing intent and returning tell us whether the hook was worth it. No observations means unknown.','点击只是开始。阅读、分享意愿和回访，才能说明标题是否值得。没有观察数据，就保持未知。')}</p><div id="metrics" class="loading">${t('Reading the signals…','正在读取信号……')}</div>`;
 try{const r=await fetch(apiPath('/api/metrics'));if(!r.ok)throw Error();const data=await r.json();if(view!=='pulse')return;const variants=data.experiments.flatMap(x=>x.variants),n=variants.some(v=>v.impression===null)?null:variants.reduce((s,x)=>s+x.impression,0),q=variants.reduce((s,x)=>s+x.qualified,0),share=variants.reduce((s,x)=>s+x.share_intent,0);const pct=x=>x===null?'—':(x*100).toFixed(1)+'%';
 $('#metrics').className='';$('#metrics').innerHTML=`<div class="pulse-summary"><div class="stat"><strong>${n===null?'—':n}</strong><span>${t('Observed visitor × story units','读者 × 故事曝光单元')}</span></div><div class="stat"><strong>${pct(n?q/n:null)}</strong><span>${t('Qualified reads / impressions','有效阅读 / 曝光')}</span></div><div class="stat"><strong>${pct(n?share/n:null)}</strong><span>${t('Share intent / impressions','分享意愿 / 曝光')}</span></div><div class="stat"><strong>${pct(data.return_7d.rate)}</strong><span>${t('7-day return · mature cohorts','7 天回访 · 完整观察期')}</span></div></div><p class="page-deck">${t('Cohort','分组')}: ${esc(data.language)} / ${esc(data.channel)}. ${t('First measured exposure per visitor, story and experiment. Preview traffic excluded. Rates show — when the denominator is missing or the cohort is too small to publish.','每位读者、故事、实验只计算首次有效曝光。预览流量排除。没有分母时，比例显示 —。')}</p>${data.experiments.map(e=>`<section class="experiment"><h3>${esc(text(e.title||stories.find(s=>s.id===e.story_id)?.title))}${e.historical?' · '+t('Previous framing','此前版本'):''}</h3><p class="verdict">${e.decision.status==='UNKNOWN'?t('NO WINNER YET','尚无赢家'):t('CANDIDATE FOR REVIEW','待复核候选')} · ${esc(e.decision.reason)}</p><div class="table-wrap"><table><thead><tr><th>${t('Hook','标题')}</th><th>${t('Shown','曝光')}</th><th>5s</th><th>${t('Open','打开')}</th><th>${t('Read 15s','阅读 15 秒')}</th><th>${t('Share intent','分享意愿')}</th><th>${t('Overpromised','言过其实')}</th></tr></thead><tbody>${e.variants.map(v=>`<tr><td>${esc(v.headline)}</td><td>${v.impression===null?'—':v.impression}</td><td>${pct(v.rates.hold5)}</td><td>${pct(v.rates.open)}</td><td>${pct(v.rates.qualified)}</td><td>${pct(v.rates.share_intent)}</td><td>${v.misleading===null?'—':v.misleading}</td></tr>`).join('')}</tbody></table></div></section>`).join('')}<p class="page-deck">${t('Confirmed shares: unknown. Platform-native results remain separate until actual analytics are imported. Browser signals can be noisy or manipulated; they do not prove a person paid attention.','已确认分享：未知。外部平台的原生表现，需导入真实分析数据后单独判断。浏览器信号可能有噪声或被操纵，并不证明真实注意力。')}</p>`;
 }catch{if(view==='pulse')$('#metrics').innerHTML=`<div class="empty">${t('Signals are temporarily unavailable. This is unknown, not zero.','信号暂时无法读取。这是未知，不是零。')}</div>`;}
}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>navigate(b.dataset.view));
$('#language').onclick=()=>{activeReader=null;seenHeadlines.clear();lang=lang==='en'?'zh':'en';safeSet('isun1-language',lang);load();};
$('#about').onclick=e=>{e.preventDefault();$('#about-dialog').showModal();};$('.close').onclick=()=>$('#about-dialog').close();$('#privacy').onclick=()=>$('#about-dialog').showModal();
$('#allow').onclick=()=>{consent=true;safeSet('isun1-signals','yes');$('#consent').hidden=true;load();};$('#decline').onclick=()=>{safeSet('isun1-signals','no');$('#consent').hidden=true;};
$('#forget').onclick=async()=>{try{const r=await fetch('/api/forget',{method:'POST'});if(!r.ok)throw Error();consent=false;safeSet('isun1-signals','no');sent.clear();$('#about-dialog').close();load();toast(t('Signals off. This browser’s observations were deleted.','已关闭信号并删除此浏览器的观察记录。'));}catch{toast(t('Deletion failed. Please retry.','删除失败，请重试。'));}};
if(!safeGet('isun1-signals')&&!preview)$('#consent').hidden=false;
window.addEventListener('hashchange',renderRoute);load();
