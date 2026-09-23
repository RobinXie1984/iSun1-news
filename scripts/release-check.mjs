// Published experiments are immutable; revisions retain their prior packet in history.
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {validateStories} from '../src/engine.mjs';
export function fingerprint(story){
  // Verification timestamps and added evidence links may change without changing the stimulus.
  const {id,event_date,category,label,title,summary,paragraphs,wtf,consequence,uncertainty,cover_lines,hooks,experiment}=story;
  const stable=value=>Array.isArray(value)?value.map(stable):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(k=>[k,stable(value[k])])):value;
  return createHash('sha256').update(JSON.stringify(stable({id,event_date,category,label,title,summary,paragraphs,wtf,consequence,uncertainty,cover_lines,hooks,experiment}))).digest('hex');
}
export function checkRelease(stories,registry,history=[]){
  const errors=[];
  const packets=[...history,...stories],identities=new Map();
  for(const story of packets){
    const prior=identities.get(story.experiment.id);
    if(prior&&(prior.id!==story.id||fingerprint(prior)!==fingerprint(story)))errors.push(`${story.experiment.id}: conflicting current/history identity; one experiment must describe one unchanged story stimulus.`);
    else identities.set(story.experiment.id,story);
  }
  for(const record of registry){
    const story=packets.find(s=>s.id===record.story_id&&s.experiment.id===record.experiment_id);
    if(!story)errors.push(`${record.story_id}: retain the published packet and experiment ${record.experiment_id}; dropping it loses links and results.`);
    else if(fingerprint(story)!==record.sha256)errors.push(`${record.story_id}: published experiment ${record.experiment_id} changed. Preserve its prior packet in history and publish a distinct experiment revision; do not mix observations.`);
  }
  return errors;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const stories=JSON.parse(readFileSync('content/stories.json','utf8'));
  const history=existsSync('content/story-history.json')?JSON.parse(readFileSync('content/story-history.json','utf8')):[];
  const path='content/experiment-registry.json';
  const registry=existsSync(path)?JSON.parse(readFileSync(path,'utf8')):[];
  const errors=[...validateStories(stories),...history.flatMap(s=>validateStories([s])),...checkRelease(stories,registry,history)];if(errors.length)throw new Error(errors.join('\n'));
  const packets=[...new Map([...history,...stories].map(s=>[s.experiment.id,s])).values()];
  const pending=packets.filter(s=>!registry.some(r=>r.experiment_id===s.experiment.id));
  if(pending.length&&!process.argv.includes('--seal'))throw new Error('New experiments need a reviewed snapshot: npm run seal');
  if(process.argv.includes('--seal'))writeFileSync(path,JSON.stringify([...registry,...pending.map(s=>({story_id:s.id,experiment_id:s.experiment.id,sha256:fingerprint(s)}))],null,2)+'\n');
  console.log(`Release history intact: ${stories.length} current packets / ${packets.length} experiment snapshots.`);
}
