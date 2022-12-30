import { gridPositions, loadLines, output } from "aocutils";

const grid = loadLines().map((i) => i.split("").map(Number));

let answer = 0;
for (const position of Array.from(gridPositions(grid))) {
	let visibleTop = true;
	let visibleLeft = true;
	let visibleRight = true;
	let visibleBottom = true;
	const val = grid[position[0]][position[1]];
	for (let i = position[0] - 1; i >= 0; i--) {
		if (grid[i][position[1]] >= val) {
			visibleTop = false;
			break;
		}
	}
	for (let i = position[0] + 1; i < grid.length; i++) {
		if (grid[i][position[1]] >= val) {
			visibleBottom = false;
			break;
		}
	}

	for (let i = position[1] - 1; i >= 0; i--) {
		if (grid[position[0]][i] >= val) {
			visibleLeft = false;
			break;
		}
	}

	for (let i = position[1] + 1; i < grid[position[0]].length; i++) {
		if (grid[position[0]][i] >= val) {
			visibleRight = false;
			break;
		}
	}

	console.log(visibleTop, visibleLeft, visibleRight, visibleBottom);
	if (visibleTop || visibleBottom || visibleLeft || visibleRight) {
		answer++;
	}
}

output(answer).forTest(21);
