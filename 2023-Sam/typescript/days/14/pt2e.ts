import { loadLines, output } from "aocutils";

const hashFn = typeof Bun === "undefined" ? (i: Uint8Array) => i.join("|") : Bun.hash;

const rawInput = loadLines();

const width = rawInput[0].length;
const height = rawInput.length;

const input = new Uint8Array(
  rawInput
    .flatMap((i) => i.chars)
    .map((i) => {
      switch (i) {
        case "#":
          return 2;
        case "O":
          return 1;
        case ".":
          return 0;
        default:
          throw new Error(`Unknown char ${i}`);
      }
    })
);

function east(array: Uint8Array, width: number) {
  for (let y = 0; y < height; y++) {
    let backToIndex = y * width;
    let countDot = 0;
    const start = y * width;
    const end = (y + 1) * width;
    for (let i = start; i < end; i++) {
      if (array[i] === 2) {
        for (let j = backToIndex; j < i; j++) {
          array[j] = j < backToIndex + countDot ? 0 : 1;
        }
        backToIndex = i + 1;
        countDot = 0;
        continue;
      }
      if (array[i] === 0) {
        countDot++;
      }
    }
    for (let j = backToIndex; j < end; j++) {
      array[j] = j < backToIndex + countDot ? 0 : 1;
    }
  }
}

function west(array: Uint8Array, width: number) {
  for (let y = 0; y < height; y++) {
    let backToIndex = (y + 1) * width - 1;
    let countDot = 0;
    const start = (y + 1) * width - 1;
    const end = y * width - 1;
    for (let i = start; i > end; i--) {
      if (array[i] === 2) {
        for (let j = backToIndex; j > i; j--) {
          array[j] = j > backToIndex - countDot ? 0 : 1;
        }
        backToIndex = i - 1;
        countDot = 0;
        continue;
      }
      if (array[i] === 0) {
        countDot++;
      }
    }
    for (let j = backToIndex; j > end; j--) {
      array[j] = j > backToIndex - countDot ? 0 : 1;
    }
  }
}

function south(array: Uint8Array, width: number, height: number) {
  for (let x = 0; x < width; x++) {
    let backToIndex = x;
    let countDot = 0;
    const start = x;
    const end = x + width * height;
    for (let i = start; i < end; i += width) {
      if (array[i] === 2) {
        for (let j = backToIndex; j < i; j += width) {
          array[j] = j < backToIndex + countDot ? 0 : 1;
        }
        backToIndex = i + width;
        countDot = 0;
        continue;
      }
      if (array[i] === 0) {
        countDot += width;
      }
    }
    for (let j = backToIndex; j < end; j += width) {
      array[j] = j < backToIndex + countDot ? 0 : 1;
    }
  }
}

function north(array: Uint8Array, width: number, height: number) {
  for (let x = 0; x < width; x++) {
    let backToIndex = x + width * (height - 1);
    let countDot = 0;
    const start = x + width * (height - 1);
    const end = x - width;
    for (let i = start; i > end; i -= width) {
      if (array[i] === 2) {
        for (let j = backToIndex; j > i; j -= width) {
          array[j] = j > backToIndex - countDot ? 0 : 1;
        }
        backToIndex = i - width;
        countDot = 0;
        continue;
      }
      if (array[i] === 0) {
        countDot += width;
      }
    }
    for (let j = backToIndex; j > end; j -= width) {
      array[j] = j > backToIndex - countDot ? 0 : 1;
    }
  }
}

const pastPatterns: Uint8Array[] = [new Uint8Array(input)];
const pastPatternsMap = new Map([[input.join(""), 0]]);
let loop: Uint8Array[] = null!;

// let cycleTime = 0;
// let checkTime = 0;

for (let cycle = 1; cycle < 1000; cycle++) {
  // const start = performance.now();
  north(input, width, height);
  west(input, width);
  south(input, width, height);
  east(input, width);
  // cycleTime += performance.now() - start;
  // const checkStart = performance.now();
  const pattern = hashFn(input);
  const pastIndex = pastPatternsMap.get(pattern);
  // checkTime += performance.now() - checkStart;
  if (pastIndex !== undefined) {
    const length = cycle - pastIndex;
    const offset = length - (cycle % length);
    loop = [
      ...pastPatterns.slice(pastIndex + offset),
      ...pastPatterns.slice(pastIndex, pastIndex + offset),
    ];
    break;
  }
  pastPatternsMap.set(pattern, pastPatterns.length);
  pastPatterns.push(new Uint8Array(input));
}

// console.log(cycleTime);
// console.log(checkTime);

const gridAfterCycles = loop[1000000000 % loop.length];

let sum = 0;
for (let n = 0; n < gridAfterCycles.length; n++) {
  if (gridAfterCycles[n] !== 1) continue;
  sum += height - Math.floor(n / width);
}

output(sum).forTest(64).forActual(102657);
