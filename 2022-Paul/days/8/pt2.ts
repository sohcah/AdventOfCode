import {output, loadLines} from "aocutils";

const input = loadLines().map(i=>i.split("").map(i=>Number(i)));

let width = input[0].length;

let maxScore = 0;

for (let a = 1;a<width-1;a++) {
    for (let b = 1;b<width-1;b++) {
        let score = 1;
        let max = input[a][b];
        let count = 1;
        while (a+count<width) {
            if (input[a+count][b]>=max){
                count++;
                break;
            }
            count++;
        }
        score *=count-1;

        count = 1;
        while (a-count>=0) {
            if (input[a-count][b]>=max){
                count++;
                break;
            }
            count++;
        }
        score *=count-1;

        count = 1;
        while (b+count<width) {
            if (input[a][b+count]>=max){
                count++;
                break;
            }
            count++;
        }
        score *=count-1;

        count = 1;
        while (b-count>=0) {
            if (input[a][b-count]>=max){
                count++;
                break;
            }
            count++;
        }
        score *=count-1;

    if (score>maxScore) {
        maxScore = score;
    }

        console.log(score);
        console.log();
    }
}


output(maxScore).forTest(8);
