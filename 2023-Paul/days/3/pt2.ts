import { loadTrimmed, output, sum } from "aocutils";

const input = loadTrimmed()
  .split("\n").map(i=> "." + i + ".");
let width = input[0].length;
let height = input.length;
input.push(".".repeat(width));
input.unshift(".".repeat(width));

let sum = 0;
console.log(width);
console.log(input);

let answer = new Array(width*height).fill(0);
console.log(answer);

for (let i=1;i<input.length-1;i++) {
  let j = 1;
  while (j<width+1) {
    while (input[i].charCodeAt(j) < 48 || input[i].charCodeAt(j) > 57) {
      j++
    }
    let k = j + 1;
    while (input[i].charCodeAt(k) >= 48 && input[i].charCodeAt(k) <= 57) {
      k++
    }
    if (j<width) {
      let num = Number(input[i].slice(j, k));
      let surround = input[i - 1].slice(j - 1, k + 1) + input[i].slice(j - 1, k + 1) + input[i + 1].slice(j - 1, k + 1);
      let pos = surround.indexOf("*");
      if (pos !- -1) {
        console.log(num,(i-1+Math.floor(pos/(k-j+2)))*width+j-1+pos % (k-j+2));
        if (answer[(i-1+Math.floor(pos/(k-j+2)))*width+j-1+pos % (k-j+2)]==0) {
          answer[(i-1+Math.floor(pos/(k-j+2)))*width+j-1+pos % (k-j+2)] = num
        } else {
          answer[(i-1+Math.floor(pos/(k-j+2)))*width+j-1+pos % (k-j+2)] *= num;
          sum += answer[(i-1+Math.floor(pos/(k-j+2)))*width+j-1+pos % (k-j+2)]
        }

      }
    }
    j = k;
  }
}
console.log(answer);
output(sum).forTest(467835);
