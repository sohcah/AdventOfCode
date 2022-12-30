import { loadLines, output } from "aocutils";

const lines = loadLines()
	.map((i) => i.match(/-?\d+/g)!.map(Number))
	.map((i) => {
		const mhd = Math.abs(i[0] - i[2]) + Math.abs(i[1] - i[3]);
		return {
			sx: i[0],
			sy: i[1],
			bx: i[2],
			by: i[3],
			mhd,
			maxY: i[1] + mhd,
			minY: i[1] - mhd,
		};
	});
let max = 4000000;
if (process.env.AOCTEST) {
	max = 20;
}

let answer = -1;

lines.sort((a, b) => a.sx - a.mhd - (b.sx - b.mhd));
const lineChanges = lines.map((i) => i.maxY).set.union(lines.map((i) => i.minY).set);
let currentLines = lines.filter((i) => i.maxY >= 0 && i.minY <= 0);

o: for (let row = 0; row < max; row++) {
	if (lineChanges.has(row)) {
		currentLines = lines.filter((i) => i.maxY >= row && i.minY <= row);
	}
	const ranges: [number, number][] = [];
	for (const line of currentLines) {
		const diff = Math.abs(row - line.sy);
		const startX = line.sx - (line.mhd - diff);
		const endX = line.sx + (line.mhd - diff);
		if (endX < 0 || startX > max) continue;
		ranges.push([Math.max(0, startX), Math.min(max, endX)]);
	}
	ranges.sort((a, b) => a[0] - b[0]);

	let lastX = ranges[0][1];
	for (let i = 1; i < ranges.length; i++) {
		if (ranges[i][0] > lastX + 1) {
			answer = (lastX + 1) * 4000000 + row;
			break o;
		}
		lastX = Math.max(lastX, ranges[i][1]);
	}
}

output(answer).forTest(56000011).forActual(13134039205729);
