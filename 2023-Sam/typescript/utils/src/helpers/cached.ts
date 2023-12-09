import { SMap } from "../safe/map";


export function cached<T extends (...a: P) => R, P extends any[], R extends any>(func: T) {
    const cache = new SMap<P, R>();
    return (...args: P) => {
        if (cache.has(args)) return cache.get(args)!;
        const output = func(...args);
        cache.set(args, output);
        return output;
    };
}
