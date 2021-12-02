const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf8")
  .replace(/contains /g, "")
  .replace(/,/g, "")
  .replace(/\)/g, "")
  .split("\n")
  .map((i) => i.split(" (").map((j) => j.split(" ")));

let allergens = new Set();
let ingreds = new Set();
let couldhave = new Set();

for (i = 0; i < input.length; i++) {
  for (ing of input[i][0]) {
    ingreds.add(ing);
  }
  for (all of input[i][1]) {
    allergens.add(all);
  }
}

for (a of allergens) {
  i = 0;
  while (!input[i][1].includes(a)) {
    i++;
  }
  s = new Set(input[i][0]);

  for (j = i + 1; j < input.length; j++) {
    if (input[j][1].includes(a)) {
      s = new Set(input[j][0].filter((i) => s.has(i)));
    }
  }
  for (item of s) {
    couldhave.add(item);
  }
}

for (item of couldhave) {
  ingreds.delete(item);
}

let count = 0;
for (item of ingreds) {
  for (line of input) {
    if (line[0].includes(item)) {
      count++;
    }
  }
}

console.log(count);
