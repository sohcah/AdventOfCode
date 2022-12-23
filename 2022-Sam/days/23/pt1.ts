import {adjacentPositions, IS_TEST, loadLines, loadSections, output, SSet} from "aocutils";

const grid = loadLines().map(i => i.split(""));

console.log(grid);

type Coord = [x: number, y: number];

const elves: [Coord, Coord | null][] = [];

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === "#") {
      elves.push([[x, y], null]);
    }
  }
}

const moves: Coord[][] = [
  [[0, -1], [-1, -1], [1, -1]], // N NE NW
  [[0, 1], [-1, 1], [1, 1]], // S SE SW
  [[-1, 0], [-1, -1], [-1, 1]], // W NW SW
  [[1, 0], [1, -1], [1, 1]] // E NE SE
];

for (let round = 0; round < 10; round++) {
  const elfPosSet = new Set<string>();
  for(const elf of elves) {
    elfPosSet.add(elf[0].join("|"));
  }

  const checkFree = (coord: Coord) => {
    return !elfPosSet.has(coord.join("|"));
  }

  // Choose positions
  for (const elf of elves) {
    elf[1] = null;

    let elfCount = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!checkFree([elf[0][0] + i, elf[0][1] + j])) elfCount++;
      }
    }

    if (elfCount <= 1) continue;

    for (const move of moves) {
      let free = true;
      for (const pos of move) {
        if (!checkFree([elf[0][0] + pos[0], elf[0][1] + pos[1]])) {
          free = false;
          break;
        }
      }
      if (free) {
        // console.log("Elf", elf[0], "wants to move to", [elf[0][0] + move[0][0], elf[0][1] + move[0][1]]);
        elf[1] = [elf[0][0] + move[0][0], elf[0][1] + move[0][1]];
        break;
      } else {
        // console.log("Elf", elf[0], "can't move to", [elf[0][0] + move[0][0], elf[0][1] + move[0][1]]);
      }
    }
  }

  // Move
  for (const elf of elves) {
    if (!elf[1]) continue;
    if (elves.some(i => i !== elf && i[1] && i[1].join("|") === elf[1].join("|"))) continue;
    elf[0] = elf[1];
    elf[1] = null;
  }
  if(IS_TEST) {
    for (let i = -5; i < 15; i++) {
      let row = "";
      for (let j = -5; j < 15; j++) {
        if (checkFree([j, i])) {
          row += ".";
        } else {
          row += "#";
        }
      }
      console.log(row);
    }
    console.log()

    // console.log(elves);
  }

  moves.push(moves.shift());
}

const answer = (elves.map(i => i[0][0]).range() + 1) * (elves.map(i => i[0][1]).range() + 1) - elves.length;

output(answer).forTest(110).forActual(4181);
