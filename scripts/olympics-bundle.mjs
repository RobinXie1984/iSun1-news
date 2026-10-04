import {readFileSync,existsSync,readdirSync,lstatSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve,sep} from 'node:path';

// These links are public sources, never account/conversation links or signed downloads.
export function mediaSourceURL(value){
 if(typeof value!=='string'||value.length>2048||!/^https:\/\//i.test(value)||/[\s\\\u0000-\u001f\u007f]/.test(value))return null;
 try{
  const url=new URL(value),host=url.hostname.toLowerCase().replace(/\.+$/,'');
  if(url.protocol!=='https:'||url.username||url.password||url.port||!host.includes('.')||!/[a-z]/.test(host)||!/^[a-z0-9.-]+$/.test(host)||/(?:^|\.)(?:localhost|local|internal|lan|home|test|invalid|example|onion)$/.test(host))return null;
  let decoded=value;
  for(let i=0;i<3;i++){const next=decodeURIComponent(decoded);if(next===decoded)break;decoded=next;}
  if(/(?:gh[pousr]_[a-z0-9]{20,}|github_pat_[a-z0-9_]{20,}|sk-[a-z0-9_-]{20,}|xox[baprs]-[a-z0-9-]{10,}|eyJ[a-z0-9_-]{16,}\.[a-z0-9_-]{16,}\.[a-z0-9_-]{16,})/i.test(decoded))return null;
  const inspect=new URL(decoded);
  if(inspect.username||inspect.password)return null;
  for(let key of [...url.searchParams.keys(),...new URLSearchParams(url.hash.slice(1)).keys(),...inspect.searchParams.keys(),...new URLSearchParams(inspect.hash.slice(1)).keys()]){for(let i=0;i<3;i++){const next=decodeURIComponent(key);if(next===key)break;key=next;}if(/(?:token|secret|password|passwd|credential|signature|session|api.?key|access.?key|authorization|authuser)|^(?:key|auth|code|jwt|sig)$/i.test(key))return null;}
  if(/(?:^|\.)(?:chatgpt\.com|chat\.openai\.com|claude\.ai|gemini\.google\.com|grok\.com|chat\.deepseek\.com|chat\.qwen\.ai|chat\.qwenlm\.ai|accounts\.google\.com|accounts\.x\.ai|mail\.google\.com|drive\.google\.com|docs\.google\.com)$/.test(host))return null;
  if(host==='x.com'&&/^\/i\/grok\//i.test(inspect.pathname))return null;
  return url.href;
 }catch{return null;}
}
const exactFields=(value,fields)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===fields.length&&fields.every(key=>Object.hasOwn(value,key));
const textField=(value,max,empty=false)=>typeof value==='string'&&value.length<=max&&(empty||value.trim().length>0)&&!/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value);
export function validateOlympicsMedia(media,catalog){
 if(!exactFields(media,['schema_version','editions'])||media.schema_version!==1||!Array.isArray(media.editions)||media.editions.length>catalog.articles.length)throw Error('Invalid media schema');
 const available=new Set(catalog.articles.filter(row=>row.status==='available').map(row=>[row.topic,row.provider,row.language].join('/'))),seen=new Set();
 for(const edition of media.editions){
  if(!exactFields(edition,['topic','provider','language','items'])||!['en','zh'].includes(edition.language)||typeof edition.topic!=='string'||typeof edition.provider!=='string'||!/^[a-z0-9-]+$/.test(edition.topic)||!/^[a-z]+$/.test(edition.provider)||!Array.isArray(edition.items)||edition.items.length>64)throw Error('Invalid media edition');
  const key=[edition.topic,edition.provider,edition.language].join('/');
  if(!available.has(key)||seen.has(key))throw Error('Media must match one available edition');seen.add(key);
  const sources=new Set();
  for(const item of edition.items){
   if(!exactFields(item,['kind','origin','title','source_url','asset_path','credit','availability_note'])||!['image','video'].includes(item.kind)||item.origin!=='source'||!textField(item.title,500)||!textField(item.credit,500,true)||(item.availability_note!==null&&!textField(item.availability_note,1000))||!mediaSourceURL(item.source_url))throw Error('Invalid source media item');
   if(item.asset_path!==null&&!(typeof item.asset_path==='string'&&(item.kind==='image'?/^\/edition-media\/[a-z0-9-]+\.(jpg|png|webp)$/:/^\/edition-media\/[a-z0-9-]+\.mp4$/).test(item.asset_path)))throw Error('Invalid media asset path');
   const identity=[item.kind,item.source_url,item.asset_path].join('\n');if(sources.has(identity))throw Error('Duplicate media item');sources.add(identity);
  }
 }
 return media;
}
export function loadOlympics(root='content/model-olympics/2026-09-28'){
 const base=resolve(root), sums=new Map(readFileSync(resolve(base,'SHA256SUMS'),'utf8').trim().split('\n').map(line=>[line.slice(66),line.slice(0,64)]));
 const read=(name)=>{
  if(typeof name!=='string'||name.includes('..')||name.startsWith('/')||!resolve(base,name).startsWith(base+sep))throw Error('Invalid archive path');
  const bytes=readFileSync(resolve(base,name));
  if(createHash('sha256').update(bytes).digest('hex')!==sums.get(name))throw Error('Archive checksum mismatch: '+name);
  return bytes.toString('utf8');
 };
 const catalog=JSON.parse(read('catalog.json')),articles={},briefs={};
 if(!exactFields(catalog,['schema_version','generated_at','description','available_count','unavailable_count','articles'])||catalog.schema_version!==1||!Array.isArray(catalog.articles)||!catalog.articles.length)throw Error('Invalid archive catalog');
 const providers=['chatgpt','claude','gemini','grok','deepseek','qwen'];
 const topicIDs=new Set(catalog.articles.map(row=>row.topic));
 if(catalog.articles.length!==topicIDs.size*providers.length*2)throw Error('Expected six models and two languages per topic');
 const seen=new Set();
 for(const row of catalog.articles){
  if(!exactFields(row,['provider','model','language','topic','event_date','source_brief','article_path','status','availability_note'])||!providers.includes(row.provider)||typeof row.topic!=='string'||!/^[a-z0-9-]+$/.test(row.topic)||!textField(row.model,200)||!/^\d{4}-\d{2}-\d{2}$/.test(row.event_date)||(row.availability_note!==null&&!textField(row.availability_note,1000)))throw Error('Invalid archive row');
  const key=[row.topic,row.provider,row.language].join('/');if(seen.has(key))throw Error('Duplicate submission');seen.add(key);
  if(!['en','zh'].includes(row.language))throw Error('Invalid language');
  if(row.source_brief!=='briefs/'+row.topic+'.md')throw Error('Invalid brief path');
  briefs[row.source_brief]=read(row.source_brief);
  if(row.status==='available'){
   if(row.article_path!=='articles/'+row.topic+'/'+row.provider+'/'+(row.language==='en'?'english':'chinese')+'.md')throw Error('Invalid article path');
   articles[row.article_path]=read(row.article_path);
  }else if(row.status!=='UNKNOWN'||row.article_path!==null)throw Error('Missing submissions must remain UNKNOWN');
 }
 if(Object.keys(articles).length!==catalog.available_count||catalog.unavailable_count!==catalog.articles.length-catalog.available_count)throw Error('Archive totals mismatch');
 const result={catalog,articles,briefs,supplements:[]};
 if(sums.has('topics.json')||existsSync(resolve(base,'topics.json'))){
  const metadata=JSON.parse(read('topics.json'));
  if(!exactFields(metadata,['schema_version','topics'])||metadata.schema_version!==1||!Array.isArray(metadata.topics)||metadata.topics.length!==topicIDs.size)throw Error('Invalid topic metadata');
  const ids=new Set();
  const bilingual=value=>exactFields(value,['en','zh'])&&textField(value.en,2000)&&textField(value.zh,2000);
  for(const topic of metadata.topics){
   if(!exactFields(topic,['id','title','summary','event_date'])||!topicIDs.has(topic.id)||ids.has(topic.id)||!bilingual(topic.title)||!bilingual(topic.summary)||!/^\d{4}-\d{2}-\d{2}$/.test(topic.event_date)||catalog.articles.some(row=>row.topic===topic.id&&row.event_date!==topic.event_date))throw Error('Invalid topic metadata');
   ids.add(topic.id);
  }
  result.topics=metadata.topics;
 }
 if(sums.has('supplements.json')){
  const extras=JSON.parse(read('supplements.json'));
  if(!Array.isArray(extras)||extras.length>catalog.articles.length)throw Error('Invalid supplements');
  const paths=new Set();
  for(const extra of extras){
   if(!exactFields(extra,['topic','provider','language','article_path'])||!catalog.articles.some(row=>row.topic===extra.topic&&row.provider===extra.provider&&row.language===extra.language&&row.status==='available'))throw Error('Invalid supplement edition');
   const prefix='supplements/'+extra.topic+'/'+extra.provider+'/';
   if(typeof extra.article_path!=='string'||!extra.article_path.startsWith(prefix)||!/^(english|chinese)-alternative-[2-9]\.md$/.test(extra.article_path.slice(prefix.length))||paths.has(extra.article_path))throw Error('Invalid supplement path');
   paths.add(extra.article_path);result.supplements.push({...extra,text:read(extra.article_path)});
  }
 }
 if(sums.has('media.json')||existsSync(resolve(base,'media.json')))result.media=validateOlympicsMedia(JSON.parse(read('media.json')),catalog);
 return result;
}

// Public context is a reviewed sidecar, never private capture receipts or conversation URLs.
export function validateEditionContext(value, articles){
 if(!exactFields(value,['schema_version','editions'])||value.schema_version!==1||!Array.isArray(value.editions))throw Error('Invalid edition context');
 const seen=new Set();
 for(const row of value.editions){
  if(!exactFields(row,['article_path','captured_at','prompt_version','input_deviation','fact_check_status'])||!Object.hasOwn(articles,row.article_path)||seen.has(row.article_path)||typeof row.captured_at!=='string'||!/^\d{4}-\d{2}-\d{2}T/.test(row.captured_at)||!Number.isFinite(Date.parse(row.captured_at))||!['v1-labeled-fiction','v2-no-invented-scenes'].includes(row.prompt_version)||![null,'interleaved-brief'].includes(row.input_deviation)||!['UNKNOWN','SOURCE_REVIEW_RECORDED'].includes(row.fact_check_status))throw Error('Invalid edition context row');
  seen.add(row.article_path);
 }
 if(seen.size!==Object.keys(articles).length)throw Error('Incomplete edition context');
 return value;
}

// Archive dates are collection batches; original event/report dates stay separate.
// Topic IDs are globally unique so every already-published topic/download URL survives.
export function loadOlympicsArchive(root='content/model-olympics'){
 const dates=readdirSync(root,{withFileTypes:true}).filter(entry=>entry.isDirectory()&&/^\d{4}-\d{2}-\d{2}$/.test(entry.name)).map(entry=>entry.name).sort().reverse();
 if(!dates.length)throw Error('No dated Olympics archives');
 const result={catalog:{schema_version:1,generated_at:null,description:'Independent original submissions. Provider order is fixed; no ranking or scores.',available_count:0,unavailable_count:0,articles:[]},articles:{},briefs:{},supplements:[],topics:[],batches:[],media:{schema_version:1,editions:[]}};
 const seen=new Set();
 for(const date of dates){
  const folder=resolve(root,date);
  if(lstatSync(folder).isSymbolicLink())throw Error('Archive directory must not be a symlink');
  const batch=loadOlympics(folder),ids=[...new Set(batch.catalog.articles.map(row=>row.topic))];
  if(date!=='2026-09-28'&&!batch.topics)throw Error('New archive requires topic metadata');
  for(const id of ids){if(seen.has(id))throw Error('Topic ID already published: '+id);seen.add(id);}
  result.catalog.articles.push(...batch.catalog.articles.map(row=>({...row,archive_date:date})));
  result.catalog.available_count+=batch.catalog.available_count;result.catalog.unavailable_count+=batch.catalog.unavailable_count;
  if(!result.catalog.generated_at||batch.catalog.generated_at>result.catalog.generated_at)result.catalog.generated_at=batch.catalog.generated_at;
  Object.assign(result.articles,batch.articles);Object.assign(result.briefs,batch.briefs);
  result.supplements.push(...batch.supplements);result.media.editions.push(...(batch.media?.editions||[]));
  result.topics.push(...(batch.topics||ids.map(id=>({id,event_date:batch.catalog.articles.find(row=>row.topic===id).event_date}))).map(topic=>({...topic,archive_date:date})));
  result.batches.push({date,topic_ids:ids,available_count:batch.catalog.available_count,unavailable_count:batch.catalog.unavailable_count});
 }
 const contextPath=resolve(root,'../edition-context.json');
 if(existsSync(contextPath))result.context=validateEditionContext(JSON.parse(readFileSync(contextPath,'utf8')),result.articles);
 return result;
}
