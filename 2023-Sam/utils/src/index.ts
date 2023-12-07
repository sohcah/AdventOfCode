import "./extensions/array";
import "./extensions/map";
import "./extensions/set";
import "./extensions/string";
import * as fs from "fs";
import { writeFileSync } from "fs";
import type { DayInput, DayResult } from "../../runHelpers.js";
import chalk from "chalk";
// export * from "./parser/parserCompiler";
// import { createParserFunction, ResultOf, UnnamedParser } from "./parser/parserCompiler";
export * from "./parser/parser";
import { ResultOf, UnnamedParser } from "./parser/parser";
import type { NumericOperation } from "./extensions/array";

export * from "./safe/map";
export * from "./safe/set";
export * from "./super/set";

export * from "./helpers/adjacent";
export * from "./helpers/cached";
export * from "./helpers/gridPositions";
export * from "./helpers/range";

export * from "./linked/list";

export * from "./helpers/regex";


if(process.env.NO_LOG) {
	console.log = () => {};
	console.debug = () => {};
	console.info = () => {};
	console.warn = () => {};
	console.error = () => {};
}

export function assertTypeNotAny<T>(value: NotAny<T>) {}

export function assertType<T>(value: T) {}

type IsAny<T> =
  unknown extends T ? T extends {} ? T : never : never;
type NotAny<T> =
  T extends IsAny<T> ? never : T;

declare global {
	var load: typeof _load;
	var output: typeof _output;

	interface String {
		get lns(): string[];
		get numLns(): number[];
		get num(): number;
		get groups(): string[];
		get chars(): string[];
    get charSet(): Set<string>;
    get reversed(): string;
    matchLast(regex: RegExp): string[] | null;
    matchAllOverlapping(regex: RegExp): string[][];
	}

	interface Array<T> {
		desc: T extends number ? number[] : never;
		asc: T extends number ? number[] : never;

		num: T extends string | number
			? number[]
			: T extends string | number | null
			? (number | null)[]
			: never;

		sum: NumericOperation<T>;

		product: NumericOperation<T>;

		max(): NumericOperation<T>;

		min(): NumericOperation<T>;

		average(): NumericOperation<T>;

		median(): NumericOperation<T>;

		mode(): NumericOperation<T>;

		range(): NumericOperation<T>;

		set: Set<T>;

		uniq: T[];

		uniqBy(predicate?: (item: T) => unknown): T[];

		count(predicate: (item: T) => boolean): number;

		batch(size: number): T[][];

		groupBy<K>(keySelector: (item: T) => K): Map<K, T[]>;

		groupBy<K, V>(keySelector: (item: T) => K, valueSelector: (item: T) => V): Map<K, V[]>;

		r<R>(initial: R, reducer: (a: R, item: T) => R): R;

		intersection: T extends Set<infer R> ? Set<R> : never;

		union: T extends Set<infer R> ? Set<R> : never;

		incrementalPowerSum: T extends number ? ((base: number) => number) : never;

		sortByAsc(by: (item: T) => number): T[];

		sortByDesc(by: (item: T) => number): T[];
	}

	interface Map<K, V> {
		toObject(): Record<string, V>;

		array(): [K, V][];

		valuesArray(): V[];

		keysArray(): K[];
	}

	interface Set<T> {
		array: T[];

		union(other: Set<T>): Set<T>;

		intersection(other: Set<T>): Set<T>;
	}
}

let start: number | null = null;

function getInput(): DayInput {
	return JSON.parse(process.env.AOC_INPUT!);
}

export function loadInput(): string {
	start = performance.now();
	return fs.readFileSync(getInput().inputFile, "utf8");
}

export function loadSections(split = "\n\n"): string[] {
	let input = loadInput();
	if (input.endsWith("\n")) {
		input = input.slice(0, -1);
	}
	return input.split(split);
}

export function loadTrimmed(): string {
	return loadInput().trim();
}

export function _load<TParser extends UnnamedParser<any> | undefined = undefined>(parser: TParser = undefined as TParser): TParser extends undefined ? string : ResultOf<NonNullable<TParser>> {
  const text = loadInput().replace(/\n$/, "");
  if (parser === undefined) return text as any;
  const parsed = parser.parse(text);
  return parsed as any;
}
export const load = _load;
globalThis.load = _load;

export function loadLines<TParser extends UnnamedParser<any> | undefined = undefined>(parser: TParser = undefined as TParser): TParser extends undefined ? string[] : ResultOf<NonNullable<TParser>>[] {
  // const parserCompiled = parser ? createParserFunction(parser) : null;
	const lines = loadTrimmed()
		.split(/\r?\n/)
		.filter((i) => i);
  // if (parserCompiled === null) return lines as any;
  // const parsed = lines.map((i) => parserCompiled(i));
  if (parser === undefined) return lines as any;
  const parsed = lines.map((i) => parser.parse(i));
  return parsed as any;
}

export function loadNumbers(): number[] {
	const numbers = loadLines().map((i) => Number(i.trim()));
	console.debug(
		chalk.gray(
			`Range: ${numbers.min()} to ${numbers.max()} | ${numbers.uniq.length} Uniq / ${
				numbers.length
			} Total`
		)
	);
	return numbers;
}

function writeOutput(output: DayResult) {
	writeFileSync(process.env.AOC_OUTPUT!, JSON.stringify(output));
	process.exit(0);
}

function _output(output: number | string) {
	const time = performance.now() - (start ?? 0);
	let expectedValue: number | string | undefined = undefined;
	setImmediate(() => {
		writeOutput({
			type: "result",
			result: output,
			expected: expectedValue,
			time,
		});
	});
	const expectations = {
		test(expected: number | string) {
			if (IS_TEST) expectedValue = expected;
			return expectations;
		},
		actual(expected: number | string) {
			if (!IS_TEST) expectedValue = expected;
			return expectations;
		},
		forTest(expected: number | string) {
			if (IS_TEST) expectedValue = expected;
			return expectations;
		},
		forActual(expected: number | string) {
			if (!IS_TEST) expectedValue = expected;
			return expectations;
		},
	};
	return expectations;
}
export const output = _output;
globalThis.output = _output;

export function sum(input: number[]) {
	return input.reduce((a, b) => a + b, 0);
}

export class CountedSet<T> {
	private map: Map<T, number> = new Map();

	add(value: T) {
		this.map.set(value, (this.map.get(value) || 0) + 1);
	}

	get(value: T) {
		return this.map.get(value) || 0;
	}

	delete(value: T) {
		const count = this.map.get(value);
		if (count === undefined) return;
		if (count === 1) {
			this.map.delete(value);
		} else {
			this.map.set(value, count - 1);
		}
	}

	clear() {
		this.map.clear();
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
	constructor(public start: number, public end: number) {}

  static from(input: string) {
    const [start, end] = input.split(/\D/).map(Number);
    return new Range(start, end);
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
				if (i >= this.end) return { done: true, value: undefined };
				return { done: false, value: i++ };
			},
		};
	}
}

export class Point2D {
	constructor(public x: number, public y: number) {}

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

  clone() {
    return new Point2D(this.x, this.y);
  }
}

export class Region2D {
	public x: number;
	public y: number;
	public width: number;
	public height: number;

	constructor(point: Point2D, width: number, height: number);
	constructor(point1: Point2D, point2: Point2D);
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
		return (
			this.x <= other.x &&
			this.right >= other.right &&
			this.y <= other.y &&
			this.bottom >= other.bottom
		);
	}

	overlaps(other: Region2D) {
		return (
			this.x <= other.right &&
			this.right >= other.x &&
			this.y <= other.bottom &&
			this.bottom >= other.y
		);
	}

	includes(point: Point2D) {
		return point.x >= this.x && point.x < this.right && point.y >= this.y && point.y < this.bottom;
	}

	[Symbol.iterator]() {
		let x = this.x;
		let y = this.y;
		return {
			next: () => {
				if (y >= this.bottom) return { done: true, value: undefined };
				const value = { x, y };
				if (++x >= this.right) {
					x = this.x;
					y++;
				}
				return { done: false, value };
			},
		};
	}
}

export class Point3D {
	constructor(public x: number, public y: number, public z: number) {}

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

  clone() {
    return new Point3D(this.x, this.y, this.z);
  }
}

class Region3D {
	public x: number;
	public y: number;
	public z: number;
	public width: number;
	public height: number;
	public depth: number;

	constructor(point: Point3D, width: number, height: number, depth: number);
	constructor(point1: Point3D, point2: Point3D);
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
		return (
			this.x <= other.x &&
			this.right >= other.right &&
			this.y <= other.y &&
			this.bottom >= other.bottom &&
			this.z <= other.z &&
			this.back >= other.back
		);
	}

	overlaps(other: Region3D) {
		return (
			this.x <= other.right &&
			this.right >= other.x &&
			this.y <= other.bottom &&
			this.bottom >= other.y &&
			this.z <= other.back &&
			this.back >= other.z
		);
	}

	includes(point: Point3D) {
		return (
			point.x >= this.x &&
			point.x < this.right &&
			point.y >= this.y &&
			point.y < this.bottom &&
			point.z >= this.z &&
			point.z < this.back
		);
	}

	[Symbol.iterator]() {
		let x = this.x;
		let y = this.y;
		let z = this.z;
		return {
			next: () => {
				if (z >= this.back) return { done: true, value: undefined };
				const value = { x, y, z };
				if (++x >= this.right) {
					x = this.x;
					if (++y >= this.bottom) {
						y = this.y;
						z++;
					}
				}
				return { done: false, value };
			},
		};
	}
}

export function* moveUntilOutside(
	grid: unknown[][],
	start: [number, number],
	vec: [number, number],
	moveFirst: boolean = true
) {
	for (
		let a = start[0] + (moveFirst ? vec[0] : 0), b = start[1] + (moveFirst ? vec[1] : 0);
		grid[a]?.[b] !== undefined;
		a += vec[0], b += vec[1]
	) {
		yield [a, b] as [number, number];
	}
}

export const IS_TEST: boolean = !!process.env.AOCTEST;

export function stabilise<T>(start: number, increment: number, stableCount: number): number {
	const input = getInput();
	if (input.stabiliseValue !== undefined) {
		return input.stabiliseValue;
	}
	writeOutput({
		type: "stabilise",
		start,
		increment,
		stableCount,
	});
	throw "unreachable";
}
