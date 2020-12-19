const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n\n');
const rulesZ = input[0].split('\n').map(i=>i.split(': ')).sort((a,b) => Number(a[0]) - Number(b[0]));
const rules = [];
for(const rule of rulesZ) {
  rules[rule[0]] = rule[1];
}
const messages = input[1].split('\n');

const cache = new Map();

const _42 = generateRegex(42);
const _31 = generateRegex(31);

cache.set("8", `(?:${_42}+)`)
let x = ``;
for(var g = 1;g <= 100;g++) {
  x += `(?:${_42}{${g}}${_31}{${g}})|`
}
cache.set("11", `(${x.slice(0, -1)})`)

function generateRegex(i) {
  if(cache.has(i.toString())) return cache.get(i.toString());
  if(rules[i].match(/"[a-z]"/)) {
    cache.set(i, rules[i].slice(1,-1));
    return rules[i].slice(1,-1);
  }
  const r = rules[i].split(' | ');
  const x = `(?:${r.map(i=>`${i.split(' ').map(j => generateRegex(j)).join('')}`).join('|')})`;
  cache.set(i.toString(), x);
  return x;
}

const reg = `^${generateRegex(0)}$`;
console.log(reg);
const regex = new RegExp(reg);
console.log(messages.filter(i=>i.match(regex)).length);