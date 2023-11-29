import {output, loadLines} from "aocutils";

const input = loadLines().map(i=>i.split(/[-,]/g).map(Number));

let answer = 0;

for (const line of input) {
    if (line[0]<=line[2] && line[1]>=line[3] || line[0]>=line[2] && line[1]<=line[3]) {
        answer ++
    }
}


output(answer).forTest(2);
