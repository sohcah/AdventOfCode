import {output, loadNumbers} from "aocutils";

const input = loadNumbers().map(i=>i*811589153);

let working = [];

for (let i=0;i<input.length;i++) {
    working.push(i);
}

//console.log(working.map(i=>input[i]).join(", "));
for (let j=0;j<10;j++) {
    for (let i = 0; i < input.length; i++) {
        let pos = working.indexOf(i);
        let move = input[i];
        working.splice(pos, 1);
        let newPos = (pos + move) % working.length;
        working.splice(newPos, 0, i);
        //console.log(working.map(i=>input[i]).join(", "));
    }
}

let answer = 0;

let zeroAt=working.indexOf(input.indexOf(0));
for (let i=0;i<3;i++) {
    zeroAt = (zeroAt + 1000) % working.length;
    answer += input[working[zeroAt]];
}


output(answer).forTest(1623178306);

