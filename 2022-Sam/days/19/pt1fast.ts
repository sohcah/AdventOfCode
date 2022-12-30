import { IS_TEST, loadLines, output, stabilise } from "aocutils";

const n = stabilise(100, 100, 3);

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

function canBuy(blueprint: typeof blueprints[number], type: Type, path: Path) {
	if (blueprint.max[type] <= path.robots[type]) {
		return false;
	}
	// eslint-disable-next-line rulesdir/probably_not_in
	for (const item in blueprint[type]) {
		if (blueprint[type][item] > path.types[item]) {
			return false;
		}
	}
	return true;
}

function buy(blueprint: typeof blueprints[number], type: Type, path: Path) {
	const newTypes = { ...path.types };
	// eslint-disable-next-line rulesdir/probably_not_in
	for (const item in blueprint[type]) {
		newTypes[item] -= blueprint[type][item];
	}
	const newRobots = { ...path.robots };
	newRobots[type] = newRobots[type] + 1;
	return {
		robots: newRobots,
		types: newTypes,
	};
}

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

function inc(path: Path): Path {
	const newTypes = { ...path.types };
	// eslint-disable-next-line rulesdir/probably_not_in
	for (const robot in path.robots) {
		newTypes[robot] += path.robots[robot];
	}
	return { robots: path.robots, types: newTypes };
}

let sum = 0;
for (const bp of blueprints) {
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
	for (let i = 0; i < 24; i++) {
		// if (IS_TEST) console.log(bp.blueprint, i, paths.length);
		const newPaths = new Map<number, Path>();
		const add = (path: Path) => newPaths.set(getScore(path), path);
		for (const path of paths) {
			add(inc(path));
			if (canBuy(bp, Type.Ore, path)) add(buy(bp, Type.Ore, inc(path)));
			if (canBuy(bp, Type.Clay, path)) add(buy(bp, Type.Clay, inc(path)));
			if (canBuy(bp, Type.Obsidian, path)) add(buy(bp, Type.Obsidian, inc(path)));
			if (canBuy(bp, Type.Geode, path)) add(buy(bp, Type.Geode, inc(path)));
		}
		console.log(bp.blueprint, i, newPaths.size);
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
	// sum *= bestPath.types[Type.Geode];
	sum += bestPath.types[Type.Geode] * bp.blueprint;
}

output(sum).forTest(33).forActual(1650);
