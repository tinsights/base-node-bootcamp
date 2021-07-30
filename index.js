import { readFile } from 'fs';
import { start } from 'repl';

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

function colourReader(error, content) {
  if (error) throw error;
  const output = {};
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].includes('#')) {
      const startIndex = lines[i].indexOf('#');
      const colour = lines[i].substring(startIndex, lines[i].length - 1);
      if (output[colour]) {
        output[colour] += 1;
      }
      else {
        output[colour] = 1;
      }
    }
  }
  let i = 0;
  while (Object.keys(output)[i]) {
    console.log(`${[Object.keys(output)[i]]}: ${output[Object.keys(output)[i]]}`);
    i += 1;
  }
}
