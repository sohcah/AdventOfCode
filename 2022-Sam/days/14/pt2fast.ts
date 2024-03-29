import { IS_TEST, loadLines, output, range } from "aocutils";
import chalk from "chalk";

const sandSource = [500, 0] as [number, number];

const rockPaths = loadLines().map((i) => i.split(" -> ").map((j) => j.split(",").map(Number)));

const coordinateMap = new Map<number, string>();

const maxY = rockPaths
	.map((i) => i.map((j) => j[1]))
	.flat()
	.max();

const posToNum = (pos: [number, number]) => pos[0] + pos[1] * 1000000;

for (const rockPath of rockPaths) {
	for (let i = 0; i < rockPath.length - 1; i++) {
		const [x1, y1] = rockPath[i];
		const [x2, y2] = rockPath[i + 1];
		if (IS_TEST) console.log(x1, y1, x2, y2);
		for (const x of Array.from(
			range(x1, x2 + (Math.sign(x2 - x1) || 1), Math.sign(x2 - x1) || 1)
		)) {
			for (const y of Array.from(
				range(y1, y2 + (Math.sign(y2 - y1) || 1), Math.sign(y2 - y1) || 1)
			)) {
				if (IS_TEST) console.log(x, y);
				coordinateMap.set(posToNum([x, y]), "#");
			}
		}
	}
}

function isBlocked(coord: [number, number]) {
	const [x, y] = coord;

	if (y === maxY + 2) return true;

	return coordinateMap.has(posToNum([x, y]));
}

let sandCount = 0;
o: for (let i = 0; i < 100000; i++) {
	if (isBlocked(sandSource)) break o;
	const sandPosition: [number, number] = [...sandSource];
	for (let j = 0; j < 100000; j++) {
		// console.log(sandPosition, maxY);
		if (!isBlocked([sandPosition[0], sandPosition[1] + 1])) {
			sandPosition[1]++;
		} else if (!isBlocked([sandPosition[0] - 1, sandPosition[1] + 1])) {
			sandPosition[0]--;
			sandPosition[1]++;
		} else if (!isBlocked([sandPosition[0] + 1, sandPosition[1] + 1])) {
			sandPosition[0]++;
			sandPosition[1]++;
		} else {
			break;
		}
	}
	coordinateMap.set(posToNum(sandPosition), "O");
	sandCount++;
}

if (IS_TEST) {
	for (let y = 0; y <= maxY + 2; y++) {
		let line = "";
		for (let x = 500 - (maxY + 2); x <= 500 + (maxY + 2); x++) {
			const item = y === maxY + 2 ? "#" : coordinateMap.get(posToNum([x, y]));
			if (item === "O") {
				line += chalk.yellow`O`;
			} else if (item === "#") {
				line += chalk.gray`#`;
			} else {
				line += " ";
			}
		}
		console.log(line);
	}
}

output(sandCount).forTest(93).forActual(22499);
