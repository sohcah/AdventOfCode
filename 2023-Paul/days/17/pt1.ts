import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n").map(i=>i.split("").map(i=>Number(i)));

const width = input[0].length;
const height = input.length;
let minimums = [];

for (let d = 0;d<height;d++) {
	minimums.push([]);
	for (let a = 0;a<width;a++) {
		minimums[d].push([]);
		for (let dir = 0;dir<4;dir++) {
			minimums[d][a].push([]);
			for (let run = 0;run<3;run++) {
				minimums[d][a][dir].push(Infinity);
			}
		}
	}
}
minimums[0][0][0]=[0,0,0];
minimums[0][0][1]=[0,0,0];
minimums[0][0][2]=[0,0,0];
minimums[0][0][3]=[0,0,0];

let changes = 1;

while (changes!=0) {
	changes = 0;
	for (let d = 0; d < height; d++) {
		for (let a = 0; a < width; a++) {
			for (let dir = 0; dir < 4; dir++) {
				// run: 1st step in that direction!
				let run0 = Infinity;
				if(dir == 0 && a>0) {
					for (let run = 0; run < 3; run++) {
						run0 = Math.min(run0, minimums[d][a-1][1][run]);
						run0 = Math.min(run0, minimums[d][a-1][3][run]);
					}
				}

				if(dir == 1 && d>0) {
					for (let run = 0; run < 3; run++) {
						run0 = Math.min(run0, minimums[d-1][a][0][run]);
						run0 = Math.min(run0, minimums[d-1][a][2][run]);
					}
				}

				if(dir == 2 && a<width-1) {
					for (let run = 0; run < 3; run++) {
						run0 = Math.min(run0, minimums[d][a+1][1][run]);
						run0 = Math.min(run0, minimums[d][a+1][3][run]);
					}
				}

				if(dir == 3 && d<height-1) {
					for (let run = 0; run < 3; run++) {
						run0 = Math.min(run0, minimums[d+1][a][0][run]);
						run0 = Math.min(run0, minimums[d+1][a][2][run]);
					}
				}

				if (run0 + input[d][a] < minimums[d][a][dir][0]) {
					minimums[d][a][dir][0] = run0 + input[d][a];
					changes++;
				}
				// run: 2nd or 3rd step in that direction!
				for (let run = 1; run < 3; run++) {
					if (dir == 0) {
						if (a - 1 > 0) {
							if (minimums[d][a-1][dir][run - 1] + input[d][a] < minimums[d][a][dir][run]) {
								minimums[d][a][dir][run] = minimums[d][a-1][dir][run - 1] + input[d][a];
								changes++;
							}
						}
					}
					if (dir == 1) {
						if (d - 1 > 0) {
							if (minimums[d-1][a][dir][run - 1] + input[d][a] < minimums[d][a][dir][run]) {
								minimums[d][a][dir][run] = minimums[d-1][a][dir][run - 1] + input[d][a];
								changes++;
							}
						}
					}
					if (dir == 2) {
						if (a + 1 < width-1) {
							if (minimums[d][a+1][dir][run - 1] + input[d][a] < minimums[d][a][dir][run]) {
								minimums[d][a][dir][run] = minimums[d][a+1][dir][run - 1] + input[d][a];
								changes++;
							}
						}
					}
					if (dir == 3) {
						if (d + 1 <height-1) {
							if (minimums[d+1][a][dir][run - 1] + input[d][a] < minimums[d][a][dir][run]) {
								minimums[d][a][dir][run] = minimums[d+1][a][dir][run - 1] + input[d][a];
								changes++;
							}
						}
					}
				}
			}
		}
	}

	console.log(changes);
}

// dir 0 moving right, 1 down, 2 left, 3 up
// run 0 has moved 1 in that direction ... run 2 has moved 3 in that direction
//console.log(minimums);
console.log(minimums[height-1][width-1]);
let answer = Infinity;
for (let dir = 0;dir<4;dir++) {
	for (let run = 0;run<3;run++) {
		answer = Math.min(answer,minimums[height-1][width-1][dir][run]);
	}
}

output(answer).forTest(102).forActual(1263);
