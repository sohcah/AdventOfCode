const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n\n');
const fields = input[0].split('\n').map(i=>i.split(/(?:: )|-|(?: or )/g).map((i, index)=>index === 0 ? i : Number(i)));
const your_ticket = input[1].split('\n')[1].split(',').map(i=>Number(i));
const other_tickets = input[2].split('\n').slice(1).map(i=>i.split(',').map(i=>Number(i)));

function validate(n) {
  const arr = [];
  for(const field of fields) {
    if((field[1] <= n && n <= field[2]) || (field[3] <= n && n <= field[4])) arr.push(field[0]);
  }
  if(arr.length > 0) return arr;
  return false;
}

const valid = new Map();
const min = Math.min(...other_tickets.flat())
const max = Math.max(...other_tickets.flat())

for(let n = min;n <= max;n++) {
  const v = validate(n);
  if(v) valid.set(n, v);
}

const valid_tickets = other_tickets.filter(i=>{
  for(const value of i) {
    if(!valid.has(value)) return false;
  }
  return true;
})

const possibleValues = [];

for(const ticket of valid_tickets) {
  for(let i = 0;i < ticket.length;i++) {
    const value = ticket[i];
    const possible = valid.get(value);
    if(!possibleValues[i]) {
      possibleValues[i] = possible
    } else {
      possibleValues[i] = possibleValues[i].filter(i=>possible.includes(i));
    };
  }
}

while(possibleValues.find(i=>typeof i !== "string")) {
  const found = possibleValues.filter(i=>typeof i === "string")
  for(const i in possibleValues) {
    if(typeof possibleValues[i] === "string") {} else if(possibleValues[i].length === 1) {
      possibleValues[i] = possibleValues[i][0];
    } else if(possibleValues[i].filter(j=>!found.includes(j)).length === 1) {
      possibleValues[i] = possibleValues[i].filter(j=>!found.includes(j))[0];
    }
  }
}

let output = 1;
for(const i in possibleValues) {
  if(possibleValues[i].startsWith('departure')) {
    output *= your_ticket[i];
  }
}

console.log(possibleValues, output);