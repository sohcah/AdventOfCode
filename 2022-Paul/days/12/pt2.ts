import {output, loadLines} from "aocutils";

const input = loadLines().map(i=>i.split("").map(i=>i.charCodeAt(0)-96));

console.log(input);
let movesGrid = [];
let answer = 10000;
let changed = true;

for (let i=0;i<input.length;i++) {
    movesGrid.push([]);
    for (let j=0;j<input[0].length;j++) {
        movesGrid[i].push(10000);
    }
    if (input[i].includes(-13)) {
        let n = input[i].indexOf(-13);
        input[i][n] = 1;
    }
    if (input[i].includes(-27)) {
        let n = input[i].indexOf(-27);
        input[i][n] = 26;
        movesGrid[i][n] = 0;
    }
}

while (changed === true) {
    changed = false;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (i > 0) {
                if (input[i][j] >= input[i-1][j] - 1 && movesGrid[i-1][j] + 1< movesGrid[i][j]) {
                    movesGrid[i][j] = movesGrid[i - 1][j] + 1;
                    changed = true;
                }
            }
            if (i < input.length - 1) {
                if (input[i][j] >= input[i + 1][j] - 1 && movesGrid[i + 1][j] + 1< movesGrid[i][j]) {
                    movesGrid[i][j] = movesGrid[i + 1][j] + 1;
                    changed = true;
                }
            }
            if (j > 0) {
                if (input[i][j] >= input[i][j - 1] - 1 && movesGrid[i][j - 1] + 1 < movesGrid[i][j]) {
                    movesGrid[i][j] = movesGrid[i][j - 1] + 1;
                    changed = true;
                }
            }
            if (j < input[0].length - 1) {
                if (input[i][j] >= input[i][j + 1] - 1 && movesGrid[i][j + 1] + 1 < movesGrid[i][j]) {
                    movesGrid[i][j] = movesGrid[i][j + 1] + 1;
                    changed = true;
                }
            }
            if (input[i][j] === 1 && movesGrid[i][j] < 10000) {
                if (movesGrid[i][j] < answer) {
                    answer = movesGrid[i][j];
                }
            }
        }
    }

   //console.log(movesGrid);

}




output(answer).forTest(29);
