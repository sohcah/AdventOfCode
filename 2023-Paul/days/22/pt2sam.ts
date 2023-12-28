import { loadTrimmed, output } from "aocutils";

let input = loadTrimmed().split("\n").map(i=>i.split("~").map(i=>i.split(",").map(i=>Number(i))));

let bricks = input.sort((a,b)=> Math.min(a[0][2],a[1][2]) - Math.min(b[0][2],b[1][2]));

// bricks = bricks.slice(0,25);
// console.log(bricks);

let zMax = 0;
for (let i=0;i<bricks.length;i++) {
	if (bricks[i][1][2] < bricks[i][0][2]) {
		bricks[i] = [bricks[i][1],bricks[i][0]];
	}
	if (bricks[i][1][2]>zMax) {
		zMax = bricks[i][1][2];
	}
}

const size = 10;

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
		} else if (bricks[i][0][0] != bricks[i][1][0]) {
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
		} else {	//if (bricks[i][0][2] != bricks[i][1][2]) {
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


let bricksList = new Array(bricks.length).fill(0).map((i,n)=>[n]);
let fallsCount = {};
let count = 0;
console.log(bricksList);
for (let i=0;i<bricksList.length;i++) {
	let height = bricks[bricksList[i][0]][1][2];
	let falls: number[] = [];
	loop: for (let j=0;j<bricks.length;j++) {
		if (!bricksList[i].includes(j) && bricks[j][0][2]==height+1) {
			let jFalls = true;
			if (bricks[j][0][1] != bricks[j][1][1]) {
				for (let y = Math.min(bricks[j][0][1], bricks[j][1][1]); y <= Math.max(bricks[j][0][1], bricks[j][1][1]); y++) {
					if (map[height][bricks[j][0][0]][y] != 0 && bricksList[i].indexOf(map[height][bricks[j][0][0]][y] -1) == -1) {
						jFalls = false;
						break;
					}
				}
			} else if (bricks[j][0][0] != bricks[j][1][0]) {
				for (let x = Math.min(bricks[j][0][0], bricks[j][1][0]); x <= Math.max(bricks[j][0][0], bricks[j][1][0]); x++) {
					if (map[height][x][bricks[j][0][1]] != 0 && bricksList[i].indexOf(map[height][x][bricks[j][0][1]]-1) == - 1) {
						jFalls = false;
						// falls.push(j);
						break;
					}
				}
			} else { //if (bricks[j][0][2] != bricks[j][1][2])
				if (map[height][bricks[j][0][0]][bricks[j][0][1]] != 0 && bricksList[i].indexOf(map[height][bricks[j][0][0]][bricks[j][0][1]]-1) == - 1) {
					// falls.push(j);
					jFalls = false;
				}
			}
			if (jFalls) {
				falls.push(j);
			}
			//console.log(bricksList[i],falls);
		}
	}
	console.log(bricksList[i],falls);
	count+=falls.length;
	if (falls.length != 0) {
		if (!bricksList.some(item => item.join(",") === falls.join(","))) {
			console.log("Pushing " + falls);
			bricksList.push(falls);
		}
	}
	//console.log((i+1).toString(36),noneFall);
	// if (noneFall) {
	// 	disCount++;
	// }
	//console.log(i,j,noneFall);
}
console.log("BRICKSLIST!")
console.log(bricksList);

output(count).forTest(7);

// should get:
//
// [ 0 ] [ 1, 2 ]
// [ 1 ] []
// [ 2 ] []
// [ 3 ] [5]
// [ 4 ] [5]
// [ 5 ] [6]
// [ 6 ] []
// [ 1, 2 ] [ 3, 4 ]
// [ 3, 4 ] [ 5 ]
