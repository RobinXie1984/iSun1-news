import {mkdirSync,writeFileSync} from 'node:fs';
const origin=process.env.ISUN1_ORIGIN||'http://127.0.0.1:4173';
const checked_at=new Date().toISOString(),observations=[];
for(const lang of ['en','zh']){try{const r=await fetch(`${origin}/api/metrics?lang=${lang}&utm_source=direct`,{signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error(`HTTP ${r.status}`);const data=await r.json();observations.push({language:lang,status:'OBSERVED',data});}catch(error){observations.push({language:lang,status:'UNKNOWN',reason:error.message});}}
mkdirSync('work/observations',{recursive:true});const path=`work/observations/${checked_at.replace(/[:.]/g,'-')}.json`;writeFileSync(path,JSON.stringify({checked_at,origin,observations},null,2)+'\n');
console.log(JSON.stringify({path,cohorts:observations.map(x=>({language:x.language,status:x.status,decisions:x.data?.experiments.map(e=>({experiment:e.experiment_id,...e.decision}))||null}))},null,2));
