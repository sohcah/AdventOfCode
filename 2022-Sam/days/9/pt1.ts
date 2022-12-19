import {gridPositions, loadLines, moveUntilOutside, output} from "aocutils";

const instructions = loadLines().map(i => i.split(" ")).map(i => [i[0] as 'U' | 'D' | 'L' | 'R', Number(i[1])] as const);

console.log(instructions);

const tailPositions = new Set<string>();

let head = [0, 0];
let tail = [0, 0];
tailPositions.add(tail.join(","));

for (const [dir, movesCount] of instructions) {
  let moves = 1;
  for(let i = 0; i < movesCount;i++) {
    switch (dir) {
      case 'U':
        head[1] += moves;
        break;
      case 'D':
        head[1] -= moves;
        break;
      case 'L':
        head[0] -= moves;
        break;
      case 'R':
        head[0] += moves;
        break;
    }

    if (Math.abs(head[0] - tail[0]) >= 2) {
      console.log("XMove");
      tail[0] += head[0] - tail[0] - (Math.sign(head[0] - tail[0]));
      if (head[1] !== tail[1]) {
        tail[1] += head[1] - tail[1];
      }
    } else if (Math.abs(head[1] - tail[1]) >= 2) {
      console.log("YMove");
      tail[1] += head[1] - tail[1] - (Math.sign(head[1] - tail[1]));
      if (head[0] !== tail[0]) {
        tail[0] += head[0] - tail[0];
      }
    }

    console.log(head, tail);
    tailPositions.add(tail.join(","));
  }
}

let answer = tailPositions.size;

output(answer).forTest(13);
