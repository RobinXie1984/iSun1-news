// Actual app + Olympics module with controllable network completion order.
// Copy to tests/ in any checkout; optionally set ISUN1_ROOT when running elsewhere.
// Browser layout and real network behavior are outside this harness.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import vm from 'node:vm';

const root = process.env.ISUN1_ROOT || fileURLToPath(new URL('../',import.meta.url));
const app = readFileSync(resolve(root,'public/app.js'),'utf8');
const olympics = readFileSync(resolve(root,'public/olympics.js'),'utf8');
const packets = JSON.parse(readFileSync(resolve(root,'content/stories.json'),'utf8'));
const flush = () => new Promise(resolve => setImmediate(resolve));

function browser() {
  const nodes = new Map(), requests = [], listeners = new Map(), timers = new Map();
  let sequence = 0, fragment = '';
  const element = () => ({innerHTML:'',textContent:'',dataset:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},addEventListener(){},removeEventListener(){},contains(){return true;},showModal(){},close(){}});
  const node = selector => { if (!nodes.has(selector)) nodes.set(selector,element()); return nodes.get(selector); };
  const main = node('#main');
  const location = {search:'',href:'https://example.test/',get hash(){return fragment;},set hash(value){fragment=value.startsWith('#')?value:'#'+value;}};
  const document = {hidden:false,querySelector:node,querySelectorAll:()=>[],body:element(),documentElement:{setAttribute(){}},addEventListener(){},removeEventListener(){}};
  const window = {location,addEventListener(name,fn){if(!listeners.has(name))listeners.set(name,[]);listeners.get(name).push(fn);},removeEventListener(){},scrollTo(){}};
  const context = vm.createContext({console,document,window,location,URL,URLSearchParams,Blob,Date,
    localStorage:{getItem:key=>key==='isun1-signals'?'yes':null,setItem(){}},
    navigator:{},setTimeout,clearTimeout,
    setInterval:fn=>{timers.set(++sequence,fn);return sequence;},clearInterval:id=>timers.delete(id),
    IntersectionObserver:class {observe(){}disconnect(){}},
    fetch:(url,options)=>new Promise((resolve,reject)=>requests.push({url,options,resolve,reject}))
  });
  vm.runInContext(olympics,context,{filename:'public/olympics.js'});
  vm.runInContext(app,context,{filename:'public/app.js'});
  const feed = () => requests.filter(request=>request.url.startsWith('/api/feed'));
  const archive = () => requests.find(request=>request.url==='/api/olympics');
  const topic = packets[0].id, path = 'articles/'+topic+'/chatgpt/english.md';
  const archiveData = {catalog:{articles:[{provider:'chatgpt',model:'Synthetic fixture',language:'en',topic,event_date:packets[0].event_date,source_brief:'briefs/'+topic+'.md',article_path:path,status:'available'}]},articles:{[path]:'# Synthetic fixture\n\nA captured article used only by this test.'},briefs:{['briefs/'+topic+'.md']:'# Test brief'}};
  return {main,requests,feed,archive,
    reload(){vm.runInContext('load()',context);},
    async resolveFeed(index){feed()[index].resolve({ok:true,json:async()=>({stories:structuredClone(packets)})});await flush();},
    async resolveArchive(){assert.ok(archive(),'Olympics archive request exists');archive().resolve({ok:true,json:async()=>archiveData});await flush();},
    async rejectFeed(index){feed()[index].reject(new Error('Synthetic obsolete network failure'));await flush();},
    async navigate(route){vm.runInContext('navigate('+JSON.stringify(route)+')',context);for(const fn of listeners.get('hashchange')||[])fn({type:'hashchange'});await flush();},
    close(){window.iSunOlympics.dispose();vm.runInContext('cleanup()',context);}
  };
}

test('an obsolete feed rejection cannot replace a newer complete Olympics view',async()=>{
  const b=browser();
  try {
    b.reload();
    assert.equal(b.feed().length,2);
    await b.resolveFeed(1);
    await b.resolveArchive();
    assert.match(b.main.innerHTML,/op-voices/);
    const current=b.main.innerHTML;
    await b.rejectFeed(0);
    assert.equal(b.main.innerHTML,current,'late failure must not render an error over the newer page');
    for(const request of b.feed()){
      const url=new URL(request.url,'https://example.test');
      assert.equal(url.searchParams.get('preview'),'1');
      assert.equal(url.searchParams.has('measure'),false,'stored consent must not measure pilot feed loads');
    }
    assert.equal(b.requests.some(request=>request.url==='/api/signal'),false);
  } finally { b.close(); }
});

test('leaving Olympics cancels its pending render before the next feed completes',async()=>{
  const b=browser();
  try {
    await b.resolveFeed(0);
    assert.ok(b.archive());
    await b.navigate('stories');
    assert.equal(b.feed().length,2,'legacy route starts its own feed request');
    const transition=b.main.innerHTML;
    await b.resolveArchive();
    assert.equal(b.main.innerHTML,transition,'old archive response must not write after navigation');
    assert.doesNotMatch(b.main.innerHTML,/op-voices/);
    await b.resolveFeed(1);
    assert.match(b.main.innerHTML,/class="lead"/,'the current legacy route still renders normally');
    assert.doesNotMatch(b.main.innerHTML,/op-voices/);
  } finally { b.close(); }
});
