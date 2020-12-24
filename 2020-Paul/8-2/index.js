const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n").map(i => i.split(" "));

input.push(["end", ""]);
let succ = false;


let changeline = 0;
let acc = 0;

while (succ == false) {
    
    while (input[changeline][0] != "jmp" && input[changeline][0] != "nop") { changeline++ };
    if (input[changeline][0] == "jmp") { input[changeline][0] = "nop" } else { input[changeline][0] = "jmp" };

    let linesrun = [];
    let line = 0;
    acc = 0;
    while (!linesrun.includes(line)) {
        linesrun.push(line);
        if (input[line][0] == "acc") {
            acc += parseInt(input[line][1]);
            line++;
        }
        else if (input[line][0] == "jmp") {
            line += parseInt(input[line][1]);
        }
        else if (input[line][0] == "end") {
            succ = true;
        }
        else {
            line++;

        }
       
    }
    if (input[changeline][0] == "jmp") { input[changeline][0] = "nop" } else { input[changeline][0] = "jmp" };
    changeline++;
}


console.log(acc);