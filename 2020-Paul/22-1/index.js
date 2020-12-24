const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n");

NoOfCards = input.length -3;
let p1 = [];
let p2 = [];
let i = 1;
while (input[i]!="") {
    p1.push(parseInt(input[i]));
    i++;
}
for (let j = i+2; j < input.length; j++) {
    p2.push(parseInt(input[j]));
}

let FirstCard = 0;

while (p1.length - FirstCard < NoOfCards && p2.length - FirstCard < NoOfCards) {
    if (p1[FirstCard] > p2[FirstCard]) {
        p1.push(p1[FirstCard]);
        p1.push(p2[FirstCard]);
    }
    else {
        p2.push(p2[FirstCard]);
        p2.push(p1[FirstCard]);
    }
    FirstCard++
}
let Score = 0;
if (p1.length - FirstCard == NoOfCards) {
    for (i = 0;i<NoOfCards;i++) {
        Score += (NoOfCards-i)*p1[FirstCard+i];
    }
}
else {
    for (i = 0;i<NoOfCards;i++) {
        Score += (NoOfCards-i)*p2[FirstCard+i];
    }
}


console.log(NoOfCards,Score);