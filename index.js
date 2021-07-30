import { readFile } from 'fs';
import colourReader from './functions.js';

if (process.argv.length <= 2) {
  console.log('Usage: node index.js <filename>');
  process.exit(1);
}
const filename = process.argv[2];
if (!filename.endsWith('.css')) {
  console.log('Invalid file. Only CSS files accepted');
  process.exit(2);
}

readFile(filename, 'utf8', colourReader);
