import { IS_TEST, loadTrimmed, output } from "aocutils";

const movements = loadTrimmed()
	.split("")
	.map((i) => (i === "<" ? -1 : 1));

const positions = new Set<number>();

const rockPatterns = `
####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`
	.trim()
	.split("\n\n")
	.map((i) =>
		i
			.split("\n")
			.map((j) => j.split("").map((k) => k === "#"))
			.reverse()
	);

const posToNum = (x: number, y: number) => x + y * 10;

function rockOverlaps(pattern: boolean[][], x: number, y: number) {
	for (let i = 0; i < pattern.length; i++) {
		for (let j = 0; j < pattern[i].length; j++) {
			if (pattern[i][j] && positions.has(posToNum(x + j, y + i))) return true;
		}
	}
	return false;
}

function rockFill(pattern: boolean[][], x: number, y: number) {
	for (let i = 0; i < pattern.length; i++) {
		for (let j = 0; j < pattern[i].length; j++) {
			if (pattern[i][j]) positions.add(posToNum(x + j, y + i));
		}
	}
}

const numberOfRocksToFall = 1_000_000_000_000;

let t = -1;
let ts = "";
let loop = 0;
let loopStart = 0;
const heights = [];
let answer;
for (let i = 0; i < 2000; i++) {
	// Note: 2_000 is an arbitrary number that should be high enough for anything. Just means that we don't get stuck in an infinite loop if something goes wrong.
	const rockPatt = rockPatterns[i % rockPatterns.length];
	const rockPos = [2, [...positions.array.map((i) => Math.floor(i / 10)), -1].max()! + 4];

	ts += `${(t + 1) % movements.length},`;

	if (!loop && ts.indexOf(ts.slice(-20)) !== ts.lastIndexOf(ts.slice(-20))) {
		console.log("loop", i);
		const firstIndex = ts.indexOf(ts.slice(-20));
		const secondIndex = ts.lastIndexOf(ts.slice(-20));
		loop = ts.slice(firstIndex, secondIndex).split(",").filter(Boolean).length;
		loopStart = ts.slice(0, firstIndex).split(",").filter(Boolean).length;
		const startHeight = heights[loopStart];
		const loopHeight = heights[loopStart + loop] - heights[loopStart];

		console.log("loop", loop, loopStart);
		console.log("heights", startHeight, loopHeight);

		const loopCount = Math.floor((numberOfRocksToFall - loopStart) / loop);
		const loopRemainder = (numberOfRocksToFall - loopStart) % loop;
		const loopHeightRemainder = heights[loopStart + loopRemainder] - heights[loopStart];
		console.log("loopCount", loopCount, loopRemainder);
		console.log("loopHeightRemainder", loopHeightRemainder);
		answer = startHeight + loopHeight * loopCount + loopHeightRemainder;
		break;
	}

	for (let j = 0; j < 100_000; j++) {
		// Note: 100_000 is an arbitrary number that should be high enough for anything. Just means that we don't get stuck in an infinite loop if something goes wrong.
		if (j % 2 === 1) {
			if (rockPos[1] === 0) break;
			if (rockOverlaps(rockPatt, rockPos[0], rockPos[1] - 1)) {
				break;
			}
			rockPos[1]--;
		} else {
			t++;
			const newX = rockPos[0] + movements[t % movements.length];
			if (newX < 0) continue;
			if (newX + rockPatt[0].length > 7) continue;
			if (rockOverlaps(rockPatt, newX, rockPos[1])) {
				continue;
			}
			rockPos[0] = newX;
		}
	}
	rockFill(rockPatt, rockPos[0], rockPos[1]);

	heights.push(positions.array.map((i) => Math.floor(i / 10)).max());
}

const max = positions.array.map((i) => Math.floor(i / 10)).max();

if (IS_TEST) {
	// Log some rows
	for (let y = max; y >= max - 3; y--) {
		let line = "";
		for (let x = 0; x < 7; x++) {
			line += positions.has(posToNum(x, y)) ? "#" : ".";
		}
		console.log("|" + line + "|");
	}
	console.log("".padStart(9, "-"));
}

output(answer).forTest(1514285714288).actual(1575811209487);
