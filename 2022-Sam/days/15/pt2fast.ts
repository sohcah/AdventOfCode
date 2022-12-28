//usenode
import { loadLines, output, Point2D } from "aocutils";

const lines = loadLines()
	.map((i) => i.match(/-?\d+/g)!.map(Number))
	.map((i) => {
		const mhd = Math.abs(i[0] - i[2]) + Math.abs(i[1] - i[3]);
		return {
			point: new Point2D(i[0], i[1]),
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

o: for (let rowOffset = 0; rowOffset <= max / 2; rowOffset++) {
	for (const offset of [-1, 1]) {
		const row = max / 2 + rowOffset * offset;
		for (let x = 0; x <= max; x++) {
			const point = new Point2D(x, row);
			let found = false;
			for (const line of lines) {
				if (line.point.manhattanDistance(point) <= line.mhd) {
					const diff = Math.abs(row - line.sy);
					x = line.sx + (line.mhd - diff);
					found = true;
					break;
				}
			}
			if (!found) {
				answer = x * 4000000 + row;
				break o;
			}
		}
	}
}

output(answer).forTest(56000011);
