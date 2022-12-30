import { loadLines, output } from "aocutils";

const instructions = loadLines()
	.map((i) => i.split(" "))
	.map((i) => [i[0] as "U" | "D" | "L" | "R", Number(i[1])] as const);

const tailPositions = new Set<string>();

const knots = new Array(10).fill(0).map(() => [0, 0]);

tailPositions.add(knots[9].join(","));

for (const [dir, moves] of instructions) {
	for (let i = 0; i < moves; i++) {
		switch (dir) {
			case "D":
				knots[0][1]--;
				break;
			case "U":
				knots[0][1]++;
				break;
			case "L":
				knots[0][0]--;
				break;
			case "R":
				knots[0][0]++;
				break;
		}

		for (let i = 0; i < 9; i++) {
			const head = knots[i];
			const tail = knots[i + 1];
			if (Math.abs(head[0] - tail[0]) >= 2 || Math.abs(head[1] - tail[1]) >= 2) {
				tail[0] += Math.sign(head[0] - tail[0]);
				tail[1] += Math.sign(head[1] - tail[1]);
			}
		}
		tailPositions.add(knots[9].join(","));
	}
}

const answer = tailPositions.size;

output(answer).forTest(36);
