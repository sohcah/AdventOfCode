import { loadTrimmed, output } from "aocutils";

let input = loadTrimmed().split("\n").map(i=>i.split("~").map(i=>i.split(",").map(i=>Number(i))));

let bricks = input.sort((a,b)=> Math.min(a[0][2],a[1][2]) - Math.min(b[0][2],b[1][2]));

//bricks = bricks.slice(0,15);
//console.log(bricks);

let zMax = 0;
for (let i=0;i<bricks.length;i++) {
	if (bricks[i][1][2] < bricks[i][0][2]) {
		bricks[i] = [bricks[i][1],bricks[i][0]];
	}
	if (bricks[i][1][2]>zMax) {
		zMax = bricks[i][1][2];
	}
}

//console.log(bricks);


const size = 10;
//console.log(bricks);

let height = 1;
let i = 0;
let layer = new Array(size).fill().map(() => Array(size).fill(10000));

let map = [JSON.parse(JSON.stringify(layer))];
for (let i=0;i<zMax;i++) {
	map.push(new Array(size).fill().map(() => Array(size).fill(0)));
}

while (i<bricks.length) {
	while (i<bricks.length && bricks[i][0][2] == height) {
		if (bricks[i][0][1] != bricks[i][1][1]) {
			let below = height - 1;
			let landed = false;
			loop: while (landed == false) {
				for (let y = Math.min(bricks[i][0][1], bricks[i][1][1]); y <= Math.max(bricks[i][0][1], bricks[i][1][1]); y++) {
					if (map[below][bricks[i][0][0]][y] != 0) {
						landed = true;
						break loop;
					}
				}
				below--;
			}
			for (let y = Math.min(bricks[i][0][1], bricks[i][1][1]); y <= Math.max(bricks[i][0][1], bricks[i][1][1]); y++) {
				map[below + 1][bricks[i][0][0]][y] = i + 1;
			}
			bricks[i][0][2] = below+1;
			bricks[i][1][2] = below+1;
		}
		if (bricks[i][0][0] != bricks[i][1][0]) {
			let below = height - 1;
			let landed = false;
			loop: while (landed == false) {
				for (let x = Math.min(bricks[i][0][0], bricks[i][1][0]); x <= Math.max(bricks[i][0][0], bricks[i][1][0]); x++) {
					if (map[below][x][bricks[i][0][1]] != 0) {
						landed = true;
						break loop;
					}
				}
				below--;
			}
			for (let x = Math.min(bricks[i][0][0], bricks[i][1][0]); x <= Math.max(bricks[i][0][0], bricks[i][1][0]); x++) {
				map[below + 1][x][bricks[i][0][1]] = i + 1;
			}
			bricks[i][0][2] = below+1;
			bricks[i][1][2] = below+1;
		}
		if (bricks[i][0][2] != bricks[i][1][2]) {
			let subtract = 0;
			while (map[height-subtract-1][bricks[i][0][0]][bricks[i][0][1]] == 0) {
				subtract++;
			}
			for (let z = height-subtract; z <= Math.max(bricks[i][0][2], bricks[i][1][2])-subtract; z++) {
				map[z][bricks[i][0][0]][bricks[i][0][1]] = i + 1;
			}
			bricks[i][0][2] = height-subtract;
			bricks[i][1][2] = bricks[i][1][2]-subtract;
		}

		i++;
	}
	height++;
}

// for (let z = 1; z < map.length; z++) {
// 	console.log(`----- z ${z} -----`)
// 	for (let y = 0; y < map[z].length; y++) {
// 		let r = `y:${y.toString().padEnd(2)} `;
// 		for (let x = 0; x < map[z][y].length; x++) {
// 			const char = map[z][y][x].toString(36);
// 			if (char.length > 1) throw new Error(`too big to display (${map[z][y][x]})!!!`);
// 			r += char === "0" ? "." : char;
// 		}
// 		console.log(r);
// 	}
// }
//
// console.log(bricks);

let disCount = 0;
for (let i=0;i<bricks.length;i++) {
	let height = bricks[i][0][2];
	let j = i+1;
	while (j<bricks.length && bricks[j][0][2]==height){
		j++;
	}
	let noneFall = true;
	while (j<bricks.length && bricks[j][0][2]==height+1 && noneFall) {
		let falls = true;
		if (bricks[j][0][1] != bricks[j][1][1]) {
			for (let y = Math.min(bricks[j][0][1], bricks[j][1][1]); y <= Math.max(bricks[j][0][1], bricks[j][1][1]); y++) {
				if (map[height][bricks[j][0][0]][y] != 0 &&  map[height][bricks[j][0][0]][y] != i+1) {
					falls = false;
					break;
				}
			}
		}
		if (bricks[j][0][0] != bricks[j][1][0]) {
			for (let x = Math.min(bricks[j][0][0], bricks[j][1][0]); x <= Math.max(bricks[j][0][0], bricks[j][1][0]); x++) {
				if (map[height][x][bricks[j][0][1]] != 0 && map[height][x][bricks[j][0][1]] != i+1) {
					falls = false;
					break;
				}
			}
		}
		if (bricks[j][0][2] != bricks[j][1][2]) {
			if (map[height][bricks[j][0][0]][bricks[j][0][1]] != 0 && map[height][bricks[j][0][0]][bricks[j][0][1]] != i+1) {
				falls = false;
			}
		}
		//console.log(j,falls);
		if (falls == true) {
			noneFall = false;
			while (j<bricks.length && bricks[j][0][2]==height+1) {
				j++
			}
		} else {
			j++;
		}
	}
	if (noneFall) {
		disCount++;
	}
	//console.log(i,j,noneFall);
}


output(disCount).forTest(5);

//1277 is too high
