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

// const names = {
// 	A: "Rock",
// 	B: "Paper",
// 	C: "Scissors",
// 	X: "Rock",
// 	Y: "Paper",
// 	Z: "Scissors",
// };
//
// const wins = ["Rock Paper", "Scissors Rock", "Paper Scissors"];

let yourScore = 0;
for (const round of lines) {
	const [a, b] = round;
	const aScore = scores[a];
	const bScore = scores[b];
	yourScore += bScore;
	if (aScore === bScore) {
		// Draw
		yourScore += 3;
		console.log("Draw");
	} else if ((aScore % 3) + 1 === bScore) {
		yourScore += 6;
	}
	// } else if(wins.includes(`${names[a]} ${names[b]}`)) {
	//   yourScore += 6;
	// } else if (aScore + 1 === bScore || (aScore === 3 && bScore === 2)) { // Win
	//   console.log("Win", names[a], names[b], aScore, bScore);
	//   yourScore += 6;
	// } else if ((aScore + 1) % 3 === bScore) { // Win
	//   console.log("Win", names[a], names[b], aScore, bScore);
	//   yourScore += 6;
	// } else {
	//   console.log("Lose", names[a], names[b], aScore, bScore);
	// }
}

output(yourScore).forTest(15);
