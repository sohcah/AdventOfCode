//usenode
import { loadLines, output } from "aocutils";

const lines = loadLines()
	.map((i) => i.match(/-?\d+/g)!.map(Number))
	.map((i) => {
		const mhd = Math.abs(i[0] - i[2]) + Math.abs(i[1] - i[3]);
		return {
			x: i[0],
			y: i[1],
			top: i[1] - mhd,
			bottom: i[1] + mhd,
			mhd,
		};
	});

let max = 4000000;
if (process.env.AOCTEST) {
	max = 20;
}

let answer = -1;

const sortedLines = lines.slice().sort((a, b) => a.top - b.top);
let currentLinesDown = sortedLines.filter((i) => i.top <= max / 2 && i.bottom >= max / 2);
let currentLinesUp = sortedLines.filter((i) => i.top <= max / 2 && i.bottom >= max / 2);
const lineChanges = sortedLines.map((i) => i.top).set.union(sortedLines.map((i) => i.bottom).set);

o: for (let rowOffset = 0; rowOffset <= max / 2; rowOffset++) {
	{
		const y = max / 2 + rowOffset;
		if (lineChanges.has(y)) {
			currentLinesDown = lines.filter((i) => i.top <= y && i.bottom >= y);
		}
		for (let x = 0; x <= max; x++) {
			let found = false;
			for (const line of currentLinesDown) {
				if (Math.abs(line.x - x) + Math.abs(line.y - y) <= line.mhd) {
					const diff = Math.abs(y - line.y);
					x = line.x + (line.mhd - diff);
					found = true;
					break;
				}
			}
			if (!found) {
				answer = x * 4000000 + y;
				break o;
			}
		}
	}

	{
		const y = max / 2 - rowOffset;
		if (lineChanges.has(y)) {
			currentLinesUp = lines.filter((i) => i.top <= y && i.bottom >= y);
		}
		for (let x = 0; x <= max; x++) {
			let found = false;
			for (const line of currentLinesUp) {
				if (Math.abs(line.x - x) + Math.abs(line.y - y) <= line.mhd) {
					const diff = Math.abs(y - line.y);
					x = line.x + (line.mhd - diff);
					found = true;
					break;
				}
			}
			if (!found) {
				answer = x * 4000000 + y;
				break o;
			}
		}
	}
}

output(answer).forTest(56000011);
