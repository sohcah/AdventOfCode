const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n").map(i => i.split(" "));

//console.log(input)

let linesrun = [];
let line = 0;
let acc = 0;
while (!linesrun.includes(line)) {
    linesrun.push(line);
    //console.log(line,acc);
    if (input[line][0] == "acc") {
        acc += parseInt(input[line][1]);
        line++;
    }
    else if (input[line][0] == "jmp") {
        line += parseInt(input[line][1]);
    }
    else {
        line++;
    }

}


console.log(acc);