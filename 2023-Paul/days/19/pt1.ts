import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n\n").map(i=>i.split("\n"));

let data = input[1].map(i=>i.slice(0,i.length-1).split(",").map(i=>Number(i.slice(i.indexOf("=")+1))));

let steps = input[0].map(i=>i.slice(0,i.length-1).split("{").map(i=>i.split(",")));

const code = {};

for (const line of steps) {
	code[line[0]] = line[1];
}

function run (key,quad) {
	if (key =="A") {
		return "A";
	}
	if (key =="R") {
		return "R";
	}
	let strings = code[key];
	//console.log(strings);
	for (let i = 0;i<strings.length;i++) {
		if (strings[i].includes("<") || code[key][i].includes(">")) {
			let value = quad["xmas".indexOf(strings[i][0])];
			//console.log(value);
			if (strings[i][1] == "<") {
				//console.log("less?");
				if (value < Number(strings[i].slice(2,strings[i].indexOf(":")))) {
					 return (run(strings[i].slice(strings[i].indexOf(":")+1),quad));
				}
			} else {
				//console.log("more?",strings[i].slice(2));
				if (value > Number(strings[i].slice(2,strings[i].indexOf(":")))) {
					//console.log("bigger");
					return (run(strings[i].slice(strings[i].indexOf(":")+1),quad));
				}
			}
		} else {
			if (strings[i]=="A") {
				return "A";
			}
			if (strings[i]=="R") {
				return "R";
			}
			return (run(strings[i],quad));
		}
	}
}

let sum = 0;

for (const item of data) {
	if (run("in",item) == "A") {
		sum+=item.reduce((a,b)=>a+b,0);
	}
}

output(sum).forTest(19114);

