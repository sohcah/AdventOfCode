import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split(",");

let sum = 0;

for (const line of input) {
	let value = 0;
	for (let i = 0;i<line.length;i++) {
		value += line.charCodeAt(i);
		value *= 17;
		value %= 256;
	}
	sum+=value;
}

output(sum).forTest(1320);
