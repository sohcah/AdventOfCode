export function throwOnOutOfBounds<
  T extends {
    length: number;
    [key: number]: number;
  },
>(array: T): T {
  return new Proxy(array, {
    get(target: T, p: string | symbol) {
      const n = Number(p);
      if (Number.isNaN(n)) return Reflect.get(target, p);
      if (n >= array.length) {
        throw new Error(`${n} is out of bounds ${array.length}`);
      }
      return array[n];
    },
  });
}
