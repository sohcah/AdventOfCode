const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');
const buses = input[1].split(',').map((i, index) => ({index: BigInt(index), i: i === "x" ? "x" : BigInt(i)})).filter(i=>i.i !== "x").sort((a,b) => Number(b.i - a.i));

let solution;
let x;
const max = BigInt(Math.max(...buses.map(i=>Number(i.i))));
const indexOffset = buses.find(i=>i.i === max).index;
let increment = max;
let slicecount = 1;

for (let t = BigInt(0); !solution; t+=increment) {
  let valid = true;
  for (const bus of buses.slice(slicecount)) {
    if ((t + bus.index - indexOffset) % bus.i !== 0n) {
      valid = false;
      break;
    } else {
      increment *= bus.i;
      slicecount++;
    }
  }
  if(valid) solution = t - indexOffset;
};

console.log(solution);