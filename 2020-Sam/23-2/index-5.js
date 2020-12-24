const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('').map(i => Number(i));
for(var i = 10;i <= 1000000;i++) {
  input.push(i);
}

const max   = 1000000;
const moves = 10000000;

class Cup {
  constructor(value, prev, next) {
    this.value = value;
    if(prev && next) {
      prev.next = next.prev = this;
      this.prev = prev;
      this.next = next;
    }
  }

  linkNext(next) {
    this.next = next;
    next.prev = this;
  }
}

let current = new Cup(input[0]);
let cups = new Map();
cups.set(input[0], current);
let latest = current;

for(const i of input.slice(1)) {
  latest = new Cup(i, latest, current);
  cups.set(i, latest);
}

for(let move = 0;move < moves;move++) {
  const removed = current.next;
  current.linkNext(current.next.next.next.next);

  let destination = cups.get(current.value - 1);
  if(current?.value <= 1) {
    destination = cups.get(max);
  }
  while(!destination || removed === destination || removed.next === destination || removed.next.next === destination) {
    if(destination?.value <= 1) {
      destination = cups.get(max);
    } else {
      destination = cups.get(destination?.value - 1);
    }
  }

  removed.next.next.linkNext(destination.next);
  destination.linkNext(removed);

  current = current.next;
}

let array = [];
let c = cups.get(1).prev.prev;
for(var i = 0;i < 9;i++) {
  array.push(c.value);
  c = c.next;
}

console.log(array[3], array[4], array[3] * array[4]);