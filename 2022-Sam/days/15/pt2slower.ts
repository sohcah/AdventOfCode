//usenode
import {loadLines, output} from "aocutils";

const lines = loadLines()
	.map((i) => i.match(/-?\d+/g)!.map(Number))
	.map((i) => {
		const mhd = Math.abs(i[0] - i[2]) + Math.abs(i[1] - i[3]);
		return {
			x: i[0],
			y: i[1],
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

function* genPointsNonOffset(): Generator<number> {
	for (const line of lines) {
		const mhd = line.mhd;
		for (let x = Math.max(line.x - mhd, 0); x <= Math.min(line.x + mhd, max); x++) {
			const up = [x, line.y + (mhd - Math.abs(line.x - x))] as [number, number];
			if(up[0] >= 0 && up[0] <= max && up[1] >= 0 && up[1] <= max) yield up[0] * max + up[1];
			const down = [x, line.y - (mhd - Math.abs(line.x - x))] as [number, number];
			if(down[0] >= 0 && down[0] <= max && down[1] >= 0 && down[1] <= max) yield down[0] * max + down[1];
		}
	}
}

const pointsNonOffsetL = [...genPointsNonOffset()];
console.log(pointsNonOffsetL.slice(0, 10));
const pointsNonOffset = new Set(pointsNonOffsetL.slice(0,10));

function* genPoints(): Generator<number> {
	for (const line of lines) {
		const mhd = line.mhd + 1;
		for (let x = Math.max(line.x - mhd, 0); x <= Math.min(line.x + mhd, max); x++) {
			const up = [x, line.y + (mhd - Math.abs(line.x - x))] as [number, number];
			if(up[0] >= 0 && up[0] <= max && up[1] >= 0 && up[1] <= max) yield up[0] * max + up[1];
			const down = [x, line.y - (mhd - Math.abs(line.x - x))] as [number, number];
			if(down[0] >= 0 && down[0] <= max && down[1] >= 0 && down[1] <= max) yield down[0] * max + down[1];
		}
	}
}

// let i = 0;
// for(const [x, y] of genPoints()) {
// 	i++;
// 	if (!lines.some(line => (Math.abs(line.x - x) + Math.abs(line.y - y)) <= line.mhd)) {
// 		answer = x * 4000000 + y;
// 		break;
// 	}
// }

console.log(pointsNonOffset.size);

output(answer).forTest(56000011).forActual(13134039205729);
