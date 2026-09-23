import {assignVariant,SIGNALS,RATE_SIGNALS,summarize,compareVariants} from './engine.mjs';
const DAY=86400000;
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'};
const json=(v,status=200,extra={})=>new Response(JSON.stringify(v),{status,headers:{...headers,'Content-Type':'application/json; charset=utf-8',...extra}});
function cookie(req,name){return (req.headers.get('Cookie')||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(name+'='))?.slice(name.length+1);}
function visitor(req){const v=cookie(req,'isun1_v');return /^[a-f0-9-]{36}$/.test(v||'')?v:null;}
function channel(url){const c=url.searchParams.get('utm_source')||'direct';return ['x','linkedin','wechat','video','direct'].includes(c)?c:'other';}
async function rateLimit(req,env,scope,limit,windowMs){
  const now=Date.now(),window=Math.floor(now/windowMs);
  // Cloudflare supplies this header. Store a rotating abuse bucket, never a raw IP.
  const address=req.headers.get('CF-Connecting-IP')||'local-preview';
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(`${scope}:${window}:${address}`));
  const key=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
  const row=await env.DB.prepare('INSERT INTO rate_limits(bucket,hits,expires_at) VALUES (?,1,?) ON CONFLICT(bucket) DO UPDATE SET hits=hits+1 RETURNING hits').bind(key,(window+1)*windowMs).first();
  if(row.hits===1)await env.DB.prepare('DELETE FROM rate_limits WHERE expires_at<?').bind(now).run();
  return row.hits<=limit;
}
async function boundedJSON(req,max=2048){
  if(Number(req.headers.get('content-length'))>max)throw new Error('payload');
  const reader=req.body?.getReader();if(!reader)throw new Error('payload');let n=0;const chunks=[];
  while(true){const {value,done}=await reader.read();if(done)break;n+=value.byteLength;if(n>max){await reader.cancel();throw new Error('payload');}chunks.push(value);}
  const bytes=new Uint8Array(n);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  return JSON.parse(new TextDecoder().decode(bytes));
}
async function feed(req,env,url){
  const preview=url.searchParams.get('preview')==='1';
  const lang=url.searchParams.get('lang')==='zh'?'zh':'en';
  const tracking=!preview&&url.searchParams.get('measure')==='1';
  let v=visitor(req);
  if(v&&tracking){const issued=await env.DB.prepare('SELECT id FROM exposures WHERE visitor=? LIMIT 1').bind(v).first();if(!issued)v=null;}
  if(!v&&tracking&&!await rateLimit(req,env,'mint',60,600000))return json({error:'rate_limited'},429,{'Retry-After':'600'});
  v=v||crypto.randomUUID();
  const ch=channel(url),now=Date.now();
  // A day is the bounded session. Reloads do not mint new measured exposures.
  const session=String(Math.floor(now/DAY));
  const list=[];
  for(const story of STORIES){
    let hookId=preview?story.experiment.variants[0]:assignVariant(v,story.experiment);
    let ticket=null;
    if(tracking){
      ticket=crypto.randomUUID();
      await env.DB.prepare('INSERT OR IGNORE INTO exposures (id,visitor,session,story_id,experiment_id,hook_id,language,channel,created_at) VALUES (?,?,?,?,?,?,?,?,?)').bind(ticket,v,session,story.id,story.experiment.id,hookId,lang,ch,now).run();
      const row=await env.DB.prepare('SELECT id,hook_id FROM exposures WHERE visitor=? AND session=? AND story_id=? AND experiment_id=? AND language=? AND channel=?').bind(v,session,story.id,story.experiment.id,lang,ch).first();ticket=row.id;hookId=row.hook_id;
    }
    // A reused ticket must display the hook its observations are attributed to.
    const hook=story.hooks.find(h=>h.id===hookId);
    if(!hook)return json({error:'experiment_configuration_mismatch'},503);
    list.push({...story,selected_hook:hookId,headline:hook[lang],ticket});
  }
  return json({stories:list,language:lang,preview,measurement:tracking?'anonymous':'off',latest_event_date:STORIES.map(s=>s.event_date).sort().at(-1),version:'0.1.2'},200,tracking?{'Set-Cookie':`isun1_v=${v}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${url.protocol==='https:'?'; Secure':''}`}:{ });
}
async function signal(req,env,url){
  if(req.headers.get('Origin')!==url.origin)return json({error:'origin'},403);
  if(!req.headers.get('Content-Type')?.startsWith('application/json'))return json({error:'content_type'},415);
  const v=visitor(req);if(!v)return json({error:'session'},401);
  const body=await boundedJSON(req);
  if(Object.keys(body).some(k=>!['ticket','kind'].includes(k))||!SIGNALS.includes(body.kind)||!/^[a-f0-9-]{36}$/.test(body.ticket||''))return json({error:'invalid_signal'},400);
  if(!await rateLimit(req,env,'signal',600,300000))return json({error:'rate_limited'},429,{'Retry-After':'300'});
  const row=await env.DB.prepare('SELECT * FROM exposures WHERE id=? AND visitor=?').bind(body.ticket,v).first();
  const now=Date.now();if(!row||now-row.created_at>DAY*2)return json({error:'expired_or_unknown_ticket'},400);
  const kinds=(await env.DB.prepare('SELECT kind,created_at FROM signals WHERE exposure_id=?').bind(row.id).all()).results;
  const seen=Object.fromEntries(kinds.map(x=>[x.kind,x.created_at]));
  if(body.kind!=='impression'&&!seen.impression)return json({error:'impression_required'},409);
  if(body.kind==='hold5'&&now-seen.impression<4800)return json({error:'too_early'},409);
  if(['qualified','complete'].includes(body.kind)&&(!seen.open||now-seen.open<14500))return json({error:'active_read_required'},409);
  if(body.kind==='complete'&&!seen.qualified)return json({error:'qualified_required'},409);
  if(['share_handoff','copy_link'].includes(body.kind)&&!seen.share_intent)return json({error:'share_intent_required'},409);
  await env.DB.prepare('INSERT OR IGNORE INTO signals(exposure_id,kind,created_at) VALUES (?,?,?)').bind(row.id,body.kind,now).run();
  return json({ok:true});
}
async function metrics(env,url){
  const lang=url.searchParams.get('lang')==='zh'?'zh':'en';const ch=channel(url);
  // Earliest actual impression per visitor/experiment/cohort is the comparison unit.
  const rows=(await env.DB.prepare(`WITH measured AS (
    SELECT e.*,i.created_at AS shown_at,ROW_NUMBER() OVER(PARTITION BY e.visitor,e.experiment_id,e.language,e.channel ORDER BY i.created_at,e.id) AS rn
    FROM exposures e JOIN signals i ON i.exposure_id=e.id AND i.kind='impression'
    WHERE e.language=? AND e.channel=?
  ) SELECT e.story_id,e.experiment_id,e.hook_id,s.kind,COUNT(*) AS n
  FROM measured e JOIN signals s ON s.exposure_id=e.id WHERE e.rn=1
  GROUP BY e.story_id,e.experiment_id,e.hook_id,s.kind`).bind(lang,ch).all()).results;
  const current=new Set(STORIES.map(s=>s.experiment.id));
  const snapshots=new Map(STORIES.map(s=>[s.experiment.id,s]));
  for(const story of HISTORY)if(!snapshots.has(story.experiment.id)&&rows.some(r=>r.story_id===story.id&&r.experiment_id===story.experiment.id))snapshots.set(story.experiment.id,story);
  const experiments=[...snapshots.values()].map(story=>{
    const variants=story.experiment.variants.map(id=>{const counts=Object.fromEntries(SIGNALS.map(k=>[k,0]));for(const r of rows)if(r.story_id===story.id&&r.experiment_id===story.experiment.id&&r.hook_id===id)counts[r.kind]=r.n;return summarize({hook_id:id,headline:story.hooks.find(h=>h.id===id)[lang],...counts});});
    const suppression=variants.some(v=>v.impression>0)&&variants.some(v=>v.impression<10);
    return {story_id:story.id,experiment_id:story.experiment.id,title:story.title,historical:!current.has(story.experiment.id),hypothesis:story.experiment.hypothesis,suppressed:suppression,variants:suppression?variants.map(v=>({...v,...Object.fromEntries(SIGNALS.map(k=>[k,null])),rates:Object.fromEntries(RATE_SIGNALS.map(k=>[k,null])),qualified_interval:null})):variants,decision:suppression?{status:'UNKNOWN',reason:'Small-cohort counts are private until both variants have 10 observed readers.'}:compareVariants(variants)};
  });
  const returns=await env.DB.prepare(`WITH first_seen AS (
    SELECT e.visitor,MIN(s.created_at) AS first_at FROM exposures e JOIN signals s ON s.exposure_id=e.id AND s.kind='impression' GROUP BY e.visitor
  ) SELECT COUNT(*) AS eligible,SUM(CASE WHEN EXISTS(SELECT 1 FROM exposures e JOIN signals s ON s.exposure_id=e.id AND s.kind='impression' WHERE e.visitor=f.visitor AND s.created_at>=f.first_at+86400000 AND s.created_at<f.first_at+604800000) THEN 1 ELSE 0 END) AS returned FROM first_seen f WHERE first_at<=?`).bind(Date.now()-7*DAY).first();
  return json({experiments,language:lang,channel:ch,return_7d:{eligible:returns.eligible>=10?returns.eligible:null,returned:returns.eligible>=10?(returns.returned||0):null,rate:returns.eligible>=10?(returns.returned||0)/returns.eligible:null},note:'First observed visitor per experiment/language/channel. Small cohorts suppressed. Signals are browser observations, not proof of attention. Share handoff is not confirmed publication. No cross-platform ranking claims.'});
}
export default {
  async fetch(req,env){
    const url=new URL(req.url);
    try{
      if(url.pathname==='/api/health')return json({ok:true,stories:STORIES.length,storage:!!env.DB});
      if(req.method==='GET'&&url.pathname==='/api/feed')return await feed(req,env,url);
      if(req.method==='POST'&&url.pathname==='/api/signal')return await signal(req,env,url);
      if(req.method==='GET'&&url.pathname==='/api/metrics')return await metrics(env,url);
      if(req.method==='POST'&&url.pathname==='/api/forget'){
        if(req.headers.get('Origin')!==url.origin)return json({error:'origin'},403);
        const v=visitor(req);if(v)await env.DB.batch([env.DB.prepare('DELETE FROM signals WHERE exposure_id IN (SELECT id FROM exposures WHERE visitor=?)').bind(v),env.DB.prepare('DELETE FROM exposures WHERE visitor=?').bind(v)]);
        return json({ok:true},200,{'Set-Cookie':'isun1_v=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'});
      }
      if(req.method!=='GET'&&req.method!=='HEAD')return json({error:'method'},405);
      if(url.pathname==='/robots.txt')return new Response('User-agent: *\nAllow: /\nDisallow: /api/\n');
      const picture=Object.hasOwn(MEDIA,url.pathname)?MEDIA[url.pathname]:null;
      if(picture)return new Response(req.method==='HEAD'?null:Uint8Array.from(atob(picture),c=>c.charCodeAt(0)),{headers:{...headers,'Content-Type':'image/jpeg','Cache-Control':'public, max-age=3600'}});
      const asset=Object.hasOwn(ASSETS,url.pathname)?ASSETS[url.pathname]:undefined;
      if(asset!==undefined)return new Response(req.method==='HEAD'?null:asset,{headers:{...headers,'Content-Type':url.pathname.endsWith('.js')?'text/javascript; charset=utf-8':url.pathname.endsWith('.css')?'text/css; charset=utf-8':'text/html; charset=utf-8','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'self'"}});
      return json({error:'not_found'},404);
    }catch(error){
      if(error.message==='payload'||error instanceof SyntaxError)return json({error:'invalid_payload'},400);
      console.error(JSON.stringify({event:'request_failure',path:url.pathname,error_type:error.name}));
      return json({error:'temporarily_unavailable'},503);
    }
  }
};
