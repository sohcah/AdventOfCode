import { p, loadLines, output, SMap } from "aocutils";

const input = loadLines();

const symbol = /\*/g;

const gears = new SMap<[number, number], number[]>()

function add(gear: [number, number], number: number) {
  if (!gears.has(gear)) gears.set(gear, []);
  gears.get(gear)!.push(number);
}

let sum = 0;
for (let l = 0; l < input.length; l++) {
  const line = input[l];
  const numbersRanges = [...line.matchAll(/\d+/g)].map(i => [i.index!, i.index! + i[0].length!, Number(i[0])]);
  console.log(numbersRanges);
  for (const [left, right, num] of numbersRanges) {
    console.log([
      input[l + 1],
    ])
    if (line[left - 1]?.match(symbol)) {
      add([l, left - 1], num);
    }
    if (line[right]?.match(symbol)) {
      add([l, right], num);
    }
    const aboveMatches = [...input[l - 1]?.slice(Math.max(left - 1, 0), right + 1)?.matchAll(symbol) ?? []];
    for (const aboveMatch of aboveMatches) {
      add([l - 1, Math.max(left - 1, 0) + aboveMatch.index!], num)
    }
    const belowMatches = [...input[l + 1]?.slice(Math.max(left - 1, 0), right + 1)?.matchAll(symbol) ?? []];
    for (const belowMatch of belowMatches) {
      add([l + 1, Math.max(left - 1, 0) + belowMatch.index!], num)
    }
  }
}

for (const numbers of gears.values()) {
  if (numbers.length === 2) {
    sum += numbers[0] * numbers[1];
  }
}

// console.log(input);
// const matches = [...input.matchAll(/[^\s\d](\d+)[^\s\d]/g)];
// console.log(matches)
// const result = matches.map(i => Number(i[1])).sum;

output(sum).forTest(467835);

