import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n").map(i=>i.split("").map(i=>".#S".indexOf(i)));

let steps = 50;
let width = input[0].length;
let trueWidth = 363; //26502872;
let W = trueWidth/width;
let grid = input[0].concat(...input.slice(1)).slice();
let size = grid.length;
let down = Math.floor(grid.indexOf(2)/width)+width*(W-1)/2
let across = grid.indexOf(2) % width +width*(W-1)/2;
//console.log(down,across);
let positions = new Set ([down*trueWidth+across]);
//console.log(positions);
grid[grid.indexOf(2)] = 0;

for (let i=0;i<steps;i++) {

	let newPositions = new Set();
	for (const pos of positions) {
		across = pos % width;
		down = Math.floor((pos % (trueWidth*width)) / trueWidth);
		let easyPos = down*width+across;
		console.log(pos,across, down);
		if (across!=0 && grid[easyPos - 1] == 0) {
			newPositions.add(pos - 1)
		}
		if (across != width - 1 && grid[easyPos + 1] == 0) {
			newPositions.add(pos + 1)
		}
		if (down != 0 && grid[easyPos - width] == 0) {
			newPositions.add(pos - trueWidth)
		}
		if (down != width-1 && grid[easyPos + width] == 0) {
			newPositions.add(pos + trueWidth)
		}
		if (across == 0 && grid[easyPos - 1+width] == 0) {
			newPositions.add(pos - 1)
		}
		if (across == width - 1 && grid[easyPos + 1-width] == 0) {
			newPositions.add(pos + 1)
		}
		if (down == 0 && grid[easyPos - width+width*width] == 0) {
			newPositions.add(pos - trueWidth)
		}
		if (down == width-1 && grid[easyPos + width-width*width] == 0) {
			newPositions.add(pos + trueWidth)
		}
	}
	console.log(...newPositions);
	positions = new Set(newPositions);
}

output(positions.size).forTest(50);
