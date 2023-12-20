import { loadLines, output } from "aocutils";

const games = loadLines()
  .map((i) => i.split(":"))
  .map(
    (i) =>
      [
        Number(i[0].slice(5)),
        i[1].split(";").map((i) => {
          const obj: Record<string, number> = {};
          for (const [type, count] of i
            .split(",")
            .map((j) => j.trim().split(" "))
            .map((j) => [j[1], Number(j[0])] as const)) {
            obj[type] = (obj[type] ?? 0) + Number(count);
          }
          return obj;
        }),
      ] as const
  );

console.log(games);

const result = games.map((i) => {
  let maxRed = 0;
  let maxGreen = 0;
  let maxBlue = 0;
  for (const round of i[1]) {
    maxRed = Math.max(maxRed, round.red ?? 0);
    maxGreen = Math.max(maxGreen, round.green ?? 0);
    maxBlue = Math.max(maxBlue, round.blue ?? 0);
  }
  return maxRed * maxGreen * maxBlue;
});

output(result.sum).forTest(2286).forActual(66016);

// 3010
