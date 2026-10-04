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
