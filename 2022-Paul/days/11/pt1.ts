import {output, loadLines} from "aocutils";

const input = loadLines();
console.log(input);

let answer = 0;
let items = [];
let operations = [];
let tests = [];
let counts = [0,0,0,0,0,0,0,0];

for (let i=0;i<input.length;i+=6) {
    items.push(input[i+1].slice(18).split(", ").map(i=>Number(i)));
    operations.push(input[i+2].slice(23).split(" "));
    tests.push([Number(input[i+3].slice(21)),Number(input[i+4].slice(29)),Number(input[i+5].slice(30))])
}

for (let round=0;round<20;round++) {
    for (let i = 0; i < items.length; i++) {
        while (items[i].length > 0) {
            counts[i]++;
            let worry = items[i].shift();
            if (operations[i][1] === "old") {
                if (operations[i][0] === "*") {
                    worry *= worry;
                } else {
                    worry += worry;
                }
            } else {
                if (operations[i][0] === "*") {
                    worry *= Number(operations[i][1]);
                } else {
                    worry += Number(operations[i][1]);
                }
            }
            worry = Math.floor(worry / 3);
            if (worry / tests[i][0] === Math.floor(worry / tests[i][0])) {
                items[tests[i][1]].push(worry);
            } else {
                items[tests[i][2]].push(worry);
            }
        }
    }
}

console.log(items);
counts.sort((a,b)=>b-a);
answer = counts[0]*counts[1];

output(answer).forTest(10605);
