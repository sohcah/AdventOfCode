import { loadLines, output } from "aocutils";

const lines = loadLines().map((i) => i.split(",").map((j) => j.split("-").map(Number)));

console.log(lines);

let sum = 0;
for (const [p1, p2] of lines) {
	console.log(p1, p2);
	if (p1[0] <= p2[0] && p1[1] >= p2[1]) {
		console.log("overlap a");
		sum++;
	} else if (p1[0] >= p2[0] && p1[1] <= p2[1]) {
		console.log("overlap b");
		sum++;
	}
}

output(sum).forTest(2);
