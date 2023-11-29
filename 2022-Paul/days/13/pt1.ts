import {loadTrimmed, output} from "aocutils";

const input = loadTrimmed().split("\n\n").map(i=>i.split("\n").map(i=>JSON.parse(i)));

function rightOrder(a,b) {
    if (Array.isArray(a) && Array.isArray(b)) {

        for (let i=0;i<Math.min(a.length,b.length);i++) {
            let check = rightOrder(a[i], b[i]);
            if (check === "wrong") {
                return "wrong"
            } else {
                if (check === "right") {
                    return "right"
                }
            }
        }
        if (b.length<a.length) {
            return "wrong"
        }
        if (b.length>a.length) {
            return "right"
        }
        return "continue"

    } else {
        if (!Array.isArray(a) && !Array.isArray(b)) {
            if (a<b) {
                return "right"
            }
            if (a>b) {
                return "wrong"
            }
            return "continue"


        } else {
            if (Array.isArray(a) && !Array.isArray(b)) {
                return rightOrder(a, [b])
            } else {
                return rightOrder([a], b)
            }
        }
    }
}


let answer = 0;

for (let i=0;i<input.length;i++) {
    console.log(i+1, rightOrder(input[i][0],input[i][1]));
    if (rightOrder(input[i][0],input[i][1])==="right") {
        answer+=i+1;
    }
}



output(answer).forTest(13);
