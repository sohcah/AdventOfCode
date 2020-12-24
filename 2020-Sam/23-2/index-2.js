const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('').map(i=>Number(i));
// for(var i = 9;i < 1000000;i++) {
//   input.push(i);
// }

// const min = Math.min(...input);
// const max = Math.max(...input);
const min = 1;
const max = 9;
// const max = 1000000;

let current = 0;
let cups = new Uint32Array(input.slice());

const start = Date.now();

for(let move = 0; move < 10;move++) {
  let currentValue = cups[current];
  let removedCups = cups.slice(current + 1, current + 4);
  console.log(removedCups.length);
  // const wrapAround = 3 - removedCups.length;
  // if(wrapAround > 0) removedCups.push(...cups.slice(0, wrapAround));

  let destination = currentValue - 1;
  if(destination < min) destination = max;
  while(removedCups.includes(destination)) {
    destination -= 1;
    if(destination < min) destination = max;
  }
  let destinationIndex = cups.indexOf(destination);
  console.log('CURRENT', current, cups[current])
  console.log('DESTINATION', destination, destinationIndex)
  if(destinationIndex < current + 1) {
    console.log(removedCups.join(', '))
    console.log(cups.join(', '))
    cups.copyWithin(destinationIndex + 4, destinationIndex + 1, current + 1);
    // cups.splice(destinationIndex + 1, 0, ...removedCups);
    cups.set(removedCups, destinationIndex + 1)
    console.log(cups.join(', '))
  } else {
    console.log(removedCups.join(', '))
    console.log(cups.join(', '))
    // console.log('COPY', current + 1, current + 4, destinationIndex + 1);
    cups.copyWithin(current + 1, current + 4, destinationIndex + 1);
    // console.log(cups.join(', '))
    // console.log('SET', destinationIndex - 2);
    cups.set(removedCups, destinationIndex - 2)
    console.log(cups.join(', '))
  }
  // const destinationWraparound = 9 - cups.indexOf(destination);
  // cups.splice(destinationIndex + 1, 0, ...removedCups.slice(0, destinationWraparound));
  // cups.splice(0, 0, ...removedCups.slice(destinationWraparound));

  current = cups.indexOf(currentValue) + 1; //, current - 4
  // current += 1;
  console.log('C',current);

  if(current >= cups.length) current = 0;

  // if(move % 1000 === 0) console.log(move, Date.now() - start);

  // console.log(`-- move ${move+1} --}\ncups: ${cups.map((_,i)=>i===origCurrent?`(${_})`:` ${_} `).join('')}\npick up: ${removedCups.join(', ')}\ndestination: ${destination}\nnext current: ${current}`);
}

console.log(`--final--\ncups: ${cups}`)