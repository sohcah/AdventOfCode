import { loadLines, output } from "aocutils";

const input = loadLines().map((i) => i.split(""));

const y = input.findIndex((i) => i.includes("S"));
const x = input[y].findIndex((i) => i === "S");

function at(coords: readonly [number, number, number]) {
  const [x, y] = coords;
  return input[y]?.[x] ?? ".";
}

const width = input[0].length;
const height = input.length;

const visited = new Array(width * height).fill(false);

let maxSteps = -1;
const positions: (readonly [number, number, number])[] = [[x, y, 0]];
while (positions.length) {
  const [x, y, steps] = positions.shift()!;
  const c = x * height + y;
  if (visited[c]) continue;
  visited[c] = true;
  if (steps > maxSteps) maxSteps = steps;
  const curr = at([x, y, steps]);
  if ("S.-LF".includes(curr)) {
    const right = [x + 1, y, steps + 1] as const;
    const a = at(right);
    if (a === "-" || a === "7" || a === "J") {
      positions.push(right);
    }
  }
  if ("S.-J7".includes(curr)) {
    const left = [x - 1, y, steps + 1] as const;
    const a = at(left);
    if (a === "-" || a === "F" || a === "L") {
      positions.push(left);
    }
  }
  if ("S.|LJ".includes(curr)) {
    const top = [x, y - 1, steps + 1] as const;
    const a = at(top);
    if (a === "|" || a === "F" || a === "7") {
      positions.push(top);
    }
  }
  if ("S.|7F".includes(curr)) {
    const bottom = [x, y + 1, steps + 1] as const;
    const a = at(bottom);
    if (a === "|" || a === "L" || a === "J") {
      positions.push(bottom);
    }
  }
}

output(maxSteps).forTest(114).forActual(6812);
