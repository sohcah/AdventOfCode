import {IS_TEST, loadInput, loadLines, output, SMap} from "aocutils";

const sections = loadInput().trimEnd().split("\n\n");
const steps = sections[1].match(/\d+|[LR]/g)!.map(i => i.match(/\d+/) ? Number(i) : i as "L" | "R");

const grid = sections[0].split("\n").map(i => i.split(""));

type Pos = [face: Face, x: number, y: number, facing: number, baseFacing: number];

const height = grid.length;
const width = Math.max(...grid.map(i => i.length));
const faceSize = Math.min(height, width) / 3;
const faceWidth = Math.floor(width / faceSize);
const faceHeight = Math.floor(height / faceSize);
console.log(height, width, faceSize);

const faces: string[][][] = [];
const faceCoords: [number, number][] = [];

for(let i = 0; i < faceHeight; i++) {
  for(let j = 0; j < faceWidth; j++) {
    if((grid[i * faceSize][j * faceSize] || " ") !== " ") {
      const face = [];
      for (let k = 0; k < faceSize; k++) {
        face.push(grid[i * faceSize + k].slice(j * faceSize, (j + 1) * faceSize));
      }
      faces.push(face);
      faceCoords.push([i, j]);
    }
  }
}

/*
  0
3412
5
 */

class Face {
  coords: [number, number];
  left: [Face, number];
  top: [Face, number];
  right: [Face, number];
  bottom: [Face, number];
  grid: string[][];

  constructor(coords: [number, number], grid: string[][]) {
    this.coords = coords;
    this.grid = grid;
    this.left = [null, 0];
    this.top = [null, 0];
    this.right = [null, 0];
    this.bottom = [null, 0];
  }

  get(a: "top" | "bottom" | "left" | "right", b: "top" | "bottom" | "left" | "right", offset = 0): [Face, number] {
    const x = this[a][0]?.[dir(b, this[a][1])] ?? null;
    return x ? [x[0], (this[a][1] + x[1] + 4 + offset) % 4] : [null, 0];
  }
}

const faceMap = new SMap<[number, number], Face>();
for(let n = 0; n < faces.length;n++) {
  faceMap.set(faceCoords[n], new Face(faceCoords[n], faces[n]));
}

function dir(start: "right" | "left" | "top" | "bottom", n: number) {
  const arr = ["right", "bottom", "left", "top"];
  return arr[(arr.indexOf(start) + n + 4) % 4]
}

for(let i = 0;i < 10;i++) {
  console.log("i", i);
  for (const [coords, face] of Array.from(faceMap.entries())) {
    if (!face.top[0]) {
      const faceCoords: [number, number] = [(coords[0] - 1 + 4) % 4, coords[1]];
      if (faceMap.has(faceCoords)) {
        if(coords[0] === 0) console.log("A", coords);
        face.top = [faceMap.get(faceCoords), 0];
      } else {
        if(!face.top[0]) face.top = face.get("left", "top", -1);
        if(!face.top[0]) face.top = face.get("right", "top", 1);
      }
    }

    if (!face.bottom[0]) {
      const faceCoords: [number, number] = [(coords[0] + 1) % 4, coords[1]];
      if (faceMap.has(faceCoords)) {
        face.bottom = [faceMap.get(faceCoords), 0];
      } else {
        if(!face.bottom[0]) {
          if(coords[0] === 2 && coords[1] === 2) console.log("o1", coords, face.get("left", "bottom", 1));
          face.bottom = face.get("left", "bottom", 1);
        }
        if(!face.bottom[0]) {
          if(coords[0] === 2 && coords[1] === 2) console.log("o2", coords, face.get("right", "bottom", -1));
          face.bottom = face.get("right", "bottom", -1);
        }
      }
    }

    if (!face.left[0]) {
      const faceCoords: [number, number] = [coords[0], (coords[1] - 1 + 4) % 4];
      if (faceMap.has(faceCoords)) {
        face.left = [faceMap.get(faceCoords), 0];
      } else {
        if(!face.left[0]) face.left = face.get("top", "left", 1);
        if(!face.left[0]) face.left = face.get("bottom", "left", -1);
      }
    }

    if (!face.right[0]) {
      const faceCoords: [number, number] = [coords[0], (coords[1] + 1) % 4];
      if (faceMap.has(faceCoords)) {
        face.right = [faceMap.get(faceCoords), 0];
      } else {
        if(!face.right[0]) face.right = face.get("top", "right", -1);
        if(!face.right[0]) face.right = face.get("bottom", "right", 1);
      }
    }
  }
}

const initialFace = faceMap.get(faceCoords[0]);
// console.log("init", initialFace);
console.log("bottom", initialFace.bottom[0].bottom[0].bottom);
//
// process.exit(1);


// console.log(faces, faceCoords);

function rotate(pos: Pos, rotation: number): Pos {
  switch(rotation) {
    case 0:
      return pos;
    case 1:
      return [pos[0], pos[2], faceSize - pos[1] - 1, (pos[3] + 1) % 4, pos[4]];
    case 2:
      console.log('r', pos[1], pos[2]);
      console.log('R', faceSize - pos[1] - 1, faceSize - pos[2] - 1)
      return [pos[0], faceSize - pos[1] - 1, faceSize - pos[2] - 1, (pos[3] + 2) % 4, pos[4]];
    case 3:
      return [pos[0], faceSize - pos[2] - 1, pos[1], (pos[3] + 3) % 4, pos[4]];
  }
}


function incr(pos: Pos):Pos {
  switch(pos[3]) {
    case 0:
      if(pos[2] === faceSize - 1) {
        return rotate([pos[0].right[0], pos[1], 0, pos[3], pos[4]], pos[0].right[1]);
      }
      return [pos[0], pos[1], pos[2] + 1, pos[3], pos[4]];
    case 1:
      if(pos[1] === faceSize - 1) {
        const rot = rotate([pos[0].bottom[0], 0, pos[2], pos[3], pos[4]], pos[0].bottom[1]);
        console.log("moving down", pos, rot);
        return rot;
      }
      return [pos[0], pos[1] + 1, pos[2], pos[3], pos[4]];
    case 2:
      if(pos[2] === 0) {
        return rotate([pos[0].left[0], pos[1], faceSize - 1, pos[3], pos[4]], pos[0].left[1]);
      }
      return [pos[0], pos[1], pos[2] - 1, pos[3], pos[4]];
    case 3:
      if(pos[1] === 0) {
        return rotate([pos[0].top[0], faceSize - 1, pos[2], pos[3], pos[4]], pos[0].top[1]);
      }
      return [pos[0], pos[1] - 1, pos[2], pos[3], pos[4]];
  }
}

function getGrid(pos: Pos) {
  return pos[0].grid[pos[1]][pos[2]];
}

function moveForward(pos: Pos) {
  let newPos = incr(pos);
  if(getGrid(newPos) === "#") return pos;
  return newPos;
}

let pos: Pos = [initialFace, 0, 0, 0, 0];

// console.log(initialFace.coords, initialFace.top[0].coords, initialFace.top[1]);

// console.log(pos);
// for(let i = 0;i < 2;i++) {
//   pos = moveForward(pos);
//   console.log(pos);
// }
//

function posToStandard(pos: Pos) {
  // const rotatedBack = rotate(pos, (pos[4] - pos[3] + 4) % 4);
  return [pos[0].coords[0] * faceSize + pos[1], pos[0].coords[1] * faceSize + pos[2]];
}

console.log("init", pos, posToStandard(pos));
for(const step of steps) {
  // console.log(step);
  if(typeof step === "string") {
    pos = [pos[0], pos[1], pos[2], (pos[3] + (step === "R" ? 1 : 3)) % 4, (pos[4] + (step === "R" ? 1 : 3)) % 4];
  } else {
    for(let i = 0; i < step; i++) {
      pos = moveForward(pos);
      // console.log("m", [pos[1], pos[2]], pos[3], posToStandard(pos), pos[4]);
    }
  }
  // console.log(pos);
  // console.log(posToStandard(pos));
}

// console.log(grid);
const stand = posToStandard(pos);
console.log(stand);
output((stand[0]+1) * 1000 + (stand[1]+1) * 4 + pos[3]).forTest(5031);
