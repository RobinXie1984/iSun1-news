// Independent public reader: stories and assets need neither Sites nor a database.
// The original Sites database remains intact; this runtime collects no observations.
export function independentReader(canonical) {
 const unavailable=()=>new Response(JSON.stringify({error:'observations_unavailable',status:'UNKNOWN',reason:'Historical observations remain on the original runtime. This reader collects no new signals.'}),{status:503,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});
 return {async fetch(request) {
  const url=new URL(request.url);let response;
  if(['/api/metrics','/api/signal','/api/forget'].includes(url.pathname))response=unavailable();
  else {
   if(url.pathname==='/api/feed'){url.searchParams.set('preview','1');url.searchParams.delete('measure');request=new Request(url,request);}
   response=await canonical.fetch(request,{});
   if(url.pathname==='/app.js'&&request.method==='GET'&&response.ok){
    let app=await response.text();
    const changes=[
     ["consent=safeGet('isun1-signals')==='yes'&&!preview","consent=false"],
     ["if(!safeGet('isun1-signals')&&!preview)$('#consent').hidden=false;","$('#consent').hidden=true;"],
     ["t(`Anonymous signals: ${consent?'on':'off'}`,`匿名信号：${consent?'开启':'关闭'}`)","t('Independent reader · analytics paused','独立阅读版 · 数据采集暂停')"]
    ];
    for(const [from,to] of changes){if(!app.includes(from))throw Error('Independent reader adaptation needs review');app=app.replace(from,to);}
    app+="\n$('#consent').hidden=true;$('#allow').disabled=true;$('#forget').disabled=true;\n";
    response=new Response(app,{headers:response.headers});
   }
  }
  const headers=new Headers(response.headers);headers.set('X-iSun1-Runtime','independent');
  return new Response(response.body,{status:response.status,headers});
 }};
}
