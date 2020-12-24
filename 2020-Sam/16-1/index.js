const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n\n');
const fields = input[0].split('\n').map(i=>i.split(/(?:: )|-|(?: or )/g).map((i, index)=>index === 0 ? i : Number(i)));
const other_tickets = input[2].split('\n').slice(1).map(i=>i.split(',').map(i=>Number(i)));

function validate(n) {
  for(const field of fields) {
    if((field[1] <= n && n <= field[2]) || (field[3] <= n && n <= field[4])) return true;
  }
  return false;
}

const valid = new Set();
const min = Math.min(...other_tickets.flat())
const max = Math.max(...other_tickets.flat())
const invalid = []

for(let n = min;n <= max;n++) {
  if(validate(n)) valid.add(n);
}

for(const ticket of other_tickets) {
  for(const value of ticket) {
    if(!valid.has(value)) invalid.push(value);
  }
}

console.log(invalid.reduce((a,b)=>a+b,0));