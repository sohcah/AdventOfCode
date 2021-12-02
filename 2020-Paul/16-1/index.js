const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n");

let valid = new Int8Array(1000);

let info = [];
let tickets = [];
let i = 0;
let ans = 0;
while (input[i] !="") {
    info[i] = input[i].replace(" or ","-").replace(/[a-z]/g,"").replace(": ","").split("-").map(i=>Number(i));
    
    i++
};
i +=1
while (input[i] !="") {
    i++;
}
for (i =i+2; i<input.length;i++) {
    tickets.push(input[i].split(",").map(i=>Number(i)));
}
for (rule of info) {
    for (let j = rule[0];j<=rule[1];j++) {valid[j] = 1};
    for (let j = rule[2];j<=rule[3];j++) {valid[j] = 1};
}

for (t of tickets) {
    for (i of t) {
        if (valid[i] == 0) {
            ans +=i;
        }
    }
}

console.log(ans);
