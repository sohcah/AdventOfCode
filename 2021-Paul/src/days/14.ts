
import fs  from "fs";

export function Part1() {

  const lines = fs.readFileSync("./inputs/14.txt","utf8").trim().split("\n\n").map(i=>i.split("\n").map(j=>j.split(" -> ")));
  
  let before = [];
  let after = [];

  for (let i = 0;i<lines[1].length;i++) {
    before.push(lines[1][i][0]);
    after.push(lines[1][i][0][0]+lines[1][i][1]);
  }

  let prev = lines[0][0][0];
  let next = "";
  for (let loop = 0;loop<10;loop++) {

    for (let i = 0;i<prev.length-1;i++) {
      next+=after[before.indexOf(prev.slice(i,i+2))];
    }
    next+=prev[prev.length-1];
    prev=next.slice();
    next=""
  }
  
  let tally = [];
  for (let i = 65;i<91;i++) {
    let letter = String.fromCharCode(i);
    if (prev.includes(letter)) {
      tally.push((prev.match(new RegExp(letter, "g")) || []).length);
    }
  }
  console.log(tally,Math.max(...tally) - Math.min(...tally));
}

let before: string[]= [];
let after: string[] = [];
let prev: string = "";
let tally: number[] = [];

function insert (s: string,depth : number) {
  let midLetter = after[before.indexOf(s)];
  //console.log(midLetter);
  tally[midLetter.charCodeAt(0)-65]++;
  if (depth<26) {
    insert(s[0]+midLetter,depth+1);
    insert(midLetter+s[1],depth+1);
    
  }

};

export function Part2() {
  
  const lines = fs.readFileSync("./inputs/14.txt","utf8").trim().split("\n\n").map(i=>i.split("\n").map(j=>j.split(" -> ")));

  for (let i = 0;i<lines[1].length;i++) {
    before.push(lines[1][i][0]);
    after.push(lines[1][i][1]);
  }

  tally = [];
  prev = lines[0][0][0];
  for (let i = 65;i<91;i++) {
    let letter = String.fromCharCode(i);
   
    tally.push((prev.match(new RegExp(letter, "g")) || []).length);
    
  }


  for (let i = 0;i<prev.length-1;i++) {
    insert(prev.substring(i,i+2),1);
  }
  console.log(tally);
}