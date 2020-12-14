const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split('\n').map(i=>i.split(' '));

for(let m = 0; m < input.length;m++) {
  const indexesVisited = new Set();
  let pastIndex = 0;
  let index = 0;
  let acc = 0;
  while(true) {
    if(indexesVisited.has(index)) {
      // console.warn('FOUND LOOP.', pastIndex, index, acc, m);
      break;
    }
    if(index >= input.length) {
      console.log('FINISHED.', pastIndex, index, acc);
      break;
    }
    indexesVisited.add(index);
    pastIndex = index;
    const instruction = input[index][0];
    const value = Number(input[index][1]);
    if((instruction === "jmp" && index !== m) || (index === m && instruction === "nop")) {
      index += value;
    } else if(instruction === "acc") {
      acc += value;
      index++;
    } else if((instruction === "nop" && index !== m) || (index === m && instruction === "jmp")) {
      index++;
    } else {
      console.error('Invalid Instruction:', instruction)
    }
  }
}