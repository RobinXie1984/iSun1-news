import {readFileSync,writeFileSync,mkdirSync,cpSync,existsSync} from 'node:fs';
import {validateStories} from '../src/engine.mjs';
import {checkRelease} from './release-check.mjs';
import {loadOlympicsArchive} from './olympics-bundle.mjs';
import {createHash} from 'node:crypto';
const olympics=loadOlympicsArchive();
const hostingPath='.openai/hosting.json';
let hosting={d1:'DB'};
if(existsSync(hostingPath)){
 try{hosting=JSON.parse(readFileSync(hostingPath,'utf8'));}catch{throw new Error('Hosting configuration must be valid JSON.');}
 if(!hosting||Array.isArray(hosting)||typeof hosting!=='object'||hosting.d1!=='DB')throw new Error('Hosting configuration requires the DB binding.');
}
if(process.argv.includes('--release')&&!(typeof hosting.project_id==='string'&&/^appgprj_[a-zA-Z0-9]+$/.test(hosting.project_id)))throw new Error('Release requires an explicitly configured Sites project_id in .openai/hosting.json; obtain it from your authorized hosting project.');
const stories=JSON.parse(readFileSync('content/stories.json','utf8'));
const history=JSON.parse(readFileSync('content/story-history.json','utf8'));
const registry=JSON.parse(readFileSync('content/experiment-registry.json','utf8'));
const errors=[...validateStories(stories),...history.flatMap(s=>validateStories([s])),...checkRelease(stories,registry,history)];
if([...stories,...history].some(s=>!registry.some(r=>r.experiment_id===s.experiment.id)))errors.push('Review new experiments, then run npm run seal.');if(errors.length)throw new Error(errors.join('\n'));
mkdirSync('dist/server',{recursive:true});mkdirSync('dist/.openai',{recursive:true});
const assets=Object.fromEntries(['index.html','app.js','style.css','theme.js','olympics.js','olympics.css',...['chatgpt','claude','gemini','grok','deepseek','qwen'].map(n=>'icons/'+n+'.svg')].map(f=>['/'+(f==='index.html'?'':f),readFileSync('public/'+f,'utf8')]));
for(const topic of olympics.topics){const file='editorial-art/'+topic.id+'.svg'; assets['/'+file]=readFileSync('public/'+file,'utf8');}
const media=Object.fromEntries(['mars','robot','galaxy','oversight','security','eviltokens'].map(name=>['/images/'+name+'.jpg',readFileSync('public/images/'+name+'.jpg').toString('base64')]));
const editionPaths=[...new Set((olympics.media?.editions||[]).flatMap(e=>e.items.map(i=>i.asset_path).filter(Boolean)))];
if(editionPaths.length){
 const sums=new Map(readFileSync('public/edition-media/SHA256SUMS','utf8').trim().split('\n').map(line=>[line.slice(66),line.slice(0,64)]));
 for(const path of editionPaths){
  const bytes=readFileSync('public'+path);
  if(createHash('sha256').update(bytes).digest('hex')!==sums.get(path.split('/').pop()))throw Error('Edition media checksum mismatch');
  media[path]=bytes.toString('base64');
 }
}
const editorialArt=JSON.parse(readFileSync('content/editorial-art.json','utf8'));
if(editorialArt.schema_version!==1||!Array.isArray(editorialArt.entries)||editorialArt.entries.length!==olympics.topics.length)throw Error('Missing editorial art');
const editorialPaths={};
for(const topic of olympics.topics){const rows=editorialArt.entries.filter(x=>x.topic===topic.id);if(rows.length!==1||rows[0].variants.length!==2)throw Error('Editorial art coverage mismatch');for(const item of rows[0].variants){
 if(![600,1200].includes(item.width)||item.path!=='/editorial-art/imagegen-v2/'+topic.id+'-'+item.width+'.jpg')throw Error('Unreviewed editorial art path');
 const bytes=readFileSync('public'+item.path);if(bytes.length!==item.bytes||createHash('sha256').update(bytes).digest('hex')!==item.sha256)throw Error('Editorial art checksum mismatch');editorialPaths[item.path]=item.sha256;
}}
const engine=readFileSync('src/engine.mjs','utf8').replace(/^export /gm,'');
const worker=readFileSync('src/worker.mjs','utf8').replace(/^import .*;\n/gm,'');
writeFileSync('dist/server/index.js',`const EDITORIAL_ART=${JSON.stringify(editorialPaths)};\nconst OLYMPICS=${JSON.stringify(olympics)};\nconst STORIES=${JSON.stringify(stories)};\nconst HISTORY=${JSON.stringify(history)};\nconst ASSETS=${JSON.stringify(assets)};\nconst MEDIA=${JSON.stringify(media)};\n${engine}\n${worker}`);
writeFileSync('dist/.openai/hosting.json',JSON.stringify(hosting,null,2)+'\n');
cpSync('drizzle','dist/.openai/drizzle',{recursive:true});
writeFileSync('dist/server/wrangler.json',JSON.stringify({name:'isun1-story-engine',main:'index.js',compatibility_date:'2026-09-20',compatibility_flags:['nodejs_compat'],d1_databases:[{binding:'DB',database_name:'isun1-attention'}]},null,2));
console.log(`Built portable Worker: ${stories.length} stories / ${stories.length*20} framings.`);
