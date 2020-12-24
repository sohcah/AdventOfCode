const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('').map(i=>Number(i));

const min = Math.min(...input);
const max = Math.max(...input);

let current = 0;
let cups = input.slice();

for(let move = 0; move < 100;move++) {
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
  // const destinationWraparound = 9 - cups.indexOf(destination);
  // cups.splice(destinationIndex + 1, 0, ...removedCups.slice(0, destinationWraparound));
  cups.splice(destinationIndex + 1, 0, ...removedCups);
  // cups.splice(0, 0, ...removedCups.slice(destinationWraparound));

  current = cups.indexOf(origCups[current]) + 1;
  // current += 1;
  if(current >= cups.length) current = 0;

  console.log(`-- move ${move+1} --\ncurrent: ${origCurrent}\ncups: ${origCups.map((_,i)=>i===origCurrent?`(${_})`:` ${_} `).join('')}\npick up: ${removedCups.join(', ')}\ndestination: ${destination}\nnext current: ${current}`);
}

console.log(`--final--\ncups: ${cups.map((_,i)=>i===current?`(${_})`:` ${_} `).join('')}`)