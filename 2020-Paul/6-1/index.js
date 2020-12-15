const fs = require("fs");
const { count } = require("console");

const input = fs.readFileSync("input.txt", "utf8").split("\n\n"); //.map(i => i.replace("\n",""));

let tot = 0;

for (let g of input) {
    let count = 0;
    for (let i = 97; i < 123; i++) {
        if (g.includes(String.fromCharCode(i))) {count++};
    }
    tot += count;
}
console.log(tot);