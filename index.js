import { readFile, writeFile } from 'fs';
import { write, read, add } from './jsonFileStorage.js';
import { deck } from './deck.js';

// check for sufficient CLI arguments
if (process.argv.length !== 3) {
  console.error('Usage: node index.js [create|read]');
}
// extract arguments
const [, , operation] = process.argv;

const modifyJsonFile = (filename) => {
  // Read original data from file
  readFile(filename, 'utf-8', (readErr, jsonContentStr) => {
    if (readErr) {
      console.log('Reading error', readErr);
    }

    // Convert data from string to Object
    const jsonContentObj = JSON.parse(jsonContentStr);
    // access array in "deck" key
    // shuffle that array
    const shuffledDeck = shuffle(jsonContentObj.deck);

    // overwriting "deck" value
    add('deck.json', 'deck', shuffledDeck);
  });
};

const deal = (filename) => {
  // Read original data from file
  readFile(filename, 'utf-8', (readErr, jsonContentStr) => {
    if (readErr) {
      console.log('Reading error', readErr);
    }

    // Convert data from string to Object
    const jsonContentObj = JSON.parse(jsonContentStr);
    // access deck and hand arrays
    const { hand } = jsonContentObj;
    const { deck } = jsonContentObj;
    // deal two cards from deck to hand
    hand.push(...deck.splice(0, 2));
    // create new object to write back into deck.json
    const newObj = {
      hand,
      deck,
    };
    // overwrite entire file
    write('deck.json', newObj);
  });
};

// run different functions based on user input
switch (operation.toUpperCase()) {
  case ('CREATE'): {
    const gameObj = {
      hand: [],
      deck,
    };
    write('deck.json', gameObj);
    break;
  }
  case ('READ'):
    read('deck.json');
    break;
  case ('SHUFFLE'):
    modifyJsonFile('deck.json');
    break;
  case ('DEAL'):
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
