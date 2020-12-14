const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split('\n\n');

const answers = input.map(value => {
  const people = value.split('\n');
  const peopleAnswers = people.map(person => new Set(person.match(/[a-z]/g)));
  const set = Array.from(peopleAnswers[0]).filter(i=>!peopleAnswers.some(p=>!p.has(i)));
  return set.length;
})
console.log(answers.reduce((a,b)=>a+b,0));