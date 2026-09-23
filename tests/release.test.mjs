import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {checkRelease,fingerprint} from '../scripts/release-check.mjs';
const stories=JSON.parse(readFileSync('content/stories.json','utf8'));
const registry=stories.map(s=>({story_id:s.id,experiment_id:s.experiment.id,sha256:fingerprint(s)}));
test('a daily addition preserves old links and observations; deleting a packet fails',()=>{
 const added=structuredClone(stories[0]);added.id='another-event';added.experiment.id='another-test';
 assert.deepEqual(checkRelease([added,...stories],registry),[]);
 assert.match(checkRelease(stories.slice(1),registry)[0],/retain the published packet/);
});
test('published headline, variant order and payoff changes cannot reuse a test identity',()=>{
 for(const mutate of [s=>s.hooks[0].en+='!',s=>s.experiment.variants.reverse(),s=>s.paragraphs.en[0]+=' New claim.']){
  const copy=structuredClone(stories);mutate(copy[0]);assert.match(checkRelease(copy,registry)[0],/published experiment .* changed/);
 }
 const checked=structuredClone(stories);checked[0].checked_at='2026-09-21T01:00:00Z';assert.deepEqual(checkRelease(checked,registry),[]);
});

test('a revised experiment keeps the story route while its prior packet stays sealed in history',()=>{
 const previous=structuredClone(stories),current=structuredClone(stories);
 for(const story of current){story.experiment.id+='-revision-v2';story.hooks[0].en='Revised '+story.hooks[0].en;}
 assert.deepEqual(checkRelease(current,registry,previous),[]);
 assert.equal(current[0].id,previous[0].id);
 assert.match(checkRelease(current,registry,previous.slice(1))[0],/retain the published packet/);
 const corrupted=structuredClone(previous);corrupted[0].hooks[0].en+=' altered';
 assert.ok(checkRelease(current,registry,corrupted).some(e=>/published experiment .* changed/.test(e)));
});

test('overlapping current and historical identities must describe the same stimulus',()=>{
 assert.deepEqual(checkRelease(stories,registry,structuredClone(stories)),[]);
 const changed=structuredClone(stories);changed[0].hooks[0].en+='!';
 assert.ok(checkRelease(changed,registry,stories).some(e=>/conflicting current\/history identity/.test(e)));
 const renamed=structuredClone(stories);renamed[0].id='different-story-same-experiment';
 assert.ok(checkRelease(renamed,registry,stories).some(e=>/conflicting current\/history identity/.test(e)));
});
