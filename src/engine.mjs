export const SIGNALS = ['impression','hold5','open','qualified','complete','source','share_intent','share_handoff','copy_link','save','hide','misleading'];
export const RATE_SIGNALS = ['hold5','open','qualified','complete','source','share_intent','share_handoff','copy_link','save','hide','misleading'];
export function assignVariant(visitor, experiment) {
  let hash = 2166136261;
  for (const c of `${experiment.id}:${visitor}`) { hash ^= c.charCodeAt(0); hash = Math.imul(hash,16777619); }
  return experiment.variants[(hash >>> 0) % experiment.variants.length];
}
export function wilson(success, total) {
  if (!total) return null;
  const z=1.96,p=success/total,d=1+z*z/total,center=(p+z*z/(2*total))/d;
  const margin=z*Math.sqrt(p*(1-p)/total+z*z/(4*total*total))/d;
  return [Math.max(0,center-margin),Math.min(1,center+margin)];
}
export function summarize(counts) {
  const n=counts.impression || 0;
  return { ...counts, rates:Object.fromEntries(RATE_SIGNALS.map(k=>[k,n?(counts[k]||0)/n:null])), qualified_interval:wilson(counts.qualified||0,n), confirmed_share:null };
}
export function compareVariants(rows) {
  if(rows.length!==2 || rows.some(r=>(r.impression||0)<200)) return {status:'UNKNOWN',reason:'Need at least 200 observed impressions per variant in this language and channel. No winner yet.'};
  const [a,b]=rows.map(r=>({...r,ci:wilson(r.qualified||0,r.impression)}));
  const [best,other]=(a.qualified/a.impression)>(b.qualified/b.impression)?[a,b]:[b,a];
  if(best.ci[0]<=other.ci[1]) return {status:'UNKNOWN',reason:'The qualified-read intervals overlap. Keep the fixed test running.'};
  if(((best.hide||0)+(best.misleading||0))/best.impression>((other.hide||0)+(other.misleading||0))/other.impression+.02) return {status:'UNKNOWN',reason:'Higher attention came with more negative feedback. Review the framing.'};
  return {status:'CANDIDATE',hook_id:best.hook_id,reason:'Directional evidence only. Confirm at the planned review; do not repeatedly peek and auto-promote.'};
}
export function validateStories(stories) {
  const errors=[],ids=new Set(),experiments=new Set();
  if(!Array.isArray(stories)||!stories.length) return ['At least one verified story is required.'];
  for (const s of stories) {
    const err=m=>errors.push(`${s.id||'?'}: ${m}`);
    if(!/^[a-z0-9-]+$/.test(s.id)||ids.has(s.id))err('Invalid or duplicate story id');ids.add(s.id);
    if(!/^\d{4}-\d{2}-\d{2}$/.test(s.event_date)||!Number.isFinite(Date.parse(s.checked_at)))err('Explicit event and verification dates required');
    if(Date.parse(s.event_date)>Date.now()+86400000)err('Future event date');
    const sources=new Set((s.sources||[]).map(x=>x.id));
    for(const x of s.sources||[]) {try{if(new URL(x.url).protocol!=='https:')err('HTTPS sources required');}catch{err('Invalid source URL');}}
    const claims=new Set((s.claims||[]).map(x=>x.id));
    if(!sources.size||!claims.size)err('Source-backed claims required');
    for(const c of s.claims||[])if(!c.source_ids?.length||c.source_ids.some(x=>!sources.has(x)))err(`Unbacked claim ${c.id}`);
    if(s.hooks?.length!==20)err('Exactly 20 hooks required');
    const hooks=new Set(); const titles=new Set();
    for(const h of s.hooks||[]) {
      if(hooks.has(h.id)||titles.has(h.en?.toLowerCase()))err('Duplicate hook');hooks.add(h.id);titles.add(h.en?.toLowerCase());
      if(!h.en||!h.zh||!h.angle||!h.claim_ids?.length||h.claim_ids.some(x=>!claims.has(x)))err(`Unbacked/bilingual hook ${h.id}`);
      if(/rapidly evolving landscape|game.changer|delve into|marks a significant milestone|震惊全网|引发广泛关注/i.test(h.en+' '+h.zh))err(`Slop in hook ${h.id}`);
    }
    if(!/^[a-z0-9-]+$/.test(s.experiment?.id||'')||experiments.has(s.experiment.id))err('Invalid or reused experiment id');experiments.add(s.experiment?.id);
    for(const lang of ['en','zh'])if(!Array.isArray(s.cover_lines?.[lang])||s.cover_lines[lang].length<1||s.cover_lines[lang].length>4||s.cover_lines[lang].some(line=>typeof line!=='string'||!line.trim()||line.length>18))err(`Missing or oversized ${lang} cover lines`);
    if(s.experiment?.variants?.length!==2||new Set(s.experiment.variants).size!==2||s.experiment.variants.some(x=>!hooks.has(x)))err('Two distinct valid experimental hooks required');
    for(const lang of ['en','zh'])if(!s.title?.[lang]||!s.summary?.[lang]||!s.paragraphs?.[lang]?.length||!s.uncertainty?.[lang])err(`Missing ${lang} narrative or boundary`);
    for(const k of ['x','linkedin','wechat','video'])if(!s.surfaces?.[k]?.en||!s.surfaces?.[k]?.zh)err(`Missing ${k} draft`);
  }
  return errors;
}
