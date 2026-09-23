import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {assignVariant,wilson,compareVariants,validateStories,summarize} from '../src/engine.mjs';
const stories=JSON.parse(readFileSync('content/stories.json','utf8'));
test('source packets resolve 20 distinct bilingual hooks per real event',()=>assert.deepEqual(validateStories(stories),[]));
test('missing claim support and repeated hooks fail closed',()=>{const copy=structuredClone(stories);copy[0].hooks[0].claim_ids=['invented'];copy[0].hooks[1]=copy[0].hooks[0];assert.ok(validateStories(copy).some(e=>e.includes('Unbacked')));assert.ok(validateStories(copy).some(e=>e.includes('Duplicate')));});
test('allocation is stable and balanced across anonymous visitors',()=>{const e=stories[0].experiment;let n=0;for(let i=0;i<10000;i++){const v='visitor-'+i;assert.equal(assignVariant(v,e),assignVariant(v,e));n+=assignVariant(v,e)===e.variants[0];}assert.ok(n>4800&&n<5200);});
test('no observations yield null rates and no winner',()=>{assert.equal(wilson(0,0),null);assert.equal(summarize({}).rates.open,null);assert.equal(compareVariants([{impression:0},{impression:0}]).status,'UNKNOWN');});
test('clickbait never wins the qualified-read decision on clicks alone',()=>{assert.equal(compareVariants([{hook_id:'a',impression:300,open:290,qualified:30},{hook_id:'b',impression:300,open:100,qualified:30}]).status,'UNKNOWN');});
test('negative feedback blocks a provisional attention candidate',()=>{assert.equal(compareVariants([{hook_id:'a',impression:300,qualified:200,misleading:60},{hook_id:'b',impression:300,qualified:30,misleading:0}]).status,'UNKNOWN');});

test('daily packets cannot share experiment identities or omit story-specific covers',()=>{const copy=structuredClone(stories);copy[1].experiment.id=copy[0].experiment.id;delete copy[1].cover_lines;const errors=validateStories(copy);assert.ok(errors.some(e=>e.includes('reused experiment id')));assert.ok(errors.some(e=>e.includes('cover lines')));});
