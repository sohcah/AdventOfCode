import { test, assertType } from "vitest";
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
