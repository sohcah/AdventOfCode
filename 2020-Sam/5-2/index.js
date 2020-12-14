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
const passesData = new Set(passes.map(i=>i.seat));
for(let i = 0;i < passes[0].seat; i++) {
  if(!passesData.has(i) && passesData.has(i-1) && passesData.has(i+1)) {
    console.log(i);
  }
}