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
