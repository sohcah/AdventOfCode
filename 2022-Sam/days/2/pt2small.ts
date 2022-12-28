import "aocutils";

const lines = load().lns.map((i) => i.split(" "));

const scores = {
	A: 1,
	B: 2,
	C: 3,
	X: 1,
	Y: 2,
	Z: 3,
};

const score = lines.r(0, (score, round) => {
	const [a, b] = round;
	const aScore = scores[a];
	switch (b) {
		case "X":
			return score + (aScore === 1 ? 3 : aScore - 1);
		case "Y":
			return score + aScore + 3;
		case "Z":
			return score + (aScore === 3 ? 1 : aScore + 1) + 6;
	}
});

output(score).forTest(12).forActual(12683);
