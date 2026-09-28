import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync,mkdtempSync,rmSync,unlinkSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {tmpdir} from 'node:os';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
import {loadOlympics,validateOlympicsMedia,mediaSourceURL} from '../scripts/olympics-bundle.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const archive=resolve(root,'content/model-olympics/2026-09-28');
const catalog=JSON.parse(readFileSync(join(archive,'catalog.json'),'utf8'));
const row=catalog.articles.find(row=>row.status==='available'&&row.language==='en');
const item=(patch={})=>({kind:'image',origin:'source',title:'A sourced photograph',source_url:'https://www.nasa.gov/example/',asset_path:'/edition-media/example.jpg',credit:'NASA',availability_note:null,...patch});
const media=(items=[item()])=>({schema_version:1,editions:[{topic:row.topic,provider:row.provider,language:row.language,items}]});

function fixture(t){
 const base=mkdtempSync(join(tmpdir(),'isun-olympics-media-'));t.after(()=>rmSync(base,{recursive:true,force:true}));
 const names=new Set(['catalog.json',...catalog.articles.map(row=>row.source_brief),...catalog.articles.filter(row=>row.status==='available').map(row=>row.article_path)]),sums=new Map();
 for(const name of names){const bytes=readFileSync(join(archive,name));mkdirSync(dirname(join(base,name)),{recursive:true});writeFileSync(join(base,name),bytes);sums.set(name,createHash('sha256').update(bytes).digest('hex'));}
 const seal=()=>writeFileSync(join(base,'SHA256SUMS'),[...sums].map(([name,hash])=>hash+'  '+name).join('\n')+'\n');seal();
 return {base,writeMedia(value){const bytes=JSON.stringify(value);writeFileSync(join(base,'media.json'),bytes);sums.set('media.json',createHash('sha256').update(bytes).digest('hex'));seal();}};
}

function browser(){
 let network=0;
 const window={location:{hash:''}};
 const context=vm.createContext({window,URL,URLSearchParams,console,fetch(){network++;throw Error('No media network requests expected');}});
 vm.runInContext(readFileSync(resolve(root,'public/olympics.js'),'utf8'),context,{filename:'public/olympics.js'});
 const clicks=[],scrolls=[];
 const main={innerHTML:'',classList:{add(){},remove(){}},addEventListener(name,fn){if(name==='click')clicks.push(fn);},removeEventListener(name,fn){const i=clicks.indexOf(fn);if(i>=0)clicks.splice(i,1);},querySelector(selector){return selector==='[data-op-media-gallery]'?{scrollIntoView:options=>scrolls.push(options)}:null;},contains(){return true;}};
 const raw='# Original heading\n\nOriginal paragraph. No inserted media markup.\n';
 const data={catalog:{articles:[row]},articles:{[row.article_path]:raw},briefs:{[row.source_brief]:'# Original brief'}};
 const stories=[{id:row.topic,title:{en:'Fixture story',zh:'测试故事'},summary:{en:'Fixture summary',zh:'测试摘要'},event_date:row.event_date}];
 return {window,main,data,raw,clicks,scrolls,get network(){return network;},async render(hash='edition/'+row.topic+'/'+row.provider,lang='en'){await window.iSunOlympics.render({main,data,stories,hash,lang});return main.innerHTML;}};
}

test('an optional sidecar is backward compatible and exact originals remain unchanged',t=>{
 const f=fixture(t),before=loadOlympics(f.base);assert.equal(Object.hasOwn(before,'media'),false);
 const sidecar=media([item(),item({kind:'video',asset_path:'/edition-media/example.mp4',source_url:'https://www.nasa.gov/video/'}),item({asset_path:null,source_url:'https://www.nasa.gov/other/',availability_note:'Only the source link was preserved.'})]);
 f.writeMedia(sidecar);const after=loadOlympics(f.base);
 assert.deepEqual(after.media,sidecar);assert.deepEqual(after.articles,before.articles);assert.deepEqual(after.briefs,before.briefs);
});

test('missing, changed or unsealed media sidecars fail closed',t=>{
 const f=fixture(t);writeFileSync(join(f.base,'media.json'),JSON.stringify(media()));assert.throws(()=>loadOlympics(f.base),/checksum mismatch/);
 f.writeMedia(media());writeFileSync(join(f.base,'media.json'),'{}');assert.throws(()=>loadOlympics(f.base),/checksum mismatch/);
 unlinkSync(join(f.base,'media.json'));assert.throws(()=>loadOlympics(f.base),/ENOENT/);
});

test('strict media schema binds unique records to an available edition',()=>{
 const cases=[null,[],{...media(),extra:'private'}, {...media(),schema_version:2}];
 for(const patch of [{topic:'unlisted-topic'},{topic:[row.topic]},{provider:[row.provider]},{provider:'invented'},{language:'de'},{items:{}},{extra:'private'}]){const value=media();Object.assign(value.editions[0],patch);cases.push(value);}
 const duplicate=media();duplicate.editions.push(structuredClone(duplicate.editions[0]));cases.push(duplicate);
 const missing=catalog.articles.find(row=>row.status==='UNKNOWN');const unavailable=media();Object.assign(unavailable.editions[0],{topic:missing.topic,provider:missing.provider,language:missing.language});cases.push(unavailable);
 for(const patch of [{origin:'generated'},{kind:'iframe'},{title:''},{credit:null},{availability_note:42},{extra:'private'}])cases.push(media([item(patch)]));
 const absent=media();delete absent.editions[0].items[0].credit;cases.push(absent);cases.push(media([item(),item()]));
 for(const value of cases)assert.throws(()=>validateOlympicsMedia(value,catalog),/Invalid|Media must|Duplicate/);
});

const unsafeURLs=[
 'javascript:alert(1)','data:image/svg+xml,<svg onload=alert(1)>','http://www.nasa.gov/a','//www.nasa.gov/a',
 'https://user:password@example.com/a','https://2130706433/a','https://0x7f000001/a','https://127.1/a',
 'https://[::ffff:127.0.0.1]/a','https://[fc00::1]/a','https://LOCALHOST./a','https://news.local/a','https://printer/a','https://news.internal/a',
 'https://www.nasa.gov/%3Fdummy=x?token=secret','https://www.nasa.gov/%23ignore?key=secret','https://www.nasa.gov/%3Fdummy=x?%2574oken=secret',
 'https://example.com/a?token=secret','https://example.com/a?%2574oken=secret','https://example.com/a#access_token=secret',
 'https://example.com/a?X-Amz-Signature=secret','https://example.com/a?key=secret','https://example.com/'+ 'ghp_'+'a'.repeat(36),
 'https://chatgpt.com/c/private','https://gemini.google.com/app/private','https://grok.com/c/private','https://drive.google.com/file/d/private','https://x.com/i/grok/share/private'
];
test('public source links reject executable, private and credential-bearing URLs',()=>{
 for(const source_url of unsafeURLs){assert.equal(mediaSourceURL(source_url),null,source_url);assert.throws(()=>validateOlympicsMedia(media([item({source_url})]),catalog),/Invalid source media item/);}
 for(const url of ['https://www.nasa.gov/a?utm_source=example#image','https://www.microsoft.com/en-us/security/blog/','https://x.com/NASA/status/123'])assert.equal(mediaSourceURL(url),url);
});

test('local paths reject traversal, external resources and kind-extension mismatch',()=>{
 for(const asset_path of ['/edition-media/../secret.jpg','//example.com/a.jpg','/edition-media/a.jpg?x=1','/edition-media/a.jpg#x','/edition-media/a.svg','/edition-media/A.jpg','/edition-media/a.mp4','https://example.com/a.jpg','/edition-media/%61.jpg'])assert.throws(()=>validateOlympicsMedia(media([item({asset_path})]),catalog),/Invalid media asset path/);
 assert.throws(()=>validateOlympicsMedia(media([item({kind:'video',asset_path:'/edition-media/a.png'})]),catalog),/Invalid media asset path/);
});

test('reader keeps article intact and renders local lazy images, controlled video and source-only cards',async()=>{
 const b=browser();b.data.media=media([item(),item({kind:'video',asset_path:'/edition-media/example.mp4',source_url:'https://www.nasa.gov/video/'}),item({asset_path:null,source_url:'https://www.nasa.gov/other/',availability_note:'Only the link was captured.'})]);
 const html=await b.render();
 assert.ok(html.includes('<article class="op-prose" lang="en">'+b.window.iSunOlympics.markdown(b.raw)+'</article>'));
 assert.equal(b.data.articles[row.article_path],b.raw);assert.ok(html.indexOf('op-media"')>html.indexOf('</article>'));
 assert.match(html,/<img src="\/edition-media\/example.jpg"[^>]+loading="lazy"/);
 assert.match(html,/<video src="\/edition-media\/example.mp4" controls preload="none" playsinline/);
 assert.doesNotMatch(html,/autoplay|<iframe|<source|src="https?:/);
 assert.match(html,/Image at source ↗/);assert.match(html,/Only the link was captured\./);assert.match(html,/rel="noopener noreferrer"/);
 assert.equal(b.network,0);assert.match(html,/Photos & video \(3\)/);assert.match(html,/data-op-media-gallery id="op-media-/);
 let prevented=false;const button={};for(const click of b.clicks)click({target:{closest:selector=>selector==='[data-op-media-scroll]'?button:null},preventDefault(){prevented=true;}});
 assert.equal(prevented,true);assert.equal(b.scrolls.length,1);assert.equal(b.scrolls[0].behavior,'auto');assert.equal(b.scrolls[0].block,'start');assert.equal(b.window.location.hash,'');
});

test('unsafe injected media is omitted and captions remain inert escaped text',async()=>{
 const b=browser(),attack='\"><img src=x onerror=alert(1)><script>alert(2)</script>';
 b.data.media=media([item({title:attack,credit:attack,availability_note:attack}),...unsafeURLs.map(source_url=>item({source_url})),item({asset_path:'/edition-media/a.jpg" onload="alert(1)'}),item({origin:'generated'})]);
 const html=await b.render();assert.match(html,/&lt;script&gt;alert\(2\)&lt;\/script&gt;/);assert.doesNotMatch(html,/<script|<img src=x|src="https?:|href="javascript:|onload="/);
 assert.equal((html.match(/class="op-media-item"/g)||[]).length,1);assert.equal(b.network,0);
});

test('card badges count the current edition only and absent media stays absent',async()=>{
 const b=browser();assert.doesNotMatch(await b.render('olympics/'+row.topic),/op-media-badge/);
 b.data.media=media([item(),item({asset_path:null,source_url:'https://www.nasa.gov/other/'})]);
 assert.match(await b.render('olympics/'+row.topic),/2 sourced media items/);
 assert.doesNotMatch(await b.render('olympics/'+row.topic,'zh'),/op-media-badge/);
 b.data.media.editions[0].provider='qwen';assert.doesNotMatch(await b.render('olympics/'+row.topic),/op-media-badge/);
 b.data.media.editions[0].provider=row.provider;b.data.media.editions.push(structuredClone(b.data.media.editions[0]));assert.doesNotMatch(await b.render(),/class="op-media"/);
});
