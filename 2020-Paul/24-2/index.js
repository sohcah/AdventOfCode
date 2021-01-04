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
let blackset = new Set(black);
let potset = new Set();
let newbset = new Set();
let surround = [1, -1, 1000, -1000, 1001, -1001];
let sur = 0;

for (i = 0; i < 100; i++) {
  potset = new Set();
  for (b of blackset) {
    potset.add(b);
    for (s of surround) {
      potset.add(b + s);
    }
  }
  newbset = new Set();
  for (p of potset) {
    sur = 0;
    for (s of surround) {
      if (blackset.has(p + s)) {
        sur++;
      }
    }
    if (blackset.has(p)) {
      if (sur == 1 || sur == 2) {
        newbset.add(p);
      }
    } else {
      if (sur == 2) {
        newbset.add(p);
      }
    }
  }
  
  blackset = new Set(newbset);
}

console.log(newbset.size);