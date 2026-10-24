import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {loadOlympicsArchive,validateEditionContext} from '../scripts/olympics-bundle.mjs';
function ui(){const window={};vm.runInNewContext(readFileSync('public/olympics.js','utf8'),{window,URL,URLSearchParams});return window.iSunOlympics;}
test('new simple prompt context validates and renders in both languages without changing historical versions',async()=>{
 const data=loadOlympicsArchive(),context=structuredClone(data.context),originalContext=JSON.stringify(data.context),topic='starliner-61-fixes-2028',provider='claude';
 const main={innerHTML:'',classList:{add(){},remove(){}},addEventListener(){},removeEventListener(){}};
 const view=ui();
 for(const version of ['v1-labeled-fiction','v2-no-invented-scenes','v3-simple-explorer']){
  for(const language of ['english','chinese'])context.editions.find(row=>row.article_path===`articles/${topic}/${provider}/${language}.md`).prompt_version=version;
  assert.doesNotThrow(()=>validateEditionContext(context,data.articles));
  for(const lang of ['en','zh']){
   await view.render({main,data:{...data,context},lang,hash:`edition/${topic}/${provider}`});
   assert.ok(main.innerHTML.includes(lang==='en'?`Prompt ${version.slice(0,2)}:`:`提示词 ${version.slice(0,2)}：`));
   if(version==='v3-simple-explorer')assert.match(main.innerHTML,lang==='en'?/summary or conclusion first/:/摘要或结论先行/);
  }
 }
 context.editions[0].prompt_version='v4-unregistered';
 assert.throws(()=>validateEditionContext(context,data.articles),/context/);
 assert.equal(JSON.stringify(data.context),originalContext);
});
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

test('one text-only translation clarification is disclosed separately from historical interleaving',async()=>{
 const data=loadOlympicsArchive(),context=structuredClone(data.context),path='articles/starliner-61-fixes-2028/claude/english.md';
 context.editions.find(row=>row.article_path===path).input_deviation='text-only-clarification';
 assert.doesNotThrow(()=>validateEditionContext(context,data.articles));
 const bad=structuredClone(context);bad.editions.find(row=>row.article_path===path).input_deviation='invented-exception';
 assert.throws(()=>validateEditionContext(bad,data.articles),/context/);
 const main={innerHTML:'',classList:{add(){},remove(){}},addEventListener(){},removeEventListener(){}};
 await ui().render({main,data:{...data,context},lang:'en',hash:'edition/starliner-61-fixes-2028/claude'});
 assert.match(main.innerHTML,/one same-thread text-only translation clarification/);assert.doesNotMatch(main.innerHTML,/interleaved\/duplicated/);
 context.editions.find(row=>row.article_path==='articles/starliner-61-fixes-2028/claude/chinese.md').input_deviation='text-only-clarification';
 await ui().render({main,data:{...data,context},lang:'zh',hash:'edition/starliner-61-fixes-2028/claude'});
 assert.match(main.innerHTML,/一次纯文字翻译澄清/);assert.doesNotMatch(main.innerHTML,/发生交错/);
});


test('factual correction has its own bilingual context without relabeling historical translation clarifications',async()=>{
 const data=loadOlympicsArchive(),before=JSON.stringify(data.context),context=structuredClone(data.context);
 const topic='sony-1mm-5m-endoscope-sensor',path=`articles/${topic}/claude/english.md`;
 assert.equal(context.editions.find(row=>row.article_path===path).input_deviation,'factual-clarification');
 assert.doesNotThrow(()=>validateEditionContext(context,data.articles));
 const main={innerHTML:'',classList:{add(){},remove(){}},addEventListener(){},removeEventListener(){}};
 await ui().render({main,data:{...data,context},lang:'en',hash:`edition/${topic}/claude`});
 assert.match(main.innerHTML,/same writer supplied a complete factual correction/);
 assert.doesNotMatch(main.innerHTML,/generic text-AI refusal|translation clarification/);
 context.editions.find(row=>row.article_path===`articles/${topic}/claude/chinese.md`).input_deviation='factual-clarification';
 await ui().render({main,data:{...data,context},lang:'zh',hash:`edition/${topic}/claude`});
 assert.match(main.innerHTML,/原编辑在同一对话完整返回事实修订版/);
 assert.doesNotMatch(main.innerHTML,/文字AI的拒绝|纯文字翻译澄清/);
 assert.equal(JSON.stringify(data.context),before);
});
