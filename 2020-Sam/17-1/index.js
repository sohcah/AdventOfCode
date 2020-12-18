const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n').map(i=>i.split(''));
const cycles = 6;
const xSize = input[0].length + (2 * cycles);
const ySize = input.length + (2 * cycles);
const zSize = 1 + (2 * cycles);
const store = new Uint8Array(xSize * ySize * zSize);

console.log(xSize, ySize, zSize);

function getPosition(x, y, z) {
  return (((z * ySize) + y) * xSize) + x;
}

function renderGrid() {
  let o = ''
  for(let z = 0;z < zSize;z++) {
    o += `z = ${z - cycles}\n`
    for(let y = 0;y < ySize;y++) {
      for(let x = 0;x < xSize;x++) {
        const p = getPosition(x, y, z);
        if(store[p] === 1) {
          o += "#"
        } else {
          o += '.'
        }
      }
      o += `\n`
    }
    o += `\n\n`
  }
  console.log(o);
}

for(let x = 0;x < input[0].length;x++) {
  for(let y = 0;y < input.length;y++) {
    store[getPosition(x + cycles, y + cycles, cycles)] = input[y][x] === "#" ? 1 : 0;
  }
}

for(let c = 0;c < cycles;c++) {
  console.log(`### Cycle ${c}`)
  renderGrid();
  const past = store.slice();
  for(let p = 0;p < store.length;p++) {
    let count = 0;
    for(let xb = -1; xb <= 1;xb++) {
      for(let yb = -1; yb <= 1;yb++) {
        for(let zb = -1; zb <= 1;zb++) {
          if(xb !== 0 || yb !== 0 || zb !== 0) {
            const pb = p + getPosition(xb, yb, zb);
            if(past[pb] === 1) count++; 
          }
        }
      }
    }
    if(past[p] === 1 && (count === 2 || count === 3)) {
      store[p] = 1;
    } else if(past[p] === 1) {
      store[p] = 0;
    } else if(past[p] === 0 && count === 3) {
      store[p] = 1;
    } else {
      store[p] = 0;
    }
  }
}

console.log(store.filter(i=>i === 1).length);