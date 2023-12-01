import {output, loadLines} from "aocutils";

const input = loadLines();
console.log(input);

let cycle = 0;
let x = 1;
let checkpoint = 20;
let endRow = 40;
let row = 0;
let answer = 0;
let image = [""];

function incrementCycleAndChecks() {
    cycle++;
    //console.log(cycle + "," + x);
    if (cycle === checkpoint) {
        answer += cycle * x;
        checkpoint += 40;
    }
    if (x + row * 40 >= cycle - 2 && x + row * 40 <= cycle) {
        image[row] += "##"
    } else {
        image[row] += "  "
    }
    if (cycle === endRow) {
        image.push("");
        row++;
        endRow += 40;
    }
}

for (const line of input) {
    if (line.startsWith("noop")) {
        incrementCycleAndChecks();
    }
    if (line.startsWith("addx")) {
        incrementCycleAndChecks();
        incrementCycleAndChecks();
        x += Number(line.slice(5));

    }
    //if (checkpoint === 260) {
    //    break;
    //}
}

console.log(image);

output(answer).forTest(13140);
