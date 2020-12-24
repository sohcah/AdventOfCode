const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n");

let valid = new Int8Array(1000);

let info = [];
let i = 0;
while (input[i] !="") {
    info[i] = input[i].replace(" or ","-").replace(/[a-z]/g,"").replace(": ","").split("-").map(i=>Number(i));
    
    i++
}
console.log(info);
for (i = 0;i<info.length;i++) {
    for (let j = info[i][0];j<=info[i][1];j++) {valid[j] = 1};
    for (let j = info[i][2];j<=info[i][3];j++) {valid[j] = 1};
}

console.log(valid);

console.log();