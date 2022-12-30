import { loadTrimmed, output } from "aocutils";

const movements = loadTrimmed()
	.split("")
	.map((i) => (i === "<" ? -1 : 1));

const positions = new Set<string>();

// Tetris
// const rockPatternsText = `
// ####
//
// #..
// ###
//
// ..#
// ###
//
// ##
// ##
//
// #.
// ##
// .#
//
// .#
// ##
// #.
//
// ###
// .#.
//
// `

const rockPatternsText = `
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
##
`;

const rockPatterns = rockPatternsText
	.trim()
	.split("\n\n")
	.map((i) =>
		i
			.split("\n")
			.map((j) => j.split("").map((k) => k === "#"))
			.reverse()
	);

function rockOverlaps(pattern: boolean[][], x: number, y: number) {
	for (let i = 0; i < pattern.length; i++) {
		for (let j = 0; j < pattern[i].length; j++) {
			if (pattern[i][j] && positions.has(`${x + j},${y + i}`)) return true;
		}
	}
	return false;
}

function rockFill(pattern: boolean[][], x: number, y: number) {
	for (let i = 0; i < pattern.length; i++) {
		for (let j = 0; j < pattern[i].length; j++) {
			if (pattern[i][j]) positions.add(`${x + j},${y + i}`);
		}
	}
}

let t = -1;
for (let i = 0; i < 2022; i++) {
	const rockPatt = rockPatterns[i % rockPatterns.length];
	const rockPos = [2, [...positions.array.map((i) => i.split(",")[1]), -1].max()! + 4];

	for (let j = 0; j < 100000; j++) {
		// for (let y = 6; y >= 0; y--) {
		//   let line = "";
		//   for (let x = 0; x < 7; x++) {
		//     line += positions.has(`${x},${y}`) ? "#" : (
		//       rockPos[0] <= x && x < rockPos[0] + rockPatt[0].length && rockPos[1] <= y && y < rockPos[1] + rockPatt.length && rockPatt[y - rockPos[1]][x - rockPos[0]] ? "@" : "."
		//     );
		//   }
		//   console.log("|"+line+"|");
		// }
		// console.log("".padStart(9, "-"));
		// console.log(j % 2 === 1 ? "\\/" : movements[(t + 1) % movements.length])

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
}

const max = positions.array.map((i) => i.split(",")[1]).max();

// for (let y = max; y >= 0; y--) {
//   let line = "";
//   for (let x = 0; x < 7; x++) {
//     line += positions.has(`${x},${y}`) ? "#" : (
//       "."
//     );
//   }
//   console.log("|" + line + "|");
// }
// console.log("".padStart(9, "-"));

output(max + 1).forTest(3068);
