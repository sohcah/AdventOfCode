import fs from "fs";

export function Part1() {
  const lines = fs
    .readFileSync("./inputs/14.txt", "utf8")
    .trim()
    .split("\n\n")
    .map(i => i.split("\n").map(j => j.split(" -> ")));

  let before = [];
  let after = [];

  for (let i = 0; i < lines[1].length; i++) {
    before.push(lines[1][i][0]);
    after.push(lines[1][i][0][0] + lines[1][i][1]);
  }

  let prev = lines[0][0][0];
  let next = "";
  for (let loop = 0; loop < 10; loop++) {
    for (let i = 0; i < prev.length - 1; i++) {
      next += after[before.indexOf(prev.slice(i, i + 2))];
    }
    next += prev[prev.length - 1];
    prev = next.slice();
    next = "";
  }

  let tally = [];
  for (let i = 65; i < 91; i++) {
    let letter = String.fromCharCode(i);
    if (prev.includes(letter)) {
      tally.push((prev.match(new RegExp(letter, "g")) || []).length);
    }
  }
  console.log(tally, Math.max(...tally) - Math.min(...tally));
}

export function Part2() {
  const lines = fs.readFileSync("./inputs/14.txt", "utf8").trim().split("\n\n");

  const input = lines[0].trim();
  let pairs: Record<string, { letter: string; array: number[] }> = Object.fromEntries(
    lines[1]
      .split("\n")
      .map(i => i.split(" -> ") as [string, string])
      .map(i => {
        const arr = new Array(26).fill(0);
        arr[i[1].toString().charCodeAt(0) - 65] = 1;
        return [i[0], { letter: i[1], array: arr }] as [
          string,
          { letter: string; array: number[] }
        ];
      })
  );

  for (let i = 1; i < 40; i++) {
    const nextPairs = JSON.parse(JSON.stringify(pairs));

    for (const pair in pairs) {
      for (let j = 0; j < 26; j++) {
        nextPairs[pair].array[j] =
          pairs[pair[0] + pairs[pair].letter].array[j] +
          pairs[pairs[pair].letter + pair[1]].array[j];
        if (nextPairs[pair].letter.charCodeAt(0) - 65 == j) {
          nextPairs[pair].array[j]++;
        }
      }
    }

    pairs = nextPairs;
  }

  let tally = [];
  for (let i = 65; i < 91; i++) {
    let letter = String.fromCharCode(i);
    tally.push((input.match(new RegExp(letter, "g")) || []).length);
  }

  for (let i = 0; i < input.length - 1; i++) {
    for (let j = 0; j < 26; j++) {
      tally[j] += pairs[input.slice(i, i + 2)].array[j];
    }
  }
  console.log(Math.max(...tally) - Math.min(...tally.filter(i => i != 0)));
}
