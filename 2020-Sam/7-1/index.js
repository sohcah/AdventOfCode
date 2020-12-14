const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split('\n');
const bags = {};

for(const line of input) {
  const match = line.match(/([^]+?) bags contain ([^]+)/);
  const bag_id = match[1].replace(/\s/g,'_');
  const contains = (match[2]
      .match(/([0-9]+) ([^]+?) bags?/g) || [])
      .map(i=>i.match(/([0-9]+) ([^]+) bags?/)[2].replace(/\s/g,'_'));
  bags[bag_id] = contains;
}

function checkContains(list) {
  if(list.includes('shiny_gold')) return true;
  for(const item of list) {
    if(checkContains(bags[item])) return true;
  }
  return false;
}

const valid = [];

for(const bag in bags) {
  if(checkContains(bags[bag])) valid.push(bag);
}
console.log(valid.length);