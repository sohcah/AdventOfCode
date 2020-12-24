const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n").map(i => i.split(""));

let height = input.length;
let width = input[0].length;

let prev = input.slice().map(i=>i.slice());

let next = prev.slice().map(i=>i.slice());
let occ = 0;

let change = true;
while (change == true) {
    change = false;
    for (let d = 0; d < height; d++) {
        for (let a = 0; a < width; a++) {
            if (prev[d][a] == ".") {
                next[d][a] = ".";
            }
            else {
                occ = 0;
                for (let x = Math.max(d - 1,0); x < Math.min(d + 2,height); x++) {
                    for (let y = Math.max(a - 1,0); y < Math.min(a + 2,width); y++) {
                        if (prev[x][y] == "#") { occ++ };

                    }
                }
                if (prev[d][a] == "L") {
                    if (occ == 0) {
                        next[d][a] = "#";
                        change = true;
                    }
                    else {
                        next[d][a] = "L";
                    }
                };
                if (prev[d][a] == "#") {
                    if (occ < 5) {
                        next[d][a] = "#";
                    }
                    else {
                        next[d][a] = "L";
                        change = true;
                    }
                };


            }



        }

    }
    
    prev = next.slice().map(i=>i.slice());
}


console.log(next.map(i => i.join("")).join("").split(".").join("").split("L").join("").length);