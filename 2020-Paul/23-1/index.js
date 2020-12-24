const fs = require("fs");


let input = fs.readFileSync("input.txt", "utf8").split("").map(i=>parseInt(i,10));

console.log(input);
let max = 9;
let triple = [];
let movetoend = 0;
let insertat = 0;
let trypos = 0;
for (i = 0; i < 1; i++) {
    triple = input.slice(1, 4);
    console.log(triple);
    trypos = input[0];
    movetoend = input[0];
    input = input.slice(4);
    while (!input.includes(trypos)) {
        trypos--;
        if (trypos == 0) { trypos = max };
    }
    insertat = input.indexOf(trypos) + 1;
    input = input.slice(0, insertat) + triple + input.slice(insertat) + movetoend;
}
console.log(input.slice(input.indexOf(1) +1) + input.slice(0,input.indexOf(1)));

// let move = "";
// let movetoend = "";
// let insertat = 0;
// for (i = 0; i < 100; i++) {
//     move = input.slice(1, 4);
//     trypos = parseInt(input[0], 10);
//     movetoend = input[0];
//     input = input.slice(4);
//     while (!input.includes(trypos.toString(10))) {
//         trypos--;
//         if (trypos == 0) { trypos = 9 };
//     }
//     insertat = input.indexOf(trypos.toString(10)) + 1;
//     input = input.slice(0, insertat) + move + input.slice(insertat) + movetoend;
// }
// console.log(input.slice(input.indexOf("1") +1) + input.slice(0,input.indexOf("1")));