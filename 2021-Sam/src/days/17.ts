import fs from "fs";
import chalk from "chalk";

type Data = number[][];

function loadData(): Data {
  const input: number[][] = fs
    .readFileSync("./inputs/17.txt", "utf8")
    .trim()
    .split(", ")
    .map(i =>
      i
        .split("=")[1]
        .split("..")
        .map(j => Number(j))
    );
  return input;
}

class ProbeLauncher {
  bounds: Data;
  xVel: number = 1;
  yVel: number = 1;
  maxY: number = 0;
  successCount: number = 0;
  probe: Probe;

  constructor(bounds: Data) {
    this.bounds = bounds;
    this.yVel = Math.min(...bounds[1], 0);
    this.probe = new Probe(this, 1, 1);
  }

  move(): boolean {
    const state = this.probe.move();
    if (state === ProbeState.Moving) {
      return false;
    }
    if (state === ProbeState.Done) {
      this.successCount++;
      if (this.probe.maxY > this.maxY) {
        this.maxY = this.probe.maxY;
      }
    }
    if (this.xVel >= this.bounds[0][1]) {
      if (this.yVel >= this.bounds[1][1] ** 2) {
        return true;
      }
      this.xVel = 1;
      this.yVel++;
      this.probe = new Probe(this, this.xVel, this.yVel);
      return false;
    }
    this.xVel++;
    this.probe = new Probe(this, this.xVel, this.yVel);
    return false;
  }

  getProbeState(probe: Probe): ProbeState {
    if (
      probe.x >= this.bounds[0][0] &&
      probe.x <= this.bounds[0][1] &&
      probe.y >= this.bounds[1][0] &&
      probe.y <= this.bounds[1][1]
    ) {
      return ProbeState.Done;
    }
    if (probe.y < this.bounds[1][0] && probe.xVel === 0) {
      return ProbeState.FarX;
    }
    if (probe.y < this.bounds[1][0] && probe.x >= this.bounds[0][0]) {
      return ProbeState.FarX;
    }
    if (probe.x > this.bounds[0][1]) {
      return ProbeState.FarY;
    }
    return ProbeState.Moving;
  }
}

enum ProbeState {
  Moving,
  Done,
  FarX,
  FarY,
}

class Probe {
  launcher: ProbeLauncher;
  x: number = 0;
  y: number = 0;
  xVel: number;
  yVel: number;
  maxY: number = 0;

  constructor(launcher: ProbeLauncher, xVel: number, yVel: number) {
    this.launcher = launcher;
    this.xVel = xVel;
    this.yVel = yVel;
  }

  move(): ProbeState {
    this.x += this.xVel;
    this.y += this.yVel;
    if (this.y > this.maxY) {
      this.maxY = this.y;
    }
    if (this.xVel > 0) {
      this.xVel--;
    } else if (this.xVel < 0) {
      this.xVel++;
    }
    this.yVel--;
    return this.launcher.getProbeState(this);
  }
}

export function Part1() {
  const data = loadData();

  console.log(data);

  const probeLauncher = new ProbeLauncher(data);
  for (let i = 0; i < 1000000; i++) {
    if (probeLauncher.move()) {
      break;
    }
  }

  console.log(chalk.red.bold`Answer: ${probeLauncher.maxY}`);
}

export function Part2() {
  const data = loadData();

  console.log(data);

  const probeLauncher = new ProbeLauncher(data);
  for (let i = 0; i < 1000000; i++) {
    if (probeLauncher.move()) {
      break;
    }
  }

  console.log(chalk.red.bold`Answer: ${probeLauncher.successCount}`);
}
