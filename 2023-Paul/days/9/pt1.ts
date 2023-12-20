import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n").map(i=>i.split(" ").map(i=>Number(i)));

//console.log(input);
const length = input[0].length;
let sequence = new Array(length).fill(0);
for (let i=0;i<input.length;i++) {
  for (let j=0;j<length;j++) {
    sequence[j]+=input[i][j]
  }
}
console.log(sequence);

let differences = [sequence.slice()];


for (let i=1;i<length;i++) {
  differences.push([]);
  for (let j=0;j<differences[i-1].length-1;j++) {
    differences[i][j] = differences[i-1][j+1]-differences[i-1][j];
  }
}
let sum = 0;
console.log(length);
for (let i=0;i<length-1;i++) {
  console.log(differences[i][length-i-1]);
  sum+=differences[i][length-i-1]
}


//console.log (differences);


output(sum).forTest(114);
