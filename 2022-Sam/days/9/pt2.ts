import { loadLines, output } from "aocutils";

const instructions = loadLines()
	.map((i) => i.split(" "))
	.map((i) => [i[0] as "U" | "D" | "L" | "R", Number(i[1])] as const);

console.log(instructions);

const tailPositions = new Set<string>();

const knots = new Array(10).fill(0).map(() => [0, 0]);

tailPositions.add(knots[9].join(","));

for (const [dir, movesCount] of instructions) {
	const moves = 1;
	for (let i = 0; i < movesCount; i++) {
		switch (dir) {
			case "U":
				knots[0][1] += moves;
				break;
			case "D":
				knots[0][1] -= moves;
				break;
			case "L":
				knots[0][0] -= moves;
				break;
			case "R":
				knots[0][0] += moves;
				break;
		}

		for (let i = 0; i < 9; i++) {
			const head = knots[i];
			const tail = knots[i + 1];
			// if(i === 5 || i === 6) console.log(head, tail);
			if (Math.abs(head[0] - tail[0]) >= 2) {
				tail[0] += Math.sign(head[0] - tail[0]);
				if (head[1] !== tail[1]) {
					tail[1] += Math.sign(head[1] - tail[1]);
				}
			} else if (Math.abs(head[1] - tail[1]) >= 2) {
				// console.log("YMove");
				tail[1] += Math.sign(head[1] - tail[1]);
				if (head[0] !== tail[0]) {
					tail[0] += Math.sign(head[0] - tail[0]);
				}
			}
		}

		// console.log(head, tail);
		tailPositions.add(knots[9].join(","));

		// // KNOT LOGGER
		// console.log('------')
		// console.log(dir, movesCount);
		// console.log('------')
		// const scale = 5;
		// for(let y = scale;y >= -scale;y--) {
		//   let line = "";
		//   for(let x = -scale;x <= scale;x++) {
		//     const knot = knots.findIndex(k => k[0] === x && k[1] === y);
		//     if (knot !== -1) {
		//       line += (knot || "H").toString();
		//     } else {
		//       line += ".";
		//     }
		//   }
		//   console.log(line);
		// }
	}
}

const answer = tailPositions.size;

output(answer).forTest(36);
