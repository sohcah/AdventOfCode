//usenode
import { IS_TEST, loadLines, output, stabilise } from "aocutils";

const n = stabilise(2400, 200, 5);
// const n = 2400;

enum Type {
	Ore,
	Clay,
	Obsidian,
	Geode,
}

type TypeCounts = { [key in Type]?: number };

const blueprints = loadLines()
	.map((i) => i.match(/\d+/g).map(Number))
	.map((i) => ({
		blueprint: i[0],
		[Type.Ore]: {
			[Type.Ore]: i[1],
		} as TypeCounts,
		[Type.Clay]: {
			[Type.Ore]: i[2],
		} as TypeCounts,
		[Type.Obsidian]: {
			[Type.Ore]: i[3],
			[Type.Clay]: i[4],
		} as TypeCounts,
		[Type.Geode]: {
			[Type.Ore]: i[5],
			[Type.Obsidian]: i[6],
		} as TypeCounts,
		max: {
			[Type.Ore]: Math.max(i[1], i[2], i[3], i[5]),
			[Type.Clay]: i[4],
			[Type.Obsidian]: i[6],
			[Type.Geode]: Infinity,
		},
	}));

if (IS_TEST) console.log(blueprints);

type Path = {
	robots: { [key in Type]: number };
	types: { [key in Type]: number };
};

function getScore(path: Path): number {
	return (
		path.robots[Type.Ore] +
		path.types[Type.Ore] * 100 +
		path.robots[Type.Clay] * 100_00 +
		path.types[Type.Clay] * 100_00_00 +
		path.robots[Type.Obsidian] * 100_00_00_00 +
		path.types[Type.Obsidian] * 100_00_00_00_00 +
		path.robots[Type.Geode] * 100_00_00_00_00_00 +
		path.types[Type.Geode] * 100_00_00_00_00_00_00
	);
}

let sum = 1;
for (const bp of blueprints.slice(0, 3)) {
	let paths: Path[] = [
		{
			robots: {
				[Type.Ore]: 1,
				[Type.Clay]: 0,
				[Type.Obsidian]: 0,
				[Type.Geode]: 0,
			},
			types: {
				[Type.Ore]: 0,
				[Type.Clay]: 0,
				[Type.Obsidian]: 0,
				[Type.Geode]: 0,
			},
		},
	];
	for (let i = 0; i < 32; i++) {
		let newPaths = new Map<number, Path>();
		const add = (path: Path) => newPaths.set(getScore(path), path);
		for (const path of paths) {
			const incPath = {
				robots: {...path.robots},
				types: {...path.types},
			};
			incPath.types[Type.Ore] += incPath.robots[Type.Ore];
			incPath.types[Type.Clay] += incPath.robots[Type.Clay];
			incPath.types[Type.Obsidian] += incPath.robots[Type.Obsidian];
			incPath.types[Type.Geode] += incPath.robots[Type.Geode];
			add(incPath);
			if (
				bp.max[Type.Ore] > path.robots[Type.Ore] &&
				bp[Type.Ore][Type.Ore]! <= path.types[Type.Ore]
			) {
				const newPath = {
					robots: {...incPath.robots},
					types: {...incPath.types},
				};
				newPath.robots[Type.Ore]++;
				newPath.types[Type.Ore] -= bp[Type.Ore][Type.Ore]!;
				add(newPath);
			}
			if (
				bp.max[Type.Clay] > path.robots[Type.Clay] &&
				bp[Type.Clay][Type.Ore]! <= path.types[Type.Ore]
			) {
				const newPath = {
					robots: {...incPath.robots},
					types: {...incPath.types},
				};
				newPath.robots[Type.Clay]++;
				newPath.types[Type.Ore] -= bp[Type.Clay][Type.Ore]!;
				add(newPath);
			}
			if (
				bp.max[Type.Obsidian] > path.robots[Type.Obsidian] &&
				bp[Type.Obsidian][Type.Ore]! <= path.types[Type.Ore] &&
				bp[Type.Obsidian][Type.Clay]! <= path.types[Type.Clay]
			) {
				const newPath = {
					robots: {...incPath.robots},
					types: {...incPath.types},
				};
				newPath.robots[Type.Obsidian]++;
				newPath.types[Type.Ore] -= bp[Type.Obsidian][Type.Ore]!;
				newPath.types[Type.Clay] -= bp[Type.Obsidian][Type.Clay]!;
				add(newPath);
			}
			if (
				bp.max[Type.Geode] > path.robots[Type.Geode] &&
				bp[Type.Geode][Type.Ore]! <= path.types[Type.Ore] &&
				bp[Type.Geode][Type.Obsidian]! <= path.types[Type.Obsidian]
			) {
				const newPath = {
					robots: {...incPath.robots},
					types: {...incPath.types},
				};
				newPath.robots[Type.Geode]++;
				newPath.types[Type.Ore] -= bp[Type.Geode][Type.Ore]!;
				newPath.types[Type.Obsidian] -= bp[Type.Geode][Type.Obsidian]!;
				add(newPath);
			}
		}
		if (newPaths.size > n) {
			paths = newPaths
				.array()
				.sort((a, b) => b[0] - a[0])
				.slice(0, n)
				.map((i) => i[1]);
		} else {
			paths = newPaths.valuesArray();
		}
	}
	const bestPath = paths.sort((a, b) => b.types[Type.Geode] - a.types[Type.Geode])[0];
	sum *= bestPath.types[Type.Geode];
}

output(sum).forTest(3472).forActual(5824);
