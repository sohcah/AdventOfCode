import { load, output } from "aocutils";

output(
	load()
		.split("\n\n")
		.map((e) => e.numLns.sum)
		.max()
)
	.forTest(24000)
	.forActual(67658);
