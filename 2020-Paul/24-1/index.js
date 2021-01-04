const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf8")
  .replace(/sw/g, "L")
  .replace(/ne/g, "7")
  .replace(/se/g, "Le")
  .replace(/nw/g, "7w")
  .split("\n")
  .map(
    (i) =>
      (100000 + (i.match(/e/g)?.length ?? 0) - (i.match(/w/g)?.length ?? 0)) *
        1000 +
      (i.match(/L/g)?.length ?? 0) -
      (i.match(/7/g)?.length ?? 0)
  );

let black = [];
for (i = 0; i < input.length; i++) {
  if (black.includes(input[i])) {
    black.splice(black.indexOf(input[i]), 1);
  } else {
    black.push(input[i]);
  }
}
console.log(black.length);