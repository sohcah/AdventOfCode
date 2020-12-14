const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split('\n').map(i=>i.match(/([A-Z])([0-9]+)/).slice(1,3)).map(i=>[i[0],Number(i[1])]);

let direction = 0;
let east = 0;
let north = 0;

for(const [action, amount] of input) {
  switch(action[0]) {
    case 'N':
      north += amount;
      break;
    case 'E':
      east += amount;
      break;
    case 'S':
      north -= amount;
      break;
    case 'W':
      east -= amount;
      break;
    case 'L':
      direction = (direction - amount + 360) % 360;
      break;
    case 'R':
      direction = (direction + amount) % 360;
      break;
    case 'F':
      switch (direction) {
        case 0:
          east += amount;
          break;
        case 90:
          north -= amount;
          break;
        case 180:
          east -= amount;
          break;
        case 270:
          north += amount;
          break;
      }
      break;
  }
  console.log(`${action}${amount.toString().padEnd(4)} | E: ${east.toString().padStart(4)} | N: ${north.toString().padStart(4)} | D: ${direction.toString().padStart(4)}`)
}

console.log(east, north, Math.abs(east) + Math.abs(north))