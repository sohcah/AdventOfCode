const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n\n');
const tiles = new Map();

for (const line of input) {
  const l = line.split('\n');
  const tileID = Number(l[0].slice(5, -1));
  const t = l.slice(1);
  const o = [t.map(i => i[0]).join(''), t[0], t.map(i => i[i.length - 1]).join(''), t[t.length - 1]]

  // Left
  // Top
  // Right
  // Bottom

  tiles.set(tileID, {
    tileID,
    flips: [
      [o[0], o[1], o[2], o[3]], // Original
      [o[1], o[2], o[3], o[0]], // R1
      [o[2], o[3], o[0], o[1]], // R2
      [o[3], o[0], o[1], o[2]], // R3
      [o[2], o[1].split('').reverse().join(''), o[0], o[3].split('').reverse().join('')], // Flip X
      [o[3], o[2].split('').reverse().join(''), o[1], o[0].split('').reverse().join('')], // R1 Flip X
      [o[0], o[3].split('').reverse().join(''), o[2], o[1].split('').reverse().join('')], // R2 Flip X
      [o[1], o[0].split('').reverse().join(''), o[3], o[2].split('').reverse().join('')], // R3 Flip X
      [o[0].split('').reverse().join(''), o[3], o[2].split('').reverse().join(''), o[1]], // Flip Y
      [o[1].split('').reverse().join(''), o[0], o[3].split('').reverse().join(''), o[2]], // R1 Flip Y
      [o[2].split('').reverse().join(''), o[1], o[0].split('').reverse().join(''), o[3]], // R2 Flip Y
      [o[3].split('').reverse().join(''), o[2], o[1].split('').reverse().join(''), o[0]], // R3 Flip Y
    ],
  })
}

for(const [tileID, tile] of tiles) {
  tile.matches = [];
  for(const flip of tile.flips) {
    const matches = []
    for(const t in flip) {
      matches[t] = Array.from(tiles).filter(i=>i[0] !== tileID).filter(i=>i[1].flips.some(a=>a[(t + 2) % 4] === flip[t])).map(i=>[i[0],i[1].flips.findIndex(a=>a[(t + 2) % 4] === flip[t])]);
    }
    tile.matches.push(matches);
  }
  tiles.set(tileID, tile);
}

const corners = Array.from(tiles.values()).filter(i=>i.matches.some(a=>{
  return (a[0].length ===0 && a[1].length === 0)
})).map(i=>i.tileID);
console.log(corners);

console.log(corners.reduce((a,b)=>a*b,1));