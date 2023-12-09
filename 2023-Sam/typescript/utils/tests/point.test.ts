import { test, expect } from "vitest";
import { Point2D, Point3D } from "../src";

test("Point2D Works", () => {
  const point = new Point2D(1, 2);
  expect(point.x).toBe(1);
  expect(point.y).toBe(2);
  expect(point.toString()).toBe("1,2");
});

// Test Point2D.add function
test("Point2D.add", () => {
  const point = new Point2D(1, 2);
  const point2 = new Point2D(3, 4);
  const point3 = point.add(point2);
  expect(point3.x).toBe(4);
  expect(point3.y).toBe(6);
});

// Test Point2D.scale function
test("Point2D.scale", () => {
  const point = new Point2D(1, 2);
  const point2 = point.scale(2);
  expect(point2.x).toBe(2);
  expect(point2.y).toBe(4);
});

// Test Point2D.manhattanDistance function
test("Point2D.manhattanDistance", () => {
  const point = new Point2D(1, 2);
  const point2 = new Point2D(3, 4);
  const distance = point.manhattanDistance(point2);
  expect(distance).toBe(4);
});

// Test Point2D.equals function
test("Point2D.equals", () => {
  const point = new Point2D(1, 2);
  const point2 = new Point2D(1, 2);
  const point3 = new Point2D(3, 4);
  expect(point.equals(point2)).toBe(true);
  expect(point.equals(point3)).toBe(false);
});

// Test Point2D.clone function
test("Point2D.clone", () => {
  const point = new Point2D(1, 2);
  const point2 = point.clone();
  expect(point.equals(point2)).toBe(true);
  expect(point).not.toBe(point2);
});

// Test Point3D Works
test("Point3D Works", () => {
  const point = new Point3D(1, 2, 3);
  expect(point.x).toBe(1);
  expect(point.y).toBe(2);
  expect(point.z).toBe(3);
  expect(point.toString()).toBe("1,2,3");
});

// Test Point3D.add function
test("Point3D.add", () => {
  const point = new Point3D(1, 2, 3);
  const point2 = new Point3D(4, 5, 6);
  const point3 = point.add(point2);
  expect(point3.x).toBe(5);
  expect(point3.y).toBe(7);
  expect(point3.z).toBe(9);
});

// Test Point3D.scale function
test("Point3D.scale", () => {
  const point = new Point3D(1, 2, 3);
  const point2 = point.scale(2);
  expect(point2.x).toBe(2);
  expect(point2.y).toBe(4);
  expect(point2.z).toBe(6);
});

// Test Point3D.manhattanDistance function
test("Point3D.manhattanDistance", () => {
  const point = new Point3D(1, 2, 3);
  const point2 = new Point3D(4, 5, 6);
  const distance = point.manhattanDistance(point2);
  expect(distance).toBe(9);
});

// Test Point3D.equals function
test("Point3D.equals", () => {
  const point = new Point3D(1, 2, 3);
  const point2 = new Point3D(1, 2, 3);
  const point3 = new Point3D(4, 5, 6);
  expect(point.equals(point2)).toBe(true);
  expect(point.equals(point3)).toBe(false);
});

// Test Point3D.clone function
test("Point3D.clone", () => {
  const point = new Point3D(1, 2, 3);
  const point2 = point.clone();
  expect(point.equals(point2)).toBe(true);
  expect(point).not.toBe(point2);
});
