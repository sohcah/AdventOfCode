const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');

function calculateValue(i, m) {
  while(i.includes(' ') || i.includes('(')) {
    if(m) console.log(i);
    if(!i.includes('(')) {
      const j = i.split(' ');
      let v = Number(j[0]);
      for(let x = 0;x < j.length - 1;x+=2) {
        if(j[x + 1] === "*") {
          v *= Number(j[x + 2])
        } else {
          v += Number(j[x + 2])
        }
      }
      i = v.toString();
    } else {
      i = i.replace(/\([^\(\)]+\)/g, x => calculateValue(x.slice(1, -1)));
    }
  }
  return Number(i);
}

console.log(input.map(i=>calculateValue(i)).reduce((a,b) => a + b));