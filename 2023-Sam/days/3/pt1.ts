import { p, loadLines, output } from "aocutils";

const input = loadLines();

const symbol = /[^\d\s.]/;

let sum = 0;
for(let l = 0;l < input.length;l++) {
  const line = input[l];
  const numbersRanges = [...line.matchAll(/\d+/g)].map(i => [i.index!, i.index! + i[0].length!, Number(i[0])]);
  console.log(numbersRanges);
  for (const [left, right, num] of numbersRanges) {
    console.log([
      input[l + 1],
      line[left - 1],
      line[right],
      input[l - 1]?.slice(left - 1, right + 1),
      input[l + 1]?.slice(left - 1, right + 1)
    ])
    if (line[left - 1]?.match(symbol)) {
      sum += num;
      continue;
    }
    if (line[right]?.match(symbol)) {
      sum += num;
      continue;
    }
    if (input[l - 1]?.slice(Math.max(left - 1, 0), right + 1)?.match(symbol)) {
      sum += num;
      continue;
    }
    if (input[l + 1]?.slice(Math.max(left - 1, 0), right + 1)?.match(symbol)) {
      sum += num;
      continue;
    }
    console.log(`No symbol in ${left}-${right} for ${num}`)
  }
}

// console.log(input);
// const matches = [...input.matchAll(/[^\s\d](\d+)[^\s\d]/g)];
// console.log(matches)
// const result = matches.map(i => Number(i[1])).sum;

output(sum).forTest(4361);

