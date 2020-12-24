const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n").map(i => parseInt(i,10));

input.push(0);
input.push(Math.max(...input)+3);
let sorted = input.sort((a,b) => a-b);
let cnt = [0,0,0];
let d = 0;
let diff = [];
for (let i = 1;i < input.length;i++) {
    d = sorted[i]-sorted[i-1];
    diff.push(d);
    cnt[d-1]++
}

console.log(cnt[0]*cnt[2],sorted,diff);