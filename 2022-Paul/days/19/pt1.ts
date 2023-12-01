import {output, loadLines} from "aocutils";

const input = loadLines().map(i=>i.split(",").map(Number));


const lavaBlocks = new Set<number>();

for (const triple of input) {
    lavaBlocks.add(triple[0]*10000+triple[1]*100+triple[2]);
}

let answer = 0;
for (const n of Array.from(lavaBlocks.values())) {
    if (!lavaBlocks.has(n+1)) {answer++}
    if (!lavaBlocks.has(n-1)) {answer++}
    if (!lavaBlocks.has(n+100)) {answer++}
    if (!lavaBlocks.has(n-100)) {answer++}
    if (!lavaBlocks.has(n+10000)) {answer++}
    if (!lavaBlocks.has(n-10000)) {answer++}
}


output(answer).forTest(64);

