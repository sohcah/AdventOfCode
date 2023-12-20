import { p, load, output } from "aocutils";

// NBN = (BKF, NNH)
const code = p(/[A-Z]{3}/);
const mapping = p`${code("key")} = ${p`(${code("left")}, ${code("right")})`("value")}`;
const input = load(p`${p(/[LR]/).list("")("lr")}\n\n${mapping.list("\n").dict()("mappings")}`);

console.log(input);

let answer = 0;
let position = "AAA";
for (let i = 0; i < 1000000; i++) {
  const lr = input.lr[i % input.lr.length];
  const mapping = input.mappings[position];
  if (lr === "R") {
    position = mapping.right;
  } else {
    position = mapping.left;
  }
  if (position === "ZZZ") {
    answer = i + 1;
    break;
  }
}

output(answer).forTest(2).forActual(22199);
