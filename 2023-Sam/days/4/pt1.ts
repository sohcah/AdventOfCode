import { loadTrimmed, output, Range } from "aocutils";

const input = loadTrimmed().lns.map((l) => l.split(","));

const count = input
	.map((line) => line.map(Range.from))
	.count(([a, b]) => a.contains(b) || b.contains(a));

output(count).forTest(2).forActual(424);
