import { SMap } from "../safe/map";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cached<T extends (...a: P) => R, P extends any[], R>(func: T) {
  const cache = new SMap<P, R>();
  return (...args: P) => {
    if (cache.has(args)) return cache.get(args)!;
    const output = func(...args);
    cache.set(args, output);
    return output;
  };
}
