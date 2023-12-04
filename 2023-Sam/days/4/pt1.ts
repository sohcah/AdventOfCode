import { p, loadLines, output } from "aocutils";

const input = loadLines(
  p`Card${p(/\s+/)("_")}${p.num("card")}:${p(/\s+/)("_")}${p.num.list(/\s+/).map(i => new Set(i))("winning")}|${p(/\s+/)("_")}${p.num.list(/\s+/g)("numbers")}`
);

const result = input.map(({winning, numbers}) => {
  const num = numbers.count(i => winning.has(i));
  if (num === 0) return 0;
  return 2 ** (num - 1);
});

output(result.sum).forTest(13);

