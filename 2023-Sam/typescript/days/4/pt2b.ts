import { p, loadLines, output } from "aocutils";

const input = loadLines(
  p`Card${/\s+/}${p.num("card")}:${/\s+/}${p.num.list(/\s+/).map(i => new Set(i))("winning")} |${/\s+/}${p.num.list(/\s+/)("numbers")}`
);

const cardCounts = new Map(
  input.map(i => [i.card, 1])
);

const result = input.map(card => {
  const num = card.numbers.count(i => card.winning.has(i));
  const count = cardCounts.get(card.card)!;
  for (let i = card.card + 1; i <= card.card + num; i++) {
    cardCounts.set(i, (cardCounts.get(i) ?? 0) + count);
  }
  return count;
});

output(result.sum).forTest(30).forActual(14427616);

