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
    thisArg?: any
  ): void {
    throw new Error("Method not implemented.");
  }
  has(value: number): boolean {
    return !!this._arr[value];
  }
  get size(): number {
    return this._size;
  }
  entries(): IterableIterator<[number, number]> {
    throw new Error("Method not implemented.");
  }
  keys(): IterableIterator<number> {
    throw new Error("Method not implemented.");
  }
  values(): IterableIterator<number> {
    throw new Error("Method not implemented.");
  }
  get array(): number[] {
    return Reflect.get(Set.prototype, "array", this);
  }
  union(other: Set<number>): Set<number> {
    throw new Error("Method not implemented.");
  }
  intersection(other: Set<number>): Set<number> {
    throw new Error("Method not implemented.");
  }
  [Symbol.iterator](): IterableIterator<number> {
    throw new Error("Method not implemented.");
  }
  get [Symbol.toStringTag](): string {
    throw new Error("Method not implemented.");
  }
}
