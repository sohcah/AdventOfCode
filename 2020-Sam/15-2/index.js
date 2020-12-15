const startTime = Date.now();
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split(',').map(i => Number(i));
const length = input.length;

// let memory = new Map();
let memory = new Uint32Array(30000000);
let lastNumber = 0;

for (let n = 0; true; n++) {
  let number;
  if (n < length) {
    number = input[n];
  } else {
    number = n - 1 - (lastNumber ?? (n - 1))
  }
  // lastNumber = memory.get(number);
  // memory.set(number, n);
  // lastNumber = memory.lastIndexOf(number, n - 1);
  // if(lastNumber === -1) lastNumber = null;
  // memory.set([number], n);
  // memory[n] = number;
  lastNumber = memory[number] - 1;
  if(lastNumber === -1) lastNumber = null;
  memory[number] = n + 1;
  if (n === 29999999) {
    // console.log(memory);
    console.log(`Solution: ${number}`)
    console.log(`Time: ${Date.now() - startTime}ms`)
    break;
  };
}