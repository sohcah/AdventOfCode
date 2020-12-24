const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('').map(i => Number(i));
for(var i = 9;i <= 1000000;i++) {
  input.push(i);
}

// const min = Math.min(...input);
// const max = Math.max(...input);
const min = 1;
// const max = 9;
const max = 1000000;

let prev = new Uint32Array(input.slice());
let cups = new Uint32Array(input.slice());

const start = Date.now();

for (let move = 0; move < 10000; move++) {
  // if(move !== 0) {
  //   const c = cups[0];
  //   cups.copyWithin(0, 1);
  //   cups[cups.length - 1] = c;
  // }
  let removedCups = cups.slice(1, 4);
  let rc = new Set(removedCups);
  let destination = cups[0] - 1;
  while (rc.has(destination)) {
    destination -= 1;
    if (destination < min) destination = max;
  }
  // let destinationIndex = cups.indexOf(destination);
  let destinationIndex = 10;
  cups.copyWithin(1, 4, destinationIndex + 1);
  cups.set(removedCups, destinationIndex - 2);

  if(move % 1000 === 0) console.log(move, Date.now() - start);

  // prev.set(cups);
}

console.log(`--final--\ncups: ${cups.slice(cups.indexOf(1), cups.indexOf(1) + 5)}`)