const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split(',').map(i => Number(i));

let memory = new Map();
let lastNumber = 0;

function addToMemory(key, value) {
  if(memory.has(key)) {
    memory.set(key, [...memory.get(key), value]);
  } else {
    memory.set(key, [value]);
  }
  lastNumber = key;
}

for(let n = 0; n < 2020;n++) {
  let number;
  if(input[n] !== undefined) {
    number = input[n];
  } else {
    const m = memory.get(lastNumber);
    if(m.length > 1) {
      number = m[m.length - 1] - m[m.length - 2]
    } else {
      number = 0;
    }
  }
  addToMemory(number, n);
}
console.log(lastNumber);