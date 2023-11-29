import {output, loadLines} from "aocutils";

const input = loadLines();
let repeated = 0;
let total = 0;

for (let i = 0; i < input.length; i += 3) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i+1].includes(input[i][j]) && input[i+2].includes(input[i][j])) {
            repeated = input[i].charCodeAt(j);
        }
    }
    if (repeated > 96) {
        repeated -= 96;
    } else {
        repeated -= 38;
    }
    total += repeated;
}

let answer = total;


output(answer).forTest(70);
