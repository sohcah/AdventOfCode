import {loadInput, output, sum} from "aocutils";

const input = loadInput().split("\n\n").map(i=>sum(i.split("\n").map(Number)));

let answer = Math.max(...input);


output(answer).forTest(24000);
