const fs = require('fs');
const regex = /\b([a-z]{3}):([^\s]+)/g;
const input = fs.readFileSync('input.txt','utf8').split('\n\n').map(i=>Object.fromEntries(i.match(regex).map(x=>x.trim().split(':'))));

const valid = input.filter(value => !["byr","iyr","eyr","hgt","hcl","ecl","pid"].some(i=>!value[i]))
console.log(valid.length);