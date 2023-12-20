import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n");

let width = input[0].length;
let height = input.length;

let energized = new Set();
let ener = new Set();

function beam (d,a,dir) {
	if (!energized.has(d+","+a + "," + dir)) {
		energized.add(d +"," + a + "," + dir);
		ener.add(d +"," + a);
		let char = input[d][a];

		if (dir == 0) {
			if ((char == "." || char == "-") && a < width - 1) {
				beam(d, a + 1, 0);
			} else if (char == "\\" && d < height - 1) {
				beam(d + 1, a, 1);
			} else if (char == "/" && d > 0) {
				beam(d - 1, a, 3);
			} else if (char == "|") {
				if (d > 0) {
					beam(d - 1, a, 3);
				}
				if (d < height - 1) {
					beam(d + 1, a, 1);
				}
			}
		}

		if (dir == 1) {
			if ((char == "." || char == "|") && d < height - 1) {
				beam(d + 1, a, 1);
			} else if (char == "\\" && a < width - 1) {
				beam(d, a + 1, 0);
			} else if (char == "/" && a > 0) {
				beam(d, a - 1, 2);
			} else if (char == "-") {
				if (a > 0) {
					beam(d, a - 1, 2);
				}
				if (a < width - 1) {
					beam(d, a + 1, 0);
				}
			}
		}

		if (dir == 2) {
			if ((char == "." || char == "-") && a > 0) {
				beam(d, a - 1, 2);
			} else if (char == "\\" && d > 0) {
				beam(d - 1, a, 3);
			} else if (char == "/" && d < height - 1) {
				beam(d + 1, a, 1);
			} else if (char == "|") {
				if (d > 0) {
					beam(d - 1, a, 3);
				}
				if (d < height - 1) {
					beam(d + 1, a, 1);
				}
			}
		}

		if (dir == 3) {
			if ((char == "." || char == "|") && d > 0) {
				beam(d - 1, a, 3);
			} else if (char == "\\" && a > 0) {
				beam(d, a - 1, 2);
			} else if (char == "/" && a < width - 1) {
				beam(d, a + 1, 0);
			} else if (char == "-") {
				if (a > 0) {
					beam(d, a - 1, 2);
				}
				if (a < width - 1) {
					beam(d, a + 1, 0);
				}
			}
		}
	}

}

let maxEner = 0;

for (let i=0;i<height;i++) {

	energized = new Set();
	ener = new Set();

	beam(i,0,0);

	if (ener.size>maxEner) {
		maxEner = ener.size;
	}
}

for (let i=0;i<height;i++) {

	energized = new Set();
	ener = new Set();

	beam(i,width-1,2);

	if (ener.size>maxEner) {
		maxEner = ener.size;
	}
}

for (let i=0;i<width;i++) {

	energized = new Set();
	ener = new Set();

	beam(0,i,1);

	if (ener.size>maxEner) {
		maxEner = ener.size
	}
}

for (let i=0;i<width;i++) {

	energized = new Set();
	ener = new Set();

	beam(height-1,i,3);

	if (ener.size>maxEner) {
		maxEner = ener.size
	}
}


// for (let i=0;i<height;i++) {
// 	let string = "";
// 	for (let j=0;j<width;j++) {
// 		if (energized.has(i+","+j+","+"0"))
// 	}
// }

//console.log(energized);

output(maxEner).forTest(51).forActual(8491);
