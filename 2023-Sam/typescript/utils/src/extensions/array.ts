/* eslint-disable @typescript-eslint/no-explicit-any */

Object.defineProperty(Array.prototype, "sum", {
  get: function sum(this: number[]) {
    return numericOperation(this, (i) => i.reduce((acc, item) => acc + item, 0));
  },
});

Object.defineProperty(Array.prototype, "product", {
  get: function product(this: number[]) {
    return numericOperation(this, (i) => i.reduce((acc, item) => acc * item, 1));
  },
});

export type NumericOperation<T> = T extends number
  ? number
  : T extends Record<string, unknown>
    ? {
        [key in keyof T]: NumericOperation<T[keyof T]>;
      }
    : undefined;

function numericOperation<T>(
  value: T[],
  operation: (value: number[]) => number
): NumericOperation<T> {
  if (value.length === 0) {
    console.warn(`Returned null from numeric operations`);
    return undefined as NumericOperation<T>;
  }
  const firstNonNull = value.find((i) => i !== null && i !== undefined);
  if (typeof firstNonNull === "number")
    return operation(
      value.filter((i) => i !== null && i !== undefined) as number[]
    ) as NumericOperation<T>;
  if (typeof firstNonNull === "object") {
    if (Array.isArray(firstNonNull)) {
      return new Array(Math.max(...value.map((i) => (i as any).length))).fill(0).map((_, n) =>
        numericOperation(
          value.map((i) => (i as any)[n]),
          operation
        )
      ) as any as NumericOperation<T>;
    }
    const allKeys = [...new Set(value.flatMap((i) => Object.keys(i as any)))];
    return allKeys.reduce((acc, key) => {
      acc[key] = numericOperation(
        value.map((i) => (i as any)[key]),
        operation
      );
      return acc;
    }, {} as any) as NumericOperation<T>;
  }
  console.warn(`Could not perform numeric operation on ${typeof value}`);
  return undefined as NumericOperation<T>;
}

Array.prototype.max = function () {
  return numericOperation(this, (i) => Math.max(...i));
};

Array.prototype.min = function () {
  return numericOperation(this, (i) => Math.min(...i));
};

Array.prototype.average = function () {
  return numericOperation(this, (i) => i.sum / this.length);
};

Array.prototype.median = function () {
  return numericOperation(this, (i) => {
    const sorted = [...i].sort();
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[middle] + sorted[middle - 1]) / 2 : sorted[middle];
  });
};

Array.prototype.mode = function () {
  return numericOperation(this, (i) => {
    const counts = i.reduce((acc, item) => {
      acc.set(item, (acc.get(item) ?? 0) + 1);
      return acc;
    }, new Map());
    const max = Math.max(...counts.values());
    return [...counts].find(([, count]) => count === max)![0];
  });
};

Array.prototype.range = function () {
  return numericOperation(this, (i) => i.max() - i.min());
};

Object.defineProperty(Array.prototype, "set", {
  get: function set<T>(this: T[]) {
    return new Set(this);
  },
});

Object.defineProperty(Array.prototype, "uniq", {
  get: function uniq<T>(this: T[]) {
    return [...this.set];
  },
});

Array.prototype.uniqBy = function (predicate: (item: unknown) => unknown) {
  return this.reduce((acc, item) => {
    const key = predicate(item);
    if (!acc.has(key)) acc.set(key, item);
    return acc;
  }, new Map()).valuesArray();
};

Array.prototype.count = function (predicate) {
  return this.filter(predicate).length;
};

Array.prototype.batch = function (size) {
  return this.reduce((acc, item) => {
    const last = acc[acc.length - 1];
    if (!last || last.length === size) {
      acc.push([item]);
    } else {
      last.push(item);
    }
    return acc;
  }, []);
};

Array.prototype.groupBy = function (this: any[], keySelector, valueSelector) {
  return this.reduce((acc, item) => {
    const key = keySelector(item);
    const value = valueSelector ? valueSelector(item) : item;
    const values = acc.get(key) ?? [];
    values.push(value);
    acc.set(key, values);
    return acc;
  }, new Map());
} as typeof Array.prototype.groupBy;

Object.defineProperty(Array.prototype, "num", {
  get: function num() {
    return this.map((i: unknown) => (i === null || i === undefined ? null : Number(i)));
  },
});

Array.prototype.r = function <R, T>(this: T[], initial: R, reducer: (a: R, b: T) => R) {
  return this.reduce(reducer, initial);
} as typeof Array.prototype.r;

Object.defineProperty(Array.prototype, "desc", {
  get: function sortedDesc() {
    return [...this].sort((a, b) => b - a);
  },
});

Object.defineProperty(Array.prototype, "asc", {
  get: function sortedAsc() {
    return [...this].sort((a, b) => a - b);
  },
});

Object.defineProperty(Array.prototype, "intersection", {
  get: function intersection() {
    return this.reduce((a: Set<any>, b: Set<any>) => a.intersection(b));
  },
});

Object.defineProperty(Array.prototype, "union", {
  get: function intersection() {
    return this.reduce((a: Set<any>, b: Set<any>) => a.intersection(b));
  },
});

Array.prototype.incrementalPowerSum = function (base: number) {
  return this.reduce((a, b, n) => a + b * base ** n, 0);
};

Array.prototype.sortByAsc = function (by: (i: unknown) => number) {
  const cache = new Map<unknown, number>();
  const get = (i: unknown) => {
    const got = cache.get(i);
    if (got === undefined) {
      const val = by(i);
      cache.set(i, val);
      return val;
    }
    return got;
  };
  return this.sort((a, b) => get(a) - get(b));
};

Array.prototype.sortByDesc = function (by: (i: unknown) => number) {
  const cache = new Map<unknown, number>();
  const get = (i: unknown) => {
    const got = cache.get(i);
    if (got === undefined) {
      const val = by(i);
      cache.set(i, val);
      return val;
    }
    return got;
  };
  return this.sort((a, b) => get(b) - get(a));
};
