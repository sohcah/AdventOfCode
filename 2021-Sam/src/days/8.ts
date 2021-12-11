import fs from "fs";
import chalk from "chalk";

function loadData(): [string[], string[]][] {
  const values: [string[], string[]][] = fs
    .readFileSync("./inputs/8.txt", "utf8")
    .trim()
    .split("\n")
    .map(
      i =>
        i
          .trim()
          .split(" | ")
          .map(j =>
            j
              .trim()
              .split(/\s+/g)
              .map(j => j.trim())
          ) as [string[], string[]]
    );
  return values;
}

export function Part1() {
  const values = loadData();
  // const letters = loadLetterData(numbers);

  console.log(
    chalk.red.bold`Answer: ${values
      .map(i => {
        return i[1].filter(i => [7, 4, 2, 3].includes(i.length)).length;
      })
      .reduce((a, b) => a + b, 0)}`
  );
}

/*
 dddd
e    a
e    a
 ffff
g    b
g    b
 cccc
*/

const baseDigits: [string, string][] = [
  ["0", "abcefg", "ab"],
  ["1", "cf", "ab"],
  ["2", "acdeg", "dafgc"],
  ["3", "acdfg", "dafbc"],
  ["4", "bdcf", "efab"],
  ["5", "abdfg", "defbc"],
  ["6", "abdfge", "defbcg"],
  ["7", "acf", "dab"],
  ["8", "abcdefg", "defabgc"],
  ["9", "abcdfg", "defabc"],
].map(i => [i[0], i[1].split("").sort().join("")]);

const base = "abcdefg".split("");

function loadDigitMapping(entry: [string[], string[]]) {
  const segments = Object.fromEntries([...base].map(i => [i, new Set(base)]));
  let segmentsPossibleDigits = Object.fromEntries([...base].map(i => [i, new Set<string>()]));
  for (let i = 0; i < 2; i++) {
    segmentsPossibleDigits = Object.fromEntries([...base].map(i => [i, new Set<string>()]));
    for (const word of [...entry[0], ...entry[1]]) {
      const possible = baseDigits.filter(i => i[1].length === word.length);
      const possibleDigits = new Set(possible.map(i => i[1].split("")).flat());
      // console.log(word, possibleDigits);
      for (const segment of word) {
        const existingDigits = segments[segment];
        const newSet = new Set(possibleDigits);
        for (const possibleDigit of possibleDigits) {
          if (!existingDigits.has(possibleDigit)) {
            newSet.delete(possibleDigit);
          }
        }
        // console.log(digit, newSet)
        segments[segment] = newSet;
        for (const poss of possible) {
          segmentsPossibleDigits[segment].add(poss[0]);
        }
      }
      // console.log(word, segments);
    }
    for (const digit of baseDigits) {
      const possibleSegments = new Set(
        Object.entries(segments)
          .filter(segment => {
            if (!segmentsPossibleDigits[segment[0]].has(digit[0])) return false;
            for (const char of digit[1]) {
              if (segment[1].has(char)) {
                return true;
              }
            }
            return false;
          })
          .map(i => i[0])
      );
      const possibleSegmentMatches = new Set(
        Object.entries(segments)
          .filter(i => possibleSegments.has(i[0]))
          .map(i => [...i[1].values()])
          .flat()
      );
      // console.log(digit[0], digit[1], possibleSegments, possibleSegmentMatches);
      if (possibleSegmentMatches.size === digit[1].length) {
        // console.log(digit[0]);
        for (const segment in segments) {
          if (!possibleSegments.has(segment)) {
            for (const match of possibleSegmentMatches.values()) {
              segments[segment].delete(match);
            }
          }
        }
      }
      // for (const segment in segments) {

      // }
    }
    for (const segment in segments) {
      if (segments[segment].size === 1) {
        const digit = [...segments[segment]][0];
        for (const n in segments) {
          if(n !== segment) segments[n].delete(digit);
        }
      }
    }
  }

  let permutations: string[][] = [[]];
  for (const segment in segments) {
    let newPermutations = [];
    for (const option of segments[segment]) {
      // console.log(segment, option)
      newPermutations.push(...permutations.map(i => [...i, option]));
    }
    permutations = newPermutations;
  }

  let actualPermutations: string[][] = [];
  for (const permutation of permutations) {
    if (new Set(permutation).size !== permutation.length) continue;
    actualPermutations.push(permutation);
    // const updated = permutation.map(i => base.indexOf(i));
    // for (const digit of baseDigits) {
    //   const updatedDigits = digit[1].split("").map(i => base.indexOf(i)).map(i => permutation[i]).join("")
    //   // console.log(digit[0], digit[1], updatedDigits, updated);
    // }
  }

  // console.log(actualPermutations.map(i => i.join("")).join("\n"));
  let finalPermutation: string[] | null = null;
  for (const actualPermutation of actualPermutations) {
    // console.log("--", actualPermutation.join(""));
    const all = [];
    for (const ent of entry[0]) {
      const updatedDigits = ent
        .split("")
        .map(i => base.indexOf(i))
        .map(i => actualPermutation[i])
        .sort()
        .join("");
      all.push(baseDigits.find(i => i[1] === updatedDigits)?.[0]);
    }
    if (!all.some(i => !i)) {
      finalPermutation = actualPermutation;
      break;
    }
  }

  if (finalPermutation) {
    return Object.fromEntries(finalPermutation.map((i, n) => [base[n], i]));
  }
  throw "No final permutation";

  // return Object.fromEntries(Object.entries(segments).map(i => [i[0], [i[1], segmentsPossibleDigits[i[0]]]]));
}

export function Part2() {
  const entries = loadData();

  const output = entries.map((entry, n) => {
    // console.log(n)
    const digitMapping = loadDigitMapping(entry);
    let entryOutput = [];
    for (const entryDigit of entry[1]) {
      let entryDigitOutput = "";
      for (const char of entryDigit) {
        entryDigitOutput += digitMapping[char];
      }
      const digit = baseDigits.find(i => i[1] === entryDigitOutput.split("").sort().join(""));
      entryOutput.push(digit![0])
    }
    return Number(entryOutput.join(""));
  });
  console.log(output );
  console.log(
    chalk.red.bold`Answer: ${output.reduce((a, b) => a + b, 0)}`
  );
}
