import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n").map(i=>i.split("").map(i=>".#S".indexOf(i)));

let steps = 999;
let width = input[0].length;
let trueWidth = 26502872+11*131;
console.log (trueWidth/11);
let W = trueWidth/width;
let grid = input[0].concat(...input.slice(1)).slice();
let size = grid.length;
let down = Math.floor(grid.indexOf(2)/width)+width*(W-1)/2
let across = grid.indexOf(2) % width +width*(W-1)/2;
//console.log(down,across);
let positions = new Set ([down*trueWidth+across]);
console.log(positions);
grid[grid.indexOf(2)] = 0;
let oldPositions = new Set();
let target = 1-steps % 2;
let count = target;
let results = [];

for (let i= 0;i<steps;i++) {
	let newPositions = new Set();
	for (const pos of positions) {
		across = pos % width;
		down = Math.floor((pos % (trueWidth*width)) / trueWidth);
		let easyPos = down*width+across;
		//console.log(pos,across, down);
		if (across!=0 && grid[easyPos - 1] == 0 && !oldPositions.has(pos-1)) {
			newPositions.add(pos - 1)
		}
		if (across != width - 1 && grid[easyPos + 1] == 0 && !oldPositions.has(pos+1)) {
			newPositions.add(pos + 1)
		}
		if (down != 0 && grid[easyPos - width] == 0 && !oldPositions.has(pos-trueWidth)) {
			newPositions.add(pos - trueWidth)
		}
		if (down != width-1 && grid[easyPos + width] == 0 && !oldPositions.has(pos+trueWidth)) {
			newPositions.add(pos + trueWidth)
		}
		if (across == 0 && grid[easyPos - 1+width] == 0 && !oldPositions.has(pos-1)) {
			newPositions.add(pos - 1)
		}
		if (across == width - 1 && grid[easyPos + 1-width] == 0 && !oldPositions.has(pos+1)) {
			newPositions.add(pos + 1)
		}
		if (down == 0 && grid[easyPos - width+width*width] == 0 && !oldPositions.has(pos-trueWidth)) {
			newPositions.add(pos - trueWidth)
		}
		if (down == width-1 && grid[easyPos + width-width*width] == 0 && !oldPositions.has(pos+trueWidth)) {
			newPositions.add(pos + trueWidth)
		}
	}
	//console.log(...newPositions);
	if (i % 2 == target) {
		count += newPositions.size;
		results.push(count);
	}
	oldPositions = new Set(positions);
	positions = new Set(newPositions);
}

//console.log(results);
output(count).forTest(50);


