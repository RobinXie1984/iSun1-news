import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
// Build canonical runtime first; use its reviewed public bytes, never private archives.
const source=readFileSync('dist/server/index.js','utf8');
const marker='export default {';if(source.split(marker).length!==2)throw Error('Canonical runtime shape changed');
const reader=readFileSync('src/independent-reader.mjs','utf8').replace('export function','function');
mkdirSync('work/independent-global/dist',{recursive:true});
const output=source.replace(marker,'const canonicalRuntime = {')+'\n'+reader+'\nexport default independentReader(canonicalRuntime);\n';
if(/siwc_[a-zA-Z0-9_-]{20,}|github_pat_[a-zA-Z0-9_]{20,}|\/Users\/(?:robin|headlessnick)\//.test(output))throw Error('Private material in public reader');
writeFileSync('work/independent-global/dist/index.mjs',output);
console.log(JSON.stringify({canonical_worker_sha256:createHash('sha256').update(source).digest('hex'),independent_worker_sha256:createHash('sha256').update(output).digest('hex')}));
