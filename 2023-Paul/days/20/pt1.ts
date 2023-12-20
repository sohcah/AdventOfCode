import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n").map(i=>i.split(" -> "));

function pulse (modFrom: string,modTo: string, hiLo: number) {
	//console.log(modFrom + " -> " + modTo + ", " + hiLo);
	lowHighs[hiLo]++;
	if (modTo != "output" && modTo != "rx") {
		if (modules["%"+modTo]!=undefined) {
			if (hiLo == 0) {
				states["%"+modTo] = 1-states["%"+modTo];
				//lowHighs[states["%"+modTo]]++;
				queue.push(...modules["%" + modTo].split(", ").map(i => [modTo,i, states["%"+modTo]]));
			}
		} else {
			states["&"+modTo][modFrom] = hiLo;
			if (Object.values(states["&"+modTo]).every(i => i === 1)) {
				//lowHighs[0]+=modules["&"+modTo].split(", ").length;
				queue.push(...modules["&"+modTo].split(", ").map(i=>[modTo,i,0]));
			} else {
				//lowHighs[1]+=modules["&"+modTo].split(", ").length;
				queue.push(...modules["&"+modTo].split(", ").map(i=>[modTo,i,1]));
			}

		}
	}
}

const modules: Record<string, string> = {};
const states: Record<string,number | Record <string,number> > = {};

for (const line of input) {
	modules[line[0]] = line[1];
	if (line[0][0]=="%") {
		states[line[0]] = 0;
	}
	if (line[0][0]=="&") {
		states[line[0]] = {};
		for (const l of input) {
			for (const output of l[1].split(", ")) {
				// states[line[0]][output] = 0;
				if (states["&"+output]) {
					states["&"+output][l[0].slice(1)] = 0;
				}
			}
		}
	}
}

console.log(states);

let queue;
queue	= modules["broadcaster"].split(", ").map(i=>["broadcaster",i,0]);
console.log (queue);

let lowHighs = [0,0];

for (let presses = 0;presses<1000;presses++) {
	lowHighs[0]++;
	queue	= modules["broadcaster"].split(", ").map(i=>["broadcaster",i,0]);
	while (queue.length > 0) {
		let a = queue.shift();
		pulse(...a);
	}
}

let answer = lowHighs[0]*lowHighs[1];

console.log(lowHighs, answer)

output(answer).forTest(11687500);
