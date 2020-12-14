const fs = require('fs');
const { format } = require('path');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');

let mask;
let memory = new Map();

for (const line of input) {
  if (line.startsWith('mask = ')) {
    mask = line.slice(7);
  } else {
    const lineMatch = line.match(/mem\[([0-9]+)\] = ([0-9]+)/);
    const key = Number(lineMatch[1]).toString(2).padStart(36, "0");
    const value = Number(lineMatch[2]);
    const maskedKeys = key.split('').map((i, index) => {
      if (mask[index] === "0") return i;
      return mask[index];
    }).reduce((a,b) => {
      if(b === "X") {
        return [
          ...a.map(i=>i + "0"),
          ...a.map(i=>i + "1"),
        ]
      }
      return a.map(i=>i + b);
    },[""]);
    for(const key of maskedKeys) {
      memory.set(parseInt(key, 2), value)
    }
  }
}

console.log(Array.from(memory.values()).reduce((a, b) => a + b, 0));