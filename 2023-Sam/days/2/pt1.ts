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

const result = games.map((i, n) => {
	for (const round of i[1]) {
		if (round.red && round.red > 12) return 0;
		if (round.green && round.green > 13) return 0;
		if (round.blue && round.blue > 14) return 0;
	}
	return i[0];
});

output(result.sum).forTest(8).forActual(2541);

