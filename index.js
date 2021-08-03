import { readFile, writeFile } from 'fs';
import {
  write, read, add, edit,
} from './jsonFileStorage.js';
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
    write('deck.json', gameObj, (err, jsonContentObj) => {
      console.log('success!'); });
    break;
  case ('read'):
    read('deck.json', (err, jsonContentObj) => {
      console.log(jsonContentObj); });
    break;
  case ('shuffle'):
    edit('deck.json', shuffle, () => {});
    break;
  case ('deal'):
    edit('deck.json', deal, () => {});
    break;
  default:
    console.error('Unknown operation');
    process.exit(1);
}

function shuffle(err, jsonObj) {
  if (err) {
    console.trace('ERROR');
  }
  const { deck } = jsonObj;
  console.log(deck);
  let max = deck.length; let toSwap;
  let index;

  // While there remain elements to shuffle…
  while (max) {
    // Pick a remaining element…
    index = Math.floor(Math.random() * max--);

    // And swap it with the current element.
    toSwap = deck[max];
    deck[max] = deck[index];
    deck[index] = toSwap;
  }

  jsonObj.deck = deck;
}

function deal(err, jsonObj) {
  const { deck } = jsonObj;
  const { hand } = jsonObj;
  hand.push(deck.pop(), deck.pop());

  jsonObj.deck = deck;
  jsonObj.hand = hand;
}
