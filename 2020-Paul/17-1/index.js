const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n");

let prev = input.slice().map(i=>i.slice());
let width = prev[0].length;
let height = prev.length;
let next = [];
let gen = 1;
let occ = 0;

for (x = 0; x<=gen*2+4;x++) {
    for (y = 0; y<=gen*2+4;y++) {
        occ = 0;
        for (a = Math.max(x-2,0); a<=Math.min(x,gen*2+2); a++) {
            for (b = Math.max(y-2,0); b<=Math.min(y,gen*2+2); b++) {
                if (prev[a][b] == "#" && !(a==x-1 && b==y-1)) {occ++}
            }
        }
        console.log(occ);
    }
}

console.log(prev);