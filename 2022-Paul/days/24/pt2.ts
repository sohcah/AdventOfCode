import {output, loadLines} from "aocutils";

let answer;

const start = 3353687996510
mainloop:
    for (let yell = start; yell < start+10; yell++) {

        let input: string[][] = loadLines().map(i => i.match(/[a-z]{4}|[0-9]+|[+\-*/]/g));

        let monkeys = new Map<string, number>();


        for (let i = 0; i < input.length; i++) {
            if (input[i].length === 2) {
                let removed = input.splice(i, 1)[0];
                if (removed[0] === "humn") {
                    monkeys.set("humn", yell);
                } else {
                    monkeys.set(removed[0], Number(removed[1]));
                }
                i--;
            } else if (input[i][0] === "root") {
                input[i][2] = "=";
            }
        }

        let done = false;
        while (!done) {
            for (let i = 0; i < input.length; i++) {
                if (monkeys.has(input[i][1]) && monkeys.has(input[i][3])) {
                    let removed = input.splice(i, 1)[0];
                    if (removed[2] === "+") {
                        monkeys.set(removed[0], monkeys.get(removed[1]) + monkeys.get(removed[3]));
                    }
                    if (removed[2] === "-") {
                        monkeys.set(removed[0], monkeys.get(removed[1]) - monkeys.get(removed[3]));
                    }
                    if (removed[2] === "*") {
                        monkeys.set(removed[0], monkeys.get(removed[1]) * monkeys.get(removed[3]));
                    }
                    if (removed[2] === "/") {
                        monkeys.set(removed[0], monkeys.get(removed[1]) / monkeys.get(removed[3]));
                    }
                    if (removed[2] === "=") {
                        console.log(yell, monkeys.get(removed[1]), monkeys.get(removed[3]),monkeys.get(removed[1]) - monkeys.get(removed[3]))
                        if (monkeys.get(removed[1]) === monkeys.get(removed[3])) {
                            answer = yell;
                            break mainloop;
                        }
                        done = true;
                    }
                }
            }
        }

    }

//console.log(input);
//console.log(monkeys);

output(answer).forTest(301);
