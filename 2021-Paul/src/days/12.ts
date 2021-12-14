
import fs  from "fs";

let visited = ["start"];
let locations: string[] = [];
let leadsTo: string[][] = [];
let count = 0;
let twice = false;



function path() {
  if (visited[0]=="end") {
    //console.log(visited.slice().reverse().join(","));
    count++;
  }
  else {
    let i = locations.indexOf(visited[0]);
    for (let j=0;j<leadsTo[i].length;j++) {
      if (!visited.includes(leadsTo[i][j]) || leadsTo[i][j].charCodeAt(0) < 97) {
        visited.unshift(leadsTo[i][j]);
        path();
        visited.shift();
      } else {
        if (!twice && leadsTo[i][j]!="start") {
          twice = true;
          visited.unshift(leadsTo[i][j]);
          path();
          visited.shift();
          twice = false;
        }
      }
    }
  }
}

export function Part1() {

  const lines = fs.readFileSync("./inputs/12.txt","utf8").trim().split("\n").map(i=>i.split("-"));

  for (let i = 0;i<lines.length;i++) {
    if (!locations.includes(lines[i][0])) {
      locations.push(lines[i][0]);
      leadsTo.push([lines[i][1]]);
    }
    else {
      leadsTo[locations.indexOf(lines[i][0])].push(lines[i][1]);
    }

    if (!locations.includes(lines[i][1])) {
      locations.push(lines[i][1]);
      leadsTo.push([lines[i][0]]);
    }
    else {
      leadsTo[locations.indexOf(lines[i][1])].push(lines[i][0]);
    }
  }
  twice = true;
  path();
  
  console.log(count);

}

export function Part2() {

  const lines = fs.readFileSync("./inputs/12.txt","utf8").trim().split("\n").map(i=>i.split("-"));

  for (let i = 0;i<lines.length;i++) {
    if (!locations.includes(lines[i][0])) {
      locations.push(lines[i][0]);
      leadsTo.push([lines[i][1]]);
    }
    else {
      leadsTo[locations.indexOf(lines[i][0])].push(lines[i][1]);
    }

    if (!locations.includes(lines[i][1])) {
      locations.push(lines[i][1]);
      leadsTo.push([lines[i][0]]);
    }
    else {
      leadsTo[locations.indexOf(lines[i][1])].push(lines[i][0]);
    }
  }

  path();
  
  console.log(count);

}