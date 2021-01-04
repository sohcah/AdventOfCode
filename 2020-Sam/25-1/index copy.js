const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n').map(i => Number(i));

let cardLoopSize;

for(let i = 0n;i < 1000000n;i++) {
  let value = 1n;
  for(let a = 0n;a < i;a++) {
    value *= 7n;
  }

  // NOTE: Didn't realise % should be done in loop. Mis-read the problem.
  if(value % 20201227n === BigInt(input[0])) {
    cardLoopSize = i;
    break;
  }
  if(i % 1000n === 0n) console.log(i);
}

let encryptionKey = 1n;
for(let a = 0;a < cardLoopSize;a++) {
  encryptionKey *= BigInt(input[1]);
}

console.log(cardLoopSize)
console.log(encryptionKey % 20201227n);