const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');

function calculateValue(i, m) {
  while(i.includes(' ') || i.includes('(')) {
    if(m) console.log(i);
    if(!i.includes('(')) {
      while(i.includes('+')) {
        i = i.replace(/([0-9]+) \+ ([0-9]+)/g, (_, a, b) => {
          return (Number(a) + Number(b)).toString()
        })
      }
      while(i.includes('*')) {
        i = i.replace(/([0-9]+) \* ([0-9]+)/g, (_, a, b) => {
          return (Number(a) * Number(b)).toString()
        })
      }
    } else {
      i = i.replace(/\([^\(\)]+\)/g, x => calculateValue(x.slice(1, -1)));
    }
  }
  return Number(i);
}

console.log(input.map(i=>calculateValue(i)).reduce((a,b) => a + b));