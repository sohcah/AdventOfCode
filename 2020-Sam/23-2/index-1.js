const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('').map(i=>Number(i));
for(var i = 9;i < 1000000;i++) {
  input.push(i);
}

// const min = Math.min(...input);
// const max = Math.max(...input);
const min = 1;
const max = 1000000;

let current = 0;
let cups = input.slice();

const start = Date.now();

for(let move = 0; move < 10000000;move++) {
  let origCups = cups.slice();
  let origCurrent = current;
  let removedCups = cups.splice(current + 1, 3);
  const wrapAround = 3 - removedCups.length;
  if(wrapAround > 0) removedCups.push(...cups.splice(0, wrapAround));

  let destination = origCups[current] - 1;
  if(destination < min) destination = max;
  while(removedCups.includes(destination)) {
    destination -= 1;
    if(destination < min) destination = max;
  }
  let destinationIndex = cups.indexOf(destination);
  const destinationWraparound = 9 - cups.indexOf(destination);
  cups.splice(destinationIndex + 1, 0, ...removedCups.slice(0, destinationWraparound));
  cups.splice(0, 0, ...removedCups.slice(destinationWraparound));

  current = cups.indexOf(origCups[current]) + 1;
  // current += 1;
  if(current >= cups.length) current = 0;

  if(move % 1000 === 0) console.log(move, Date.now() - start);

  // console.log(`-- move ${move+1} --\ncurrent: ${origCurrent}\ncups: ${origCups.map((_,i)=>i===origCurrent?`(${_})`:` ${_} `).join('')}\npick up: ${removedCups.join(', ')}\ndestination: ${destination}\nnext current: ${current}`);
}

console.log(`--final--\ncups: ${cups.slice(cups.indexOf(1), 5)}`)