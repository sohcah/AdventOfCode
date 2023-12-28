import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n").map(i=>i.split("").map(i=>".#S".indexOf(i)));

let steps = 64;
let width = input[0].length;
let grid = input[0].concat(...input.slice(1)).slice();
let size = grid.length;

let positions = new Set ([grid.indexOf(2)])
grid[grid.indexOf(2)] = 0;

for (let i=0;i<steps;i++) {
	let newPositions = new Set();
	for (const pos of positions) {
		if (pos % width != 0 && grid[pos - 1] == 0) {
			newPositions.add(pos - 1)
		}
		if (pos % width != width - 1 && grid[pos + 1] == 0) {
			newPositions.add(pos + 1)
		}
		if (pos >= width && grid[pos - width] == 0) {
			newPositions.add(pos - width)
		}
		if (pos < size - width && grid[pos + width] == 0) {
			newPositions.add(pos + width)
		}
	}

	//console.log(newPositions.size);

	positions = new Set(newPositions);
}

output(positions.size).forTest(16);
