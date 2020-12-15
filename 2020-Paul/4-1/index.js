const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\n\n").map (i => i.split(/[\n ]/g));

fields = ["byr","iyr","eyr","hgt","hcl","ecl","pid"];

count = 0;

for (let x of input) {
    pres = [0,0,0,0,0,0,0];
    for (let y of x) {
        for (let i = 0; i< 7; i++) { 
            if (y.slice(0,3)==fields[i]) {pres[i]=1}
        }
    }
    if (!pres.includes(0)) {count++};
}

console.log(count);