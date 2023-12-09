import { assertType, assertTypeNotAny, p, loadLines, output, compileParser } from "aocutils";
import { writeFileSync } from "fs";
import { readFileSync } from "node:fs";

const parser = p`Game ${p.num("game")}: ${p`${p.num(1)} ${p(/^red|^green|^blue/)(0)}`
	.list(", ")
	.dict({
		red: 0,
		blue: 0,
		green: 0,
	})
	.list("; ")("rounds")}`;
writeFileSync(
	"d2p2b_compiled.js",
	readFileSync("d2p2b.js", "utf8").replace("/*code*/", compileParser(parser))
);

const games = loadLines(parser);

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
