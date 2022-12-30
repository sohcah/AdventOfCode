import { loadLines, output } from "aocutils";

const lines = loadLines()
	.map((i) => i.split(": "))
	.map((i) => {
		if (i[1].match(/\d+/)) {
			return [i[0], Number(i[1].match(/\d+/)![0])] as [string, number];
		}

		return [i[0], i[1].split(" ")] as [string, [string, "+" | "-" | "/" | "*", string]];
	});

const linesMap = new Map<string, number | [string, "+" | "-" | "/" | "*", string]>();
for (const line of lines) {
	linesMap.set(line[0], line[1]);
}

console.log(lines);

for (let i = 0; i < 1000; i++) {
	let changed = false;
	for (const line of Array.from(linesMap.entries())) {
		if (typeof line[1] === "number") continue;
		const [a, op, b] = line[1];
		const aVal = linesMap.get(a)!;
		const bVal = linesMap.get(b)!;
		if (typeof aVal === "number" && typeof bVal === "number") {
			switch (op) {
				case "+":
					linesMap.set(line[0], aVal + bVal);
					break;
				case "-":
					linesMap.set(line[0], aVal - bVal);
					break;
				case "*":
					linesMap.set(line[0], aVal * bVal);
					break;
				case "/":
					linesMap.set(line[0], aVal / bVal);
					break;
			}
			changed = true;
		}
	}
	if (!changed) break;
}

console.log(linesMap);

output(linesMap.get("root") as number).forTest(152);
