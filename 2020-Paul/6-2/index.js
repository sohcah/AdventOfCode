const fs = require("fs");
const { count } = require("console");

const input = fs.readFileSync("input.txt", "utf8").split("\n\n").map(i => i.split(/[\n ]/g));


console.log(input);
let tot = 0;

for (let g of input) {
    let count = 0;
    for (let i = 97; i < 123; i++) {
        let incl = true;
        for (let p of g) {

            if (!p.includes(String.fromCharCode(i))) { incl = false };
        }
        if (incl == true) {count++}
    }
    tot += count;
}
console.log(tot);