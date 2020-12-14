const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split('\n').map(i=>Number(i));
const end = Math.max(...input) + 3;
input.push(end)

const cache = {};

function findRoutes(start, end, i = 0) {
  if(cache[`${start}/${end}`]) return cache[`${start}/${end}`];
  let count = 0;
  const available = input.filter(i=>start < i && i < start + 4).sort((a,b) => a - b);
  if(available[0] === end) return 1;
  for(const item of available) {
    count += findRoutes(item, end, i+1);
  }
  cache[`${start}/${end}`] = count;
  return count;
}
console.log(findRoutes(0, end));