import stringify from "fast-safe-stringify";
import { Superset } from "../super/set";

export class SSet<T> implements Set<T> {
  private internalSet: Superset<string> = new Superset();
  private readonly parse: (value: string) => T = (value) => {
    return JSON.parse(value);
  };
  private readonly stringify: (value: T) => string = (value) => {
    return stringify.stableStringify(value);
  };

  constructor(parse?: (key: string) => T, stringify?: (key: T) => string) {
    if (parse) this.parse = parse;
    if (stringify) this.stringify = stringify;
    this.internalSet = new Superset<string>();
  }

  clear(): void {
    return this.internalSet.clear();
  }

  delete(value: T): boolean {
    return this.internalSet.delete(this.stringify(value));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    return this.internalSet.forEach(
      (value) => callbackfn(this.parse(value), this.parse(value), this),
      thisArg
    );
  }

  has(value: T): boolean {
    return this.internalSet.has(this.stringify(value));
  }

  add(value: T): this {
    this.internalSet.add(this.stringify(value));
    return this;
  }

  get size(): number {
    return this.internalSet.size;
  }

  private valuesIterator = function* <W>(
    internalSet: Superset<string>,
    parse: (value: string) => W
  ): IterableIterator<W> {
    const values = internalSet.values();
    let next = values.next().value;
    while (next) {
      yield parse(next);
      next = values.next().value;
    }
  };

  [Symbol.iterator](): IterableIterator<T> {
    return this.valuesIterator(this.internalSet, this.parse);
  }

  values(): IterableIterator<T> {
    return this.valuesIterator(this.internalSet, this.parse);
  }

  readonly [Symbol.toStringTag]!: string;

  get array(): T[] {
    return [...this.values()];
  }

  entries(): IterableIterator<[T, T]> {
    return this.valuesIterator(this.internalSet, (i) => {
      const p = this.parse(i);
      return [p, p] as [T, T];
    });
  }

  intersection(other: Set<T>): Set<T> {
    const int = this.internalSet.intersection((other as SSet<T>).internalSet);
    return SSet.fromInternalSet(int as Superset<string>, this.parse, this.stringify);
  }

  keys(): IterableIterator<T> {
    return this.values();
  }

  union(other: Set<T>): Set<T> {
    const un = this.internalSet.union((other as SSet<T>).internalSet);
    return SSet.fromInternalSet(un as Superset<string>, this.parse, this.stringify);
  }

  private static fromInternalSet<T>(
    int: Superset<string>,
    parse: (value: string) => T,
    stringify: (value: T) => string
  ) {
    const set = new SSet<T>(parse, stringify);
    set.internalSet = int;
    return set;
  }
}
