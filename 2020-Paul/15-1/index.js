const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split(",").map(i=>parseInt(i,10));

let PosOfInd = new Array(2020).fill(-1);
let gap = 0;

for (let i=0;i<input.length;i++) {
    PosOfInd[input[i]] = i;
}
next = 0;
for (let i=input.length;i<2019;i++) {
    if (PosOfInd[next] == -1) {
        last = next;
        PosOfInd[next]=i;
        next = 0;
    }
    else {
        gap = i-PosOfInd[next];
        PosOfInd[next]=i;
        next = gap;
    }
}
console.log(next);