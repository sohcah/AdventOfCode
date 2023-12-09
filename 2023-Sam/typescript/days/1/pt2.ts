import { loadLines, output } from "aocutils";

const lines = loadLines();

const result = lines.map((i) => {
  const [first] = i.match(/\d|one|two|three|four|five|six|seven|eight|nine/)!;
  const [last] = [...i]
    .reverse()
    .join("")
    .match(/\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/)!;
  const lastReversed = [...last].reverse().join("");

  {
    const items = i.match(/\d|one|two|three|four|five|six|seven|eight|nine/g)!;
    const first2 = items[0];
    const last2 = items[items.length - 1];
    if (first2 !== first || last2 !== lastReversed) {
      console.log(first, first2, lastReversed, last2, i);
    }
  }

  const firstAsNumber =
    {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    }[first] ?? first;
  const secondAsNumber =
    {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    }[[...last].reverse().join("")] ?? last;
  return Number(`${firstAsNumber}${secondAsNumber}`);
});
console.log(result);

output(result.sum).forTest(281).forActual(54473);
