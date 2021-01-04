const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n').map(i => Number(i));

const cache = new Map();

let cardLoopSize;

// NOTE: After realising % should be done in loop, didn't replan code.

for(let i = 0;i < 1000000;i++) {
  let value = 1;
  for(let a = 0;a < i;a++) {
    value = cache.get(value) || (value * 7) % 20201227;
    if(!cache.has(value)) cache.set(value);
  }
  if(value === input[0]) {
    cardLoopSize = i;
    break;
  }
  if(i % 10000 === 0) console.log(i);
}

let encryptionKey = 1n;
for(let a = 0;a < cardLoopSize;a++) {
  encryptionKey = encryptionKey * BigInt(input[1]) % 20201227n;
}

console.log(cardLoopSize)
console.log(encryptionKey % 20201227n);