const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split('\n').map(i=>Number(i));
const previous = 25;

for(let i = previous;i < input.length;i++) {
  const prior = input.slice(i - previous, i);
  const number = input[i];
  let safe = false;
  for(let a = 0;a < previous;a++) {
    for(let b = 0;b < previous;b++) {
      if(prior[a] !== prior[b] && prior[a] + prior[b] === number) safe = true;
    }
  }
  if(!safe) {
    console.log('INVALID: ', number);
  }
}