import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,cpSync,readFileSync,writeFileSync,mkdirSync,existsSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';

test('local build needs no hosting destination; release rejects missing and malformed configuration',()=>{
 const cwd=mkdtempSync(join(tmpdir(),'isun-public-build-'));
 try {
  for(const p of ['scripts','src','content','public','drizzle'])cpSync(p,join(cwd,p),{recursive:true});
  const run=(...args)=>spawnSync(process.execPath,['scripts/build.mjs',...args],{cwd,encoding:'utf8'});
  let result=run('--release');assert.notEqual(result.status,0);assert.match(result.stderr,/Release requires/);assert.equal(existsSync(join(cwd,'dist')),false);
  result=run();assert.equal(result.status,0,result.stderr);
  const metadata=JSON.parse(readFileSync(join(cwd,'dist/.openai/hosting.json')));assert.deepEqual(metadata,{d1:'DB'});
  assert.equal('database_id' in JSON.parse(readFileSync(join(cwd,'dist/server/wrangler.json'))).d1_databases[0],false);
  rmSync(join(cwd,'dist'),{recursive:true});mkdirSync(join(cwd,'.openai'));
  for(const config of ['{invalid',JSON.stringify({d1:'DB',project_id:''}),JSON.stringify({d1:'WRONG',project_id:'appgprj_testfixture'})]){
   writeFileSync(join(cwd,'.openai/hosting.json'),config);result=run('--release');assert.notEqual(result.status,0);assert.equal(existsSync(join(cwd,'dist')),false);
  }
  const fixture={d1:'DB',project_id:'appgprj_testfixture'};
  writeFileSync(join(cwd,'.openai/hosting.json'),JSON.stringify(fixture));result=run('--release');assert.equal(result.status,0,result.stderr);
  assert.deepEqual(JSON.parse(readFileSync(join(cwd,'dist/.openai/hosting.json'))),fixture);
 } finally {rmSync(cwd,{recursive:true,force:true});}
});
