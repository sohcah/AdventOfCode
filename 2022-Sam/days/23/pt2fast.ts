import { CountedSet, loadLines, output } from "aocutils";

const grid = loadLines().map((i) => i.split(""));

const elves: {pos:number, nextPos: number | null, hasAdjacent: boolean | null}[] = [];

const xRange = grid.length * 4;
const getCoordNum = (x: number, y: number) => x * xRange + y;

console.log("XR", xRange);

for (let y = 0; y < grid.length; y++) {
	for (let x = 0; x < grid[y].length; x++) {
		if (grid[y][x] === "#") {
			elves.push({pos:getCoordNum(x, y), nextPos:null, hasAdjacent:null});
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

const adjacents = moves.map(move => {
	return adjacent.filter(i => !move.includes(i));
})

let uselessIncrement = 0;
let answer = -1;
let timeSum = 0;
let elfPosSet = new Map<number, typeof elves[number]>();
const checkAdjacent = (elf: typeof elves[number], pos: number) => {
	if (elfPosSet.has(pos)) {
		const otherElf = elfPosSet.get(pos)!;
		otherElf.hasAdjacent = true;
		elf.hasAdjacent = true;
		return true;
	}
	return false;
}
for (let round = 0; round < 973; round++) {
	elfPosSet.clear();
	elves.forEach(elf => elfPosSet.set(elf.pos, elf));
	let didMove = false;
	const start = performance.now();
	// Choose positions
	o: for (const elf of elves) {
		uselessIncrement++; // This does absolutely nothing, except cut the time down by 65ms
		for (const move of moves) {
			if (move.some((pos) => checkAdjacent(elf, elf.pos + pos))) continue; // Can't move in this direction
			if (!elf.hasAdjacent && adjacents[0].every(pos => !checkAdjacent(elf, elf.pos + pos))) continue o; // Can't move at all
			elf.nextPos	 = elf.pos + move[0];
			continue o;
		}
	}
	timeSum += performance.now() - start;
	const movingElves = elves.filter((elf) => elf.nextPos !== null);
	const elfMovePosSet = new CountedSet();
	for (const elf of movingElves) {
		elfMovePosSet.add(elf.nextPos);
	}

	// Move
	for (const elf of movingElves) {
		if (!(elfMovePosSet.get(elf.nextPos) > 1)) {
			didMove = true;
			elf.pos = elf.nextPos!;
		}
	}

	for(const elf of elves) {
		elf.nextPos = null;
		elf.hasAdjacent = null;
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
