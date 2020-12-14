const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split('\n').map(i=>i.split(' '));
const indexesVisited = new Set();

let index = 0;
let acc = 0;
while(true) {
  if(indexesVisited.has(index)) {
    console.warn('FOUND LOOP.', index, acc);
    break;
  }
  indexesVisited.add(index);
  const instruction = input[index][0];
  const value = Number(input[index][1]);
  if(instruction === "jmp") {
    index += value;
  } else if(instruction === "acc") {
    acc += value;
    index++;
  } else if(instruction === "nop") {
    index++;
  } else {
    console.error('Invalid Instruction:', instruction)
  }
}