const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');
const time = Number(input[0]);
const buses = input[1].split(',').filter(i => i !== "x").map(i => Number(i));

console.log(time, buses);

let solution;

for (let t = time; !solution; t++) {
  for (const bus of buses) {
    console.log(t, bus, t/bus);
    if ((t / bus) % 1 === 0) {
      solution = { bus, time: t };
    }
  }
};

console.log(solution, solution.bus * (solution.time - time));