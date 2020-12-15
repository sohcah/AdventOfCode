const fs = require('fs');
const regex = /\b([a-z]{3}):([^\s]+)/g;
const input = fs.readFileSync('input.txt','utf8').split('\n\n').map(i=>Object.fromEntries(i.match(regex).map(x=>x.trim().split(':'))));

const valid = input.filter(value => {
  if(["byr","iyr","eyr","hgt","hcl","ecl","pid"].some(i=>!value[i])) return false;
  if(Number(value.byr) < 1920 || Number(value.byr) > 2002) return false;
  if(Number(value.iyr) < 2010 || Number(value.iyr) > 2020) return false;
  if(Number(value.eyr) < 2020 || Number(value.eyr) > 2030) return false;
  if(value.hgt.endsWith('cm')) {
    if(Number(value.hgt.slice(0,-2)) < 150 || Number(value.hgt.slice(0,-2)) > 193) return false;
  } else if(value.hgt.endsWith('in')) {
    if(Number(value.hgt.slice(0,-2)) < 59 || Number(value.hgt.slice(0,-2)) > 76) return false;
  } else return false;
  if(!value.hcl.match(/^#[0-9a-f]{6}$/)) return false;
  if(!value.ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)) return false;
  if(!value.pid.match(/^[0-9]{9}$/)) return false;
  return true;
})
console.log(valid.length);