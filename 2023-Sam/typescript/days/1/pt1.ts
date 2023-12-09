import { loadLines, output } from "aocutils";

const lines = loadLines();

const result = lines.map((i) =>
	Number(`${[...i].find((i) => i.match(/\d/))}${[...i].reverse().find((i) => i.match(/\d/))}`)
);
console.log(result);

output(result.sum).forTest(142).forActual(54990);
