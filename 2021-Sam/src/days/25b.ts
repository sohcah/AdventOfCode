import chalk from "chalk";
import fs from "fs";
import { gridPositions } from "../utils";

console.log(chalk.yellow`This approach is slower than the original 25 method.`)

type Data = (SeaCucumberDirection | ".")[][];

enum SeaCucumberDirection {
  East = ">",
  South = "v",
}

function loadData(): Data {
  const lines: string[] = fs.readFileSync("./inputs/25.txt", "utf8").trim().split("\n");
  return lines.map(i => i.split("") as (SeaCucumberDirection | ".")[]);
}

// function renderGrid(grid: SeaCucumberType[][]) {
//   for (let y = 0; y < grid.length; y++) {
//     let line = ""
//     for (let x = 0; x < grid[y].length; x++) {
//       line +=grid[y][x] === SeaCucumberType.Empty ? "." : chalk.green(grid[y][x]);
//     }
//     console.log(line);
//   }
//   console.log(chalk.gray`----`);
// }

class SeaFloor {
  seaCucumbers: SeaCucumber[] = [];
  fullPositions = new Set<string>();
  gridSize: [number, number];
  removeNext = new Set<string>();

  constructor(data: Data) {
    this.gridSize = [data.length, data[0].length];
    for (const [i, j] of gridPositions(data)) {
      if (data[i][j] === SeaCucumberDirection.East) {
        this.seaCucumbers.push(new SeaCucumber(SeaCucumberDirection.East, [i, j], this));
      } else if (data[i][j] === SeaCucumberDirection.South) {
        this.seaCucumbers.push(new SeaCucumber(SeaCucumberDirection.South, [i, j], this));
      }
    }
    for (const seaCucumber of this.seaCucumbers) {
      this.fullPositions.add(seaCucumber.position.join("-"));
    }
  }

  move() {
    let didMove = false;
    for (const seaCucumber of this.seaCucumbers) {
      if (seaCucumber.direction === SeaCucumberDirection.East) {
        if (seaCucumber.moveEast()) didMove = true;
      }
    }
    this.removeNext.forEach(i => this.fullPositions.delete(i));
    this.removeNext.clear();
    for (const seaCucumber of this.seaCucumbers) {
      if (seaCucumber.direction === SeaCucumberDirection.South) {
        if (seaCucumber.moveSouth()) didMove = true;
      }
    }
    this.removeNext.forEach(i => this.fullPositions.delete(i));
    this.removeNext.clear();
    return didMove;
  }

  render() {
    for (let i = 0; i < this.gridSize[0]; i++) {
      let line = "";
      for (let j = 0; j < this.gridSize[1]; j++) {
        line += this.fullPositions.has(`${i}-${j}`)
          ? chalk.green(
              this.seaCucumbers.find(s => s.position[0] === i && s.position[1] === j)?.direction ??
                "?"
            )
          : ".";
      }
      console.log(line);
    }
    console.log(chalk.gray`---------`);
  }
}

class SeaCucumber {
  direction: SeaCucumberDirection;
  position: [number, number];
  seaFloor: SeaFloor;

  constructor(direction: SeaCucumberDirection, position: [number, number], seaFloor: SeaFloor) {
    this.direction = direction;
    this.position = position;
    this.seaFloor = seaFloor;
  }

  moveEast() {
    const [i, j] = this.position;
    const nextJ = (j + 1) % this.seaFloor.gridSize[1];
    if (!this.seaFloor.fullPositions.has(`${i}-${nextJ}`)) {
      this.position = [i, nextJ];
      this.seaFloor.fullPositions.add(`${i}-${nextJ}`);
      this.seaFloor.removeNext.add(`${i}-${j}`);
      return true;
    }
    return false;
  }

  moveSouth() {
    const [i, j] = this.position;
    const nextI = (i + 1) % this.seaFloor.gridSize[0];
    if (!this.seaFloor.fullPositions.has(`${nextI}-${j}`)) {
      this.position = [nextI, j];
      this.seaFloor.fullPositions.add(`${nextI}-${j}`);
      this.seaFloor.removeNext.add(`${i}-${j}`);
      return true;
    }
    return false;
  }
}

export function Part1() {
  let grid = loadData();

  const seaFloor = new SeaFloor(grid);

  let answer = -1;

  for (let step = 0; step < 1000; step++) {
    if (!seaFloor.move()) {
      answer = step + 1;
      break;
    }
  }

  console.log(chalk.green`Answer: ${answer}`);
}

export function Part2() {
  console.log("Hopefully there is no part 2... ");
}
