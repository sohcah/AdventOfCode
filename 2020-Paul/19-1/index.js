const fs = require("fs");


let input = fs.readFileSync("input.txt", "utf8").replace(/\"/g,"");

let rules = input.match(/([0-9]+): ([ab]+)(?: | ([ab]+))*/g).map(i=> i.split(": "));

for (r of rules) {
    input = input.replace(RegExp(r[0],"g"),r[1]);
}

console.log(rules,input);

rules = input.match(/([0-9]+): ([ab]+)(?: | ([ab]+))*/g).map(i=> i.split(": "));

for (r of rules) {
    input = input.replace(RegExp(r[0],"g"),r[1]);
}

console.log(rules,input);