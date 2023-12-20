import { loadTrimmed, output } from "aocutils";

let free: number[], filled: number[], placed: number[], toMatch: number[];
let count, needed;
let sum = 0;

function fill(start: number, toPlace: number,) {
	if (toPlace == 0) {
     let code = placed.join().replaceAll(/,/g,"").replaceAll(/0+/g,"0").split("0").map(i=>i.length).filter(i=>i!=0);
     if (code.length == toMatch.length && code.every((n,i) => n === toMatch[i])) {
       count++;
     }
	} else {
    //console.log(toPlace);
		for (let i = start; i < free.length; i++) {
			placed[free[i]] = 1;
      let code = placed.slice(0,free[i]+1).join().replaceAll(/,/g,"").replaceAll(/0+/g,"0").split("0").map(i=>i.length).filter(i=>i!=0);
      let j = 0;
      while (code[j] == toMatch[j] && j<code.length) {j++}
      if (code[j] < toMatch[j] || j==code.length) {
        fill(i + 1, toPlace - 1);
      }
			placed[free[i]] = 0;
		}
	}
}

const input = loadTrimmed()
	.split("\n")
	.map((i) => i.split(" ").map((i, n) => (n === 0 ? i : i.split(",").map((i) => Number(i))))) as [
	string,
	number[],
][];

//console.log(input);

for (const line of input) {
	free = [];
	filled = [];
	for (let i = 0; i < line[0].length; i++) {
		if (line[0][i] == "?") {
			free.push(i);
		}
		if (line[0][i] == "#") {
			filled.push(i);
		}
	}
	needed = line[1].reduce((a, b) => a + b, 0) - filled.length;
	//console.log(free, filled, needed);
	count = 0;
	placed = line[0]
		.slice()
		.replaceAll(/\?/g, ".")
		.replaceAll(/\./g, "0")
		.replaceAll(/#/g, "1")
		.split("")
		.map((i) => Number(i));
  toMatch = line[1];
  //console.log(needed);
	fill(0, needed);
  console.log(count);
  sum+=count;
}

output(sum).forTest(21);
