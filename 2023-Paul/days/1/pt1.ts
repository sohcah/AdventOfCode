import { loadTrimmed, output, sum } from "aocutils";

const input = loadTrimmed().replace(/[a-z]/g,"");
const lines = input.split("\n");

console.log(lines);

let sum = 0;
for (const line of lines) {
	sum += Number(line.slice(0,1))*10+Number(line.slice(-1));
  console.log(sum);
}

output(sum).forTest(142);
