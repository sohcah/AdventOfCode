const fs = require('fs');
const regex = /([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/;
const input = fs.readFileSync('input.txt','utf8').split(/[\n\r]+/g).map(i=>i.match(regex));

const valid = [];
for(let value of input) {
  const [_, a, b, letter, password] = value;
  if(
    (password[a-1] === letter && password[b-1] !== letter)
    || (password[a-1] !== letter && password[b-1] === letter)) {
    valid.push(value);
  }
}
console.log(valid.length);