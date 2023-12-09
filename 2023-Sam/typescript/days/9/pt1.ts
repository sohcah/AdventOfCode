import { p, loadLines, output } from "aocutils";

const input = loadLines(
  p(/-?\d+/)
    .map((i) => Number(i))
    .list(" ")
);

let sum = 0;
for (const line of input) {
  const diffLines = [line.slice()];
  while (!diffLines.at(-1)!.every((i) => i === 0)) {
    const prevLine = diffLines.at(-1)!;
    diffLines.push(
      prevLine.slice(0, -1).map((i, n) => {
        return prevLine[n + 1] - i;
      })
    );
  }

  diffLines.at(-1)!.push(0);
  for (let i = diffLines.length - 2; i >= 0; i--) {
    diffLines[i].push(diffLines[i].at(-1)! + diffLines[i + 1].at(-1)!);
  }

  sum += diffLines[0].at(-1)!;
}

output(sum).forTest(114).forActual(1861775706);
