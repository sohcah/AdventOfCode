const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n').map(i => i.trim());

const black = new Set();

const size = 124;

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
  const c = (q + size) * size + r + size;
  if (black.has(c)) {
    black.delete(c);
  } else {
    black.add(c);
  }
}

const offsets = [
  [[+1, 0], [0, -1], [-1, -1],
  [-1, 0], [-1, +1], [0, +1]],
  [[+1, 0], [+1, -1], [0, -1],
  [-1, 0], [0, +1], [+1, +1]],
]
for (let round = 0; round < 100; round++) {
  const flip = new Set();
  for (let q = -size/2; q < size/2; q++) {
    for (let r = -size/2; r < size/2; r++) {
      const c = (q + size) * size + r + size;
      let blacks = 0;
      for (let offset of offsets[Math.abs(r) % 2]) {
        const d = (offset[0] + q + size) * size + offset[1] + r + size;
        if(black.has(d)) blacks++;
      }
      if(black.has(c) && blacks !== 1 && blacks !== 2) flip.add(c);
      if(!black.has(c) && blacks === 2) flip.add(c);
    }
  }

  for(const tile of flip) {
    if(black.has(tile)) {
      black.delete(tile);
    } else {
      black.add(tile);
    }
  }
}

console.log(black.size);