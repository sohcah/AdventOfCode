export class ArraySet implements Set<number> {
  private _arr: Uint8Array;
  private _size = 0;
  constructor(max: number) {
    this._arr = new Uint8Array(max);
  }

  add(value: number): this {
    if (!this._arr[value]) {
      this._arr[value] = 1;
      this._size++;
    }
    return this;
  }
  clear(): void {
    this._arr.fill(0);
    this._size = 0;
  }
  delete(value: number): boolean {
    if (this._arr[value]) {
      this._arr[value] = 0;
      this._size--;
      return true;
    }
    return false;
  }
  forEach(
    callbackfn: (value: number, value2: number, set: Set<number>) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any
  ): void {
    for (const value of this.values()) {
      callbackfn.bind(thisArg ?? this)(value, value, this);
    }
  }
  has(value: number): boolean {
    return !!this._arr[value];
  }
  get size(): number {
    return this._size;
  }

  *entries(): IterableIterator<[number, number]> {
    const values = this.values();
    let next = values.next().value;
    while (next) {
      yield [next, next];
      next = values.next().value;
    }
  }
  keys(): IterableIterator<number> {
    return this.values();
  }

  *values(): IterableIterator<number> {
    const values = this._arr.entries();
    let next = values.next().value;
    while (next) {
      if (next[1]) yield next[0];
      next = values.next().value;
    }
  }

  get array(): number[] {
    return Reflect.get(Set.prototype, "array", this);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  union(_other: Set<number>): Set<number> {
    throw new Error("Method not implemented.");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  intersection(_other: Set<number>): Set<number> {
    throw new Error("Method not implemented.");
  }
  [Symbol.iterator](): IterableIterator<number> {
    return this.values();
  }
  get [Symbol.toStringTag](): string {
    return "ArraySet";
  }
}
