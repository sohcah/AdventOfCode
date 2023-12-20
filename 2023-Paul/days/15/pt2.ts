import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split(",");

let boxes = new Array(256).fill([]).map(i=>i.slice());

for (const line of input) {
	let i = 0;
	let value = 0;
	while (line[i]!="=" && line[i]!="-") {
		value += line.charCodeAt(i);
		value *= 17;
		value %= 256;
		i++;
	}
	let label = line.slice(0,i);
	if (line[i]=="=") {
		let focalLen = Number(line.slice(i+1));
		let j=0;
		while (j<boxes[value].length && boxes[value][j][0]!=label) {
			j++;
		}
		if (j != boxes[value].length) {
			boxes[value][j][1] = focalLen;
		} else {
			boxes[value].push([label, focalLen]);
		}
	} else {
		let j=0;
		while (j<boxes[value].length && boxes[value][j][0]!=label) {
			j++;
		}
		if (j == boxes[value].length) {
		} else {
			boxes[value].splice(j, 1);
		}
	}
}
//console.log(boxes);

let sum = 0;
for (let i=0;i<boxes.length;i++) {
	 for (let j=0;j<boxes[i].length;j++) {
		 sum+=(i+1)*(j+1)*boxes[i][j][1];
	 }
 }

output(sum).forTest(145);
