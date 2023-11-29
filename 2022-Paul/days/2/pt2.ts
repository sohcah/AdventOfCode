import {sum, output, loadLines} from "aocutils";

const input = loadLines().map(i=>3*(i.charCodeAt(2)-88)+(i.charCodeAt(0)-62+(i.charCodeAt(2)-89)%3)%3+1);

let answer = sum(input);


output(answer).forTest(12);
