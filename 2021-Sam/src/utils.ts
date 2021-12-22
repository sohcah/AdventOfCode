import fjss from "fast-safe-stringify";

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

export class JsonMap<K, V> implements Map<K, V> {
  private internalMap: Map<string, V> = new Map();
  private parse: (key: string) => K = key => {
    return JSON.parse(key);
  };
  private stringify: (key: K) => string = key => {
    return fjss(key);
  };

  constructor(parse?: (key: string) => K, stringify?: (key: K) => string) {
    if (parse) this.parse = parse;
    if (stringify) this.stringify = stringify;
    this.internalMap = new Map();
  }

  clear(): void {
    return this.internalMap.clear();
  }
  delete(key: K): boolean {
    return this.internalMap.delete(this.stringify(key));
  }
  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    return this.internalMap.forEach(
      (value, key, map) => callbackfn(value, this.parse(key), this),
      thisArg
    );
  }
  get(key: K): V | undefined {
    return this.internalMap.get(this.stringify(key));
  }
  has(key: K): boolean {
    return this.internalMap.has(this.stringify(key));
  }
  set(key: K, value: V): this {
    this.internalMap.set(this.stringify(key), value);
    return this;
  }
  get size(): number {
    return this.internalMap.size;
  }
  private entriesIterator = function* (
    internalMap: Map<string, V>,
    parse: (key: string) => K
  ): IterableIterator<[K, V]> {
    const entries = internalMap.entries();
    let next = entries.next().value;
    while (next) {
      const [key, value] = next;
      yield [parse(key), value];
      next = entries.next().value;
    }
  };
  entries(): IterableIterator<[K, V]> {
    return this.entriesIterator(this.internalMap, this.parse);
  }
  private keysIterator = function* (
    internalMap: Map<string, V>,
    parse: (key: string) => K
  ): IterableIterator<K> {
    const keys = internalMap.keys();
    let next = keys.next().value;
    while (next) {
      yield parse(next);
      next = keys.next().value;
    }
  };
  keys(): IterableIterator<K> {
    return this.keysIterator(this.internalMap, this.parse);
  }
  values(): IterableIterator<V> {
    return this.internalMap.values();
  }
  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }
  [Symbol.toStringTag]: string;
}

export class Superset<T> implements Set<T> {
  private sets: Set<T>[] = [new Set()];

  add(value: T): this {
    if (this.has(value)) return this;
    if (this.sets[this.sets.length - 1].size === 16777216) {
      this.sets.push(new Set());
    }
    this.sets[this.sets.length - 1].add(value);
    return this;
  }
  clear(): void {
    this.sets.forEach(set => set.clear());
    this.sets = [this.sets[0]];
  }
  delete(value: T): boolean {
    let output = false;
    this.sets.forEach(set => {
      output ||= set.delete(value);
    });
    return output;
  }
  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    return this.sets.forEach(set => set.forEach((a, b) => callbackfn(a, b, this), thisArg));
  }
  has(value: T): boolean {
    return this.sets.some(set => set.has(value));
  }
  get size(): number {
    return this.sets.reduce((a, b) => a + b.size, 0);
  }

  private iterator = function* (sets: Set<T>[]): IterableIterator<T> {
    for (const set of sets) {
      for (const item of set) {
        yield item;
      }
    }
  };
  private entriesIterator = function* (sets: Set<T>[]): IterableIterator<[T, T]> {
    for (const set of sets) {
      for (const item of set) {
        yield [item, item];
      }
    }
  };

  entries(): IterableIterator<[T, T]> {
    return this.entriesIterator(this.sets);
  }
  keys(): IterableIterator<T> {
    return this.iterator(this.sets);
  }
  values(): IterableIterator<T> {
    return this.iterator(this.sets);
  }
  [Symbol.iterator](): IterableIterator<T> {
    return this.iterator(this.sets);
  }
  [Symbol.toStringTag]: string;
}
