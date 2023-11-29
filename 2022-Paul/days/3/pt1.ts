import {output, loadLines} from "aocutils";

const input = loadLines();
let secondHalf = "";
let repeated = 0;
let total = 0;

for (const line of input) {
    secondHalf = line.slice(line.length/2);
    for (let i=0;i<line.length/2;i++) {
        if (secondHalf.includes(line[i])) {
            repeated = line[i].charCodeAt(0);
        }
    }
    if (repeated>96) {
        repeated -= 96;
    } else {
        repeated -= 38;
    }
    total += repeated;
}

let answer = total;


output(answer).forTest(157);
