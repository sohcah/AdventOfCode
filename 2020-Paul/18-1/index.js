const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf8")
  .replace(/ /g, "")
  .split("\n");

//console.log(input);

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

function eval(str) {
  let ans = 0;
  let i = 0;
  let endofpar = 0;
  if (str[0] == "(") {
    endofpar = 1+findclose(str.slice(1));
    ans = eval(str.slice(1, endofpar));
    i = endofpar + 1;
  } else {
    ans = Number(str[0]);
    i = 1;
  }
  //console.log(ans);

  while (i < str.length) {
    if (str[i + 1] == "(") {
      endofpar = i+2+findclose(str.slice(i + 2));
      if (str[i] == "+") {
        ans += eval(str.slice(i + 2, endofpar));
      } else {
        ans *= eval(str.slice(i + 2, endofpar));
      }
      i = endofpar + 1;
    } else {
      if (str[i] == "+") {
        ans += Number(str[i + 1]);
      } else {
        ans *= Number(str[i + 1]);
      }
      i += 2;
    }

    //console.log(ans);
  }
  return ans;
}

let sum = 0;
for (let i=0;i<input.length;i++) {
  sum += eval(input[i]);
}

console.log(sum);
