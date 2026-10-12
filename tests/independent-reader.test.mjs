import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync}from'node:fs';
import canonical from '../dist/server/index.js';
import {independentReader}from'../src/independent-reader.mjs';
const reader=independentReader(canonical),origin='https://reader.example.test';
test('independent reader preserves every public original with no DB, external fetch or tracking',async()=>{
 const before=await(await canonical.fetch(new Request(origin+'/api/olympics'),{})).json();
 const response=await reader.fetch(new Request(origin+'/api/olympics'));assert.equal(response.headers.get('X-iSun1-Runtime'),'independent');assert.deepEqual(await response.json(),before);
 const feed=await reader.fetch(new Request(origin+'/api/feed?measure=1',{headers:{Cookie:'isun1_v=00000000-0000-4000-8000-000000000001'}}));assert.equal(feed.status,200);assert.equal(feed.headers.get('set-cookie'),null);const data=await feed.json();assert.equal(data.measurement,'off');assert.ok(data.stories.every(s=>s.ticket===null));assert.equal(data.has_editorial_picks,true);
 const path=before.picks.entries[0].article_path;const file=await reader.fetch(new Request(origin+'/api/olympics/original?path='+encodeURIComponent(path)));assert.equal(await file.text(),before.articles[path]);assert.equal((await reader.fetch(new Request(origin+'/api/olympics/original?path=../../PROJECT_STATE.md'))).status,404);
});
test('historical measurements stay unavailable rather than becoming a new zero cohort',async()=>{
 for(const path of ['/api/metrics','/api/signal','/api/forget']){const r=await reader.fetch(new Request(origin+path,{method:path==='/api/metrics'?'GET':'POST'}));assert.equal(r.status,503);assert.equal((await r.json()).status,'UNKNOWN');}
});
test('independent app cannot imply active measurement or allow opt-in',async()=>{
 const r=await reader.fetch(new Request(origin+'/app.js'));const app=await r.text();assert.match(app,/consent=false/);assert.match(app,/analytics paused/);assert.match(app,/allow'\).disabled=true/);assert.doesNotMatch(app,/consent=safeGet/);assert.match(r.headers.get('content-security-policy'),/connect-src 'self'/);
 assert.equal(readFileSync('public/app.js','utf8').includes("consent=safeGet"),true,'Canonical app remains unchanged');
});
test('editorial JPEG assets use the scoped asset binding and fail closed when unavailable',async()=>{
 const manifest=JSON.parse(readFileSync('content/editorial-art.json')),path=manifest.entries[0].variants[0].path;
 let calls=0;const env={get DB(){throw Error('No DB for editorial assets');},EDITORIAL_ART:{async fetch(request){calls++;assert.equal(new URL(request.url).pathname,path);return new Response(request.method==='HEAD'?null:readFileSync('public'+path),{headers:{'Content-Type':'image/jpeg','ETag':'"checked"'}});}}};
 for(const method of ['GET','HEAD']){const r=await reader.fetch(new Request(origin+path,{method}),env);assert.equal(r.status,200);assert.match(r.headers.get('Content-Type'),/image\/jpeg/);assert.equal(r.headers.get('X-iSun1-Runtime'),'independent');assert.equal(r.headers.get('Set-Cookie'),null);assert.equal(r.headers.get('ETag'),'"checked"');assert.equal((await r.arrayBuffer()).byteLength,method==='HEAD'?0:readFileSync('public'+path).length);}
 assert.equal(calls,2);
 assert.equal((await reader.fetch(new Request(origin+path))).status,503);
 assert.equal((await reader.fetch(new Request(origin+'/editorial-art/imagegen-v2/unreviewed.jpg'),env)).status,404);assert.equal(calls,2);
 assert.equal((await reader.fetch(new Request(origin+path,{method:'POST'}),env)).status,405);assert.equal(calls,2);
});
