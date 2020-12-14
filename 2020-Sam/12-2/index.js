const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split('\n').map(i=>i.match(/([A-Z])([0-9]+)/).slice(1,3)).map(i=>[i[0],Number(i[1])]);

let Seast = 0;
let Snorth = 0;
let Weast = 10;
let Wnorth = 1;

10, 4
4, -10
-10, -4
-4, 10

for(const [action, amount] of input) {
  switch(action[0]) {
    case 'N':
      Wnorth += amount;
      break;
    case 'E':
      Weast += amount;
      break;
    case 'S':
      Wnorth -= amount;
      break;
    case 'W':
      Weast -= amount;
      break;
    case 'L':
      for(let x = 0;x < amount;x+=90) {
        [Weast, Wnorth] = [-Wnorth, Weast];
      }
      break;
    case 'R':
      for(let x = 0;x < amount;x+=90) {
        [Wnorth, Weast] = [-Weast, Wnorth];
      }
      break;
    case 'F':
      Seast += amount * Weast;
      Snorth += amount * Wnorth;
      break;
  }
  console.log(`${action}${amount.toString().padEnd(4)} | SE: ${Seast.toString().padStart(4)} | SN: ${Snorth.toString().padStart(4)} | WE: ${Weast.toString().padStart(4)} |W N: ${Wnorth.toString().padStart(4)}`)
}

console.log(Seast, Snorth, Weast, Wnorth, Math.abs(Seast) + Math.abs(Snorth))