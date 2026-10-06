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
