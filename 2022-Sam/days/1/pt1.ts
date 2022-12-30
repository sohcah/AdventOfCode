import { loadTrimmed, output, sum } from "aocutils";

const input = loadTrimmed();
const elves = input.split("\n\n");

let max = 0;
for (const elf of elves) {
	const elfCount = sum(elf.split("\n").map(Number));
	if (elfCount > max) {
		max = elfCount;
	}
}

output(max).forTest(24000);
