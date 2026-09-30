import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync,mkdtempSync,cpSync,rmSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import vm from 'node:vm';
import {loadOlympics,loadOlympicsArchive} from '../scripts/olympics-bundle.mjs';

function fixture(t){
 const root=mkdtempSync(join(tmpdir(),'isun-dated-'));t.after(()=>rmSync(root,{recursive:true,force:true}));
 cpSync('content/model-olympics/2026-09-28',join(root,'2026-09-28'),{recursive:true});
 const topic='new-fixture-story',date='2026-09-30',base=join(root,date),files=new Map();
 const rows=['chatgpt','claude','gemini','grok','deepseek','qwen'].flatMap(provider=>['en','zh'].map(language=>({provider,model:'Synthetic test fixture',language,topic,event_date:'2026-09-29',source_brief:'briefs/'+topic+'.md',article_path:provider==='qwen'?'articles/'+topic+'/'+provider+'/'+(language==='en'?'english':'chinese')+'.md':null,status:provider==='qwen'?'available':'UNKNOWN',availability_note:provider==='qwen'?null:'Test fixture only; no real submission.'})));
 const catalog={schema_version:1,generated_at:'2026-09-30T00:00:00Z',description:'Synthetic test fixture',available_count:2,unavailable_count:10,articles:rows};
 const metadata={schema_version:1,topics:[{id:topic,title:{en:'New fixture title',zh:'新测试标题'},summary:{en:'A distinct new topic.',zh:'一个独立的新主题。'},event_date:'2026-09-29'}]};
 const write=(name,value)=>{const text=typeof value==='string'?value:JSON.stringify(value);files.set(name,text);mkdirSync(dirname(join(base,name)),{recursive:true});writeFileSync(join(base,name),text);writeFileSync(join(base,'SHA256SUMS'),[...files].map(([path,data])=>createHash('sha256').update(data).digest('hex')+'  '+path).join('\n')+'\n');};
 write('catalog.json',catalog);write('topics.json',metadata);write('briefs/'+topic+'.md','# Synthetic brief\n');
 for(const row of rows.filter(row=>row.status==='available'))write(row.article_path,'# Synthetic '+row.language+' original\n\nExact original fixture prose.\n');
 return {root,base,topic,date,catalog,metadata,write};
}
function browser(){
 const window={location:{hash:''}};
 vm.runInNewContext(readFileSync('public/olympics.js','utf8'),{window,URL,URLSearchParams,fetch(){throw Error('Fixture must not access network');}});
 const main={innerHTML:'',classList:{add(){},remove(){}},addEventListener(){},removeEventListener(){},contains(){return true;}};
 return {main,render:async(data,hash='olympics',lang='en')=>{await window.iSunOlympics.render({main,data,hash,lang,stories:JSON.parse(readFileSync('content/stories.json','utf8'))});return main.innerHTML;}};
}

test('dated batches append topics and keep every legacy original, supplement and media exact',t=>{
 const f=fixture(t),old=loadOlympics(),data=loadOlympicsArchive(f.root);
 assert.deepEqual(data.batches.map(batch=>batch.date),['2026-09-30','2026-09-28']);
 assert.equal(data.catalog.articles.length,84);assert.equal(data.catalog.available_count,74);assert.equal(data.catalog.unavailable_count,10);
 for(const [path,text] of Object.entries(old.articles))assert.equal(data.articles[path],text);
 for(const [path,text] of Object.entries(old.briefs))assert.equal(data.briefs[path],text);
 assert.deepEqual(data.supplements,old.supplements);assert.deepEqual(data.media,old.media);
 assert.equal(data.topics.find(topic=>topic.id===f.topic).archive_date,'2026-09-30');
 assert.equal(data.topics.find(topic=>topic.id===f.topic).event_date,'2026-09-29');
});

test('archive navigation reaches old and new topics, languages, originals and missing slots',async t=>{
 const f=fixture(t),data=loadOlympicsArchive(f.root),b=browser();
 let html=await b.render(data);
 assert.match(html,/New fixture title/);assert.match(html,/#olympics\/2026-09-28/);assert.match(html,/#olympics\/archive/);assert.match(html,/Submission unavailable/);
 html=await b.render(data,'olympics/archive');assert.match(html,/#olympics\/new-fixture-story/);assert.match(html,/#olympics\/eviltokens-real-login-trap/);assert.match(html,/Every story. Every voice./);
 html=await b.render(data,'olympics/2026-09-28');assert.match(html,/#edition\/eviltokens-real-login-trap\/qwen/);
 html=await b.render(data,'edition/'+f.topic+'/qwen','zh');assert.match(html,/Synthetic zh original/);assert.match(html,/chinese.md/);
 html=await b.render(data,'brief/'+f.topic);assert.match(html,/Synthetic brief/);
 html=await b.render(data,'edition/ff-robots-american-dream/qwen');assert.match(html,/Additional original from Qwen/);
 html=await b.render(data,'olympics/2099-01-01');assert.match(html,/Story unavailable/);
});

test('new archives require complete slot accounting and safe explicit topic metadata',t=>{
 const f=fixture(t);
 f.write('topics.json',{...f.metadata,private_conversation_url:'https://chat.qwen.ai/c/private'});assert.throws(()=>loadOlympicsArchive(f.root),/Invalid topic metadata/);
 f.write('topics.json',f.metadata);
 f.write('catalog.json',{...f.catalog,articles:f.catalog.articles.slice(1)});assert.throws(()=>loadOlympicsArchive(f.root),/six models/);
 f.write('catalog.json',{...f.catalog,articles:f.catalog.articles.map((row,i)=>i?row:{...row,conversation_url:'private'})});assert.throws(()=>loadOlympicsArchive(f.root),/Invalid archive row/);
 f.write('catalog.json',{...f.catalog,articles:f.catalog.articles.map((row,i)=>i?row:{...row,provider:'fabricated'})});assert.throws(()=>loadOlympicsArchive(f.root),/Invalid archive row/);
 f.write('catalog.json',f.catalog);f.write('topics.json',{...f.metadata,topics:[{...f.metadata.topics[0],event_date:'2026-09-30'}]});assert.throws(()=>loadOlympicsArchive(f.root),/Invalid topic metadata/);
});

test('duplicate topic IDs cannot overwrite an earlier dated edition',t=>{
 const f=fixture(t);cpSync(f.base,join(f.root,'2026-10-01'),{recursive:true});
 assert.throws(()=>loadOlympicsArchive(f.root),/Topic ID already published/);
});

test('romantic-prose introductions never become headlines and distinct provider labels survive',()=>{
 const window={};vm.runInNewContext(readFileSync('public/olympics.js','utf8'),{window,URL});
 const raw='为您提供基于上述新闻材料创作的古典浪漫主义文言文作品及三种标题选择：\n\n标题选项\n\n悬念钩人：《测试悬念：此舟何日归？》\n\n情感共鸣：《测试共鸣：星河犹明》\n\n逆直觉：《测试逆直觉：此路何以重来？》\n\n这是完整原稿的开篇段落。';
 assert.deepEqual([...window.iSunOlympics.preview(raw).headlines],['《测试悬念：此舟何日归？》','《测试共鸣：星河犹明》','《测试逆直觉：此路何以重来？》']);
 const second='这里是为您精心撰写的三款古典文言文风格、兼具浪漫主义色彩的标题：\n\n惊雷悬念：标题一\n\n气韵共鸣：标题二\n\n磅礴史诗：标题三';
 assert.deepEqual([...window.iSunOlympics.preview(second).headlines],['标题一','标题二','标题三']);
 const bracket='一、【悬疑感】《原标题：不可丢失》\n\n二、【情感共鸣】《原标题二：仍须完整》\n\n三、【反直觉】《原标题三：完整保留》';
 assert.deepEqual([...window.iSunOlympics.preview(bracket).headlines],['《原标题：不可丢失》','《原标题二：仍须完整》','《原标题三：完整保留》']);
});

test('Chinese teaser preserves its first 180 characters across embedded English words',()=>{
 const window={};vm.runInNewContext(readFileSync('public/olympics.js','utf8'),{window,URL});
 const paragraph='开篇保留 World Labs '+ '这是中文测试原文。'.repeat(25);
 assert.equal(window.iSunOlympics.preview(paragraph).teaser,paragraph.slice(0,180)+'…');
});
