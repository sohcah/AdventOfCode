import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n").map(i=>[
	parseInt(i.split(" ")[2].slice(2,7),16),
	"RDLU"[Number(i.split(" ")[2][7])]
]);

// const input = loadTrimmed().split("\n").map(i=>[Number(i.split(" ")[1]),i.split(" ")[0]]);

console.log(input);

let d = 0.5;
let a = 0.5;
let A = 0;
let D = 0;
let coords = [[A,D]]

for (let i=0;i<input.length;i++){

	if (input[i][1] == "R") {
		a+=input[i][0];
		if (input[i+1][1]=="D") {
			A=a+0.5;
			D=d-0.5;
		} else {
			A=a-0.5;
			D=d-0.5;
		}
	}
	if (input[i][1] == "L") {
		a-=input[i][0];
		if (input[i+1][1]=="D") {
			A=a+0.5;
			D=d+0.5;
		} else {
			A=a-0.5;
			D=d+0.5;
		}
	}
	if (input[i][1] == "D") {
		d+=input[i][0];
		D=d+0.5;
		if (input[i+1][1]=="R") {
			A=a+0.5;
			D=d-0.5;
		} else {
			A=a+0.5;
			D=d+0.5;
		}
	}
	if (input[i][1] == "U") {
		d-=input[i][0];
		D=d-0.5;
		if (i+1 == input.length || input[i+1][1]=="R") {
			A=a-0.5;
			D=d-0.5;
		} else {
			A=a-0.5;
			D=d+0.5;
		}
	}
	coords.push([A,D]);
}

console.log(coords);

let twiceArea = 0;

for (let i=0;i<coords.length-1;i++) {
	twiceArea+=coords[i][0]*coords[i+1][1]-coords[i][1]*coords[i+1][0];
}

let area = twiceArea/2;

output(area).forTest(952408144115);
