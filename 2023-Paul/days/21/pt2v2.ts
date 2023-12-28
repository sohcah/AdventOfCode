import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n").map(i=>i.split("").map(i=>".#S".indexOf(i)));

let steps = 26501365;
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
let incs=new Array(width).fill(0);
let lastIncs=new Array(width).fill(0);
let last = new Array(width).fill(0);
let results = [];

let i=0;
let done = false;

while (done==false) {

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

	//console.log(i,positions.size,positions.size-last[i%(width)]);
	incs[i%(width)] = positions.size-last[i%(width)]
	last[i%(width)] = positions.size;
	if (i%width==0) {
		if (incs.every((i, n)=>i === lastIncs[n])) {
			console.log(i,incs,lastIncs,"done");
			done = true;
		}
		lastIncs = incs.slice();
	}
	i++;
}
while (i<steps) {
	last[i%width]+=incs[i%width];
	if (i % 2 == target) {
		count += last[i % width];
	}
	i++;
	//results.push(count);
}

//console.log(incs);
//console.log(i,results);
output(count).forTest(50);


