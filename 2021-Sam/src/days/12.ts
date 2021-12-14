import fs from "fs";
import chalk from "chalk";

type Data = Cave[];
type PathMeta = {hasPassedTwo: boolean} | undefined;
type Path = [Cave[], PathMeta]

class Cave {
  name: string;
  small: boolean;
  connections: Set<Cave> = new Set();

  constructor(name: string) {
    this.name = name;
    this.small = this.name.toLowerCase() === this.name;
  }

  connect(cave: Cave): void {
    this.connections.add(cave);
    cave.connections.add(this);
  }

  getAvailablePathsV1(path: Path): Path[] {
    if (this.name === "end") {
      return [path];
    } else if (this.name === "start" && path[0].length > 1) {
      return [];
    }
    const availablePaths: Cave[] = [];
    for (const connection of this.connections) {
      if (!connection.small || !path[0].includes(connection)) {
        availablePaths.push(connection);
      }
    }
    return availablePaths.map(i => [[...path[0], i], path[1]] as Path);
  }

  getAvailablePathsV2(path: Path): Path[] {
    if (this.name === "end") {
      return [path];
    } else if (this.name === "start" && path[0].length > 1) {
      return [];
    }
    const availablePaths: [Cave, PathMeta][] = [];
    let allowsDoubleSmall = !path[1]?.hasPassedTwo;
    for (const connection of this.connections) {
      if (!connection.small || !path[0].includes(connection)) {
        availablePaths.push([connection, path[1]]);
      } else if (allowsDoubleSmall) {
        availablePaths.push([connection, {...path[1], hasPassedTwo: true}]);
      }
    }
    return availablePaths.map(i => [path[0].concat(i[0]), i[1]] as Path);
  }
}

function loadData(): Data {
  const input: string[][] = fs
    .readFileSync("./inputs/12.txt", "utf8")
    .trim()
    .split("\n")
    .map(i => i.trim().split("-"));
  const caves: Data = [];
  for (const name of new Set(input.flat())) {
    if (!caves.find(cave => cave.name === name)) {
      const cave = new Cave(name);
      caves.push(cave);
    }
  }
  for (const [a, b] of input) {
    const caveA = caves.find(cave => cave.name === a);
    const caveB = caves.find(cave => cave.name === b);
    if (!caveA || !caveB) {
      throw new Error(`Cave not found - ${a} or ${b}`);
    }
    caveA.connect(caveB);
  }
  return caves;
}

export function Part1() {
  const caves = loadData();

  let paths: Path[] = [[[caves.find(cave => cave.name === "start")!], undefined]];

  for (let depth = 0; depth < 100; depth++) {
    console.log(chalk.gray`Calculating depth ${depth}`);
    let newPaths: Path[] = [];
    for (const path of paths) {
      newPaths.push(...path[0][path[0].length - 1].getAvailablePathsV1(path));
    }
    paths = newPaths;
    if (!paths.some(i => i[0][i[0].length - 1].name !== "end")) {
      break;
    }
  }

  console.log(chalk.red.bold`Answer: ${paths.length}`);
}

export function Part2() {
  const caves = loadData();

  let paths: Path[] = [[[caves.find(cave => cave.name === "start")!], undefined]];

  for (let depth = 0; depth < 100; depth++) {
    console.log(chalk.gray`Calculating depth ${depth}`);
    let newPaths: Path[] = [];
    for (const path of paths) {
      newPaths.push(...path[0][path[0].length - 1].getAvailablePathsV2(path));
    }
    paths = newPaths;
    if (!paths.some(i => i[0][i[0].length - 1].name !== "end")) {
      break;
    }
  }

  console.log(chalk.red.bold`Answer: ${paths.length}`);
}
