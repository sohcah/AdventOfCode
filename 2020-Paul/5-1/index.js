const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\n").map (i => parseInt(i.replace(/[BR]/g,"1").replace(/[FL]/g,"0"),2));



console.log(Math.max(...input));