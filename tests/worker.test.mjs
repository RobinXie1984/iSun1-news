import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {assignVariant} from '../src/engine.mjs';
import worker from '../dist/server/index.js';import {createDB} from '../scripts/sqlite-adapter.mjs';
const origin='https://example.test';
const get=(path,cookie)=>new Request(origin+path,{headers:cookie?{Cookie:cookie}:{}});
// Load alternate content snapshots into the actual Worker without rebuilding dist.
async function sourceWorker(stories,history=[]){
  const source=readFileSync(new URL('../src/worker.mjs',import.meta.url),'utf8').replace("'./engine.mjs'",JSON.stringify(new URL('../src/engine.mjs',import.meta.url).href));
  const code=`const STORIES=${JSON.stringify(stories)};const HISTORY=${JSON.stringify(history)};const ASSETS={};\n${source}`;
  return (await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'))).default;
}
async function cohort(){const DB=createDB();const r=await worker.fetch(get('/api/feed?measure=1'),{DB});const cookie=r.headers.get('set-cookie').split(';')[0];const feed=await r.json();return {DB,cookie,feed};}
async function send(c,kind,extra={}){return worker.fetch(new Request(origin+'/api/signal',{method:'POST',headers:{Origin:origin,Cookie:c.cookie,'Content-Type':'application/json',...extra.headers},body:JSON.stringify({ticket:c.feed.stories[0].ticket,kind,...extra.body})}),{DB:c.DB});}
test('preview and no-consent requests create no measurements or tracking cookie',async()=>{const DB=createDB();for(const path of ['/api/feed?preview=1&measure=1','/api/feed']){const r=await worker.fetch(get(path),{DB});assert.equal(r.headers.get('set-cookie'),null);assert.equal((await r.json()).stories[0].ticket,null);}assert.equal(DB.raw.prepare('SELECT COUNT(*) AS n FROM exposures').get().n,0);DB.raw.close();});
test('refresh retains tickets; assignment alone is not an impression',async()=>{const c=await cohort();const r=await worker.fetch(get('/api/feed?measure=1',c.cookie),{DB:c.DB});assert.equal((await r.json()).stories[0].ticket,c.feed.stories[0].ticket);const m=await(await worker.fetch(get('/api/metrics'),{DB:c.DB})).json();assert.equal(m.experiments[0].variants.reduce((n,v)=>n+v.impression,0),0);assert.equal(m.return_7d.rate,null);c.DB.raw.close();});
test('fast opens count; duplicate retries do not; early hold does not count',async()=>{const c=await cohort();assert.equal((await send(c,'open')).status,409);await send(c,'impression');assert.equal((await send(c,'open')).status,200);await send(c,'open');assert.equal((await send(c,'hold5')).status,409);assert.equal((await send(c,'qualified')).status,409);assert.equal(c.DB.raw.prepare("SELECT COUNT(*) AS n FROM signals WHERE kind='open'").get().n,1);c.DB.raw.close();});
test('cross-origin writes, invented variants and malformed payloads are rejected',async()=>{const c=await cohort();assert.equal((await send(c,'impression',{headers:{Origin:'https://attacker.test'}})).status,403);assert.equal((await send(c,'impression',{body:{hook_id:'forged'}})).status,400);assert.equal((await send(c,'madeup')).status,400);assert.equal((await send(c,'impression',{body:{ticket:'x'.repeat(3000)}})).status,400);assert.equal((await send(c,'impression',{headers:{Cookie:'isun1_v=aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'}})).status,400);c.DB.raw.close();});
test('qualified read and completion have ordered prerequisites',async()=>{const c=await cohort();await send(c,'impression');await send(c,'open');c.DB.raw.prepare('UPDATE signals SET created_at=created_at-20000').run();assert.equal((await send(c,'complete')).status,409);assert.equal((await send(c,'qualified')).status,200);assert.equal((await send(c,'complete')).status,200);const m=await(await worker.fetch(get('/api/metrics'),{DB:c.DB})).json();assert.equal(m.experiments[0].suppressed,true);assert.equal(m.experiments[0].variants[0].qualified,null);assert.equal(c.DB.raw.prepare("SELECT COUNT(*) AS n FROM signals WHERE kind='qualified'").get().n,1);assert.equal(m.experiments[0].decision.status,'UNKNOWN');c.DB.raw.close();});
test('forget deletes only this browser observations and clears cookie',async()=>{const c=await cohort();await send(c,'impression');const r=await worker.fetch(new Request(origin+'/api/forget',{method:'POST',headers:{Origin:origin,Cookie:c.cookie}}),{DB:c.DB});assert.equal(r.status,200);assert.match(r.headers.get('set-cookie'),/Max-Age=0/);assert.equal(c.DB.raw.prepare('SELECT COUNT(*) AS n FROM signals').get().n,0);assert.equal(c.DB.raw.prepare('SELECT COUNT(*) AS n FROM exposures').get().n,0);c.DB.raw.close();});

test('reordered variants keep the hook and headline assigned to an existing ticket',async()=>{
  const stories=JSON.parse(readFileSync(new URL('../content/stories.json',import.meta.url),'utf8'));
  const original=await sourceWorker(stories),DB=createDB();
  try{
    const first=await original.fetch(get('/api/feed?measure=1'),{DB});assert.equal(first.status,200);
    const cookie=first.headers.get('set-cookie').split(';')[0],before=(await first.json()).stories[0];
    const changed=structuredClone(stories);changed[0].experiment.variants.reverse();
    const revised=await sourceWorker(changed),response=await revised.fetch(get('/api/feed?measure=1',cookie),{DB});
    assert.equal(response.status,200);const after=(await response.json()).stories[0];
    assert.equal(after.ticket,before.ticket);assert.equal(after.selected_hook,before.selected_hook);assert.equal(after.headline,before.headline);
    assert.equal(after.selected_hook,DB.raw.prepare('SELECT hook_id FROM exposures WHERE id=?').get(after.ticket).hook_id);
  }finally{DB.raw.close();}
});

test('an existing ticket fails closed when its assigned hook disappears',async()=>{
  const stories=JSON.parse(readFileSync(new URL('../content/stories.json',import.meta.url),'utf8'));
  const original=await sourceWorker(stories),DB=createDB();
  try{
    const first=await original.fetch(get('/api/feed?measure=1'),{DB});assert.equal(first.status,200);
    const cookie=first.headers.get('set-cookie').split(';')[0],before=(await first.json()).stories[0];
    const changed=structuredClone(stories);changed[0].hooks=changed[0].hooks.filter(h=>h.id!==before.selected_hook);
    changed[0].experiment.variants=changed[0].hooks.slice(0,2).map(h=>h.id);
    const revised=await sourceWorker(changed),response=await revised.fetch(get('/api/feed?measure=1',cookie),{DB});
    assert.equal(response.status,503);assert.deepEqual(await response.json(),{error:'experiment_configuration_mismatch'});
    assert.equal(DB.raw.prepare('SELECT hook_id FROM exposures WHERE id=?').get(before.ticket).hook_id,before.selected_hook);
  }finally{DB.raw.close();}
});

test('editorial preview always selects the first variant without changing ordinary allocation',async()=>{
  const stories=JSON.parse(readFileSync(new URL('../content/story-history.json',import.meta.url),'utf8'));
  const runtime=await sourceWorker(stories),chosen=new Set();
  for(let i=0;i<16;i++){
    const visitor=`00000000-0000-4000-8000-${String(i).padStart(12,'0')}`,cookie='isun1_v='+visitor;
    const response=await runtime.fetch(get('/api/feed?preview=1&measure=1',cookie),{});
    assert.equal(response.status,200);assert.equal(response.headers.get('set-cookie'),null);
    const preview=await response.json();
    for(const story of preview.stories){assert.equal(story.selected_hook,story.experiment.variants[0]);assert.equal(story.ticket,null);}
    const ordinary=await(await runtime.fetch(get('/api/feed',cookie),{})).json();
    assert.equal(ordinary.stories[0].selected_hook,assignVariant(visitor,stories[0].experiment));chosen.add(ordinary.stories[0].selected_hook);
  }
  assert.equal(chosen.size,2);
});

test('a new experiment on the same story preserves measured history and its original headlines',async()=>{
  const history=JSON.parse(readFileSync(new URL('../content/story-history.json',import.meta.url),'utf8'));
  const current=structuredClone(history);
  for(const story of current){story.experiment.id+='-revision-v2';story.title.en='Revised '+story.title.en;for(const hook of story.hooks)hook.en='Revised '+hook.en;}
  const original=await sourceWorker(history),revised=await sourceWorker(current,history),DB=createDB();
  try{
    // Two measured historical arms; other archived experiments have no observations.
    const old=history[0];let seq=0;
    for(const hook of old.experiment.variants)for(let i=0;i<10;i++){
      const id=`historical-${seq++}`,visitor=`00000000-0000-4000-8000-${String(seq).padStart(12,'0')}`,now=Date.now();
      DB.raw.prepare('INSERT INTO exposures VALUES (?,?,?,?,?,?,?,?,?)').run(id,visitor,'old-session',old.id,old.experiment.id,hook,'en','direct',now);
      DB.raw.prepare('INSERT INTO signals VALUES (?,?,?)').run(id,'impression',now);
      if(i<3){DB.raw.prepare('INSERT INTO signals VALUES (?,?,?)').run(id,'open',now);DB.raw.prepare('INSERT INTO signals VALUES (?,?,?)').run(id,'qualified',now+15000);}
    }
    const before=await(await original.fetch(get('/api/metrics'),{DB})).json();
    const response=await revised.fetch(get('/api/metrics'),{DB});assert.equal(response.status,200);const after=await response.json();
    const prior=before.experiments.find(e=>e.experiment_id===old.experiment.id),archived=after.experiments.find(e=>e.experiment_id===old.experiment.id);
    assert.ok(archived);assert.equal(archived.historical,true);assert.equal(archived.story_id,current[0].id);assert.deepEqual(archived.title,old.title);
    assert.deepEqual(archived.variants,prior.variants);assert.deepEqual(archived.variants.map(v=>v.impression),[10,10]);
    assert.deepEqual(archived.variants.map(v=>v.headline),old.experiment.variants.map(id=>old.hooks.find(h=>h.id===id).en));
    assert.equal(after.experiments.length,current.length+1,'unmeasured archived experiments stay out of Pulse');
    assert.ok(after.experiments.filter(e=>!e.historical).every(e=>e.variants.every(v=>v.impression===0)));
    const otherChannel=await(await revised.fetch(get('/api/metrics?utm_source=x'),{DB})).json();assert.equal(otherChannel.experiments.length,current.length);
    const feed=await(await revised.fetch(get('/api/feed?preview=1'),{})).json();
    assert.deepEqual(feed.stories.map(s=>s.experiment.id),current.map(s=>s.experiment.id));assert.equal(feed.stories.length,current.length);
  }finally{DB.raw.close();}
});
