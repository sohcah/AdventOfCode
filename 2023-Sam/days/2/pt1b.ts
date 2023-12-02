import { p, loadLines, output, assertType, assertTypeNotAny } from "aocutils";

const games = loadLines(
	p.seqObj`Game ${p.num("game")}: ${p.seqObj`${p.num("value")} ${p.word("key")}`
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
	if (max.red > 12) return 0;
	if (max.green > 13) return 0;
	if (max.blue > 14) return 0;
	return game.game;
});

output(result.sum).forTest(8).forActual(2541);
