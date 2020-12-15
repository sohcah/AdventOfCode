const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\n");

let width = input[0].length;
let inc = [[1,1],[3,1],[5,1],[7,1],[1,2]];

prod = 1;

for (let [rinc, dinc] of inc) {
    let count = 0;
    let r = 0;
    for (let d = 0; d < input.length; d += dinc) {
        if (input[d][r]=="#") {count++};
        r = (r + rinc) % width;
    }
    console.log(count);
    prod *= count;
}


console.log(prod);