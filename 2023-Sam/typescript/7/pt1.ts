import { load, loadLines, p, output, CountedSet } from "aocutils";

const input = loadLines(p`${p.word("hand")} ${p.num("bid")}`);
console.log(input);

const result = input
	.map((line) => {
		const counted = new CountedSet<string>();
		for (const card of line.hand.chars) {
			counted.add(card);
		}
		const values = [...counted.values].length;
		const max = [...counted.values].max();
		const min = [...counted.values].min();
		const type =
			max === 5
				? 6 // Full house
				: max === 4
				  ? 5 // Four of a kind
				  : max === 3 && min === 2
				    ? 4 // Full house
				    : max === 3
				      ? 3 // Three of a kind
				      : max === 2 && values === 3
				        ? 2 // Two pair
				        : max === 2 && values === 4
				          ? 1 // One pair
				          : 0; // high card
		const mHand = line.hand.chars
			.map((i) => {
				return (
					{
						A: "E",
						K: "D",
						Q: "C",
						J: "B",
						T: "A",
					}[i] ?? i
				);
			})
			.join("");
		return { ...line, mHand, type };
	})
	.sort((a, b) => {
		if (a.type > b.type) return 1;
		if (a.type < b.type) return -1;
		return a.mHand.localeCompare(b.mHand);
	});

console.log(result.map((i, n) => `${i.hand} - ${i.type} - ${i.bid} - ${n + 1}`).join("\n"))

const r = result
  .map((i, n) => i.bid * (n + 1));

// console.log(result);

output(r.sum).forTest(6440).forActual(253933213);
