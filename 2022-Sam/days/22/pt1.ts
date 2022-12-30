import { loadInput, output } from "aocutils";

const sections = loadInput().trimEnd().split("\n\n");
const steps = sections[1]
	.match(/\d+|[LR]/g)!
	.map((i) => (i.match(/\d+/) ? Number(i) : (i as "L" | "R")));

const grid = sections[0].split("\n").map((i) => i.split(""));

type Pos = [x: number, y: number, facing: 0 | 1 | 2 | 3];

const height = grid.length;
const width = Math.max(...grid.map((i) => i.length));

function incr(pos: Pos): Pos {
	switch (pos[2]) {
		case 0:
			return [pos[0], (pos[1] + 1) % width, pos[2]];
		case 1:
			return [(pos[0] + 1) % height, pos[1], pos[2]];
		case 2:
			return [pos[0], (pos[1] - 1 + width) % width, pos[2]];
		case 3:
			return [(pos[0] - 1 + height) % height, pos[1], pos[2]];
	}
}

function getGrid(pos: Pos) {
	return grid[pos[0]][pos[1]] ?? " ";
}

function moveForward(pos: Pos) {
	let newPos = pos;
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const inc = incr(newPos);
		switch (getGrid(inc)) {
			case " ":
				newPos = inc;
				break;
			case ".":
				return inc;
			case "#":
				return pos;
		}
	}
}

let pos: Pos = [0, grid[0].indexOf("."), 0];

for (const step of steps) {
	if (typeof step === "string") {
		pos = [pos[0], pos[1], ((pos[2] + (step === "R" ? 1 : 3)) % 4) as 0 | 1 | 2 | 3];
	} else {
		for (let i = 0; i < step; i++) {
			pos = moveForward(pos);
		}
	}
}

output((pos[0] + 1) * 1000 + (pos[1] + 1) * 4 + pos[2])
	.forTest(6032)
	.forActual(144244);
