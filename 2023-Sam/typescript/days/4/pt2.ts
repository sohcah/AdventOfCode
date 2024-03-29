import { p, loadLines, output } from "aocutils";

const input = loadLines(
  p`Card${p(/\s+/)}${p.num("card")}:${p(/\s+/)("_")}${p.num.list(/\s+/).map((i) => new Set(i))(
    "winning"
  )}|${p(/\s+/)("_")}${p.num.list(/\s+/)("numbers")}`
);

const cardsByNumber = input.groupBy((i) => i.card);

const toProcess = input.map((i) => i.card);

let count = 0;
while (toProcess.length) {
  // console.log(toProcess);
  const cardNumber = toProcess.shift()!;
  const card = cardsByNumber.get(cardNumber)![0];
  const num = card.numbers.count((i) => card.winning.has(i));
  count++;
  for (let i = cardNumber + 1; i <= cardNumber + num; i++) {
    toProcess.push(i);
  }
}

output(count).forTest(30);
