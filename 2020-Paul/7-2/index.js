const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf8")
  .replace(/\./g, "")
  .replace(/ bags/g, "")
  .replace(/ bag/g, "")
  .replace(/ contain/g, ",")
  .split("\n")
  .map((i) => i.split(", "));

function bagsin(bagstr) {
  let i = 0;
  while (input[i][0] != bagstr) {
    i++;
  }
  if (input[i][1] == "no other") {
    return 0;
  } else {
    let ans = 0;
    for (let j = 1; j < input[i].length; j++) {
      ans +=
        parseInt(input[i][j].slice(0, 1)) * (bagsin(input[i][j].slice(2)) + 1);
    }
    return ans;
  }
}

console.log(bagsin("shiny gold"));
