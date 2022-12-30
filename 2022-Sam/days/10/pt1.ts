import { loadLines, output } from "aocutils";

const instructions = loadLines()
	.map((i) => i.split(" "))
	.map((i) => [i[0], Number(i[1])] as const);

let registerX = 1;
let instructionNumber = 0;
let instructionCyclesRemaining = 0;

const length: Record<string, number> = {
	noop: 1,
	addx: 2,
};

let sum = 0;

for (let cycle = 1; cycle <= 220; cycle++) {
	if (cycle % 40 === 20) {
		console.log(cycle, registerX);
		sum += registerX * cycle;
	}

	const [op, arg] = instructions[instructionNumber];

	if (instructionCyclesRemaining === 0) {
		instructionCyclesRemaining = length[op];
	}

	instructionCyclesRemaining--;
	if (instructionCyclesRemaining === 0) {
		switch (op) {
			case "noop":
				break;
			case "addx":
				registerX += arg;
				break;
		}
		instructionNumber++;
	}
}

output(sum).forTest(13140);
