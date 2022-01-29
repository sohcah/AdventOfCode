
import fs  from "fs";


export function Part1() {

  const input = fs.readFileSync("./inputs/25.txt","utf8").trim().split("\n");
  let height = input.length;
  let width = input[0].length;
  let move = true;
  let moves = 0;
  let lastMap = JSON.parse(JSON.stringify(input));
  let map = new Array(height).fill(new Array(width).fill("."))
  while (move == true) {
    map = JSON.parse(JSON.stringify(new Array(height).fill(new Array(width).fill("."))));
    move = false;
    moves++;
    for (let i = 0;i<height;i++) {
      for (let j=0;j<width;j++) {
        if (lastMap[i][j] == ">") {
          if (lastMap[i][(j+1) % width] ==".") {
            map[i][(j+1) % width] = ">";
            move = true;
          } else {
            map[i][j] = ">";
          }
        }  
        if (lastMap[i][j] == "v") {map[i][j] = "v"};
      }
    }

    lastMap = JSON.parse(JSON.stringify(map));
    map = JSON.parse(JSON.stringify(new Array(height).fill(new Array(width).fill("."))));
    

    for (let i = 0;i<height;i++) {
      for (let j=0;j<width;j++) {
        if (lastMap[i][j] == "v") {
          if (lastMap[(i+1) % height][j] ==".") {
            map[(i+1) % height][j] = "v";
            move = true;
          } else {
            map[i][j] = "v";
          }
        }  
        
        if (lastMap[i][j] == ">") {map[i][j] = ">"};
      }
    }

    lastMap = JSON.parse(JSON.stringify(map));
    
  }
  
  console.log(moves);
  
 
}

