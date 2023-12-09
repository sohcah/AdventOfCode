import { test, expect, assertType } from "vitest";
import "../src";
import type { NumericOperation } from "../src/extensions/array";

test("numeric operation types", () => {
  assertType<NumericOperation<{
    a: 1,
    b: 1
  }>>({
    a: 1,
    b: 1
  });

  assertType<{
    a: number;
    b: number;
    c: number;
  }>([
    { a: 1, b: 2, c: 2 },
    { a: 1, b: 2, c: 3 },
  ].max());
});

test("max works", () => {
  expect([1,2,3].max()).toBe(3);
  expect([
    { a: 1, b: 2, c: 2 },
    { a: 0, b: 4, c: 2 },
  ].max()).toStrictEqual({ a: 1, b: 4, c: 2 });
})

test("sum works", () => {
  expect([1, 2, 3].sum).toBe(6);
  expect([
    { a: 1, b: 2, c: 2 },
    { a: 0, b: 4, c: 2 },
  ].sum).toStrictEqual({ a: 1, b: 6, c: 4 });
})

test("missing handling works", () => {
  expect([1, 2, 3].sum).toBe(6);
  expect([
    { a: 1, c: 2 },
    { a: 0, b: 4, c: 2 },
  ].sum).toStrictEqual({ a: 1, b: 4, c: 4 });
})
