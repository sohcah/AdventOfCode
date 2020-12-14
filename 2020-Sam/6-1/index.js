const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split('\n\n');

const answers = input.map(value => {
  return new Set(value.match(/[a-z]/g)).size;
})
console.log(answers.reduce((a,b)=>a+b,0));