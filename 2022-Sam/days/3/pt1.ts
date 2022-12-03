import {loadLines, loadNumbers, loadTrimmed, output, sum} from "aocutils";

const lines = loadLines()

let sum = 0;
for(const line of lines) {
  const compA = line.slice(0, line.length / 2).split("");
  const compB = new Set(line.slice(line.length / 2).split(""));
  const duplicate = compA.find(i => compB.has(i));
  let score;
  if(duplicate.toUpperCase() === duplicate) {
    score = duplicate.charCodeAt(0) - 38;
  } else {
    score = duplicate.charCodeAt(0) - 96;
  }
  console.log(duplicate, score);
  sum += score;
}

output(sum).forTest(157);
