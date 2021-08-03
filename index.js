import { readFile, writeFile } from 'fs';
import { write, read, add } from './jsonFileStorage.js';
import { deck } from './deck.js';

if (process.argv.length !== 3) {
  console.error('Usage: node index.js [create|read]');
}

const [, , operation] = process.argv;

const modifyJsonFile = (filename) => {
  // Read original data from file
  readFile(filename, 'utf-8', (readErr, jsonContentStr) => {
    if (readErr) {
      console.log('Reading error', readErr);
    }

    // Convert data from string to Object
    let jsonContentObj = JSON.parse(jsonContentStr);

    // TODO: Modify the data however we would like
    jsonContentObj = shuffle(jsonContentObj);

    // Convert data from Object to string
    const updatedJsonContentStr = JSON.stringify(jsonContentObj);

    // Write updated data to file
    writeFile(filename, updatedJsonContentStr, (writeErr) => {
      if (writeErr) {
        console.log('writing error', writeErr);
      }
    });
  });
};

switch (operation.toLowerCase()) {
  case ('create'):
    write('deck.json', deck);
    break;
  case ('read'):
    read('deck.json');
    break;
  case ('shuffle'):
    modifyJsonFile('deck.json');
    console.log(operation);
    break;
  default:
    console.error('Unknown operation');
    process.exit(1);
}

function shuffle(array) {
  let m = array.length; let toSwap; let
    index;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    index = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    toSwap = array[m];
    array[m] = array[index];
    array[index] = toSwap;
  }

  return array;
}
