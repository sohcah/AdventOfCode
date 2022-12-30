import { loadLines, output } from "aocutils";
import * as MathJS from "mathjs";

const lines = loadLines()
	.map((i) => i.split(": "))
	.map((i) => {
		if (i[1].match(/\d+/)) {
			return [i[0], Number(i[1].match(/\d+/)![0])] as [string, number];
		}

		return [i[0], [...i[1].split(" "), false]] as [string, Expr];
	});

type IntrExpr = [
	"humn" | number | IntrExpr,
	"+" | "-" | "/" | "*" | "=",
	number | "humn" | IntrExpr,
	true
];
type MainExpr = [string, "+" | "-" | "/" | "*" | "=", string, false];
type Expr = number | IntrExpr | MainExpr | "humn";

const linesMap = new Map<string, number | Expr>();
for (const line of lines) {
	linesMap.set(line[0], line[1]);
}

linesMap.set("humn", "humn");
const r = linesMap.get("root") as Expr;
linesMap.set("root", [r[0], "=", r[2], false]);

for (let i = 0; i < 1000; i++) {
	let changed = false;
	for (const line of Array.from(linesMap.entries())) {
		if (typeof line[1] === "number") continue;
		if (typeof line[1] === "string") continue;
		if (line[1][3]) continue;
		// if (line[0] === "root") continue;
		const [a, op, b] = line[1] as MainExpr;
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
				case "=":
					throw new Error("wat");
			}
			changed = true;
		} else if (typeof aVal === "number" && Array.isArray(bVal) && bVal[3]) {
			if (op === "*" || op === "+" || op === "=") {
				linesMap.set(line[0], [bVal, op, aVal, true] as IntrExpr);
				changed = true;
				break;
			} else if (op === "-") {
				linesMap.set(line[0], [aVal, op, bVal, true] as IntrExpr);
				changed = true;
				break;
			}
			console.log("wat", line[0], line[1], aVal, bVal);
			throw new Error("wat");
		} else if (typeof bVal === "number" && Array.isArray(aVal) && aVal[3]) {
			linesMap.set(line[0], [aVal, op, bVal, true] as IntrExpr);
			changed = true;
		} else if (typeof aVal === "number" && bVal === "humn") {
			linesMap.set(line[0], [aVal, op, bVal, true] as IntrExpr);
			changed = true;
		} else if (typeof bVal === "number" && aVal === "humn") {
			linesMap.set(line[0], [aVal, op, bVal, true] as IntrExpr);
			changed = true;
		}
	}
	if (!changed) break;
}

const expr = linesMap.get("root") as IntrExpr;

function stri(expr: IntrExpr | number | "humn"): string {
	if (typeof expr === "number") return expr.toString();
	if (expr === "humn") return "x";
	return `(${stri(expr[0])} ${expr[1]} ${stri(expr[2])})`;
}

// This is the Math bit - Credit to @beanz for this
const math = MathJS.create(MathJS.all, {
	number: "Fraction",
});
const parser = math.parser();
parser.evaluate(`f(x) = ${stri(expr).replace("=", "-")}`);
const result = math.number(parser.evaluate("f(0)/(f(0)-f(1))"));

output(result).forTest(301).forActual(3379022190351);
