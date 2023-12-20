import { loadTrimmed, output, sum } from "aocutils";

const input = loadTrimmed()
	.replaceAll("Game ", "")
	.replaceAll("red", "0")
	.replaceAll("green", "1")
	.replaceAll("blue", "2")
	.split("\n")
	.map((i) => i.split(/[:;]\s*/g));

console.log(input);

let sum = 0;

for (const line of input) {
	const maxRGB = [0, 0, 0];
	const totalRGB = [0, 0, 0];
	for (let i = 1; i < line.length; i++) {
		let j = 0;
		while (j != 1) {
			const k = line[i].indexOf(" ", j);
			const num = Number(line[i].slice(j, k));
			const colorNum = Number(line[i].slice(k + 1, k + 2));
      // console.table({
      //   section: line[i],
      //   j,k,num,colorNum
      // });
			totalRGB[colorNum] += num;
			if (num > maxRGB[colorNum]) {
				maxRGB[colorNum] = num;
			}
			j = line[i].indexOf(",", j) + 2;
			console.log(colorNum, num);
		}
	}
	if (maxRGB[0] <= 12 && maxRGB[1] <= 13 && maxRGB[2] <= 14) {
		sum += Number(line[0]);
	}
	console.log(maxRGB, totalRGB);
}

output(sum).forTest(8);
