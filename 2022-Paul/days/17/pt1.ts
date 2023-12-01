import {output, loadTrimmed} from "aocutils";

const input = loadTrimmed();

const rocks = [[[0, 0], [1, 0], [2, 0], [3, 0]],
    [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]],
    [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]],
    [[0, 0], [0, 1], [0, 2], [0, 3]],
    [[0, 0], [1, 0], [0, 1], [1, 1]]];


const grid = [[2, 1, 1, 1, 1, 1, 1, 1, 2],
    [3, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 3]];

let height = 4;
let left = 3;
let jetIndex = 0;
let rockIndex = 0;
let rocksFallen = 0;
let top = 0;
let inc;
let fine;

while (rocksFallen < 2022) {
    if (input[jetIndex] === ">") {
        inc = 1;
    } else {
        inc = -1;
    }
    fine = true;
    for (const rockVector of rocks[rockIndex]) {
        if (grid[height + rockVector[1]][left + rockVector[0] + inc] !== 0) {
            fine = false;
            break
        }
    }
    if (fine) {
        left += inc;
    }
    jetIndex = (jetIndex + 1) % input.length;

    fine = true;
    for (const rockVector of rocks[rockIndex]) {
        if (grid[height + rockVector[1] - 1][left + rockVector[0]] !== 0) {
            fine = false;
            break
        }
    }
    if (fine) {
        height--;
    } else {
        for (const rockVector of rocks[rockIndex]) {
            grid[height + rockVector[1]][left + rockVector[0]] = 4;
            top = Math.max(top, height + rockVector[1]);
        }
        rockIndex = (rockIndex + 1) % 5;
        left = 3;
        height = top + 4;
        rocksFallen++;
        // for (let j = top; j >= 0; j--) {
        //     let row = "";
        //     for (let k = 0; k < 9; k++) {
        //         if (grid[j][k] === Type.Empty) {
        //             row += "."
        //         }
        //         if (grid[j][k] === Type.Horizontal) {
        //             row += "-"
        //         }
        //         if (grid[j][k] === Type.Corner) {
        //             row += "+"
        //         }
        //         if (grid[j][k] === Type.Vertical) {
        //             row += "|"
        //         }
        //         if (grid[j][k] === Type.Rock) {
        //             row += "#"
        //         }
        //     }
        //     console.log(row);
        // }
        // console.log();
        while (top + 9 > grid.length) {
            grid.push([3, 0, 0, 0, 0, 0, 0, 0, 3]);

        }
        //console.log(grid);
    }
}


const answer = top;

output(answer).forTest(3068);
