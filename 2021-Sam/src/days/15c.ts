import fs from "fs";
import chalk from "chalk";
import { adjacentPositionsWithoutDiagonals, gridPositions } from "../utils";
import { performance } from "perf_hooks";

type Data = number[][];

function loadData(): Data {
  const input: number[][] = fs
    .readFileSync("./inputs/15.txt", "utf8")
    .trim()
    .split("\n")
    .map(i =>
      i
        .trim()
        .split("")
        .map(j => Number(j.trim()))
    );
  return input;
}

function renderGrid(grid: Data, scores?: [[number, number], number][]) {
  for (let y = 0; y < grid.length; y++) {
    let line = "";
    for (let x = 0; x < grid[y].length; x++) {
      line += chalk["white"](`${grid[y][x].toString()}:${scores?.find(i => i[0][0] === x && i[0][1] === y)?.[1].toString().padStart(3, " ") ?? ""}${scores ? "  " : ""}`);
    }
    console.log(line);
  }
  console.log(chalk.gray("------"));
}

type Position = [x: number, y: number];

class Clutter {
  grid: number[][];
  grid2: Map<number, number> = new Map();
  found: Map<number, number> = new Map();
  spiders: Set<Spider> = new Set();

  constructor(grid: number[][]) {
    this.grid = grid;
    for (const [x, y] of gridPositions(grid)) {
      this.grid2.set(x * 10000 + y, grid[x][y]);
    }
    new Spider(this, [0]);
  }

  splat() {
    const spidersByPos = new Map<number, Spider[]>();

    for (const spider of this.spiders) {
      spidersByPos.set(spider.position, [...spidersByPos.get(spider.position)??[], spider]);
    }

    // let splatCount = 0;

    for (const pos of spidersByPos.keys()) {
      const spiders = spidersByPos.get(pos)!;
        const smallestSpider = spiders.reduce((a, b) => (a.score < b.score ? a : b));
      for (const spider of spiders) {
        if (spider !== smallestSpider) {
          spider.kill();
          // splatCount++;
        }
      }
    }
    // console.log(chalk.yellow`Splatted ${splatCount} Spiders`);
  }
}

class Spider {
  path: number[];
  prevScores: number[];
  clutter: Clutter;
  dead: boolean = false;

  get position() {
    return this.path[this.path.length - 1];
  }

  get positionCoordinates() {
    return [Math.floor(this.position / 10000), this.position % 10000];
  }

  posValue(pos: Position) {
    return pos[0] * 10000 + pos[1];
  }

  score: number;

  constructor(clutter: Clutter, path: number[], prevScores?: number[]) {
    this.clutter = clutter;
    this.clutter.spiders.add(this);
    this.path = path;
    this.prevScores = prevScores ?? [];
    this.score = this.path.slice(1).reduce((a, b) => a + this.clutter.grid2.get(b)!, 0);
  }

  run(): void {
    if (this.dead) return;
    const prevScore = this.clutter.found.get(this.position);
    if (prevScore === undefined || this.score < prevScore) {
      this.clutter.found.set(this.position, this.score);
    } else {
      this.kill();
    }
    let i = 0;
    for (const prevScore of this.prevScores) {
      if (this.clutter.found.get(this.path[i]) !== prevScore) {
        this.kill();
      }
      i++;
    }
  }

  split(): Spider[] {
    if (this.dead) return [];
    const spiders: Spider[] = [];
    for (const [x, y] of adjacentPositionsWithoutDiagonals(
      this.clutter.grid,
      this.positionCoordinates[0],
      this.positionCoordinates[1],
      false
    )) {
      spiders.push(
        new Spider(
          this.clutter,
          [...this.path, this.posValue([x, y])],
          [...this.prevScores, this.score]
        )
      );
    }
    this.kill();
    return spiders;
  }

  kill(): void {
    this.clutter.spiders.delete(this);
    this.dead = true;
  }
}

export function Part1() {
  const grid = loadData();

  const clutter = new Clutter(grid);

  for (let round = 0; round < 400; round++) {
    const spiders = [...clutter.spiders];
    console.log(`Round ${round} - ${spiders.length} Spiders`);
    for (const spider of spiders) {
      spider.run();
      spider.split();
    }
    clutter.splat();
  }

  const scores = [...clutter.found.entries()].map(i => {
    return [[Math.floor(Number(i[0]) / 10000), Number(i[0]) % 10000], i[1]] as [
      [number, number],
      number
    ];
  });

  console.log(scores);

  renderGrid(grid, scores);

  console.log(chalk.red.bold`Answer: ${0}`);
}


export function Part2() {
  const partialGrid = loadData();

  const grid: number[][] = [];
  for (let y1 = 0; y1 < 5; y1++) {
    for (let x1 = 0; x1 < 5; x1++) {
      for (let [x2, y2] of gridPositions(partialGrid)) {;
        grid[y1 * partialGrid.length + y2] = grid[y1 * partialGrid.length + y2] ?? [];
        grid[y1 * partialGrid.length + y2][x1 * partialGrid.length + x2] =
            (partialGrid[y2][x2] + (x1 + y1) - 1) % 9 + 1;
      }
    }
  }

  const clutter = new Clutter(grid);

  let answer = -1;
  let splatTimes = 0;
  let splatTimesCount = 0;
  for (let subround = 0; subround < 100; subround++) {
    for (let round = 0; round < 20; round++) {
      const spiders = [...clutter.spiders];
      console.log(`Round ${round + subround * 20} - ${spiders.length} Spiders`);
      for (const spider of spiders) {
        spider.run();
        spider.split();
      }
      const start = performance.now();
      clutter.splat();
      splatTimes += performance.now() - start;
      splatTimesCount++;
    }

    const scores = [...clutter.found.entries()].map(i => {
      return [[Math.floor(Number(i[0]) / 10000), Number(i[0]) % 10000], i[1]] as [
        [number, number],
        number
      ];
    });

    for (const score of scores) {
      if (score[0][0] === grid.length - 1 && score[0][1] === grid.length - 1) {
        answer = score[1];
      }
    }
    if (answer !== -1) break;
  }

  console.log(splatTimes, splatTimesCount, splatTimes / splatTimesCount)

  // renderGrid(grid, scores);

  console.log(chalk.red.bold`Answer: ${answer}`);
}
