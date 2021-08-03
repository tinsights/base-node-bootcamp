import { readFile, writeFile } from 'fs';
import { write, read, add } from './jsonFileStorage.js';
import { deck } from './deck.js';

if (process.argv.length !== 3) {
  console.error('Usage: node index.js [create|read]');
}

const [, , operation] = process.argv;

switch (operation.toLowerCase()) {
  case ('create'):
    const gameObj = {
      hand: [],
      deck,
    };
    write('deck.json', gameObj);
    break;
  case ('read'):
    add('deck.json', shuffle);
    break;
  case ('shuffle'):
    shuffle('deck.json');
    break;
  case ('deal'):
    deal('deck.json');
    break;
  default:
    console.error('Unknown operation');
    process.exit(1);
}

function shuffle(array) {
  let max = array.length; let toSwap;
  let index;

  // While there remain elements to shuffle…
  while (max) {
    // Pick a remaining element…
    index = Math.floor(Math.random() * max--);

    // And swap it with the current element.
    toSwap = array[max];
    array[max] = array[index];
    array[index] = toSwap;
  }

  return array;
}
