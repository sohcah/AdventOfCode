const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split(/[\n\r]+/g).map(i => i.split(''));
const width = input[0].length;
const height = input.length;

const trees = [];
for (let x = 0, y = 0; y < height; y += 1, x += 3) {
  if (input[y][x % width] === "#") {
    trees.push({ x, y });
  }
}
console.log(trees.length);