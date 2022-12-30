import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed();

let answer;
for (let i = 0; i < input.length; i++) {
	const slice = input.slice(i, i + 4);
	console.log(slice);
	if (new Set(slice.split("")).size === 4) {
		answer = i + 4;
		break;
	}
}

output(answer).forTest(7);
