const fs = require('fs');
const { format } = require('path');
const input = fs.readFileSync('input.txt','utf8').split('\n').map(i=>Number(i));
const end = Math.max(...input) + 3;
input.push(end)
const list = [0];
const differences = [0,0,0];


while(true) {
  const latest = list[list.length - 1];
  const available = input.filter(i=>latest < i && i < latest + 4).sort((a,b) => a - b);
  if(available.length === 0) {
    throw "Error!";
  };
  list.push(available[0]);
  differences[available[0] - latest - 1]++;
  if(available[0] === end) break;
}
console.log(list.length, end, differences, differences[0] * differences[2]);