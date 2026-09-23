import {createServer} from 'node:http';
import {mkdirSync} from 'node:fs';
import worker from '../dist/server/index.js';
import {createDB} from './sqlite-adapter.mjs';
mkdirSync('work',{recursive:true});const DB=createDB('work/preview.sqlite');
const port=Number(process.env.PORT||4173);
createServer(async(req,res)=>{try{
 const origin=`http://127.0.0.1:${port}`;const body=['GET','HEAD'].includes(req.method)?undefined:req;
 const request=new Request(new URL(req.url,origin),{method:req.method,headers:req.headers,body,...(body?{duplex:'half'}:{})});
 const response=await worker.fetch(request,{DB});res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
}catch(e){res.writeHead(500);res.end('Preview request failed');}}).listen(port,'127.0.0.1',()=>console.log(`iSun1 preview http://127.0.0.1:${port}/?preview=1`));
