const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n").map(i=>Number(i));



const subj = 7;

let loop = 1;
let val = 7;
let dev0 = input[0]+0;
let dev1 = input[1]+0;

while (val !=input[0] && val !=input[1]) {
  val = (val*7) % 20201227;
  dev0 = (dev0*input[0]) % 20201227;
  dev1 = (dev1*input[1]) % 20201227;
  loop++;
}
console.log(loop);

if (val == input[0]) {console.log(dev1)} else {console.log(dev0)}