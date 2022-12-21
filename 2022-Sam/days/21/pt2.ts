import {IS_TEST, loadLines, output} from "aocutils";

const lines = loadLines().map(i => i.split(": ")).map(i => {
  if (i[1].match(/\d+/)) {
    return [
      i[0],
      Number(i[1].match(/\d+/)![0]),
    ] as [string, number];
  }

  return [
    i[0],
    [...i[1].split(" "), false]
  ] as [string, Expr];
});

let answer = -1;

type IntrExpr = ["humn" | number | IntrExpr, "+" | "-" | "/" | "*" | "=", number | "humn" | IntrExpr, true];
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
// console.log(JSON.stringify(expr, null, 2));

function stri(expr: IntrExpr | number | "humn"): string {
  if(typeof expr === "number") return expr.toString();
  if(expr === "humn") return "humn";
  return `(${stri(expr[0])} ${expr[1]} ${stri(expr[2])})`;
}
console.log(stri(expr));

if (typeof expr[2] !== "number") {
  throw new Error("wat");
}

let left = expr[0];
let right = expr[2] as number;

for (let i = 0; i < 100; i++) {
  if (typeof left[2] !== "number") {
    if (left[1] === "-") {
      right = left[0] as number - right;
      left = left[2] as IntrExpr;
    } else {
      throw new Error("wat");
    }
  } else {
    const rhs = left[2] as number;

    switch (left[1]) {
      case "+":
        right -= rhs;
        break;
      case "-":
        right += rhs;
        break;
      case "/":
        right *= rhs;
        break;
      case "*":
        right /= rhs;
        break;
    }
    left = left[0] as IntrExpr;
  }
  if (typeof left === "string") break;
  console.log(left, right);
}

// console.log(linesMap);

output(right).forTest(301);
