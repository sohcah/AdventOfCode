import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n\n").map(i=>i.split("\n"));

let steps = input[0].map(i=>i.slice(0,i.length-1).split("{").map(i=>i.split(",")));

const code = {};

for (const line of steps) {
	code[line[0]] = line[1];
}

function run (key,ranges) {
	//console.log(ranges);
	if (key =="A" || key =="R") {
		if (key == "A") {
			// console.log(ranges);
			sum+=(ranges[0][1]-ranges[0][0]+1)*(ranges[1][1]-ranges[1][0]+1)*(ranges[2][1]-ranges[2][0]+1)*(ranges[3][1]-ranges[3][0]+1);
		}
		if (key == "R") {
			//return "R";
		}
	} else {
		//console.log(key);
		let strings = code[key];
		//console.log(strings);
		for (let i = 0; i < strings.length; i++) {
			if (strings[i].includes("<") || code[key][i].includes(">")) {
				let varNo = "xmas".indexOf(strings[i][0]);
				if (strings[i][1] == "<") {
					//console.log("less?");
					if (Number(strings[i].slice(2, strings[i].indexOf(":"))) - 1 < ranges[varNo][1]) {
						let newRanges = ranges.map(i=>i.slice());
						newRanges[varNo][1] = Number(strings[i].slice(2, strings[i].indexOf(":"))) - 1;
						run(strings[i].slice(strings[i].indexOf(":") + 1), newRanges);
						ranges[varNo][0] = Number(strings[i].slice(2, strings[i].indexOf(":")));
					}
				} else {
					//console.log("more?", strings[i].slice(2));
					if (Number(strings[i].slice(2, strings[i].indexOf(":"))) + 1 > ranges[varNo][0]) {
						//console.log("bigger");
						let newRanges = ranges.map(i=>i.slice());
						newRanges[varNo][0] = Number(strings[i].slice(2, strings[i].indexOf(":"))) + 1;
						run(strings[i].slice(strings[i].indexOf(":") + 1), newRanges);
						ranges[varNo][1] = Number(strings[i].slice(2, strings[i].indexOf(":")));
					}
				}
			} else {
				if (strings[i] == "A" || strings[i] == "R") {
					if (strings[i] == "A") {
						//console.log(ranges);
						sum+=(ranges[0][1]-ranges[0][0]+1)*(ranges[1][1]-ranges[1][0]+1)*(ranges[2][1]-ranges[2][0]+1)*(ranges[3][1]-ranges[3][0]+1);
					}
					if (strings[i] == "R") {
						//return "R";
					}
				} else {
					run(strings[i], ranges);
				}
			}
		}
	}
}

let sum = 0;

let xmasRanges = [[1,4000],[1,4000],[1,4000],[1,4000]];

run("in",xmasRanges);


output(sum).forTest(167409079868000);

