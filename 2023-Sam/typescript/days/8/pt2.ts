import { p, load, output } from "aocutils";

// NBN = (BKF, NNH)
const code = p(/[A-Z0-9]{3}/);
const mapping = p`${code("key")} = ${p`(${code("left")}, ${code("right")})`("value")}`;
const input = load(p`${p(/[LR]/).list("")("lr")}\n\n${mapping.list("\n").dict()("mappings")}`);

console.log(input);

// const starts = Object.keys(input.mappings).filter((i) => i[2] === "A");
const positions = [...Object.keys(input.mappings).filter((i) => i[2] === "A")];
// const sequences = new Array<string[]>(starts.length).fill(null);
console.log(positions);

let answer = 0;
for (let i = 0; i < 1000000000; i++) {
  const lr = input.lr[i % input.lr.length];
  for (let p = 0; p < positions.length; p++) {
    // if (loops[])
    const mapping = input.mappings[positions[p]];
    if (lr === "R") {
      positions[p] = mapping.right;
    } else {
      positions[p] = mapping.left;
    }
    // if (positions[p] === starts[p]) {
    //   loops[]
    // }
  }
  if (positions.every((i) => i[2] === "Z")) {
    answer = i + 1;
    break;
  }
}

output(answer).forTest(6);
