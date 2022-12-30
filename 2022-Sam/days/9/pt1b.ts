import { loadLines, output } from "aocutils";

const instructions = loadLines()
	.map((i) => i.split(" "))
	.map((i) => [i[0] as "U" | "D" | "L" | "R", Number(i[1])] as const);

const tailPositions = new Set<string>();

const head = [0, 0];
const tail = [0, 0];
tailPositions.add(tail.join(","));

for (const [dir, moves] of instructions) {
	for (let i = 0; i < moves; i++) {
		switch (dir) {
			case "U":
				head[1]++;
				break;
			case "D":
				head[1]--;
				break;
			case "L":
				head[0]--;
				break;
			case "R":
				head[0]++;
				break;
		}

		if (Math.abs(head[0] - tail[0]) >= 2 || Math.abs(head[1] - tail[1]) >= 2) {
			tail[0] += Math.sign(head[0] - tail[0]);
			tail[1] += Math.sign(head[1] - tail[1]);
		}

		tailPositions.add(tail.join(","));
	}
}

const answer = tailPositions.size;

output(answer).forTest(13);
