const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split('\n');

const passes = input.map(value => {
  let row = 0;
  let column = 0;
  for(let i = 0;i < 10;i++) {
    let l = value[i];
    if(l === "B") row += 2 ** (6 - i);
    if(l === "R") column += 2 ** (9 - i);
  }
  return {
    row,
    column,
    seat: (row * 8) + column,
  };
})
passes.sort((a,b) => b.seat - a.seat);
console.log(passes[0]);