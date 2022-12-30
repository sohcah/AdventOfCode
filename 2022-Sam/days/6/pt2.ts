import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed();

let answer;
for (let i = 0; i < input.length; i++) {
	const slice = input.slice(i, i + 14);
	console.log(slice);
	if (new Set(slice.split("")).size === 14) {
		answer = i + 14;
		break;
	}
}

output(answer).forTest(19);
