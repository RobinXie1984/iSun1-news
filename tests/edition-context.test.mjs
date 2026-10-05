import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {loadOlympicsArchive,validateEditionContext} from '../scripts/olympics-bundle.mjs';
function ui(){const window={};vm.runInNewContext(readFileSync('public/olympics.js','utf8'),{window,URL,URLSearchParams});return window.iSunOlympics;}
test('all real archive originals expose three exact headline candidates and retain original bytes',()=>{
 const data=loadOlympicsArchive(),view=ui();
 assert.equal(data.context.editions.length,Object.keys(data.articles).length);
 for(const [path,raw] of Object.entries(data.articles)){
  const sha=createHash('sha256').update(raw).digest('hex');
  const headlines=view.preview(raw).headlines;
  assert.equal(headlines.length,3,path);assert.equal(new Set(headlines).size,3,path);
  view.displayMarkdown(raw);assert.equal(createHash('sha256').update(raw).digest('hex'),sha);
 }
});
test('vertical-bar style labels expose actual Chinese titles without splitting their internal colons',()=>{
 const view=ui(),data=loadOlympicsArchive();
 const raw=data.articles['articles/max-verstappen-first-win-october/chatgpt/chinese.md'];
 const expected=[
  '杆位失守，终局再起波澜：维斯塔潘何以破局雪邦？',
  '四冠在身，一胜久候：维斯塔潘终在雪邦写下今岁首捷',
  '先失其先，方夺其冠：维斯塔潘此胜，岂止一副软胎？'
 ];
 assert.deepEqual(Array.from(view.preview(raw).headlines),expected);
 assert.deepEqual(Array.from(view.preview(raw.replaceAll('｜','|')).headlines),expected);
 assert.deepEqual(Array.from(view.preview('其一｜悬念式：'+expected[0]+'\n标题二｜共鸣式：'+expected[1]+'\n标题三｜反常识式：'+expected[2]).headlines),expected);
 for(const title of expected)assert.ok(raw.includes(title));
 assert.equal(view.preview('以下是浪漫主义风格｜这是一段说明。\n\n比赛结果｜第一、第二、第三。\n\n共鸣，源自悬念｜这是一段正文。').headlines.length,0);
});
test('display removes leading UI only and preserves semantic markup with capture line paragraphs',()=>{
 const view=ui();assert.equal(view.displayText('Gemini said\n\nWriting\n\n# Title\n\nWriting matters.'),'# Title\n\nWriting matters.');
 assert.equal(view.displayText('The story begins.\nWriting\ncontinues.'),'The story begins.\nWriting\ncontinues.');
 const html=view.displayMarkdown('First paragraph.\nSecond paragraph.\n- a\n- b\n> quote\n> continued\n```\na\nb\n```');
 assert.match(html,/<p>First paragraph.<\/p>\n<p>Second paragraph.<\/p>/);assert.match(html,/<ul><li>a<\/li><li>b<\/li><\/ul>/);assert.match(html,/<blockquote>quote<br>continued<\/blockquote>/);assert.match(html,/<pre><code>a\nb<\/code><\/pre>/);
 assert.match(view.displayMarkdown('<img src=x onerror=alert(1)>'),/&lt;img/);
});
test('public context rejects private fields, invented coverage, duplicate and missing entries',()=>{
 const data=loadOlympicsArchive(),context=data.context;
 for(const changed of [
  {...context,conversation_url:'private'},
  {...context,editions:context.editions.map((r,i)=>i?r:{...r,conversation_url:'private'})},
  {...context,editions:context.editions.map((r,i)=>i?r:{...r,fact_check_status:'VERIFIED'})},
  {...context,editions:context.editions.slice(1)},
  {...context,editions:[...context.editions,context.editions[0]]}
 ])assert.throws(()=>validateEditionContext(changed,data.articles),/context/);
});
test('render shows capture context, unknown coverage and all three card headlines without measurements',async()=>{
 const data=loadOlympicsArchive(),view=ui();const main={innerHTML:'',classList:{add(){},remove(){}},addEventListener(){},removeEventListener(){}};
 await view.render({main,data,hash:'olympics/mark-zuckerberg-cj-desai-322-days'});
 const expected=view.preview(data.articles['articles/mark-zuckerberg-cj-desai-322-days/claude/english.md']).headlines;
 assert.equal((main.innerHTML.match(/<li>/g)||[]).length,18);for(const h of expected)assert.ok(main.innerHTML.includes(h.replace(/&/g,'&amp;').replace(/'/g,'&#39;').replace(/"/g,'&quot;')));
 await view.render({main,data,hash:'edition/starliner-61-fixes-2028/claude'});
 assert.match(main.innerHTML,/interleaved\/duplicated/);assert.match(main.innerHTML,/coverage UNKNOWN/);assert.match(main.innerHTML,/capture time, not generation time/);assert.doesNotMatch(main.innerHTML,/claude.ai\/chat/);
});
