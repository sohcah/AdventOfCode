import {loadInput, output, sum} from "aocutils";

const input = loadInput().split("\n\n").map(i=>sum(i.split("\n").map(Number)));

input.sort((a,b)=>b-a);

let answer = sum(input.slice(0,3));



output(answer).forTest(45000);
