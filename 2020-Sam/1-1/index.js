const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split(/[\n\r]+/g).map(i=>Number(i));

for(let x = 0;x < input.length;x++) {
  for(let y = x;y < input.length;y++) {
    const ix = input[x], iy = input[y];
    if(ix + iy === 2020) {
      console.log(ix, iy, ix + iy, ix * iy);
    }
  }
}