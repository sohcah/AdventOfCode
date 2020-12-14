const fs = require("fs");

const input = fs.readFileSync("input.txt","utf8").split("\n").map(i => Number(i));

main_loop:
for(let x = 0; x<input.length; x++) {
    for(let y = x+1; y<input.length; y++) {
        if (input[x]+input[y]==2020) {
            console.log(input[x]*input[y]);
            break main_loop;
        }
    }
}