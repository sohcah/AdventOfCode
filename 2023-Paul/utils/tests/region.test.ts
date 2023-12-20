import { test, expect } from "vitest";
import { Point2D, Region2D } from "../src";
/*
export class Region2D {
	public x: number;
	public y: number;
	public width: number;
	public height: number;

	constructor(point: Point2D, width: number, height: number);
	constructor(point1: Point2D, point2: Point2D);
	constructor(point1: Point2D, a: Point2D | number, b?: number);

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

 */

// Write tests for all the methods of the Region2D class

test("Region2D Works", () => {
    const region = new Region2D(new Point2D(1, 2), 3, 4);
    expect(region.x).toBe(1);
    expect(region.y).toBe(2);
    expect(region.width).toBe(3);
    expect(region.height).toBe(4);
});

test("Region2D.left", () => {
    const region = new Region2D(new Point2D(1, 2), 3, 4);
    expect(region.left).toBe(1);
});

test("Region2D.right", () => {
    const region = new Region2D(new Point2D(1, 2), 3, 4);
    expect(region.right).toBe(4);
});

test("Region2D.top", () => {
    const region = new Region2D(new Point2D(1, 2), 3, 4);
    expect(region.top).toBe(2);
});

test("Region2D.bottom", () => {
    const region = new Region2D(new Point2D(1, 2), 3, 4);
    expect(region.bottom).toBe(6);
});

test("Region2D.center", () => {
    const region = new Region2D(new Point2D(1, 2), 3, 4);
    const center = region.center;
    expect(center.x).toBe(2.5);
    expect(center.y).toBe(4);
});

test("Region2D.contains", () => {
    const region = new Region2D(new Point2D(1, 2), 3, 4);
    const region2 = new Region2D(new Point2D(2, 3), 2, 2);
    const region3 = new Region2D(new Point2D(2, 3), 3, 3);
    expect(region.contains(region2)).toBe(true);
    expect(region.contains(region3)).toBe(false);
});

test("Region2D.overlaps", () => {
    const region = new Region2D(new Point2D(1, 2), 3, 4);
    const region2 = new Region2D(new Point2D(2, 3), 2, 2);
    const region3 = new Region2D(new Point2D(2, 3), 3, 3);
    const region4 = new Region2D(new Point2D(0, 0), 1, 1);
    expect(region.overlaps(region2)).toBe(true);
    expect(region.overlaps(region3)).toBe(true);
    expect(region.overlaps(region4)).toBe(false);
});

test("Region2D.includes", () => {
    const region = new Region2D(new Point2D(1, 2), 3, 4);
    const point = new Point2D(2, 3);
    const point2 = new Point2D(4, 5);
    expect(region.includes(point)).toBe(true);
    expect(region.includes(point2)).toBe(false);
});

test("Region2D[Symbol.iterator]", () => {
    const region = new Region2D(new Point2D(1, 2), 3, 4);
    const points = [...region];
    expect(points).toEqual([
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 1, y: 4 },
        { x: 2, y: 4 },
        { x: 3, y: 4 },
        { x: 1, y: 5 },
        { x: 2, y: 5 },
        { x: 3, y: 5 },
    ]);
});
