const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\n").map (i => parseInt(i.replace(/[BR]/g,"1").replace(/[FL]/g,"0"),2));

sorted = input.sort((a,b) => a-b);
for (let i=0; i<sorted.length; i++) {
    if (sorted[i]==sorted[i+1]-2) {
        ans = sorted[i]+1;
    }
}

console.log(ans);