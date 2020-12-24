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

target = input[i-1];

i = 0;
let j = 1;
let sum = input[i]+input[j];

while (sum != target) {
    if (sum < target) {
        j++;
        sum += input[j];
    }
    else {
        sum -= input[i];
        i++;
    }
}
let small = Math.min(...input.slice(i,j+1));
let large = Math.max(...input.slice(i,j+1));


console.log(small+large);