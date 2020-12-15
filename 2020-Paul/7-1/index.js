const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n").map(i => i.split(" bags contain "));

//let inthisbag = new Array(input.length).fill(0);

let lookfor = ["shiny gold"];
let count = 0;
let lastc = -1;
while (count != lastc) {
    lastc = count;
    count = 0;
    for (let bag of input) {
        isin = false;
        for (let bagtype of lookfor) {
            //console.log(bag[1], bagtype, count);
            if (bag[1].includes(bagtype)) {
                isin = true;
                if(!lookfor.includes(bag[0])) {lookfor.push(bag[0])};
            }
        }
        if (isin == true) {
            count++;
        }
    }
}
console.log(count);