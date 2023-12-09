import stringify from "fast-safe-stringify";

export class SMap<K, V> implements Map<K, V> {
  private readonly internalMap: Map<string, V> = new Map();
  private readonly parse: (key: string) => K = key => {
    return JSON.parse(key);
  };
  private readonly stringify: (key: K) => string = key => {
    return stringify.stableStringify(key);
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
      (value, key) => callbackfn(value, this.parse(key), this),
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

  [Symbol.toStringTag]: string = "";

  toObject(): Record<string, V> {
    return Object.fromEntries(this.entries());
  }

  array(): [K, V][] {
    return [...this.entries()];
  }

  valuesArray(): V[] {
    return [...this.values()];
  }

  keysArray(): K[] {
    return [...this.keys()];
  }
}
