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

const repeatCheck = [];
let height = 4;
let left = 3;
let jetIndex = 0;
let rockIndex = 0;
let rocksFallen = 0;
let top = 0;
let lastTop = 0;
let inc;
let fine;
let foundRepeat = false;
const target = 1000000000000;
let extraHeight;

while (rocksFallen < target) {
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
        if (rockIndex === 0 && foundRepeat === false) {
            const latest = top-lastTop + jetIndex*100;
            const lastTime= repeatCheck.indexOf(latest)+1;
            repeatCheck.unshift(latest);
            let repeat = true;
            let heightChange = 0;
            if (lastTime === 0) {
                repeat = false
            } else {
                for (let i = 0; i < lastTime; i++) {
                    heightChange += repeatCheck[i] % 100;
                    if (repeatCheck[i] !== repeatCheck[lastTime + i]) {
                        repeat = false;
                        break
                    }
                }
            }
            if (repeat) {
                foundRepeat = true;
                console.log("REPEAT FOUND!")
                const reps = Math.floor((target - rocksFallen) / (lastTime * 5));
                extraHeight = reps * heightChange;
                rocksFallen += reps * (lastTime * 5);
            }
            lastTop = top;

        }

        while (top + 9 > grid.length) {
            grid.push([3, 0, 0, 0, 0, 0, 0, 0, 3]);
        }
    }

}


const answer = top + extraHeight;

output(answer).forTest(1514285714288);
