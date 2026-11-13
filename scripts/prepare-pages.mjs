import { cp, mkdir, readdir } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
const nestedOutput = new URL('../dist/portfolio/', import.meta.url);
await mkdir(nestedOutput, { recursive: true });
for (const entry of await readdir(output)) {
  if (entry === 'portfolio') continue;
  await cp(new URL(entry, output), new URL(entry, nestedOutput), { recursive: true });
}
