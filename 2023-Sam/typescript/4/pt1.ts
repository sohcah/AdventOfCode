import { p, loadLines, output } from "aocutils";

const input = loadLines(
	p`Card${/\s+/}${p.num("card")}:${/\s+/}${p.num.list(/\s+/).map((i) => new Set(i))(
		"winning"
	)} |${/\s+/}${p.num.list(/\s+/)("numbers")}`
);

const result = input.map(({ winning, numbers }) => {
	const num = numbers.count((i) => winning.has(i));
	if (num === 0) return 0;
	return 2 ** (num - 1);
});

output(result.sum).forTest(13).forActual(25004);
