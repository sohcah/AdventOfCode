import {loadLines, output} from "aocutils";

const lines = loadLines();

// group lines into groups of 3
const groups = [];
let group = [];
for (const line of lines) {
  group.push(line);
  if (group.length === 3) {
    groups.push(group);
    group = [];
  }
}

let sum = 0;
for (const group of groups) {
  const bagA = group[0].split("");
  const bagB = new Set(group[1].split(""));
  const bagC = new Set(group[2].split(""));
  const duplicate = bagA.find(i => bagB.has(i) && bagC.has(i));
  let score;
  if (duplicate.toUpperCase() === duplicate) {
    score = duplicate.charCodeAt(0) - 38;
  } else {
    score = duplicate.charCodeAt(0) - 96;
  }
  console.log(duplicate, score);
  sum += score;
}

output(sum).forTest(70);
