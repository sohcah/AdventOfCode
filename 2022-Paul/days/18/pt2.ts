import {output, loadLines} from "aocutils";

const input = loadLines().map(i=>i.split(",").map(i=>Number(i)+3));

console.log(input);



const lavaBlocks = new Set<number>();
const floodCube = new Set<number>();
const size = 10;
function flood(a,b,c) {
    let abc = a*size*size+b*size+c
    if (!lavaBlocks.has(abc)) {
        if  (!floodCube.has(abc)) {
            floodCube.add(abc);
            console.log(abc);
            if (a>2) {flood(a-1,b,c)}
            if (b>2) {flood(a,b-1,c)}
            if (c>2) {flood(a,b,c-1)}
            if (a<size-3) {flood(a+1,b,c)}
            if (b<size-3) {flood(a,b+1,c)}
            if (c<size-3) {flood(a,b,c+1)}
        }
    }
}

// for (const triple of input) {
//     lavaBlocks.add(triple[0]*size*size+triple[1]*size+triple[2]);
// }

flood(0,0,0);

let answer = 0;
for (const n of Array.from(floodCube.values())) {
    if (!floodCube.has(n+1)) {answer++}
    if (!floodCube.has(n-1)) {answer++}
    if (!floodCube.has(n+size)) {answer++}
    if (!floodCube.has(n-size)) {answer++}
    if (!floodCube.has(n+size*size)) {answer++}
    if (!floodCube.has(n-size*size)) {answer++}
    console.log(n,answer);
}

console.log(floodCube.size);
//answer -= size*size*6;

output(answer).forTest(58);
