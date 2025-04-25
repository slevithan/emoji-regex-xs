import fs from 'node:fs/promises';
import regex from './regex.mjs';

await fs.writeFile(
  new URL('./index.mjs',import.meta.url),
  `export default()=>/${regex.source}/${regex.flags}`
);
await fs.writeFile(
  new URL('./index.js',import.meta.url),
  `module.exports=()=>/${regex.source}/${regex.flags}`
);
