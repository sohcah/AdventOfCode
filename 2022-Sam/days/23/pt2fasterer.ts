//usenode
import { loadLines, output } from "aocutils";

const grid = loadLines();

const elves: { pos: number; nextPos: number | null }[] = [];

const xRange = grid.length * 4;
const getCoordNum = (x: number, y: number) => x * xRange + y;

for (let y = 0; y < grid.length; y++) {
	for (let x = 0; x < grid[y].length; x++) {
		if (grid[y][x] === "#") {
			elves.push({
				pos: getCoordNum(x + Math.floor(grid.length * 1.5), y + Math.floor(grid.length * 1.5)),
				nextPos: null,
			});
		}
	}
}

const moves: number[][] = [
	[getCoordNum(0, -1), getCoordNum(-1, -1), getCoordNum(1, -1)], // N NE NW
	[getCoordNum(0, 1), getCoordNum(-1, 1), getCoordNum(1, 1)], // S SE SW
	[getCoordNum(-1, 0), getCoordNum(-1, -1), getCoordNum(-1, 1)], // W NW SW
	[getCoordNum(1, 0), getCoordNum(1, -1), getCoordNum(1, 1)], // E NE SE
];

const adjacent = [
	getCoordNum(-1, -1),
	getCoordNum(-1, 0),
	getCoordNum(-1, 1),
	getCoordNum(0, -1),
	getCoordNum(0, 1),
	getCoordNum(1, -1),
	getCoordNum(1, 0),
	getCoordNum(1, 1),
];

const adjacents = moves.map((move) => {
	return adjacent.filter((i) => !move.includes(i));
});

let answer = -1;
let timeSum = 0;
const checkAdjacent = (elf: typeof elves[number], pos: number) => {
	return !!arr[pos];
};

const arr = new Uint8Array(xRange * xRange);

for (let round = 0; round < 973; round++) {
	elves.forEach((elf) => {
		arr[elf.pos] = 1;
	});
	let didMove = false;
	const start = performance.now();
	const elfMovePosMap = new Map<number, typeof elves[number]>();
	// Choose positions
	o: for (const elf of elves) {
		let i = 0;
		for (const move of moves) {
			i++;
			if (move.some((pos) => checkAdjacent(elf, elf.pos + pos))) continue; // Can't move in this direction
			if (i === 1 && adjacents[0].every((pos) => !checkAdjacent(elf, elf.pos + pos))) continue o; // Can't move at all
			elf.nextPos = elf.pos + move[0];
			if (elfMovePosMap.has(elf.nextPos)) {
				elfMovePosMap.get(elf.nextPos)!.nextPos = null;
				elf.nextPos = null;
				continue o;
			}
			elfMovePosMap.set(elf.nextPos, elf);
			continue o;
		}
	}
	timeSum += performance.now() - start;
	elves.forEach((elf) => {
		arr[elf.pos] = 0;
	});

	// Move
	for (const elf of elves) {
		if (elf.nextPos === null) continue;
		didMove = true;
		elf.pos = elf.nextPos!;
		elf.nextPos = null;
	}

	moves.push(moves.shift()!);
	adjacents.push(adjacents.shift()!);

	if (!didMove) {
		answer = round + 1;
		break;
	}
}

console.log(timeSum);

// const answer = (elves.map(i => i[0][0]).range() + 1) * (elves.map(i => i[0][1]).range() + 1) - elves.length;

output(answer).forTest(20).forActual(973);
