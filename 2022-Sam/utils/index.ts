import "./extensions/array";
import "./extensions/map";
import "./extensions/set";

export * from "./safe/map";
// TODO: SSet
export * from "./super/set";

import * as fs from "fs";
import {SMap} from "./safe/map";

declare global {
  interface Array<T> {
    sum(): number;

    product(): number;

    max(): number;

    min(): number;

    average(): number;

    median(): number;

    mode(): number;

    range(): number;

    set(): Set<T>;

    unique(): T[];

    count(predicate: (item: T) => boolean): number;

    batch(size: number): T[][];

    groupBy<K>(keySelector: (item: T) => K): Map<K, T[]>;

    groupBy<K, V>(keySelector: (item: T) => K, valueSelector: (item: T) => V): Map<K, V[]>;
  }

  interface Map<K, V> {
    toObject(): Record<string, V>;

    array(): [K, V][];

    valuesArray(): V[];

    keysArray(): K[];
  }

  interface Set<T> {
    array(): T[];

    union(other: Set<T>): Set<T>;

    intersection(other: Set<T>): Set<T>;
  }
}


export function* gridPositions(grid: unknown[][]): Generator<[number, number]> {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      yield [i, j];
    }
  }
}

export function* range(start: number, end: number, increment: number): Generator<number> {
  if (increment === 0) throw new Error("Increment cannot be 0");
  if (increment > 0) {
    for (let i = start; i < end; i += increment) {
      yield i;
    }
  } else {
    for (let i = start; i > end; i += increment) {
      yield i;
    }
  }
}

export function* adjacentPositions(
  grid: unknown[][],
  i: number,
  j: number,
  inclusive: boolean = false
): Generator<[number, number]> {
  for (let i1 = i - 1; i1 <= i + 1; i1++) {
    for (let j1 = j - 1; j1 <= j + 1; j1++) {
      if (i1 === i && j1 === j && !inclusive) continue;
      if (i1 < 0 || i1 >= grid.length) continue;
      if (j1 < 0 || j1 >= grid[i1].length) continue;
      yield [i1, j1];
    }
  }
}

export function* adjacentPositionsWithoutDiagonals(
  grid: unknown[][],
  i: number,
  j: number,
  inclusive: boolean = false
): Generator<[number, number]> {
  if (i - 1 >= 0) yield [i - 1, j];
  if (j - 1 >= 0) yield [i, j - 1];
  if (inclusive) yield [i, j];
  if (j + 1 < grid[i].length) yield [i, j + 1];
  if (i + 1 < grid.length) yield [i + 1, j];
}


export function loadInput(): string {
  return fs.readFileSync(process.env.AOCTEST ? "test" : "input", "utf8");
}

export function loadTrimmed(): string {
  return loadInput().trim();
}

export function loadLines(): string[] {
  return loadTrimmed().split(/\r?\n/).filter(i => i);
}

export function loadNumbers(): number[] {
  return loadLines().map(i => Number(i.trim()));
}

export function output(output: number | string) {
  console.log(`Output for ${process.env.AOCTEST ? "test" : "actual input"}: ${output}`);
  return {
    forTest(expected: number | string) {
      if (!process.env.AOCTEST) return;
      if (output === expected) {
        console.log("Test passed!");
      } else {
        console.log("Expected", expected, "for test but got", output);
        process.exit();
      }
    }
  }
}

export function sum(input: number[]) {
  return input.reduce((a, b) => a + b, 0);
}

export function cached<T extends (...a: P) => R, P extends any[], R extends any>(func: T) {
  const cache = new SMap<P, R>();
  return (...args: P) => {
    if (cache.has(args)) return cache.get(args)!;
    const output = func(...args);
    cache.set(args, output);
    return output;
  }
}

export class CountedSet {
  private map: Map<string, number> = new Map();

  add(value: string) {
    this.map.set(value, (this.map.get(value) || 0) + 1);
  }

  get(value: string) {
    return this.map.get(value) || 0;
  }

  delete(value: string) {
    const count = this.map.get(value);
    if (count === undefined) return;
    if (count === 1) {
      this.map.delete(value);
    } else {
      this.map.set(value, count - 1);
    }
  }

  get size() {
    return this.map.size;
  }

  get entries() {
    return this.map.entries();
  }

  get values() {
    return this.map.values();
  }

  get keys() {
    return this.map.keys();
  }

  [Symbol.iterator]() {
    return this.map[Symbol.iterator]();
  }
}

export class Range {
  constructor(public start: number, public end: number) {
  }

  get length() {
    return this.end - this.start;
  }

  contains(other: Range) {
    return this.start <= other.start && this.end >= other.end;
  }

  overlaps(other: Range) {
    return this.start <= other.end && this.end >= other.start;
  }

  includes(value: number) {
    return value >= this.start && value < this.end;
  }

  [Symbol.iterator]() {
    let i = this.start;
    return {
      next: () => {
        if (i >= this.end) return {done: true, value: undefined};
        return {done: false, value: i++};
      }
    };
  }
}

export class Point2D {
  constructor(public x: number, public y: number) {
  }

  add(other: Point2D) {
    return new Point2D(this.x + other.x, this.y + other.y);
  }

  scale(scalar: number) {
    return new Point2D(this.x * scalar, this.y * scalar);
  }

  manhattanDistance(other: Point2D) {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
  }

  equals(other: Point2D) {
    return this.x === other.x && this.y === other.y;
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}

class Region2D {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(point: Point2D, width: number, height: number)
  constructor(point1: Point2D, point2: Point2D)
  constructor(point1: Point2D, a: Point2D | number, b?: number) {
    if (typeof a === "number") {
      this.x = point1.x;
      this.y = point1.y;
      this.width = a;
      this.height = b!;
    } else {
      this.x = Math.min(point1.x, a.x);
      this.y = Math.min(point1.y, a.y);
      this.width = Math.max(point1.x, a.x) - this.x;
      this.height = Math.max(point1.y, a.y) - this.y;
    }
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.height;
  }

  get center() {
    return new Point2D(this.x + this.width / 2, this.y + this.height / 2);
  }

  contains(other: Region2D) {
    return this.x <= other.x && this.right >= other.right && this.y <= other.y && this.bottom >= other.bottom;
  }

  overlaps(other: Region2D) {
    return this.x <= other.right && this.right >= other.x && this.y <= other.bottom && this.bottom >= other.y;
  }

  includes(point: Point2D) {
    return point.x >= this.x && point.x < this.right && point.y >= this.y && point.y < this.bottom;
  }

  [Symbol.iterator]() {
    let x = this.x;
    let y = this.y;
    return {
      next: () => {
        if (y >= this.bottom) return {done: true, value: undefined};
        const value = {x, y};
        if (++x >= this.right) {
          x = this.x;
          y++;
        }
        return {done: false, value};
      }
    };
  }
}

class Point3D {
  constructor(public x: number, public y: number, public z: number) {
  }

  add(other: Point3D) {
    return new Point3D(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  scale(scalar: number) {
    return new Point3D(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  manhattanDistance(other: Point3D) {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y) + Math.abs(this.z - other.z);
  }

  equals(other: Point3D) {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  toString() {
    return `${this.x},${this.y},${this.z}`;
  }
}

class Region3D {
  public x: number;
  public y: number;
  public z: number;
  public width: number;
  public height: number;
  public depth: number;

  constructor(point: Point3D, width: number, height: number, depth: number)
  constructor(point1: Point3D, point2: Point3D)
  constructor(point1: Point3D, a: Point3D | number, b?: number, c?: number) {
    if (typeof a === "number") {
      this.x = point1.x;
      this.y = point1.y;
      this.z = point1.z;
      this.width = a;
      this.height = b!;
      this.depth = c!;
    } else {
      this.x = Math.min(point1.x, a.x);
      this.y = Math.min(point1.y, a.y);
      this.z = Math.min(point1.z, a.z);
      this.width = Math.max(point1.x, a.x) - this.x;
      this.height = Math.max(point1.y, a.y) - this.y;
      this.depth = Math.max(point1.z, a.z) - this.z;
    }
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.height;
  }

  get front() {
    return this.z;
  }

  get back() {
    return this.z + this.depth;
  }

  get center() {
    return new Point3D(this.x + this.width / 2, this.y + this.height / 2, this.z + this.depth / 2);
  }

  contains(other: Region3D) {
    return this.x <= other.x && this.right >= other.right && this.y <= other.y && this.bottom >= other.bottom && this.z <= other.z && this.back >= other.back;
  }

  overlaps(other: Region3D) {
    return this.x <= other.right && this.right >= other.x && this.y <= other.bottom && this.bottom >= other.y && this.z <= other.back && this.back >= other.z;
  }

  includes(point: Point3D) {
    return point.x >= this.x && point.x < this.right && point.y >= this.y && point.y < this.bottom && point.z >= this.z && point.z < this.back;
  }

  [Symbol.iterator]() {
    let x = this.x;
    let y = this.y;
    let z = this.z;
    return {
      next: () => {
        if (z >= this.back) return {done: true, value: undefined};
        const value = {x, y, z};
        if (++x >= this.right) {
          x = this.x;
          if (++y >= this.bottom) {
            y = this.y;
            z++;
          }
        }
        return {done: false, value};
      }
    };
  }
}

export function* moveUntilOutside(grid: unknown[][], start: [number, number], vec: [number, number], moveFirst: boolean = true) {
  for (let a = start[0] + (moveFirst ? vec[0] : 0), b = start[1] + (moveFirst ? vec[1] : 0); grid[a]?.[b] !== undefined; a += vec[0], b += vec[1]) {
    yield [a, b] as [number, number];
  }
}

export const IS_TEST: boolean = !!process.env.AOCTEST;
