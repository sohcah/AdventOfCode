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
