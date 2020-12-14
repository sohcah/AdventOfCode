const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split(/[\n\r]+/g).map(i=>i.split(''));
const width = input[0].length;
const height = input.length;

const slopes = [
  [1,1],
  [3,1],
  [5,1],
  [7,1],
  [1,2],
];

let treeCount = 1;
for(let slope of slopes) {
  const trees = [];
  for(let x = 0, y = 0; y < height; y += slope[1], x += slope[0] ) {
    if(input[y][x % width] === "#") {
      trees.push({x,y});
    }
  }
  treeCount *= trees.length;
}
console.log(treeCount);