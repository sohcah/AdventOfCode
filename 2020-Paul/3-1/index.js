const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\n");

let rinc = 3;
let dinc = 1;
let width = input[0].length;

let count = 0;
let r = 0;
for (let d = 0; d < input.length; d += dinc) {
    if (input[d][r]=="#") {count++};
    r = (r + rinc) % width;
}
console.log(count);