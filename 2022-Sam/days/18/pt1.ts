import { loadLines, output, SMap } from "aocutils";

const lines = loadLines().map((i) => i.split(",").map(Number));

const grid = new SMap<[number, number, number], number>();

for (const [x, y, z] of lines) {
	grid.set([x, y, z], 1);
}

const adj = [
	[0, 0, 1],
	[0, 0, -1],
	[0, 1, 0],
	[0, -1, 0],
	[1, 0, 0],
	[-1, 0, 0],
];

let count = 0;
for (const [x, y, z] of grid.keysArray()) {
	for (const [dx, dy, dz] of adj) {
		if (!grid.get([x + dx, y + dy, z + dz])) {
			count++;
		}
	}
}

output(count).forTest(64);
