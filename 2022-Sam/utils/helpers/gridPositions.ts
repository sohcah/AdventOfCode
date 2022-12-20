export function* gridPositions(grid: unknown[][]): Generator<[number, number]> {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      yield [i, j];
    }
  }
}
