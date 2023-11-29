import {output, loadLines} from "aocutils";

const input = loadLines();

const visited = new Set<number>();

visited.add(0);

let x = [0,0,0,0,0,0,0,0,0,0];
let y = [0,0,0,0,0,0,0,0,0,0];


for (let line of input) {


        for (let i=0;i<Number(line.slice(2));i++) {
            if (line[0]==="L") {
                x[0]--;
            }
            if (line[0]==="R") {
                x[0]++;
            }

            if (line[0]==="D") {
                y[0]--;
            }

            if (line[0]==="U") {
                y[0]++;
            }
            for (let j=0;j<9;j++) {
                if (x[j+1]===x[j]+2 && y[j+1]===y[j]) {
                    x[j+1] = x[j]+1
                }
                if (x[j+1]===x[j]-2 && y[j+1]===y[j]) {
                    x[j+1] = x[j]-1
                }
                if (y[j+1]===y[j]+2 && x[j+1]===x[j]) {
                    y[j+1] = y[j]+1
                }
                if (y[j+1]===y[j]-2 && x[j+1]===x[j]) {
                    y[j+1] = y[j]-1
                }

                if (x[j+1]===x[j]+2 && y[j+1]===y[j]+1) {
                    x[j+1] = x[j]+1
                    y[j+1] = y[j]
                }
                if (x[j+1]===x[j]+2 && y[j+1]===y[j]-1) {
                    x[j+1] = x[j]+1
                    y[j+1] = y[j]
                }
                if (x[j+1]===x[j]-2 && y[j+1]===y[j]+1) {
                    x[j+1] = x[j]-1
                    y[j+1] = y[j]
                }
                if (x[j+1]===x[j]-2 && y[j+1]===y[j]-1) {
                    x[j+1] = x[j]-1
                    y[j+1] = y[j]
                }
                if (y[j+1]===y[j]+2 && x[j+1]===x[j]+1) {
                    y[j+1] = y[j]+1
                    x[j+1] = x[j]
                }
                if (y[j+1]===y[j]+2 && x[j+1]===x[j]-1) {
                    y[j+1] = y[j]+1
                    x[j+1] = x[j]
                }
                if (y[j+1]===y[j]-2 && x[j+1]===x[j]+1) {
                    y[j+1] = y[j]-1
                    x[j+1] = x[j]
                }
                if (y[j+1]===y[j]-2 && x[j+1]===x[j]-1) {
                    y[j+1] = y[j]-1
                    x[j+1] = x[j]
                }

                if (x[j+1]===x[j]+2 && y[j+1]===y[j]+2) {
                    x[j+1] = x[j]+1
                    y[j+1] = y[j]+1
                }
                if (x[j+1]===x[j]+2 && y[j+1]===y[j]-2) {
                    x[j+1] = x[j]+1
                    y[j+1] = y[j]-1
                }if (x[j+1]===x[j]-2 && y[j+1]===y[j]-2) {
                    x[j+1] = x[j]-1
                    y[j+1] = y[j]-1
                }if (x[j+1]===x[j]-2 && y[j+1]===y[j]+2) {
                    x[j+1] = x[j]-1
                    y[j+1] = y[j]+1
                }
            }
            //console.log(x[9] * 100000 + y[9]);
            visited.add(x[9] * 100000 + y[9]);
        }





}

//console.log(visited);

output(visited.size).forTest(36);
