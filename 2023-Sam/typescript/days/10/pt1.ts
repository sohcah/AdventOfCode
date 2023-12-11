import { p, loadLines, output } from "aocutils";

const input = loadLines().map((i) => i.split(""));

console.log(input);

const y = input.findIndex((i) => i.includes("S"));
const x = input[y].findIndex((i) => i === "S");

console.log(x, y);

function at(coords: readonly [number, number, number]) {
  const [x, y] = coords;
  return input[y]?.[x] ?? ".";
}

const visited: Set<string> = new Set();

let maxSteps = -1;
const positions: (readonly [number, number, number])[] = [[x, y, 0]];
while (positions.length) {
  const [x, y, steps] = positions.shift()!;
  if (visited.has(`${x},${y}`)) {
    continue;
  }
  visited.add(`${x},${y}`);
  if (steps > maxSteps) maxSteps = steps;
  console.log(x, y);
  {
    const right = [x + 1, y, steps + 1] as const;
    if (at(right) === "-" || at(right) === "7" || at(right) === "J") {
      positions.push(right);
    }
  }
  {
    const left = [x - 1, y, steps + 1] as const;
    if (at(left) === "-" || at(left) === "F" || at(left) === "L") {
      positions.push(left);
    }
  }
  {
    const top = [x, y - 1, steps + 1] as const;
    if (at(top) === "|" || at(top) === "F" || at(top) === "7") {
      positions.push(top);
    }
  }
  {
    const bottom = [x, y + 1, steps + 1] as const;
    if (at(bottom) === "|" || at(bottom) === "L" || at(bottom) === "J") {
      positions.push(bottom);
    }
  }
}

let max = -1;
for (const pos of visited) {
  const [px, py] = pos.split(",").map(Number);
  const manHat = Math.abs(px - x) + Math.abs(py - y);
  if (manHat > max) max = manHat;
}

output(maxSteps).forTest(114).forActual(6812);
