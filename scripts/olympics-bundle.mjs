import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve,sep} from 'node:path';
export function loadOlympics(root='content/model-olympics/2026-09-28'){
 const base=resolve(root), sums=new Map(readFileSync(resolve(base,'SHA256SUMS'),'utf8').trim().split('\n').map(line=>[line.slice(66),line.slice(0,64)]));
 const read=(name)=>{
  if(typeof name!=='string'||name.includes('..')||name.startsWith('/')||!resolve(base,name).startsWith(base+sep))throw Error('Invalid archive path');
  const bytes=readFileSync(resolve(base,name));
  if(createHash('sha256').update(bytes).digest('hex')!==sums.get(name))throw Error('Archive checksum mismatch: '+name);
  return bytes.toString('utf8');
 };
 const catalog=JSON.parse(read('catalog.json')),articles={},briefs={};
 if(catalog.articles.length!==72)throw Error('Expected six topics, six models, two languages');
 const seen=new Set();
 for(const row of catalog.articles){
  const key=[row.topic,row.provider,row.language].join('/');if(seen.has(key))throw Error('Duplicate submission');seen.add(key);
  if(!['en','zh'].includes(row.language))throw Error('Invalid language');
  if(!/^briefs\/[a-z0-9-]+\.md$/.test(row.source_brief))throw Error('Invalid brief path');
  briefs[row.source_brief]=read(row.source_brief);
  if(row.status==='available'){
   if(!/^articles\/[a-z0-9-]+\/[a-z]+\/(english|chinese)\.md$/.test(row.article_path))throw Error('Invalid article path');
   articles[row.article_path]=read(row.article_path);
  }else if(row.status!=='UNKNOWN'||row.article_path!==null)throw Error('Missing submissions must remain UNKNOWN');
 }
 if(Object.keys(articles).length!==catalog.available_count||catalog.unavailable_count!==72-catalog.available_count)throw Error('Archive totals mismatch');
 return {catalog,articles,briefs};
}
