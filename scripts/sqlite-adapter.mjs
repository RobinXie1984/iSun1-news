import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
export function createDB(path=':memory:'){
 const db=new DatabaseSync(path);db.exec('PRAGMA foreign_keys=ON;');db.exec(readFileSync(new URL('../drizzle/0000_attention.sql',import.meta.url),'utf8'));
 function statement(sql,args=[]){return {bind(...values){return statement(sql,values);},async run(){const r=db.prepare(sql).run(...args);return {success:true,meta:r};},async first(){return db.prepare(sql).get(...args)||null;},async all(){return {results:db.prepare(sql).all(...args)};},sql,args};}
 return {prepare:statement,async batch(stmts){db.exec('BEGIN');try{const result=[];for(const s of stmts)result.push(await s.run());db.exec('COMMIT');return result;}catch(e){db.exec('ROLLBACK');throw e;}},raw:db};
}
