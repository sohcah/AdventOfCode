import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed()
	.replaceAll(/[ \)]/g, "")
	.replaceAll(/=\(/g, ",")
	.split("\n\n")
	.map((i) => i.split("\n").map((i) => i.split(",")));

const moves = input[0][0][0];
const mapLR = input[1];

const leftMap: Record<string, string> = {};
const rightMap: Record<string, string> = {};

for (const map of mapLR) {
	leftMap[map[0]] = map[1];
	rightMap[map[0]] = map[2];
}
const nodes = Object.keys(leftMap);
const movesLen = moves.length;

for (const node of nodes) {
	if (node[2] == "A") {
		let pos = node;
		let i = 0;


		while (pos[2] != "Z") {
			// console.log(pos);
			if (moves[i % movesLen] == "L") {
				pos = leftMap[pos];
			} else {
				pos = rightMap[pos];
			}
			i++;
		}
		console.log(node, pos, i/283);
	}
}

console.log();
for (const node of nodes) {
	if (node[2] == "Z") {
		for (let move1 = 0; move1 < 1; move1++) {
			let pos = node;
			let i = 0;
      const nodeTime = new Set();
      //nodeTime.add(pos + (move1+i) % movesLen);
      let loop = false;
			while ((pos[2] != "Z" && !loop) || i==0) {
				// console.log(pos);
				if (moves[(move1+i) % movesLen] == "L") {
					pos = leftMap[pos];
				} else {
					pos = rightMap[pos];
				}
        i++;
        if (nodeTime.has(pos + (move1+i) % movesLen)) {
          loop = true;
        }
        nodeTime.add(pos + (move1+i) % movesLen);

			}
			console.log(node, move1, pos, i,(move1+i) % movesLen, loop);
		}
	}
}

output().forTest(6);
