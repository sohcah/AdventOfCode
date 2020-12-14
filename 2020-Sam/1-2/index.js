const fs = require('fs');
const input = fs.readFileSync('input.txt','utf8').split(/[\n\r]+/g).map(i=>Number(i));

for(let x = 0;x < input.length;x++) {
  for(let y = x;y < input.length;y++) {
    for(let z = y;z < input.length;z++) {
      const ix = input[x], iy = input[y], iz = input[z];
      if(ix + iy + iz === 2020) {
        console.log(ix, iy, iz, ix + iy + iz, ix * iy * iz);
      }
    }
  }
}