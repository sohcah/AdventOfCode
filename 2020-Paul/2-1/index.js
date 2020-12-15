const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\n").map(i => i.match(/([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/));

let count = 0;
for (const x of input) {
    let l = x[4].match(new RegExp(x[3], "g"))?.length ?? 0;
    if (l >= x[1] && l <= x[2]) { count++ };
}
console.log(count);