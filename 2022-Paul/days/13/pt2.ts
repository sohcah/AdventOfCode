import {loadLines, output} from "aocutils";

const input = loadLines().map(i=>JSON.parse(i));

console.log(input);
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

const div2 = [[2]];
const div6 = [[6]];
input.push(div2,div6);

input.sort((a,b) => {
    const order = rightOrder(a,b);
    if (order === "right") {
        return -1;
    }
    if (order === "wrong") {
        return 1;
    }
    if (order === "continue") {
        console.log("Continue!!!");
        return 0;
    }
})

let answer = (input.indexOf(div2)+1) * (input.indexOf(div6)+1);



output(answer).forTest(140);
