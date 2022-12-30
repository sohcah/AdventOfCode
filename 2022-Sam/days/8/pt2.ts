import { gridPositions, loadLines, output } from "aocutils";

const grid = loadLines().map((i) => i.split("").map(Number));

let answer = 0;
for (const position of Array.from(gridPositions(grid))) {
	let visibleTop = 0;
	let visibleLeft = 0;
	let visibleRight = 0;
	let visibleBottom = 0;
	const val = grid[position[0]][position[1]];
	for (let i = position[0] - 1; i >= 0; i--) {
		visibleTop++;
		if (grid[i][position[1]] >= val) {
			break;
		}
	}
	for (let i = position[0] + 1; i < grid.length; i++) {
		visibleBottom++;
		if (grid[i][position[1]] >= val) {
			break;
		}
	}

	for (let i = position[1] - 1; i >= 0; i--) {
		visibleLeft++;
		if (grid[position[0]][i] >= val) {
			break;
		}
	}

	for (let i = position[1] + 1; i < grid[position[0]].length; i++) {
		visibleRight++;
		if (grid[position[0]][i] >= val) {
			break;
		}
	}

	const score = [visibleTop, visibleLeft, visibleRight, visibleBottom].product;
	console.log(position);
	console.log(val);
	console.log(visibleTop, visibleLeft, visibleRight, visibleBottom);
	console.log(score);
	if (score > answer) {
		answer = score;
	}
}

output(answer).forTest(8);
