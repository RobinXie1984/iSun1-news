import {readFileSync} from 'node:fs';
import {validateStories} from '../src/engine.mjs';
const errors=validateStories(JSON.parse(readFileSync('content/stories.json','utf8')));
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('PASS: sources, claims, 20 distinct bilingual hooks and 2-variant experiments. Semantic truth requires source review.');
