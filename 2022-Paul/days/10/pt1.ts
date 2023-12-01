import {output, loadLines} from "aocutils";

const input = loadLines();

let cycle = 0;
let x = 1;
let checkpoint = 20;
let answer = 0;

function incrementCycleAndChecks() {
    cycle++;
    //console.log(cycle + "," + x);
    if (cycle === checkpoint) {
        answer += cycle * x;
        checkpoint += 40;
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
    if (checkpoint === 260) {
        break;
    }
}



output(answer).forTest(13140);
