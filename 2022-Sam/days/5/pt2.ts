import { loadInput, output } from "aocutils";

const [stackInput, instructionsInput] = loadInput().split("\n\n");

const stacks = Object.fromEntries(
	new Array(stackInput.split("\n").at(-1).trim().split("   ").length)
		.fill(0)
		.map((_, n) => {
			return stackInput
				.split("\n")
				.map((i) => i.slice(n * 4 + 1, n * 4 + 2))
				.filter((i) => i !== "" && i !== " ")
				.reverse();
		})
		.map((i, n) => [n + 1, i])
);

console.log(stacks);
console.log(instructionsInput);

const instructions = instructionsInput
	.trim()
	.split("\n")
	.map((i) => i.match(/\d+/g).map(Number));

for (const [count, from, to] of instructions) {
	const removeItems = [];
	for (let i = 0; i < count; i++) {
		removeItems.unshift(stacks[from].pop());
	}
	stacks[to].push(...removeItems);
}

const answer = Object.values(stacks)
	.map((i) => i.at(-1) || " ")
	.join("");

output(answer).forTest("MCD");
