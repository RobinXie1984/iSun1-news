import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import worker from '../dist/server/index.js';
const boot=readFileSync(new URL('../public/theme.js',import.meta.url),'utf8');
test('a saved night preference applies before paint; unavailable storage still renders day',()=>{
 for(const [value,expected] of [['night','night'],['day','day'],['corrupt','day'],[null,'day']]){
  const attrs={};vm.runInNewContext(boot,{document:{documentElement:{setAttribute:(k,v)=>attrs[k]=v}},localStorage:{getItem:()=>value}});assert.equal(attrs['data-theme'],expected);
 }
 const attrs={};vm.runInNewContext(boot,{document:{documentElement:{setAttribute:(k,v)=>attrs[k]=v}},localStorage:{getItem(){throw Error('storage blocked');}}});assert.equal(attrs['data-theme'],'day');
});
test('all editorial images serve exact binary bytes without database or consent writes',async()=>{
 for(const name of ['mars','robot','galaxy','oversight','security','eviltokens']){
  const r=await worker.fetch(new Request('https://example.test/images/'+name+'.jpg'),{});assert.equal(r.status,200);assert.equal(r.headers.get('Content-Type'),'image/jpeg');assert.equal(r.headers.get('Set-Cookie'),null);assert.equal(r.headers.get('X-Content-Type-Options'),'nosniff');assert.deepEqual(Buffer.from(await r.arrayBuffer()),readFileSync(new URL('../public/images/'+name+'.jpg',import.meta.url)));
  const head=await worker.fetch(new Request('https://example.test/images/'+name+'.jpg',{method:'HEAD'}),{});assert.equal(head.status,200);assert.equal((await head.arrayBuffer()).byteLength,0);
 }
 for(const path of ['/images/missing.jpg','/constructor','/toString'])assert.equal((await worker.fetch(new Request('https://example.test'+path),{})).status,404);
});
test('edition photos serve only bundled exact bytes and never create tracking state',async()=>{
 for(const name of ['nancy-grace-roman','mars-supercam-2021']){
  const path='/edition-media/'+name+'.jpg';
  const response=await worker.fetch(new Request('https://example.test'+path),{});
  assert.equal(response.status,200);assert.equal(response.headers.get('Content-Type'),'image/jpeg');assert.equal(response.headers.get('Set-Cookie'),null);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()),readFileSync('public'+path));
 }
 for(const path of ['/edition-media/missing.jpg','/edition-media/SHA256SUMS','/edition-media/PROVENANCE.md'])assert.equal((await worker.fetch(new Request('https://example.test'+path),{})).status,404);
});
