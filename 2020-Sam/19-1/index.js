const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n\n');
const rules = input[0].split('\n').map(i=>i.split(': ')).sort((a,b) => Number(a[0]) - Number(b[0])).map(i=>i[1]);
const messages = input[1].split('\n');

const cache = new Map();

function generateRegex(i) {
  if(cache.has(i)) return cache.get(i);
  if(rules[i].match(/"[a-z]"/)) {
    cache.set(i, rules[i].slice(1,-1));
    return rules[i].slice(1,-1);
  }
  const r = rules[i].split(' | ');
  const x = `(${r.map(i=>`(${i.split(' ').map(j => generateRegex(j)).join('')})`).join('|')})`;
  cache.set(i, x);
  return x;
}

const regex = new RegExp(`^${generateRegex(0)}$`);
console.log(generateRegex(0))
console.log(messages.filter(i=>i.match(regex)).length);

// console.log(input.map(i=>calculateValue(i)).reduce((a,b) => a + b));