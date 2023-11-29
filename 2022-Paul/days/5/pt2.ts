import {output, loadInput} from "aocutils";

const input = loadInput().split("\n\n").map(i=>i.split("\n"));

let answer = "";
let stacks = [];
let column = 1;
while (column<input[0][input[0].length-1].length) {
    let stack = "";
    for (let i = input[0].length - 2; i >= 0; i--) {
        if (input[0][i].length>column) {
            if (input[0][i][column]!=" ") {
                stack += input[0][i][column];
            }
        }
    }
    stacks.push(stack);
    column += 4;
}

input[1] = input[1].slice(0,input[1].length-1);

for (const line of input[1]) {
    let trio = line.match(/\d+/g);
    let fromStack = Number(trio[1])-1;
    let toStack = Number(trio[2])-1;
    stacks[toStack] += stacks[fromStack].slice(-Number(trio[0]));
    stacks[fromStack] = stacks[fromStack].slice(0,-Number(trio[0]));
}

for (const s of stacks) {
    answer+= s.at(-1);
}

output(answer).forTest("MCD");
