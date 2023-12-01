import {output, loadLines} from "aocutils";

const input = loadLines().map(i=>i.split("").map(i=>Number(i)));

const visible = new Set<number>();

let width = input[0].length;

for (let a = 0;a<width;a++) {
    let maxLR = -1;
    let maxRL = -1;
    let maxTB = -1;
    let maxBT = -1;
    for (let b = 0;b<width;b++) {
        //console.log("----")
        //console.log(new Array(width).fill(0).map((_, a) => new Array(width).fill(0).map((_, b) => visible.has(a * width + b) ? "#" : ".").join("")).join("\n"))
        if (input[a][b] > maxLR) {
            maxLR = input[a][b];
            visible.add(a*width+b);
        }
        if (input[a][width-b-1] > maxRL) {
            maxRL = input[a][width-b-1];
            visible.add(a*width+width-b-1);
        }
        if (input[b][a] > maxTB) {
            maxTB = input[b][a];
            visible.add(b*width+a);
        }
        if (input[width-b-1][a] > maxBT) {
            maxBT = input[width-b-1][a];
            visible.add((width-b-1)*width+a);
        }
    }
}


output(visible.size).forTest(21);
