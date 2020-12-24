const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n\n');
const tiles = new Map();

var rotate = function(matrix) {
  return flipMajorDiagonal(matrix.reverse());
}

var flipMajorDiagonal = function(matrix) {
  return matrix[0].map((column, index) => (
    matrix.map(row => row[index])
  ))
}

function generateLTRB(t) {
  return [t.map(i => i[0]).join(''), t[0].join(''), t.map(i => i[i.length - 1]).join(''), t[t.length - 1].join('')]
}

for (const line of input) {
  const l = line.split('\n');
  const tileID = Number(l[0].slice(5, -1));
  const t = l.slice(1);
  // const o = [t.map(i => i[0]).join(''), t[0], t.map(i => i[i.length - 1]).join(''), t[t.length - 1]]
  const a = t.slice(1, -1).map(a => a.split('').slice(1, -1));
  // const a = t.slice().map(a => a.split('').slice());
  const b = t.slice().map(a => a.split('').slice());

  // Left
  // Top
  // Right
  // Bottom

  tiles.set(tileID, {
    tileID,
    flips: [
      // [o[0], o[1], o[2], o[3]], // Original
      // [o[3], o[0], o[1], o[2]], // R1
      // [o[2], o[3], o[0], o[1]], // R2
      // [o[1], o[2], o[3], o[0]], // R3
      // [o[2], o[1].split('').reverse().join(''), o[0], o[3].split('').reverse().join('')], // Flip X
      // [o[1], o[0].split('').reverse().join(''), o[3], o[2].split('').reverse().join('')], // R1 Flip X
      // [o[0], o[3].split('').reverse().join(''), o[2], o[1].split('').reverse().join('')], // R2 Flip X
      // [o[3], o[2].split('').reverse().join(''), o[1], o[0].split('').reverse().join('')], // R3 Flip X
      // [o[0].split('').reverse().join(''), o[3], o[2].split('').reverse().join(''), o[1]], // Flip Y
      // [o[3].split('').reverse().join(''), o[2], o[1].split('').reverse().join(''), o[0]], // R1 Flip Y
      // [o[2].split('').reverse().join(''), o[1], o[0].split('').reverse().join(''), o[3]], // R2 Flip Y
      // [o[1].split('').reverse().join(''), o[0], o[3].split('').reverse().join(''), o[2]], // R3 Flip Y
      generateLTRB(b), // Original
      generateLTRB(rotate(b.slice())), // R1
      generateLTRB(rotate(rotate(b.slice()))), // R2
      generateLTRB(rotate(rotate(rotate(b.slice())))), // R3
      generateLTRB(b.map(i => i.slice().reverse())), // Original
      generateLTRB(rotate(b.map(i => i.slice().reverse()))), // R1
      generateLTRB(rotate(rotate(b.map(i => i.slice().reverse())))), // R2
      generateLTRB(rotate(rotate(rotate(b.map(i => i.slice().reverse()))))), // R3
      generateLTRB(b.slice().reverse()), // Original
      generateLTRB(rotate(b.slice().reverse())), // R1
      generateLTRB(rotate(rotate(b.slice().reverse()))), // R2
      generateLTRB(rotate(rotate(rotate(b.slice().reverse())))), // R3
    ],
    tileRotations: [
      a, // Original
      rotate(a.slice()), // R1
      rotate(rotate(a.slice())), // R2
      rotate(rotate(rotate(a.slice()))), // R3
      a.map(i => i.slice().reverse()), // Original
      rotate(a.map(i => i.slice().reverse())), // R1
      rotate(rotate(a.map(i => i.slice().reverse()))), // R2
      rotate(rotate(rotate(a.map(i => i.slice().reverse())))), // R3
      a.slice().reverse(), // Original
      rotate(a.slice().reverse()), // R1
      rotate(rotate(a.slice().reverse())), // R2
      rotate(rotate(rotate(a.slice().reverse()))), // R3
    ]
  })
}

for (const [tileID, tile] of tiles) {
  tile.matches = [];
  for (const flip of tile.flips) {
    const matches = []
    for (const t in flip) {
      const tn = Number(t);
      matches[t] = Array.from(tiles).filter(i => i[0] !== tileID).filter(i => i[1].flips.some(a => a[(tn + 2) % 4] === flip[tn])).map(i => [i[0], i[1].flips.findIndex(a => a[(tn + 2) % 4] === flip[t])]);
    }
    tile.matches.push(matches);
  }
  tiles.set(tileID, tile);
}

const corners = Array.from(tiles.values()).filter(i => i.matches.some(a => {
  return (a[0].length === 0 && a[1].length === 0)
})).map(i => i.tileID);

const grid = [{
  tile: tiles.get(corners[0]), flip: tiles.get(corners[0]).matches.findIndex(a => {
    return (a[0].length === 0 && a[1].length === 0)
  }), newline: true
}];
const gridTiles = new Set();
let lineStart = 0;

for (let i = 0; i < tiles.size; i++) {
  const latest = grid[i];
  gridTiles.add(latest.tile.tileID)
  const right = latest.tile.matches[latest.flip][2].filter(i => !gridTiles.has(i[0]));
  if (right.length !== 1) {
    console.error('BREAKING', right.length, lineStart);
    const prev = grid[lineStart];
    const bottom = prev.tile.matches[prev.flip][3].filter(i => !gridTiles.has(i[0]));
    if (bottom.length !== 1) {
      console.error('DONE', bottom.length);
      break;
    }
    lineStart = i + 1;
    grid.push({ tile: tiles.get(bottom[0][0]), flip: bottom[0][1], newline: true })
  } else {
    grid.push({ tile: tiles.get(right[0][0]), flip: right[0][1] })
  }
}

let g = [];
for(const {tile, flip, newline} of grid) {
  if(newline) {
    g.push(tile.tileRotations[flip].map(i=>i.join('')))
  } else {
    for(const line in tile.tileRotations[flip].map(i=>i.join(''))) {
      g[g.length - 1][line] += '' + tile.tileRotations[flip].map(i=>i.join(''))[line];
    }
  }
}
g = g.flat().map(i=>i.split(''));
fs.writeFileSync('output.txt', g.map(i=>i.join('')).join('\n'))


for(const rotation of [
  g, // Original
  rotate(g.slice()), // R1
  rotate(rotate(g.slice())), // R2
  rotate(rotate(rotate(g.slice()))), // R3
  g.map(i => i.slice().reverse()), // Original
  rotate(g.map(i => i.slice().reverse())), // R1
  rotate(rotate(g.map(i => i.slice().reverse()))), // R2
  rotate(rotate(rotate(g.map(i => i.slice().reverse())))), // R3
  g.slice().reverse(), // Original
  rotate(g.slice().reverse()), // R1
  rotate(rotate(g.slice().reverse())), // R2
  rotate(rotate(rotate(g.slice().reverse()))), // R3
]) {
  const monsters = [];
  const r = rotation.map(i=>i.slice()).slice();
  for(let x = 0;x < rotation[0].length - 20;x++) {
    for(let y = 0;y < rotation.length - 3;y++) {
      const slice = rotation.slice(y, y+3).map(i=>i.slice(x, x+20));
      if(slice.map(i=>i.join('')).join('\n').match(/.{18}#.\n#.{4}#{2}.{4}#{2}.{4}#{3}\n.#..#..#..#..#..#.{3}/)) {
        monsters.push(slice.map(i=>i.join('')).join('\n'));
        for(const coord of [
          [1, 19],
          [2, 1],
          [2, 6],
          [2, 7],
          [2, 12],
          [2, 13],
          [2, 18],
          [2, 19],
          [2, 20],
          [3, 2],
          [3, 5],
          [3, 8],
          [3, 11],
          [3, 14],
          [3, 17]
        ]) {
          r[y + coord[0] - 1][x + coord[1] - 1] = "O";
        }
      }
    }
  }
  if(monsters.length > 0) console.log(r.flat().filter(i=>i === "#").length);
}
