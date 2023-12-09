export class Superset<T> implements Set<T> {
  private sets: Set<T>[] = [new Set()];

  add(value: T): this {
    if (this.has(value)) return this;
    if (this.sets[this.sets.length - 1].size >= 16777200) {
      this.sets.push(new Set());
      console.log("Sets length: ", this.sets.length);
    }
    try {
      this.sets[this.sets.length - 1].add(value);
    } catch {
      this.sets.push(new Set());
      this.sets[this.sets.length - 1].add(value);
    }
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

  [Symbol.toStringTag]: string = "";

  get array(): T[] {
    return [...this];
  }

  union(other: Set<T>): Set<T> {
    return new Set([...this, ...other]);
  }

  intersection(other: Set<T>): Set<T> {
    return new Set([...this].filter(x => other.has(x)));
  }
}
