import {output, loadInput} from "aocutils";

let input = loadInput().split("\n\n").map(i=>i.split("\n"));

let side = Math.sqrt(input[0].join("").replace(/ /g,"").length/6);

let x = input[0][0].indexOf(".");
let y = 0;
let dir = 0;
let dirs = [[1,0],[0,1],[-1,0],[0,-1]];

const program = input [1][0].match(/\d+|L|R/g);



for (let i=0;i<program.length;i++) {
    if (program[i] === "L" || program[i] === "R") {
        if (program[i] === "L") {
            dir = (dir + 3) % 4
        } else {
            dir = (dir + 1) % 4
        }
    } else {
        let move = Number(program[i]);
        // console.log(move);
        for (let j=0;j<move;j++) {
            let next = input[0][y+dirs[dir][1]]?.[x+dirs[dir][0]];
            // console.log(next);
            if (next === ".") {
                y += dirs[dir][1];
                x += dirs[dir][0];
            } else if (next !=="#") {
                if (dir === 0) {
                    let newx = 0;
                    while (input[0][y][newx] === " ") {newx++}
                    if (input[0][y][newx] === ".") {
                        x = newx;
                    }
                }
                if (dir === 2) {
                    let newx = input[0][y].length - 1;
                    if (input[0][y][newx] === ".") {
                        x = newx;
                    }
                }
                if (dir === 1) {
                    let newy = 0;
                    while (input[0][newy][x] === " ") {newy++}
                    if (input[0][newy][x] === ".") {
                        y = newy;
                    }
                }
                if (dir === 3) {
                    let newy = input[0].length - 1;
                    while ((input[0][newy][x] || " ") === " ") {newy--}
                    if (input[0][newy][x] === ".") {
                        y = newy;
                    }
                }
            }
        }
        // console.log(x,y);
    }
}

let answer = 1000 *(y+1) + 4 * (x+1) + dir;

output(answer).forTest(5031);
