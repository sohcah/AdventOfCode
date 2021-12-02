const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\n");

let valid = new Int8Array(1000);

let info = [];
let tickets = [];
let i = 0;
let ans = 0;
while (input[i] != "") {
  info[i] = input[i]
    .replace(" or ", "-")
    .replace(": ", "-")
    .split("-")
    .map((val, ind) => (ind == 0 ? val : Number(val)));

  i++;
}
i += 1;
while (input[i] != "") {
  i++;
}
let myticket = input[i - 1].split(",").map((i) => Number(i));
for (i = i + 2; i < input.length; i++) {
  tickets.push(input[i].split(",").map((i) => Number(i)));
}
for (rule of info) {
  for (let j = rule[1]; j <= rule[2]; j++) {
    valid[j] = 1;
  }
  for (let j = rule[3]; j <= rule[4]; j++) {
    valid[j] = 1;
  }
}
let val = true;
let vtickets = [];
for (t of tickets) {
  val = true;
  for (i of t) {
    if (valid[i] == 0) {
      val = false;
    }
  }
  if (val == true) {
    vtickets.push(t);
  }
}
console.log(vtickets, info);
let field = [];
for (let n = 0; n < vtickets[0].length; n++) {
  val = false;
  let r = 0;
  while (val == false) {
    val = true;
    for (let m = 0; m < vtickets.length; m++) {
      if (
        !(
          (vtickets[m][n] >= info[r][1] && vtickets[m][n] <= info[r][2]) ||
          (vtickets[m][n] >= info[r][3] && vtickets[m][n] <= info[r][4])
        )
      ) {
        val = false;
        console.log('F');
      }
      
      console.log(m, n, r, vtickets[m][n]);
    }
    r++;
  }
  field.push(r);
}

console.log(myticket, vtickets, field);
