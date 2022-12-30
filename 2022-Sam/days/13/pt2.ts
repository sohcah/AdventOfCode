import { loadLines, output } from "aocutils";

const lines = loadLines().map((j) => JSON.parse(j)) as Value[];
lines.push([[2]]);
lines.push([[6]]);

type Value = number | Value[];

type CompareResult = "continue" | "out_of_order" | "in_order";

function ensureArray(value: Value): Value[] {
	return Array.isArray(value) ? value : [value];
}

function compare(a: Value, b: Value): CompareResult {
	if (typeof a === "number" && typeof b === "number") {
		return b > a ? "in_order" : b === a ? "continue" : "out_of_order";
	}
	const aArray = ensureArray(a);
	const bArray = ensureArray(b);

	// console.log(`----\n${JSON.stringify(aArray)}\n${JSON.stringify(bArray)}`);
	for (let i = 0; i < Math.max(aArray.length, bArray.length) + 1; i++) {
		// console.log(i, aArray[i], bArray[i]);
		const aItem = aArray[i];
		const bItem = bArray[i];
		if (aItem === undefined && bItem === undefined) return "continue";
		if (aItem === undefined) return "in_order";
		if (bItem === undefined) return "out_of_order";
		const result = compare(aItem, bItem);
		if (result !== "continue") return result;
	}
	throw new Error("Should not reach here");
}

const orderedLines = lines.sort((a, b) => {
	const result = compare(a, b);
	if (result === "in_order") return -1;
	if (result === "out_of_order") return 1;
	return 0;
});

console.log(orderedLines.map((i) => JSON.stringify(i)).join("\n"));

output(
	(orderedLines.findIndex((i) => JSON.stringify(i) === "[[2]]") + 1) *
		(orderedLines.findIndex((i) => JSON.stringify(i) === "[[6]]") + 1)
).forTest(140);
