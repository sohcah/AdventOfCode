import fs from "fs";
import chalk from "chalk";

type Data = {
  start: string;
  replacements: Record<string, string>;
};

function loadData(): Data {
  const input: string[] = fs.readFileSync("./inputs/14.txt", "utf8").trim().split("\n\n");
  const start = input[0].trim();
  const replacements = input[1]
    .trim()
    .split("\n")
    .map(i => i.split(" -> "))
    .map(i => [i[0].trim(), i[1].trim()] as [string, string]);

  return { start, replacements: Object.fromEntries(replacements) };
}

export function Part1() {
  const data = loadData();
  let text = data.start;
  const replacements = data.replacements;

  console.log(text);
  for (let step = 0; step < 10; step++) {
    let newText = "";
    for (let char = 0; char < text.length - 1; char++) {
      const pair = text[char] + text[char + 1];
      newText += text[char];
      newText += replacements[pair];
    }
    newText += text[text.length - 1];
    text = newText;
    if (text.length < 100) console.log(text);
  }

  const occurances = [...text].reduce(
    (a, b) => ({ ...a, [b]: (a[b] ?? 0) + 1 }),
    {} as Record<string, number>
  );

  const sorted = Object.entries(occurances).sort((a, b) => b[1] - a[1]);

  console.log(chalk.red.bold`Answer: ${sorted[0][1] - sorted[sorted.length - 1][1]}`);
}

export function Part2() {
  const data = loadData();
  let text = data.start;
  const replacements = data.replacements;

  let pairCounts: Record<string, number> = {};
  for (let char = 0; char < text.length - 1; char++) {
    const pair = text[char] + text[char + 1];
    pairCounts[pair] = (pairCounts[pair] ?? 0) + 1;
  }

  console.log(text);
  for (let step = 0; step < 40; step++) {
    let newPairCounts: Record<string, number> = {};

    for (const pair in pairCounts) {
      const pairA = pair[0] + replacements[pair];
      const pairB = replacements[pair] + pair[1];
      newPairCounts[pairA] = (newPairCounts[pairA] ?? 0) + pairCounts[pair];
      newPairCounts[pairB] = (newPairCounts[pairB] ?? 0) + pairCounts[pair];
      console.log(pair, pairA, pairB);
    }

    pairCounts = newPairCounts;
  }

  const occurances = Object.entries(pairCounts).reduce(
    (a, b) => ({ ...a, [b[0][0]]: (a[b[0][0]] ?? 0) + b[1] }),
    { [text[text.length - 1]]: 1 } as Record<string, number>
  );

  console.log(pairCounts, occurances);

  const sorted = Object.entries(occurances).sort((a, b) => b[1] - a[1]);

  console.log(chalk.red.bold`Answer: ${sorted[0][1] - sorted[sorted.length - 1][1]}`);
}
