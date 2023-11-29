import {output, loadLines} from "aocutils";

let input : string[][] = loadLines().map(i=>i.match(/[a-z]{4}|[0-9]+|[+\-*/]/g));

const monkeys = new Map<string, number>();


for (let i=0;i<input.length;i++) {
    if (input[i].length===2) {
        let removed = input.splice(i,1)[0];
        monkeys.set(removed[0],Number(removed[1]));
        i--;
    }
}

while (!monkeys.has("root")) {
    for (let i=0;i<input.length;i++) {
        if (monkeys.has(input[i][1]) && monkeys.has(input[i][3])) {
            let removed = input.splice(i,1)[0];
            if (removed[2]==="+") {
                monkeys.set(removed[0],monkeys.get(removed[1]) + monkeys.get(removed[3]));
            }
            if (removed[2]==="-") {
                monkeys.set(removed[0],monkeys.get(removed[1]) - monkeys.get(removed[3]));
            }
            if (removed[2]==="*") {
                monkeys.set(removed[0],monkeys.get(removed[1]) * monkeys.get(removed[3]));
            }
            if (removed[2]==="/") {
                monkeys.set(removed[0],monkeys.get(removed[1]) / monkeys.get(removed[3]));
            }
        }
    }
}

let answer = monkeys.get("root");
//console.log(input);
//console.log(monkeys);

output(answer).forTest(152);
