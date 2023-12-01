import {output, loadTrimmed, IS_TEST} from "aocutils";

let input  = loadTrimmed().split("\n");

let gen0 = new Set<string>();
let gen1 = new Set<string>();
let NSWE = [[[-1,0],[-1,1],[-1,-1]],[[1,0],[1,-1],[1,1]],[[0,-1],[-1,-1],[1,-1]],[[0,1],[1,1],[-1,1]]];

for (let i=0;i<input.length;i++) {
    for (let j=0;j<input[i].length;j++) {
        if (input[i][j] === "#") {
            gen0.add(i.toString() + "," + j.toString());
        }
    }
}

if(IS_TEST) {
    console.log();
    for (let i = 0; i < input.length; i++) {
        let line = "";
        for (let j = 0; j<input[0].length; j++) {
            if (gen0.has(`${i},${j}`)) {
                line += "#"
            } else {
                line += "."
            }
        }
        console.log(line);
    }
}

for (let gen = 0;gen<10;gen++) {
    for (const elf of gen0) {
        let [row, col] = elf.split(",").map(Number);
        let anyClear = false;
        for (let i = 0; i < 4; i++) {
            let clear = true;
            for (let j = 0; j < 3; j++) {
                if (gen0.has(`${row + NSWE[i][j][0]},${col + NSWE[i][j][1]}`)) {
                    clear = false;
                    break
                }
            }
            if (clear) {
                anyClear = true;
                if (i === 0) {
                    loop:
                        for (let m = 1; m < 4; m++) {
                            for (let n = 0; n < 2; n++) {
                                if (gen0.has(`${row + NSWE[m][n][0]},${col + NSWE[m][n][1]}`)) {
                                    clear = false;
                                    break loop;
                                }
                            }
                        }
                    if (clear) {
                        gen1.add(elf);
                    } else {
                        if (gen1.has(`${row + NSWE[i][0][0]},${col + NSWE[i][0][1]}`)) {
                            gen1.add(elf);
                            gen1.delete(`${row + NSWE[i][0][0]},${col + NSWE[i][0][1]}`);
                            const revertedPosition = `${row + 2 * NSWE[i][0][0]},${col + 2 * NSWE[i][0][1]}`;
                            if(gen1.has(revertedPosition)) {
                                throw "elfunmoveerr";
                            }
                            gen1.add(revertedPosition);
                        } else {
                            gen1.add(`${row + NSWE[i][0][0]},${col + NSWE[i][0][1]}`);
                        }
                    }
                } else {
                    if (gen1.has(`${row + NSWE[i][0][0]},${col + NSWE[i][0][1]}`)) {
                        gen1.add(elf);
                        gen1.delete(`${row + NSWE[i][0][0]},${col + NSWE[i][0][1]}`);
                        gen1.add(`${row + 2 * NSWE[i][0][0]},${col + 2 * NSWE[i][0][1]}`);
                    } else {
                        gen1.add(`${row + NSWE[i][0][0]},${col + NSWE[i][0][1]}`);
                    }
                }

                break;
            }
        }
        if (!anyClear) {
            gen1.add(elf);
        }
    }

    if(IS_TEST) {
        console.log();
        for (let i = 0; i < input.length; i++) {
            let line = "";
            for (let j = 0; j<input[0].length; j++) {
                if (gen1.has(`${i},${j}`)) {
                    line += "#"
                } else {
                    line += "."
                }
            }
            console.log(line);
        }
        console.log(gen0.size,gen1.size);
    }

    gen0 = gen1;
    gen1 = new Set();
    NSWE.push(NSWE.shift());
}
let minRow = Infinity;
let minCol = Infinity;
let maxRow = -Infinity;
let maxCol = -Infinity;

for (const elf of gen0) {
    let [row, col] = elf.split(",").map(Number);
    if (row<minRow) {minRow = row}
    if (col<minCol) {minCol = col}
    if (row>maxRow) {maxRow = row}
    if (col>maxCol) {maxCol = col}
}

console.log(minRow,maxRow,minCol,maxCol,gen0.size);
let answer = (maxRow-minRow+1)*(maxCol-minCol+1)-gen0.size;


output(answer).forTest(110);
