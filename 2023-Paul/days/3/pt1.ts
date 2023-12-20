import { loadTrimmed, output, sum } from "aocutils";

const input = loadTrimmed()
	.split("\n").map(i=> "." + i + ".");
let width = input[0].length;
input.push(".".repeat(width));
input.unshift(".".repeat(width));

let sum = 0;
console.log(width);
console.log(input);

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
      let surround = input[i - 1].slice(j - 1, k + 1) + input[i].slice(j - 1,j) + input[i].slice(k, k + 1) + input[i + 1].slice(j - 1, k + 1);
      if (surround.match(/\./g).length < surround.length) {
        sum += num;
        console.log(num);
    }
    }
    j = k;
  }
}

output(sum).forTest(4361);
