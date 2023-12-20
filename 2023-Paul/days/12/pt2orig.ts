import { loadTrimmed, output } from "aocutils";

let free: number[], filled: number[], placed: number[], toMatch: number[], counts: number[];
let needed, count;
let sum = 0;

function fill(start: number, toPlace: number) {
	if (toPlace == 0) {
		const code = placed
			.join()
			.replaceAll(/,/g, "")
			.replaceAll(/0+/g, "0")
			.split("0")
			.map((i) => i.length)
			.filter((i) => i != 0);
		if (code.length == toMatch.length && code.every((n, i) => n === toMatch[i])) {
			count++;
		}
	} else {
		//console.log(toPlace);
		for (let i = start; i < free.length; i++) {
			placed[free[i]] = 1;
			const code = placed
				.slice(0, free[i] + 1)
				.join()
				.replaceAll(/,/g, "")
				.replaceAll(/0+/g, "0")
				.split("0")
				.map((i) => i.length)
				.filter((i) => i != 0);
			let j = 0;
			while (code[j] == toMatch[j] && j < code.length) {
				j++;
			}
			if (code[j] < toMatch[j] || j == code.length) {
				fill(i + 1, toPlace - 1);
			}
			placed[free[i]] = 0;
		}
	}
}

const input = loadTrimmed()
	.split("\n")
	.map((i) => i.split(" ").map((i, n) => (n === 0 ? i : i.split(",").map((i) => Number(i))))) as [
	string, //
	number[], //+","+i+","+i+","+i
][];

//console.log(input);

for (const l of input) {
	let line = [l[0], l[1]];
	counts = [0, 0];
	for (let j = 0; j < 2; j++) {
		count = 0;
		free = [];
		filled = [];
		for (let i = 0; i < line[0].length; i++) {
			if (line[0][i] == "?") {
				free.push(i);
			}
			if (line[0][i] == "#") {
				filled.push(i);
			}
		}
		needed = line[1].reduce((a, b) => a + b, 0) - filled.length;
		console.log(free, filled, needed);
		placed = line[0]
			.slice()
			.replaceAll(/\?/g, ".")
			.replaceAll(/\./g, "0")
			.replaceAll(/#/g, "1")
			.split("")
			.map((i) => Number(i));
		toMatch = line[1];
		//console.log(needed);
		fill(0, needed);
		counts[j] = count;
		line = [l[0] + "?" + l[0], l[1].concat(l[1])];
	}
	console.log(counts);
	sum += counts[0] * Math.pow(counts[1] / counts[0], 4);
}

output(sum).forTest(525152);
