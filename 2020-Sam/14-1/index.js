const fs = require('fs');
const { format } = require('path');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');

let mask;
let memory = new Map();

for(const line of input) {
  if(line.startsWith('mask = ')) {
    mask = line.slice(7);
  } else {
    const lineMatch = line.match(/mem\[([0-9]+)\] = ([0-9]+)/);
    const key = Number(lineMatch[1]);
    const value = Number(lineMatch[2]).toString(2).padStart(36, "0");
    const maskedValue = parseInt(value.split('').map((i, index)=>{
      if(mask[index] === "X") return i;
      return mask[index];
    }).join(''), 2);
    memory.set(key, maskedValue);
  }
}

console.log(Array.from(memory.values()).reduce((a,b) => a+b));