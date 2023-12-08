import { assertType, assertTypeNotAny, p, loadLines, output } from "aocutils";

const games = loadLines(
	p`Game ${p.num("game")}: ${p`${p.num(1)} ${p.word(0)}`
		.list(", ")
		.dict({
			red: 0,
			blue: 0,
			green: 0,
		})
		.list("; ")("rounds")}`
);

assertType<
	{
		game: number;
		rounds: Record<string, number>[];
	}[]
>(games);
assertTypeNotAny(games);

const result = games.map((game) => {
	const max = game.rounds.max();
	return max.red * max.green * max.blue;
});

output(result.sum).forTest(2286).forActual(66016);
