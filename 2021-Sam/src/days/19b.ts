import chalk from "chalk";
import fs from "fs";
import { Chance } from "chance";
const chance = new Chance();

function loadData(): Scanner[] {
  const input: string[] = fs.readFileSync("./inputs/19.txt", "utf8").trim().split("\n\n");
  return input.map(i => new Scanner(i.split("\n").slice(1)));
}

type PairData = [number, number];
type Coordinates = [x: number, y: number, z: number];

class Scanner {
  static first: string;
  static names = new Set<string>();
  id: string = (() => {
    let id = chance.first({ nationality: "en" });
    if (!Scanner.first) Scanner.first = id;
    while (Scanner.names.has(id)) {
      id = chance.first({ nationality: "en" });
    }
    Scanner.names.add(id);
    return id;
  })();
  
  beacons: Coordinates[];
  transform?: [Coordinates, Coordinates];
  transformOrigin?: Scanner;

  get transformStack() {
    const stack: Scanner[] = [this];
    let current: Scanner = this;
    while (current.transformOrigin) {
      current = current.transformOrigin;
      stack.push(current);
    }
    return stack;
  }

  constructor(beacons: string[]) {
    this.beacons = beacons.map(i => i.split(",").map(i => Number(i))) as Coordinates[];
    if (this.id === Scanner.first) {
      this.transform = [
        [1, 2, 3],
        [0, 0, 0],
      ];
    }
  }

  private _pairs?: Map<string, PairData[]>;
  get pairs() {
    if (this._pairs) return this._pairs;

    const pairs = new Map<string, PairData[]>();
    for (let i = 0; i < this.beacons.length; i++) {
      for (let j = 0; j < this.beacons.length; j++) {
        if (i === j) continue;
        const pi = this.beacons[i];
        const pj = this.beacons[j];
        const key = [pi[0] - pj[0], pi[1] - pj[1], pi[2] - pj[2]]
          .map(i => Math.abs(i))
          .sort()
          .join(",");
        pairs.set(key, [...(pairs.get(key) ?? []), [i, j]]);
      }
    }
    this._pairs = pairs;
    return pairs;
  }

  static matchingRequired = 12;
  match(scanner: Scanner) {
    const pairs = this.pairs;
    const scannerPairs = scanner.pairs;
    const possiblePairMatches = new Set<string>();
    for (const [key] of pairs) {
      if (scannerPairs.has(key)) {
        possiblePairMatches.add(key);
      }
    }
    for (const key of possiblePairMatches) {
      for (const pair of pairs.get(key)!) {
        for (const scannerPair of scannerPairs.get(key)!) {
          const transform = Scanner.calculateTransform(
            [this.beacons[pair[0]], this.beacons[pair[1]]],
            [scanner.beacons[scannerPair[0]], scanner.beacons[scannerPair[1]]]
          );
          if (transform) {
            const beacons = new Set<string>();
            for (const beacon of this.beacons) {
              beacons.add(`${beacon[0]}|${beacon[1]}|${beacon[2]}`);
            }
            const scannerBeacons = new Set<string>();
            const matchingBeacons = new Set<string>();
            for (const beacon of scanner.beacons) {
              const transformed = Scanner.transform(beacon, transform[0], transform[1]);
              const key = `${transformed[0]}|${transformed[1]}|${transformed[2]}`;
              scannerBeacons.add(key);
              if (beacons.has(key)) {
                matchingBeacons.add(key);
              }
            }
            if (matchingBeacons.size >= Scanner.matchingRequired) {
              scanner.transform = transform;
              scanner.transformOrigin = this;
              return transform;
            }
          }
        }
      }
    }
    return null;
  }

  flattenTransformation() {
    if (!this.transform || !this.transformOrigin || this.transformOrigin.id === Scanner.first)
      return;
    this.transform = [
      Scanner.transform(this.transform[0], this.transformOrigin.transform![0]),
      Scanner.transform(
        this.transform![1],
        this.transformOrigin.transform![0],
        this.transformOrigin.transform![1]
      ),
    ];
    this.transformOrigin = this.transformOrigin.transformOrigin;
  }

  private static _transformations?: Coordinates[];
  static get transformations(): Coordinates[] {
    if (!Scanner._transformations) {
      const regular: Coordinates[] = [
        [1, 2, 3],
        [3, 2, -1],
        [-1, 2, -3],
        [-3, 2, 1],
        [2, -1, 3],
        [-2, 1, 3],
      ];
      Scanner._transformations = [
        // Regular
        ...regular,
        // Rot 90
        ...regular.map<Coordinates>(i => [i[0], i[2], -i[1]]),
        // Rot 180
        ...regular.map<Coordinates>(i => [i[0], -i[1], -i[2]]),
        // Rot 270
        ...regular.map<Coordinates>(i => [i[0], -i[2], i[1]]),
      ];
    }
    return Scanner._transformations!;
  }

  static transform(
    beacon: Coordinates,
    transformation: Coordinates,
    offset?: Coordinates
  ): Coordinates {
    return [
      beacon[Math.abs(transformation[0]) - 1] * (transformation[0] > 0 ? 1 : -1) +
        (offset ? offset[0] : 0),
      beacon[Math.abs(transformation[1]) - 1] * (transformation[1] > 0 ? 1 : -1) +
        (offset ? offset[1] : 0),
      beacon[Math.abs(transformation[2]) - 1] * (transformation[2] > 0 ? 1 : -1) +
        (offset ? offset[2] : 0),
    ];
  }

  static manhattanDistance(a: Coordinates, b: Coordinates) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
  }

  static distanceKey(a: Coordinates, b: Coordinates) {
    return `${a[0] - b[0]}|${a[1] - b[1]}|${a[2] - b[2]}`;
  }

  static calculateTransform(
    p1: Coordinates[],
    p2: Coordinates[]
  ): [transformation: Coordinates, offset: Coordinates] | null {
    for (const transformation of Scanner.transformations) {
      const p1a = p1[0];
      const p1b = p1[1];
      const p2a = Scanner.transform(p2[0], transformation);
      const p2b = Scanner.transform(p2[1], transformation);
      if (Scanner.distanceKey(p1a, p2a) === Scanner.distanceKey(p1b, p2b)) {
        return [transformation, [p1a[0] - p2a[0], p1a[1] - p2a[1], p1a[2] - p2a[2]]];
      }
    }
    return null;
  }
}

function mainSolve() {
  const scanners = loadData();

  for (let i = 0; i < scanners.length && scanners.some(i => !i.transform); i++) {
    for (const scannerA of scanners) {
      for (const scannerB of scanners.slice(1)) {
        if (
          scannerB.transformOrigin ||
          !scannerA.transformStack.some(i => i.id === Scanner.first) ||
          scannerA === scannerB
        )
          continue;
        const matchResult = scannerA.match(scannerB);
        if (matchResult) {
          console.log(
            chalk`{blue Matched Scanner {italic.yellow ${scannerB.id}} to ${chalk.italic[
              scannerA.id === Scanner.first ? "red" : "yellow"
            ](scannerA.id)} with transformation {italic ${matchResult[0].join(
              ", "
            )}} | {italic ${matchResult[1].join(", ")}}}`
          );
        }
      }
    }
  }
  if (scanners.some(i => !i.transform)) {
    throw new Error(
      chalk`{blue Could not find transformation for Scanner {italic.yellow ${
        scanners.find(i => !i.transform)?.id
      }}}`
    );
  }

  for (
    let i = 0;
    i < scanners.length &&
    scanners.some(i => i.transformOrigin && i.transformOrigin.id !== Scanner.first);
    i++
  ) {
    for (const scanner of scanners) {
      scanner.flattenTransformation();
    }
  }
  if (scanners.some(i => i.transformOrigin && i.transformOrigin.id !== Scanner.first)) {
    throw new Error(
      chalk`{blue Could not link transformation origin for Scanner {italic.yellow ${
        scanners.find(i => i.transformOrigin && i.transformOrigin.id !== Scanner.first)?.id
      }}}`
    );
  }

  const beacons = new Set<string>();
  for (const scanner of scanners) {
    for (const beacon of scanner.beacons) {
      const pt = Scanner.transform(beacon, scanner.transform![0], scanner.transform![1]);
      beacons.add(`${pt[0]},${pt[1]},${pt[2]}`);
    }
  }
  return [beacons, scanners] as const;
}

export function Part1() {
  const [beacons] = mainSolve();
  console.log(chalk.blue`Found ${beacons.size} beacons`);
  console.log(chalk.green`Answer: ${beacons.size}`);
  if (beacons.size !== 447) {
    throw new Error(`beacons.size should be ${447} but is ${beacons.size}`);
  }
}

export function Part2() {
  const [_, scanners] = mainSolve();
  let max = 0;
  let maxScanners: Scanner[] = [];
  for (const scannerA of scanners) {
    for (const scannerB of scanners) {
      if (scannerA === scannerB) continue;
      let dist = Scanner.manhattanDistance(scannerA.transform![1], scannerB.transform![1]);
      if (dist > max) {
        max = dist;
        maxScanners = [scannerA, scannerB];
      }
    }
  }
  console.log(
    chalk`{blue Maximum distance found between ${maxScanners
      .map(i => chalk.yellow.bold(i.id))
      .join(" and ")} of ${max}}`
  );
  console.log(chalk.green`Answer: ${max}`);
  if (max !== 15672) {
    throw new Error(`Max should be ${15672} but is ${max}`);
  }
}
