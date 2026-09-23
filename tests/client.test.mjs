// Run: node --test work/research/client-regression.test.mjs
// Or set ISUN1_ROOT to the actual checkout when integrating this test elsewhere.
// Executes the whole current app.js in a controlled browser-surface harness.
// It does not claim real-browser layout, scheduling, or permission validation.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';

const root=process.env.ISUN1_ROOT||fileURLToPath(new URL('../',import.meta.url));
const app=readFileSync(resolve(root,'public/app.js'),'utf8');
const packets=JSON.parse(readFileSync(resolve(root,'content/stories.json'),'utf8'));
const flush=()=>new Promise(r=>setImmediate(r));

async function browser({hidden=false,preview=false,direct=false,content=packets}={}) {
 const fixture=content.map((s,i)=>({...structuredClone(s),headline:s.hooks[0].en,ticket:`ticket-${i}`}));
 const nodes=new Map(),lists=new Map(),timers=new Map(),observers=[],listeners=new Map(),requests=[];
 let seq=0,now=1_800_000_000_000,hangSignals=false,shares=0;
 const element=(extra={})=>({dataset:{},classList:{add(){},remove(){}},setAttribute(){},close(){},showModal(){},...extra});
 const node=key=>{if(!nodes.has(key))nodes.set(key,element());return nodes.get(key);};
 const main=node('#main');let markup='';
 Object.defineProperty(main,'innerHTML',{get:()=>markup,set:value=>{
  markup=value;lists.clear();
  for(const attr of ['story','read','hide','source']) {
   const found=[...value.matchAll(new RegExp(`data-${attr}="([^"]+)"`,'g'))];
   lists.set(`[data-${attr}]`,found.map(m=>element({dataset:{[attr]:m[1]},closest:()=>element()})));
  }
 }});
 node('#read-end').id='read-end';
 const document={hidden,documentElement:{setAttribute(){}},querySelector:s=>s==='[data-story]'?(lists.get(s)||[])[0]:node(s),querySelectorAll:s=>lists.get(s)||[],addEventListener:(name,fn)=>add(name,fn),removeEventListener:(name,fn)=>remove(name,fn)};
 function add(name,fn){if(!listeners.has(name))listeners.set(name,new Set());listeners.get(name).add(fn);}
 function remove(name,fn){listeners.get(name)?.delete(fn);}
 const store=new Map([['isun1-signals','yes']]);
 const location={search:preview?'?preview=1':'',href:'https://example.test/'+(preview?'?preview=1':'')};
 let fragment=direct?'#story/'+fixture[0].id:'';
 Object.defineProperty(location,'hash',{get:()=>fragment,set:value=>{fragment=value?(value.startsWith('#')?value:'#'+value):'';}});
 const context=vm.createContext({console,URL,URLSearchParams,Map,Set,JSON,Promise,performance:{now:()=>now},Date:class extends Date{static now(){return now;}},
  document,location,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},
  window:{addEventListener:add,removeEventListener:remove,scrollTo(){}},
  navigator:{share:async()=>{shares++;},clipboard:{writeText:async()=>{}}},
  setInterval:fn=>{timers.set(++seq,fn);return seq;},clearInterval:id=>timers.delete(id),setTimeout:()=>++seq,
  IntersectionObserver:class{constructor(fn){this.fn=fn;this.targets=[];this.active=true;observers.push(this);}observe(el){this.targets.push(el);}disconnect(){this.active=false;}},
  fetch:async(url,options={})=>{
   if(url.startsWith('/api/feed'))return {ok:true,json:async()=>({stories:fixture})};
   if(url==='/api/signal'){requests.push(JSON.parse(options.body));if(hangSignals)return new Promise(()=>{});return {ok:true};}
   throw Error('Unexpected fetch '+url);
  }});
 vm.runInContext(app,context,{filename:resolve(root,'public/app.js')});await flush();
 const emit=(name)=>{for(const fn of listeners.get(name)||[])fn({type:name});};
 function intersect(id,ratio=1){for(const observer of observers.filter(o=>o.active)){const targets=observer.targets.filter(el=>el?.dataset.story===id);if(targets.length)observer.fn(targets.map(target=>({target,isIntersecting:ratio>0,intersectionRatio:ratio})));}}
 async function tick(count){for(let i=0;i<count;i++){now+=250;for(const fn of [...timers.values()])fn();}await flush();}
 async function clickFeed(index=0){const button=(lists.get('[data-read]')||[])[index];assert.ok(button?.onclick,'feed button should be bound');button.onclick();emit('hashchange');await flush();}
 return {fixture,requests,node,intersect,tick,clickFeed,emit,document,location,
  hidden(value){document.hidden=value;emit('visibilitychange');},
  advance(ms){now+=ms;},hang(){hangSignals=true;},shares:()=>shares,
  kinds:()=>requests.map(r=>r.kind),
  next:async()=>{const button=(lists.get('[data-read]')||[])[0];button.onclick();emit('hashchange');await flush();}
 };
}

test('direct hidden story landing cannot manufacture experimental exposure or open',async()=>{
 const b=await browser({hidden:true,direct:true});await b.tick(80);
 assert.deepEqual(b.requests,[]);
 b.hidden(false);b.intersect(b.fixture[0].id);await b.tick(80);
 assert.deepEqual(b.requests,[],'direct reading stays outside the headline experiment');
});

test('actual visible feed impression allows a fast attributed open',async()=>{
 const b=await browser();b.intersect(b.fixture[0].id);await b.clickFeed();
 assert.deepEqual(b.kinds(),['impression','open']);
});

test('next-story entry does not inherit the feed attribution',async()=>{
 const b=await browser();b.intersect(b.fixture[0].id);await b.clickFeed();await b.next();await b.tick(80);
 assert.equal(b.requests.some(r=>r.ticket===b.fixture[1].ticket),false);
});

test('preview suppresses client events even when a fixture deliberately supplies tickets',async()=>{
 const b=await browser({preview:true});b.intersect(b.fixture[0].id);await b.clickFeed();await b.tick(80);
 assert.deepEqual(b.requests,[]);
});

test('the masthead home link retains preview exclusion and referral context from a story',async()=>{
 const html=readFileSync(resolve(root,'public/index.html'),'utf8');
 const href=html.match(/<a\b[^>]*class="logo"[^>]*href="([^"]+)"/)[1];
 for(const query of ['?preview=1','?preview=1&utm_source=wechat','?utm_source=linkedin']){
  const before=new URL('https://example.test/'+query+'#story/'+packets[0].id);
  const destination=new URL(href,before);
  assert.equal(destination.search,before.search,'home must not silently leave preview or reclassify a referral');
  assert.equal(destination.hash,'','home returns to the feed');
  assert.equal(destination.origin,before.origin);
  if(destination.searchParams.get('preview')==='1'){
   const b=await browser({preview:true});b.intersect(b.fixture[0].id);await b.clickFeed();await b.tick(80);
   assert.deepEqual(b.requests,[],'stored opt-in must not turn preview navigation into reader signals');
  }
 }
});

test('five-second stop resets on hide even if all hidden timers are suspended',async()=>{
 const b=await browser();b.intersect(b.fixture[0].id);await b.tick(12);
 b.hidden(true);b.advance(25000);b.hidden(false);await b.tick(8);
 assert.equal(b.kinds().includes('hold5'),false,'3s before hiding plus 2s after is not a continuous stop');
 await b.tick(12);assert.equal(b.kinds().includes('hold5'),true);
});

test('headline seen while hidden becomes measurable when visible without another geometry callback',async()=>{
 const b=await browser({hidden:true});b.intersect(b.fixture[0].id);await b.tick(4);
 assert.equal(b.kinds().includes('impression'),false);
 b.hidden(false);await b.tick(4);
 assert.equal(b.kinds().includes('impression'),true);
});

test('scrolling a headline out resets its continuous stop',async()=>{
 const b=await browser();b.intersect(b.fixture[0].id);await b.tick(12);b.intersect(b.fixture[0].id,0);await b.tick(4);b.intersect(b.fixture[0].id);await b.tick(8);
 assert.equal(b.kinds().includes('hold5'),false);await b.tick(12);assert.equal(b.kinds().includes('hold5'),true);
});

test('a blocked analytics transport cannot block native sharing',async()=>{
 const b=await browser();b.intersect(b.fixture[0].id);await b.clickFeed();b.hang();b.node('#share').onclick();
 assert.equal(b.shares(),1,'native action must start in the click call');
});

test('hidden reader time cannot become qualified reading',async()=>{
 const b=await browser();b.intersect(b.fixture[0].id);await b.clickFeed();await b.tick(12);b.hidden(true);await b.tick(80);
 assert.equal(b.kinds().includes('qualified'),false);
});

test('partial article headline below the visibility threshold cannot earn a stop',async()=>{
 const b=await browser();b.intersect(b.fixture[0].id);await b.clickFeed();b.intersect(b.fixture[0].id,.1);await b.tick(20);
 assert.equal(b.kinds().includes('hold5'),false);
});

test('reader stop also resets while hidden timers are suspended',async()=>{
 const b=await browser();b.intersect(b.fixture[0].id);await b.clickFeed();b.intersect(b.fixture[0].id);await b.tick(12);
 b.hidden(true);b.advance(5000);b.hidden(false);await b.tick(8);
 assert.equal(b.kinds().includes('hold5'),false);await b.tick(12);assert.equal(b.kinds().includes('hold5'),true);
});


test('a rotated single-story edition carries its own art, count and real event date',async()=>{
 const story=structuredClone(packets.find(s=>s.id==='ff-robots-american-dream'));story.event_date='2026-09-19';
 const b=await browser({content:[story]});
 assert.match(b.node('#main').innerHTML,/1 STORY WORTH YOUR TIME/);
 assert.match(b.node('#main').innerHTML,/images\/robot.jpg/);
 assert.match(b.node('#main').innerHTML,/AI illustration/);
 assert.doesNotMatch(b.node('#main').innerHTML,/WHO<br>WATCHES|more-label|LAUNCH EDITION/);
 assert.match(b.node('#edition-date').textContent,/19 Sept 2026|19 Sep 2026/);
 b.node('#language').onclick();await flush();
 assert.match(b.node('#main').innerHTML,/1 个值得停下来的故事/);
 assert.match(b.node('#main').innerHTML,/images\/robot.jpg/);
 assert.match(b.node('#main').innerHTML,/AI 插画/);
});

test('leaving a reader restores the destination page title',async()=>{
 const b=await browser({direct:true});assert.equal(b.document.title,b.fixture[0].headline+' | iSun1.news');
 b.node('#back').onclick();assert.match(b.document.title,/The story inside the news/);
 b.location.hash='lab';b.emit('hashchange');assert.equal(b.document.title,'Hook Lab | iSun1.news');
});
