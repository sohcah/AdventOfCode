import { CountedSet, loadLines, output } from "aocutils";

const grid = loadLines().map((i) => i.split(""));

console.log(grid);

type Coord = [x: number, y: number];

const elves: [Coord, Coord | null][] = [];

for (let y = 0; y < grid.length; y++) {
	for (let x = 0; x < grid[y].length; x++) {
		if (grid[y][x] === "#") {
			elves.push([[x, y], null]);
		}
	}
}

const moves: Coord[][] = [
	[
		[0, -1],
		[-1, -1],
		[1, -1],
	], // N NE NW
	[
		[0, 1],
		[-1, 1],
		[1, 1],
	], // S SE SW
	[
		[-1, 0],
		[-1, -1],
		[-1, 1],
	], // W NW SW
	[
		[1, 0],
		[1, -1],
		[1, 1],
	], // E NE SE
];

let answer;
for (let round = 0; round < 2000; round++) {
	const elfPosSet = new Set<string>();
	for (const elf of elves) {
		elfPosSet.add(elf[0].join("|"));
	}

	const checkFree = (coord: Coord) => {
		return !elfPosSet.has(coord.join("|"));
	};

	console.log(round);

	let didMove = false;
	// Choose positions
	for (const elf of elves) {
		elf[1] = null;

		let otherElf = false;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (i === 0 && j === 0) continue;
				if (!checkFree([elf[0][0] + i, elf[0][1] + j])) {
					otherElf = true;
					break;
				}
			}
		}

		if (!otherElf) continue;

		for (const move of moves) {
			let free = true;
			for (const pos of move) {
				if (!checkFree([elf[0][0] + pos[0], elf[0][1] + pos[1]])) {
					free = false;
					break;
				}
			}
			if (free) {
				elf[1] = [elf[0][0] + move[0][0], elf[0][1] + move[0][1]];
				break;
			}
		}
	}
	const elfMovePosSet = new CountedSet();
	for (const elf of elves) {
		if (elf[1]) elfMovePosSet.add(elf[1].join("|"));
	}

	// Move
	for (const elf of elves) {
		if (!elf[1]) continue;
		if (elfMovePosSet.get(elf[1].join("|")) > 1) continue;
		didMove = true;
		elf[0] = elf[1];
		elf[1] = null;
	}

	moves.push(moves.shift());

	if (!didMove) {
		answer = round + 1;
		break;
	}
}

// const answer = (elves.map(i => i[0][0]).range() + 1) * (elves.map(i => i[0][1]).range() + 1) - elves.length;

output(answer).forTest(20).forActual(973);
