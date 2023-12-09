import { test, expect } from "vitest";
import { Point2D, Region2D } from "../src";

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
