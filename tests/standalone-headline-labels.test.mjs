import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const window={};vm.runInNewContext(fs.readFileSync('public/olympics.js','utf8'),{window});
test('rendered provider headlines retain standalone English and Chinese labels',()=>{
 for(const [labels,headlines] of [
  [['Suspenseful','Emotional Resonance','Counter-intuitive'],['One Positron, Months in the Cold: The Trap That Could Test Reality’s Mirror','The Patience of One Particle','A Better Experiment Before an Answer']],
  [['悬念','情感共鸣','反直觉'],['一颗粒子，下一场检验','数月守候，只为精确一问','留住反物质，答案仍待测量']]
 ]){
  const original=labels.map((x,i)=>x+'\n\n'+headlines[i]).join('\n\n')+'\n\nThe demonstrated control makes a future measurement possible, with no discrepancy established in this experiment.';
  assert.deepEqual(Array.from(window.iSunOlympics.preview(original).headlines),headlines);
  assert.match(window.iSunOlympics.preview(original).teaser,/demonstrated control/);
 }
});
test('style words in prose are not promoted to headline options',()=>{
 assert.equal(window.iSunOlympics.preview('A suspenseful story about a result still to come.\n\nThe experiment has not established a discrepancy.').headlines.length,0);
});
