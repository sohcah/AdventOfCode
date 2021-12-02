const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\n");

const cycles = 6;

let width = input[0].length;
let height = input.length;

let size = 2 * cycles + Math.max(width, height);

let active = new Set();
let act = 0;
let surround = [];
let s = 0;
let newactive = new Set();

for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    if (input[i][j] == "#") {
      active.add(
        cycles * size * size * size +
          cycles * size * size +
          (i + cycles) * size +
          j +
          cycles
      );
    }
  }
}


for (i = -1; i < 2; i++) {
  for (j = -1; j < 2; j++) {
    for (let k = -1; k < 2; k++) {
      for (let l = -1; l < 2; l++) {
        if (i != 0 || j != 0 || k != 0 || l != 0) {
          surround.push(
            size * size * size * i + size * size * j + size * k + l
          );
        }
      }
    }
  }
}

for (let c = 0; c < cycles; c++) {
  for (i = cycles - c - 1; i < size - cycles + c + 1; i++) {
    for (j = cycles - c - 1; j < size - cycles + c + 1; j++) {
      for (k = cycles - c - 1; k < size - cycles + c + 1; k++) {
        for (l = cycles - c - 1; l < size - cycles + c + 1; l++) {
          act = 0;
          for (s = 0; s < surround.length; s++) {
            if (
              active.has(
                i * size * size * size +
                  j * size * size +
                  k * size +
                  l +
                  surround[s]
              )
            ) {
              act++;
            }
          }

          
          if (
            active.has(i * size * size * size + j * size * size + k * size + l)
          ) {
            if (act == 2 || act == 3) {
              newactive.add(
                i * size * size * size + j * size * size + k * size + l
              );
            }
          } else {
            if (act == 3) {
              newactive.add(
                i * size * size * size + j * size * size + k * size + l
              );
            }
          }
        }
      }
    }
  }
  active = newactive;
  newactive = new Set();
}

console.log(active.size);
// let prev = [input.slice().map((i) => i.slice())];
// let width = prev[0][0].length;
// let height = prev[0].length;

// let gen = 1;
// let occ = 0;
// console.log(prev,width,height);
// let line = [];
// for (i=0;i<gen*2+3;i++) {
//   line.push(".");
// }
// let plane =[];
// for (j=0;j<gen*2+3;j++) {
//   plane.push(line);
// }
// let next = []
// for (k=0;k<gen*2+1;k++) {
//   next.push(plane);
// }

// console.log(next);

// for (let x = 0; x < gen * 2 + 3; x++) {
//   for (let y = 0; y < gen * 2 + 3; y++) {
//     for (let z = 0; z < gen * 2 + 1; z++) {
//       occ = 0;
//       for (let a = Math.max(x - 2, 0); a < Math.min(x, gen * 2 + 1); a++) {
//         for (let b = Math.max(y - 2, 0); b < Math.min(y, gen * 2 + 1); b++) {
//           for (let c = Math.max(z - 2, 0); c < Math.min(z, gen * 2 - 1); c++) {
//             if (prev[c][a][b] == "#" && !(a == x - 1 && b == y - 1 && c == z - 1)) {
//               occ++;
//             }
//           }
//         }
//       }
//       if (x<1 || y<1 || z<1 || x>gen*2+1 || y > gen*2+1 || z > gen *2 - 1) {
//         if (occ == 3) {
//           next[z][x][y] = "#";
//           console.log("#");
//         }
//         else {
//           next[z][x][y] = ".";
//           console.log(".");
//         }
//       }
//       else {
//         if (prev[z-1][x-1][y-1] == ".") {
//           if (occ == 3) {
//             next[z][x][y] = "#";
//             console.log("#");
//           }
//           else {
//             next[z][x][y] = ".";
//             console.log(".");
//           }
//         }
//         else {
//           if (occ == 2 || occ == 3) {
//             next[z][x][y] = "#";
//             console.log("#");
//           }
//           else {
//             next[z][x][y] = ".";
//             console.log(".");
//           }
//         }
//       }
//       console.log(x,y,z,occ);
//     }
//   }
// }

// console.log(prev,next);
