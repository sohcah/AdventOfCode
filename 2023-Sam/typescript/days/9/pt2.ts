import { p, loadLines, output } from "aocutils";

const input = loadLines(
  p(/-?\d+/)
    .map((i) => Number(i))
    .list(" ")
);

let sum = 0;
for (const line of input) {
  const diffLines = [line];
  while (!diffLines.at(-1)!.every((i) => i === 0)) {
    const prevLine = diffLines.at(-1)!;
    diffLines.push(
      prevLine.slice(0, -1).map((i, n) => {
        return prevLine[n + 1] - i;
      })
    );
  }

  diffLines.at(-1)!.unshift(0);
  for (let i = diffLines.length - 2; i >= 0; i--) {
    diffLines[i].unshift(diffLines[i][0] - diffLines[i + 1][0]);
  }

  sum += diffLines[0][0];
}

output(sum).forTest(2).forActual(1082);
