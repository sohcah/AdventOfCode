import {output, loadLines} from "aocutils";

const input = loadLines().map(i=>i.split("").map(i=>i.charCodeAt(0)-96));

console.log(input);
let movesGrid = [];
let end;
let answer;
let done = false;

for (let i=0;i<input.length;i++) {
    movesGrid.push([]);
    for (let j=0;j<input[0].length;j++) {
        movesGrid[i].push(10000);
    }
    if (input[i].includes(-13)) {
        let n = input[i].indexOf(-13);
        input[i][n] = 1;
        movesGrid[i][n] = 0;
    }
    if (input[i].includes(-27)) {
        let n = input[i].indexOf(-27);
        input[i][n] = 26;
        end = [i,n];
    }
}

while (done === false) {
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (i > 0) {
                if (input[i - 1][j] >= input[i][j] - 1 && movesGrid[i - 1][j] < movesGrid[i][j]) {
                    movesGrid[i][j] = movesGrid[i - 1][j] + 1;
                }
            }
            if (i < input.length - 1) {
                if (input[i + 1][j] >= input[i][j] - 1 && movesGrid[i + 1][j] < movesGrid[i][j]) {
                    movesGrid[i][j] = movesGrid[i + 1][j] + 1;
                }
            }
            if (j > 0) {
                if (input[i][j - 1] >= input[i][j] - 1 && movesGrid[i][j - 1] < movesGrid[i][j]) {
                    movesGrid[i][j] = movesGrid[i][j - 1] + 1;
                }
            }
            if (j < input[0].length - 1) {
                if (input[i][j + 1] >= input[i][j] - 1 && movesGrid[i][j + 1] < movesGrid[i][j]) {
                    movesGrid[i][j] = movesGrid[i][j + 1] + 1;
                }
            }
            if (i === end[0] && j === end[1] && movesGrid[i][j] < 10000) {
                answer = movesGrid[i][j];
                done = true;
                break;
            }
        }
        if (done === true) {
            break;
        }
    }
}

console.log(movesGrid);


output(answer).forTest(31);
