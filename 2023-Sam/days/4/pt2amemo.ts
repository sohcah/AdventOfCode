import { p, loadLines, output, cached } from "aocutils";

const input = loadLines(
  p`Card${p(/\s+/)}${p.num("card")}:${p(/\s+/)("_")}${p.num.list(/\s+/).map(i => new Set(i))("winning")}|${p(/\s+/)("_")}${p.num.list(/\s+/g)("numbers")}`
);

const cardsByNumber = input.groupBy(i => i.card);

const toProcess = input.map(i => i.card);


let count = 0;
while (toProcess.length) {
  // console.log(toProcess);
  const cardNumber = toProcess.shift()!;
  const card = cardsByNumber.get(cardNumber)![0];
  card.n ??= card.numbers.count(i => card.winning.has(i));
  // console.log(card.n);
  count++;
  for (let i = cardNumber + 1; i <= cardNumber + card.n;i++) {
    toProcess.push(i);
  }
}

output(count).forTest(30);

