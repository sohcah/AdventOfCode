import { loadLines, output } from "aocutils";

const rawInput1 = loadLines();
const rawInput2 = [...rawInput1[0]]
  .map((_, n) => rawInput1.map((i) => i[n]).join(""))
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
const rawInput = [...rawInput2[0]].map((_, n) => rawInput2.map((i) => i[n]).join(""));

const width = rawInput[0].length;
const height = rawInput.length;

const input = new Uint8Array(
  rawInput
    .flatMap((i) => i.chars)
    .map((i) => {
      switch (i) {
        case "#":
          return 2;
        case "O":
          return 1;
        case ".":
          return 0;
        default:
          throw new Error(`Unknown char ${i}`);
      }
    })
);

let sum = 0;
for (let n = 0; n < input.length; n++) {
  if (input[n] !== 1) continue;
  sum += height - Math.floor(n / width);
}

output(sum).forTest(136).forActual(109638);
