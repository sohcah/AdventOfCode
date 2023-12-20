import { loadLines, output } from "aocutils";

const lines = loadLines();

const mapping: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const result = lines.map((i) => {
  const first = i.match(/\d|one|two|three|four|five|six|seven|eight|nine/)![0];
  const last = i.matchLast(/\d|one|two|three|four|five|six|seven|eight|nine/)![0];

  const firstAsNumber = mapping[first] ?? first;
  const secondAsNumber = mapping[last!] ?? last;
  return Number(`${firstAsNumber}${secondAsNumber}`);
});

output(result.sum).forTest(281).forActual(54473);
