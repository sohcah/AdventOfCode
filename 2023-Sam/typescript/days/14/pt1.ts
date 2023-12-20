import { p, loadLines, output } from "aocutils";

const inputLines = loadLines();
const input = [...inputLines[0]]
  .map((_, n) => inputLines.map((i) => i[n]).join(""))
  .map((i) => {
    let prev = i;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      i = i.replaceAll(/(\.+)(O+)/g, "$2$1");
      if (i === prev) break;
      prev = i;
    }
    return i;
  });

// console.log(input);

const result = input.map((i) => {
  return [...i].map((c, n) => {
    if (c === "O") {
      return i.length - n;
    }
    return 0;
  }).sum;
});

output(result.sum).forTest(136).forActual(109638);
