import { output, loadLines } from "aocutils";
import * as child_process from "node:child_process";

const smtLines: string[] = [];
smtLines.push("(declare-fun x () Real)");
smtLines.push("(declare-fun y () Real)");
smtLines.push("(declare-fun z () Real)");
smtLines.push("(declare-fun dx () Real)");
smtLines.push("(declare-fun dy () Real)");
smtLines.push("(declare-fun dz () Real)");

smtLines.push("(assert (>= x 0.0))");
smtLines.push("(assert (>= y 0.0))");
smtLines.push("(assert (>= z 0.0))");

const lines = loadLines();
const input = lines.map((line) => {
  const split = line
    .replace(/\s+/g, "")
    .split("@")
    .map((i) => i.split(",").map((i) => +i));

  return {
    x: split[0][0],
    y: split[0][1],
    z: split[0][2],
    dx: split[1][0],
    dy: split[1][1],
    dz: split[1][2],
  };
});

let n = 0;
for (const line of input.slice(0, 3)) {
  n++;
  smtLines.push(`(declare-fun t_${n} () Real)`);
  smtLines.push(`(assert (>= t_${n} 0.0))`);
  for (const axis of ["x", "y", "z"] as const) {
    smtLines.push(
      `(assert (= (+ (* t_${n} ${line[`d${axis}`].toFixed(1)}) ${line[axis].toFixed(
        1
      )}) (+ ${axis} (* d${axis} t_${n}))))`
    );
  }
}

smtLines.push(`(check-sat)`);
smtLines.push(`(eval (+ (+ x y) z))`);

const smtInput = smtLines.join("\n");

const result = child_process.execSync("z3 -smt2 -in", {
  input: smtInput,
  stdio: ["pipe", "pipe", "inherit"],
});

const results = result.toString().replace(/\r/g, "").replace(/\n$/, "").split("\n");

const ans = Number(results[1]);

output(ans).forTest(47).forActual(618534564836937);
