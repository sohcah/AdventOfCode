import { loadLines, output } from "aocutils";

const lines = loadLines().map((i) => i.split(" "));

const scores = {
	A: 1,
	B: 2,
	C: 3,
	X: 1,
	Y: 2,
	Z: 3,
};

let yourScore = 0;
for (const round of lines) {
	const [a, b] = round;
	const aScore = scores[a];
	switch (b) {
		case "X":
			yourScore += aScore === 1 ? 3 : aScore - 1;
			break;
		case "Y":
			yourScore += aScore;
			yourScore += 3;
			break;
		case "Z":
			yourScore += aScore === 3 ? 1 : aScore + 1;
			yourScore += 6;
			break;
	}
}

output(yourScore).forTest(12);
