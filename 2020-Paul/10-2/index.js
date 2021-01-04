const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n").map(i => parseInt(i,10));
tribonacci = [1,1,2];
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

let i = 0;
let ans = 1;
while (i<diff.length) {
    while (diff[i] == 3) {i++};
    let runof1s = 0;
    while (diff[i] == 1) {
        i++
        runof1s++}
    while (runof1s>=tribonacci.length) {tribonacci.push(tribonacci[tribonacci.length-1]+tribonacci[tribonacci.length-2]+tribonacci[tribonacci.length-3])}
    ans *= tribonacci[runof1s];
}

console.log(ans);