const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split('\n');
const bags = {};

for(const line of input) {
  const match = line.match(/([^]+?) bags contain ([^]+)/);
  const bag_id = match[1].replace(/\s/g,'_');
  const contains = (match[2]
      .match(/([0-9]+) ([^]+?) bags?/g) || [])
      .map(i=>({
        type: i.match(/([0-9]+) ([^]+) bags?/)[2].replace(/\s/g,'_'),
        count: Number(i.match(/([0-9]+) ([^]+) bags?/)[1]),
      }));
  bags[bag_id] = contains;
}

function checkContains(list) {
  if(list.includes('shiny_gold')) return true;
  for(const item of list) {
    if(checkContains(bags[item])) return true;
  }
  return false;
}

function countBags(list) {
  let count = 0;
  for(const item of list) {
    count += item.count * (1 + countBags(bags[item.type]));
  }
  return count;
}

console.log(countBags(bags["shiny_gold"]));