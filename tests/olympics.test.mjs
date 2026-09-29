import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdtempSync,cpSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';import {join} from 'node:path';
import {loadOlympics} from '../scripts/olympics-bundle.mjs';
import worker from '../dist/server/index.js';
test('pilot serves exact originals, explicit missing slots and no measurement writes',async()=>{
 const r=await worker.fetch(new Request('https://example.test/api/olympics?measure=1'),{get DB(){throw Error('Pilot must never access measurements');}});
 assert.equal(r.status,200);assert.equal(r.headers.get('set-cookie'),null);
 const data=await r.json();assert.equal(data.catalog.articles.length,72);assert.equal(Object.keys(data.articles).length,72);
 for(const row of data.catalog.articles){if(row.status==='available')assert.equal(data.articles[row.article_path],readFileSync('content/model-olympics/2026-09-28/'+row.article_path,'utf8'));else{assert.equal(row.status,'UNKNOWN');assert.equal(row.article_path,null);}}
});
test('a changed original fails the publication build instead of silently changing provenance',()=>{
 const root=mkdtempSync(join(tmpdir(),'isun-archive-'));
 try{cpSync('content/model-olympics/2026-09-28',root,{recursive:true});writeFileSync(join(root,'catalog.json'),'{}');assert.throws(()=>loadOlympics(root),/checksum mismatch/);}finally{rmSync(root,{recursive:true,force:true});}
});

test('original downloads use exact allowlisted bytes and reject private or missing paths',async()=>{
 const path='articles/eviltokens-real-login-trap/chatgpt/english.md';
 const r=await worker.fetch(new Request('https://example.test/api/olympics/original?path='+encodeURIComponent(path)),{});
 assert.equal(r.status,200);assert.match(r.headers.get('content-disposition'),/^attachment/);assert.equal(await r.text(),readFileSync('content/model-olympics/2026-09-28/'+path,'utf8'));
 for(const bad of ['../../PROJECT_STATE.md','__proto__','articles/missing-topic/qwen/chinese.md']) assert.equal((await worker.fetch(new Request('https://example.test/api/olympics/original?path='+encodeURIComponent(bad)),{})).status,404);
});

test('the literary inverse-thinking heading remains a third original headline',()=>{
 const window={};vm.runInNewContext(readFileSync('public/olympics.js','utf8'),{window,URL});
 const raw=readFileSync('content/model-olympics/2026-09-28/articles/anthropic-paid-watchdog/grok/chinese.md','utf8');
 const headlines=window.iSunOlympics.preview(raw).headlines;
 assert.equal(headlines.length,3);assert.equal(headlines[2],'最诚者不在称独立，而在自承独立犹未至');
});

test('additional provider originals retain exact bytes and reject unlisted supplement paths',async()=>{
 const path='supplements/ff-robots-american-dream/qwen/english-alternative-2.md';
 const response=await worker.fetch(new Request('https://example.test/api/olympics/original?path='+encodeURIComponent(path)),{});
 assert.equal(response.status,200);assert.equal(await response.text(),readFileSync('content/model-olympics/2026-09-28/'+path,'utf8'));
 for(const bad of ['supplements/../../PROJECT_STATE.md','supplements/ff-robots-american-dream/qwen/english-alternative-3.md']) assert.equal((await worker.fetch(new Request('https://example.test/api/olympics/original?path='+encodeURIComponent(bad)),{})).status,404);
 const data=loadOlympics();assert.equal(data.supplements.length,1);assert.equal(data.catalog.available_count,72);
 const root=mkdtempSync(join(tmpdir(),'isun-supplement-'));
 try{cpSync('content/model-olympics/2026-09-28',root,{recursive:true});writeFileSync(join(root,path),'changed');assert.throws(()=>loadOlympics(root),/checksum mismatch/);}finally{rmSync(root,{recursive:true,force:true});}
});
