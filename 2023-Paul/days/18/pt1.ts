import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n").map(i=>i.split(" "));

let trench = new Set();

let d = 1000;
let a = 1000;
let dMax = 1000;
let dMin = 1000;
let aMax = 1000;
let aMin = 1000;

trench.add(2000*d+a);

for (const line of input) {
	let length = Number(line[1]);
	if (line[0] == "R") {
		for (let i = 0;i<length;i++) {
			a++;
			trench.add(2000*d+a);
			if (a>aMax) {
				aMax = a;
			}
		}
	}
	if (line[0] == "L") {
		for (let i = 0;i<length;i++) {
			a--;
			trench.add(2000*d+a);
			if (a<aMin) {
				aMin = a;
			}
		}
	}
	if (line[0] == "D") {
		for (let i = 0;i<length;i++) {
			d++;
			trench.add(2000*d+a);
			if (d>dMax) {
				dMax = d;
			}
		}
	}
	if (line[0] == "U") {
		for (let i = 0;i<length;i++) {
			d--;
			trench.add(2000*d+a);
			if (d<dMin) {
				dMin = d;
			}
		}
	}
}

console.log(dMin,dMax,aMin,aMax);

let map = [];
for (let down=dMin;down<=dMax;down++) {
	map.push([""]);
	for (let across=aMin;across<=aMax;across++) {
		if (trench.has(2000*down+across)) {
			if (trench.has(2000*(down-1)+across) && trench.has(2000*(down+1)+across)) {
				map[down-dMin]+="|";
			}
			if (trench.has(2000*(down-1)+across) && trench.has(2000*down+across+1)) {
				map[down-dMin]+="L";
			}
			if (trench.has(2000*(down-1)+across) && trench.has(2000*down+across-1)) {
				map[down-dMin]+="J";
			}
			if (trench.has(2000*(down+1)+across) && trench.has(2000*down+across+1)) {
				map[down-dMin]+="F";
			}
			if (trench.has(2000*(down+1)+across) && trench.has(2000*down+across-1)) {
				map[down-dMin]+="7";
			}
			if (trench.has(2000*down+across-1) && trench.has(2000*down+across+1)) {
				map[down-dMin]+="-";
			}
		} else {
			map[down-dMin]+=".";
		}
	}
	console.log(map[down-dMin]);
}

let count = 0;
for (let line of map) {
	line = line
		.replaceAll(/\-/g, "")
		.replaceAll(/LJ/g, "")
		.replaceAll(/F7/g, "")
		.replaceAll(/FJ/g, "|")
		.replaceAll(/L7/g, "|")
		.replaceAll(/\|\|/g,"")
		.replaceAll(/\./g," ").trim();

	//console.log(line);
	let inside = false;
	for (let j = 0; j < line.length; j++) {
		//console.log(clean[i][j]);
		if (line[j] == " ") {
			if (inside) {count++}
		}
		if (line[j] == "|") {
			inside = !inside;
		}
	}
}

let answer = trench.size+count;
console.log(answer);


output().forTest(0);
