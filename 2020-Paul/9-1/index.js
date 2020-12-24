const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n").map(i => parseInt(i,10));

const preamb = 25;

let i = preamb;
let valid = true;

while (valid == true) {
    let prearr = input.slice(i - preamb, i);
    valid = false;
    for (let j = i - preamb; j < i; j++) {
        if (prearr.includes(input[i] - input[j])) {
            valid = true
        
        };
    }
    i++;
}


console.log(input[i-1]);