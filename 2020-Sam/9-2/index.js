const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split('\n').map(i=>Number(i));
const previous = 25;
let invalid;

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
    invalid = number;
    break;
  }
}

for(let a = 0;a < input.length;a++) {
  for(let b = a + 1;b < input.length;b++) {
    const slice = input.slice(a, b + 1);
    if(slice.reduce((a,b)=>a+b,0) === invalid) console.log('SOLUTION:', invalid, "---", Math.min(...slice), "+", Math.max(...slice), "=", Math.min(...slice) + Math.max(...slice));
    if(slice.reduce((a,b)=>a+b,0) > invalid) break;
  }
}