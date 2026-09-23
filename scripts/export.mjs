import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
const stories=JSON.parse(readFileSync('content/stories.json','utf8'));const base=process.env.ISUN1_ORIGIN||'https://isun1.news';
mkdirSync('work/distribution',{recursive:true});
for(const s of stories){const lines=[`# ${s.title.en}`,'','Status: DRAFT — not posted. Native-platform measurements unavailable.',''];for(const [channel,draft]of Object.entries(s.surfaces)){const url=new URL(base);url.searchParams.set('utm_source',channel);url.searchParams.set('utm_campaign',s.experiment.id);url.hash='story/'+s.id;lines.push(`## ${channel}`,'',draft.en,'',draft.zh,'',`Link: ${url.href}`,'');}writeFileSync(`work/distribution/${s.id}.md`,lines.join('\n'));}
console.log(`Exported ${stories.length} platform packs with campaign links to work/distribution/.`);
