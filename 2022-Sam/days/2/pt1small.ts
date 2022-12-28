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

const yourScore = lines.r(0, (score, round) => {
	const [a, b] = round;
	const aScore = scores[a];
	const bScore = scores[b];
	if (aScore === bScore) {
		return score + bScore + 3;
	} else if ((aScore % 3) + 1 === bScore) {
		return score + bScore + 6;
	}
	return score + bScore;
});

output(yourScore).forTest(15).forActual(12458);
