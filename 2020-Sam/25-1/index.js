const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n').map(i => Number(i));

let cardLoopSize;

// NOTE: After realising % should be done in loop, and realising I could now seriously optimise it.

let value = 1;
for(let i = 0;i < 1000000000;i++) {
  value = (value * 7) % 20201227;
  if(value === input[0]) {
    cardLoopSize = i + 1;
    break;
  }
}

let encryptionKey = 1n;
for(let a = 0;a < cardLoopSize;a++) {
  encryptionKey = encryptionKey * BigInt(input[1]) % 20201227n;
}

console.log('Card Loop Size', cardLoopSize)
console.log('Encryption Key', encryptionKey);