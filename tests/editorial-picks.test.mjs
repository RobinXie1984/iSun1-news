import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {loadOlympicsArchive,validateEditorialPicks} from '../scripts/olympics-bundle.mjs';
function ui(){const window={};vm.runInNewContext(readFileSync('public/olympics.js','utf8'),{window,URL,URLSearchParams,fetch(){throw Error('No signals or network in editorial render');}});return window.iSunOlympics;}
test('numbered literary options retain their headlines without mistaking ordinary prose for labels',()=>{
 const view=ui(),root='content/model-olympics/2026-10-07/articles/';
 const ellison=readFileSync(root+'david-ellison-warner-81-billion-close/chatgpt/chinese.md','utf8');
 const halzen=readFileSync(root+'francis-halzen-cubic-kilometre-nobel/chatgpt/chinese.md','utf8');
 assert.equal(view.preview(ellison).headlines.length,3);
 assert.equal(view.preview(ellison).headlines[1],'买尽银屏灯火，买得几许新梦？');
 assert.equal(view.preview(halzen).headlines.length,3);
 assert.equal(view.preview(halzen).headlines[1],'一人桂冠，众手星桥：冰原深处有知音');
 const qwen=readFileSync(root+'francis-halzen-cubic-kilometre-nobel/qwen/chinese.md','utf8');
 assert.equal(view.preview(qwen).headlines.length,3);
 assert.equal(view.preview(qwen).headlines[0],'幽冥冰鉴：万丈玄渊寻魅录');
 assert.equal(view.preview('普通正文谈寄情与反思。\n以下是浪漫主义的文章。').headlines.length,0);
});
test('traditional Chinese suspense labels remain exact original headline options',()=>{
 const raw=readFileSync('content/model-olympics/2026-10-08/articles/kagan-soai-molecular-mirror-nobel/grok/chinese.md','utf8');
 assert.equal(ui().preview(raw).headlines.length,3);
 assert.equal(ui().preview(raw).headlines[0],'鏡像未平，偏性自生——二士何以分得諾貝爾之殊');
});
const data=loadOlympicsArchive();
test('every topic has two selected exact original editions, with independent language choices',()=>{
 assert.equal(data.picks.entries.length,data.topics.length*2);
 for(const pick of data.picks.entries){assert.equal(createHash('sha256').update(data.articles[pick.article_path]).digest('hex'),pick.sha256);assert.equal(ui().preview(data.articles[pick.article_path]).headlines[pick.headline_index],pick.headline);}
 assert.ok(data.topics.some(topic=>new Set(data.picks.entries.filter(p=>p.topic===topic.id).map(p=>p.provider)).size===2));
 assert.equal(data.catalog.unavailable_count,0);assert.equal(data.catalog.available_count,data.topics.length*12);
});
test('editorial metadata rejects fabricated headlines, stale bytes, wrong language and private fields',()=>{
 for(const changed of [
  {...data.picks,conversation_url:'private'},
  {...data.picks,entries:data.picks.entries.slice(1)},
  {...data.picks,entries:data.picks.entries.map((p,i)=>i?p:{...p,headline:'An invented headline'})},
  {...data.picks,entries:data.picks.entries.map((p,i)=>i?p:{...p,sha256:'0'.repeat(64)})},
  {...data.picks,entries:data.picks.entries.map((p,i)=>i?p:{...p,language:'zh'})},
  {...data.picks,entries:data.picks.entries.map((p,i)=>i?p:{...p,provider:'missing'})},
  {...data.picks,entries:data.picks.entries.map((p,i)=>i?p:{...p,private_path:'/private/capture'})},
  {...data.picks,entries:data.picks.entries.map((p,i)=>i?p:data.picks.entries[1])}
 ])assert.throws(()=>validateEditorialPicks(changed,data),/editorial|Editorial/);
});
test('selected Stories lists every dated topic, changes language, keeps all six originals and notes',async()=>{
 const view=ui(),main={innerHTML:'',classList:{add(){},remove(){}},addEventListener(){},removeEventListener(){}};
 const stories=JSON.parse(readFileSync('content/stories.json','utf8'));
 for(const lang of ['en','zh']){
  await view.render({main,data,stories,lang,hash:'stories'});
  assert.equal((main.innerHTML.match(/data-op-story=/g)||[]).length,data.topics.length);
  for(const topic of data.topics)assert.ok(main.innerHTML.includes('#story/'+topic.id));
  if(lang==='en')assert.match(main.innerHTML,/The call came at 12:27 a.m. Pacific time. Karl Deisseroth missed it./);
  const topic='elon-musk-tesla-486532',pick=data.picks.entries.find(p=>p.topic===topic&&p.language===lang);
  await view.render({main,data,stories,lang,hash:'story/'+topic});
  assert.match(main.innerHTML,/MAXWELL/);assert.ok(main.innerHTML.includes(pick.article_path.replaceAll('/','%2F')));assert.match(main.innerHTML,/data-op-context/);
  assert.equal((main.innerHTML.match(/class="op-provider-link/g)||[]).length,12);
  await view.render({main,data,stories,lang,hash:'olympics/'+topic});
  assert.equal((main.innerHTML.match(/class="op-voice"/g)||[]).length,6);assert.equal((main.innerHTML.match(/op-pick-badge/g)||[]).length,1);assert.match(main.innerHTML,/#story\/elon-musk-tesla-486532/);
 }
});
test('italic option wrappers and recognized sandbox UI disappear only in presentation',()=>{
 const view=ui(),raw=data.articles['articles/mars-rocks-three-water-stories/claude/english.md'];
 assert.equal(view.preview(raw).headlines[0],'NASA Went Looking for a Lakeshore on Mars. The Rocks Had a Different Secret.');
 const roman=data.articles['articles/roman-cosmic-blind-spot/chatgpt/english.md'];assert.match(roman,/^:chatgpt-content-reference/);assert.doesNotMatch(view.displayText(roman),/sandbox:/);
 assert.equal(view.displayText('A story mentions sandbox:/files here.'),'A story mentions sandbox:/files here.');
});
