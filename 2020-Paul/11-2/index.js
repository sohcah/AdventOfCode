const fs = require("fs");


let input = fs.readFileSync("input.txt", "utf8").split("\n").map(i => ("X" + i + "X").split(""));




let height = input.length;
let width = input[0].length - 2;

let buffer = [];
for (i=0;i<width+2;i++) {buffer.push("X");
}
input.push(buffer);
input.unshift(buffer);


let prev = input.slice().map(i=>i.slice());
let next = prev.slice().map(i=>i.slice());
let occ = 0;
let mult;


let change = true;
while (change == true) {
    change = false;
    for (let d = 1; d < height+1; d++) {
        for (let a = 1; a < width+1; a++) {
            if (prev[d][a] == ".") {
                next[d][a] = ".";
            }
            else {
                occ = 0;
                for (let x = -1; x < 2; x++) {
                    for (let y = -1; y < 2; y++) {
                        if (x != 0 || y != 0) {
                            mult = 1;
                            while (prev[d+x*mult][a+y*mult] == ".") {mult++};
                            if (prev[d+x*mult][a+y*mult] == "#") {occ++};
                        }

                    }
                }

                if (prev[d][a] == "L") {
                    if (occ == 0) {
                        next[d][a] = "#";
                        change = true;
                    }
                    else {
                        //console.log(d,a,"stay L");
                        next[d][a] = "L";
                    }
                };
                if (prev[d][a] == "#") {
                    if (occ < 5) {
                        next[d][a] = "#";
                    }
                    else {
                        //console.log(d,a,"change L");
                        next[d][a] = "L";
                        change = true;
                    }
                };


            }



        }

    }
    //console.log(next.map(i => i.join("")));
    prev = next.slice().map(i=>i.slice());
}


console.log(next.map(i => i.join("")).join("").split(".").join("").split("X").join("").split("L").join("").length);