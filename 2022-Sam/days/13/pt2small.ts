import { loadLines, output } from "aocutils";

const lines = loadLines().map((j) => JSON.parse(j)) as Value[];
lines.push([[2]]);
lines.push([[6]]);

type Value = number | Value[];

enum Result {
	Continue = 0,
	OutOfOrder = 1,
	InOrder = -1,
}

function ensureArray(value: Value): Value[] {
	return Array.isArray(value) ? value : [value];
}

function compare(a: Value, b: Value): Result {
	if (typeof a === "number" && typeof b === "number") {
		return b > a ? Result.InOrder : b === a ? Result.Continue : Result.OutOfOrder;
	}
	const aArray = ensureArray(a);
	const bArray = ensureArray(b);

	for (let i = 0; i <= Math.max(aArray.length, bArray.length); i++) {
		const aItem = aArray[i];
		const bItem = bArray[i];
		if (aItem === undefined && bItem === undefined) return Result.Continue;
		if (aItem === undefined) return Result.InOrder;
		if (bItem === undefined) return Result.OutOfOrder;
		const result = compare(aItem, bItem);
		if (result !== Result.Continue) return result;
	}
	throw new Error("Should not reach here");
}

const orderedLines = lines.sort(compare);

output(
	(orderedLines.findIndex((i) => JSON.stringify(i) === "[[2]]") + 1) *
		(orderedLines.findIndex((i) => JSON.stringify(i) === "[[6]]") + 1)
)
	.forTest(140)
	.actual(21614);
