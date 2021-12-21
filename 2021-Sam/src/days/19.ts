import fs from "fs";

function loadData(): Scanner[] {
  const input: string[] = fs.readFileSync("./inputs/19.txt", "utf8").trim().split("\n\n");
  return input.map(i => new Scanner(i.split("\n").slice(1)));
}

type PairData = [number, number];
type Coordinates = [x: number, y: number, z: number];

class Scanner {
  static idCount = 0;
  points: Coordinates[];
  id: string = (Scanner.idCount++).toString(36);
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
  constructor(points: string[]) {
    this.points = points.map(i => i.split(",").map(i => Number(i))) as Coordinates[];
    if (this.id === "0") {
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
    for (let i = 0; i < this.points.length; i++) {
      for (let j = 0; j < this.points.length; j++) {
        if (i === j) continue;
        const pi = this.points[i];
        const pj = this.points[j];
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
            [this.points[pair[0]], this.points[pair[1]]],
            [scanner.points[scannerPair[0]], scanner.points[scannerPair[1]]]
          );
          // console.log(
          //   [this.points[pair[0]], this.points[pair[1]]],
          //   [scanner.points[scannerPair[0]], scanner.points[scannerPair[1]]]
          // );
          if (transform) {
            const points = new Set<string>();
            for (const point of this.points) {
              // const transformed = Scanner.transform(point, transform[0], transform[1]);
              points.add(`${point[0]}|${point[1]}|${point[2]}`);
            }
            const scannerPoints = new Set<string>();
            const matchingPoints = new Set<string>();
            for (const point of scanner.points) {
              const transformed = Scanner.transform(point, transform[0], transform[1]);
              const key = `${transformed[0]}|${transformed[1]}|${transformed[2]}`;
              if (this.id === "1" && scanner.id === "4") {
                console.table({ point, transformed, transformA: transform[0], transformO: transform[1] });
              }
              scannerPoints.add(key);
              if (points.has(key)) {
                matchingPoints.add(key);
              }
            }
            if (this.id === "1" && scanner.id === "4") {
              console.log(transform);
              console.log(points, scannerPoints, matchingPoints);
              if (matchingPoints.size < Scanner.matchingRequired) {
                throw "";
              }
            }
            if (matchingPoints.size >= Scanner.matchingRequired) {
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
    point: Coordinates,
    transformation: Coordinates,
    offset?: Coordinates
  ): Coordinates {
    return [
      point[Math.abs(transformation[0]) - 1] * (transformation[0] > 0 ? 1 : -1) +
        (offset ? offset[0] : 0),
      point[Math.abs(transformation[1]) - 1] * (transformation[1] > 0 ? 1 : -1) +
        (offset ? offset[1] : 0),
      point[Math.abs(transformation[2]) - 1] * (transformation[2] > 0 ? 1 : -1) +
        (offset ? offset[2] : 0),
    ];
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
      // if (p1[0].join("-") === "2-2-2") {
      //   console.table({ p1a: p1[0], p1b: p1[1], p2a: p2[0], p2b: p2[1] } );
      //   console.table({
      //     transformation,
      //     p1a,
      //     p1b,
      //     p2a,
      //     p2b,
      //     pka: [Scanner.distanceKey(p1a, p2a)],
      //     pkb: [Scanner.distanceKey(p1b, p2b)],
      //   });
      // }
      if (Scanner.distanceKey(p1a, p2a) === Scanner.distanceKey(p1b, p2b)) {
        return [transformation, [p1a[0] - p2a[0], p1a[1] - p2a[1], p1a[2] - p2a[2]]];
      }
    }
    return null;
  }
}

function mainSolve() {
  const scanners = loadData();

  for (let i = 0; i < 10 && scanners.some(i => !i.transform); i++) {
    for (const scannerA of scanners) {
      // console.log(scannerA.pairs);
      for (const scannerB of scanners.slice(1)) {
        if (
          scannerB.transformOrigin ||
          !scannerA.transformStack.some(i => i.id === "0") ||
          scannerA === scannerB
        )
          continue;
        console.log(scannerA.id, scannerB.id, scannerA.match(scannerB));
      }
    }
  }
  console.log(scanners.map(i => [i.id, i.transform?.[0], i.transform?.[1], i.transformOrigin?.id]));
  if (scanners.some(i => !i.transform)) {
    console.log(
      "Err01",
      scanners.find(i => !i.transform)
    );
    throw new Error("Err01");
  }

  for (
    let i = 0;
    i < 30 && scanners.some(i => i.transformOrigin && i.transformOrigin.id !== "0");
    i++
  ) {
    for (const scanner of scanners) {
      if (scanner.transformOrigin && scanner.transformOrigin.id !== "0") {
        console.log(scanner.id, scanner.transformOrigin.id);
        scanner.transform = [
          Scanner.transform(scanner.transform![0], scanner.transformOrigin!.transform![0]),
          Scanner.transform(
            scanner.transform![1],
            scanner.transformOrigin!.transform![0],
            scanner.transformOrigin!.transform![1]
          ),
        ];
        scanner.transformOrigin = scanner.transformOrigin.transformOrigin;
      }
    }
  }
  console.log(scanners.map(i => [i.id, i.transform?.[0], i.transform?.[1], i.transformOrigin?.id]));
  if (scanners.some(i => i.transformOrigin && i.transformOrigin.id !== "0")) {
    throw new Error("Err02");
  }

  const points = new Set<string>();
  for (const scanner of scanners) {
    for (const point of scanner.points) {
      const pt = Scanner.transform(point, scanner.transform![0], scanner.transform![1]);
      points.add(`${pt[0]},${pt[1]},${pt[2]}`);
    }
  }
  return [points, scanners] as const;
}

export function Part1() {
  const [points] = mainSolve();
  console.log(
    [...points].sort((b, a) => Number(b.split(",")[0]) - Number(a.split(",")[0])).join("\n")
  );
  console.log(points.size);
}

export function Part2() {
  const [_, scanners] = mainSolve();
  let max = 0;
  for (const scannerA of scanners) {
    for (const scannerB of scanners) {
      if (scannerA === scannerB) continue;
      let dist =
        Math.abs(scannerA.transform![1][0] - scannerB.transform![1][0]) +
        Math.abs(scannerA.transform![1][1] - scannerB.transform![1][1]) +
        Math.abs(scannerA.transform![1][2] - scannerB.transform![1][2]);
      console.log(scannerA.id, scannerB.id, dist);
      if (dist > max) {
        max = dist;
      }
    }
  }
  console.log(max);
}
