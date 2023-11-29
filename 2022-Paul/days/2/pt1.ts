import {sum, output, loadLines} from "aocutils";

const input = loadLines().map(i=>i.charCodeAt(2)-87+3*((i.charCodeAt(2)-i.charCodeAt(0)-19)%3));

let answer = sum(input);


output(answer).forTest(15);
