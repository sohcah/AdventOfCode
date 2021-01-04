const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n");

let wp = [10, 1];
let pos = [0,0];
for (let i = 0; i < input.length; i++) {
    if (input[i][0] == "F") {
        pos[0] += wp[0]*parseInt(input[i].slice(1));
        pos[1] += wp[1]*parseInt(input[i].slice(1));
    };
    if (input[i][0] == "N") { wp[1] += parseInt(input[i].slice(1)) };
    if (input[i][0] == "S") { wp[1] -= parseInt(input[i].slice(1)) };
    if (input[i][0] == "E") { wp[0] += parseInt(input[i].slice(1)) };
    if (input[i][0] == "W") { wp[0] -= parseInt(input[i].slice(1)) };
    if (input[i][0] == "R") {
        for (j = parseInt(input[i].slice(1))/90; j > 0; j--) {
            wp = [wp[1],-wp[0]];
        }
    }
    if (input[i][0] == "L") {
        for (j = parseInt(input[i].slice(1))/90; j > 0; j--) {
            wp = [-wp[1],wp[0]];
        }
    }
}
console.log(Math.abs(pos[0])+Math.abs(pos[1]));