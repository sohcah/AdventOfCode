const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\n").map(i => i.match(/([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/));

let count = 0;
for (const x of input) {
    if (x[4][x[1]-1] == x[3] && x[4][x[2]-1] != x[3] || x[4][x[1]-1] != x[3] && x[4][x[2]-1] == x[3]) {count++}
}
console.log(count);