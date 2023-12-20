import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed()
	.replaceAll(/A/g, "E")
	.replaceAll(/K/g, "D")
	.replaceAll(/Q/g, "C")
	.replaceAll(/J/g, "B")
	.replaceAll(/T/g, "A")
	.split("\n")
	.map((i) =>
		(i + " ").split(" ").map((i, n) => {
			if (n === 1) {
				return Number(i);
			} else {
				return i;
			}
		}) as [string, number, string]
	)
	.sort((a, b) => {
		if (a[0] < b[0]) return -1;
		if (a[0] > b[0]) return 1;
		return 0;
	});

//console.log(input);

for (const hand of input) {
	const cards = hand[0].split("");
	const counts: Record<string, number> = {};
	//console.log(cards);
	for (const card of cards) {
		counts[card] = counts[card] ? counts[card] + 1 : 1;
	}
	hand[2] = Object.values(counts)
		.sort((a, b) => b - a)
		.join()
		.replaceAll(/,/g, "");
	//hand[2] = hand[2].padEnd(5, "0");
	//console.log(hand);
}

input.sort((a, b) => a[2].localeCompare(b[2]));

const sum = input.reduce((a, b, n) => a + b[1] * (n + 1), 0);

output(sum).forTest(6440).forActual(250120186);
