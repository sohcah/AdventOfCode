import {output, loadLines} from "aocutils";

const input = loadLines();

const visited = new Set<number>();

visited.add(0);

let Hx = 0;
let Hy = 0;
let Tx = 0;
let Ty = 0;

for (let line of input) {

    if (line[0]==="L") {
        for (let i=0;i<Number(line.slice(2));i++) {
            Hx--;
            if (Tx-2===Hx) {
                Tx = Hx+1;
                Ty = Hy;
                visited.add(Tx*100000+Ty);
            }
        }
    }

    if (line[0]==="R") {
        for (let i=0;i<Number(line.slice(2));i++) {
            Hx++;
            if (Tx+2===Hx) {
                Tx = Hx-1;
                Ty = Hy;
                visited.add(Tx*100000+Ty);
            }
        }
    }

    if (line[0]==="D") {
        for (let i=0;i<Number(line.slice(2));i++) {
            Hy--;
            if (Ty-2===Hy) {
                Ty = Hy+1;
                Tx = Hx;
                visited.add(Tx*100000+Ty);
            }
        }
    }

    if (line[0]==="U") {
        for (let i=0;i<Number(line.slice(2));i++) {
            Hy++;
            if (Ty+2===Hy) {
                Ty = Hy-1;
                Tx = Hx;
                visited.add(Tx*100000+Ty);
            }
        }
    }


}

console.log(visited);

output(visited.size).forTest(13);

// import {output, loadLines} from "aocutils";
//
// const input = loadLines();
//
// const visited = new Set<number>();
//
// visited.add(0);
//
// let x = [0,0,0,0,0,0,0,0,0,0];
// let y = [0,0,0,0,0,0,0,0,0,0];
//
//
// for (let line of input) {
//
//     if (line[0]==="L") {
//         for (let i=0;i<Number(line.slice(2));i++) {
//             x[0]--;
//             if (x[1]-2===x[0]) {
//                 x[1] = x[0]+1;
//                 y[1] = y[0];
//                 visited.add(x[1]*100000+y[1]);
//             }
//         }
//     }
//
//     if (line[0]==="R") {
//         for (let i=0;i<Number(line.slice(2));i++) {
//             x[0]++;
//             if (x[1]+2===x[0]) {
//                 x[1] = x[0]-1;
//                 y[1] = y[0];
//                 visited.add(x[1]*100000+y[1]);
//             }
//         }
//     }
//
//     if (line[0]==="D") {
//         for (let i=0;i<Number(line.slice(2));i++) {
//             y[0]--;
//             if (y[1]-2===y[0]) {
//                 y[1] = y[0]+1;
//                 x[1] = x[0];
//                 visited.add(x[1]*100000+y[1]);
//             }
//         }
//     }
//
//     if (line[0]==="U") {
//         for (let i=0;i<Number(line.slice(2));i++) {
//             y[0]++;
//             if (y[1]+2===y[0]) {
//                 y[1] = y[0]-1;
//                 x[1] = x[0];
//                 visited.add(x[1]*100000+y[1]);
//             }
//         }
//     }
//
//
// }
//
// console.log(visited);
//
// output(visited.size).forTest(13);
