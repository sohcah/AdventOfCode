import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed()
	.replaceAll(/[ \)]/g, "")
	.replaceAll(/=\(/g, ",")
	.split("\n\n")
	.map((i) => i.split("\n").map((i) => i.split(",")));

const moves = input[0][0][0];
const mapLR = input[1];

//console.log(moves,mapLR);

const leftMap: Record<string, string> = {};
const rightMap: Record<string, string> = {};

for (const map of mapLR) {
	leftMap[map[0]] = map[1];
	rightMap[map[0]] = map[2];
}
//console.log(rightMap);

let pos = "AAA";
let i = 0;
const movesLen = moves.length;

while (pos != "ZZZ") {
	// console.log(pos);
	if (moves[i % movesLen] == "L") {
		pos = leftMap[pos];
	} else {
		pos = rightMap[pos];
	}
	i++;
}

output(i).forTest(6);
