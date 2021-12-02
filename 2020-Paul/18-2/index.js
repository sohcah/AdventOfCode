const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf8")
  .replace(/ /g, "")
  .split("\n");

function findclose(str) {
  let open = 1;
  let i = 0;
  while (open > 0) {
    if (str[i] == "(") {
      open++;
    }
    if (str[i] == ")") {
      open--;
    }
    i++;
  }
  //console.log("here: ",i-1);
  return i-1;
}

function eval(s) {
  while (s.includes("(")) {
    s = s.replace(/\([^\(\)]+\)/g,x=>eval(x.slice(1,-1)));
    //console.log(s);
  }
  while (s.includes("+")) {
    s = s.replace(/([0-9]+)\+([0-9]+)/g,(x,a,b)=>Number(a)+Number(b));
    //console.log(s);
  }
  while (s.includes("*")) {
    s = s.replace(/([0-9]+)\*([0-9]+)/g,(x,a,b)=>Number(a)*Number(b));
    //console.log(s);
  }
  return Number(s);
}



let sum = 0;
let s = "";
for (let i=0;i<input.length;i++) {
  sum += eval(input[i]);
}

console.log(sum);
