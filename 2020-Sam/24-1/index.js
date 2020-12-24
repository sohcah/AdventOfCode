const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n').map(i => i.trim());

const black = new Set();

for (const line of input) {
  let q = 0;
  let r = 0;
  for (let i = 0; i < line.length; i++) {
    if (line.slice(i, i + 1) === "e") {
      q++;
    } else if (line.slice(i, i + 1) === "w") {
      q--;
    } else if (line.slice(i, i + 2) === "se") {
      if (Math.abs(r) % 2 === 1) q++;
      r++;
      i++;
    } else if (line.slice(i, i + 2) === "ne") {
      if (Math.abs(r) % 2 === 1) q++;
      r--;
      i++;
    } else if (line.slice(i, i + 2) === "sw") {
      if (Math.abs(r) % 2 === 0) q--;
      r++;
      i++;
    } else if (line.slice(i, i + 2) === "nw") {
      if (Math.abs(r) % 2 === 0) q--;
      r--;
      i++;
    } else {
      console.log('ERROR', line.slice(i, i + 2))
    }
  }
  const c = (q + 1000) * 1000 + r + 1000;
  if (black.has(c)) {
    black.delete(c);
  } else {
    black.add(c);
  }
}