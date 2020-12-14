const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\n").map(i => Number(i));

main_loop:
for (let x = 0; x < input.length; x++) {
    for (let y = x + 1; y < input.length; y++) {
        for (let z = y + 1; z < input.length; z++) {
            if (input[x] + input[y] + input[z] == 2020) {
                console.log(input[x] * input[y] * input[z]);
                break main_loop;
            }
        }
    }
}