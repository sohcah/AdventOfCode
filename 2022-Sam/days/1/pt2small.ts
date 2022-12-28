import "aocutils";

const answer = load()
	.groups.map((elf) => elf.numLns.sum)
	.desc.slice(0, 3).sum;

output(answer).forTest(45000).forActual(200158);
