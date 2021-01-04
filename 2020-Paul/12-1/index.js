const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n");

let pos = [0, 0];
let dirs = ["N", "E", "S", "W"];
let dir = 1;
for (let i = 0; i < input.length; i++) {
    let action = input[i][0];
    if (action == "F") { action = dirs[dir] };
    if (action == "N") { pos[1] += parseInt(input[i].slice(1)) };
    if (action == "S") { pos[1] -= parseInt(input[i].slice(1)) };
    if (action == "E") { pos[0] += parseInt(input[i].slice(1)) };
    if (action == "W") { pos[0] -= parseInt(input[i].slice(1)) };
    if (action == "R") {
        dir += parseInt(input[i].slice(1)) / 90;
        if (dir > 3) { dir -= 4 };
    }

    if (action == "L") {
        dir -= parseInt(input[i].slice(1)) / 90;
        if (dir < 0) { dir += 4 };

    }
}
console.log(Math.abs(pos[0])+Math.abs(pos[1]));