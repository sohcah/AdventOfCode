const fs = require('fs');
const regex = /([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/;
const input = fs.readFileSync('input.txt','utf8').split(/[\n\r]+/g).map(i=>i.match(regex));

const valid = [];
for(let value of input) {
  const [_, minimum, maximum, letter, password] = value;
  const letters = password.split('').filter(i=>i === letter);
  if(letters.length >= minimum && letters.length <= maximum) {
    valid.push(value);
  }
}
console.log(valid.length);