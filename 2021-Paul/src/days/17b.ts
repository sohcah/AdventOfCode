
import fs  from "fs";

export function Part2() {

  const input = fs.readFileSync("./inputs/17.txt","utf8").match(/\d+/g)!;
  let xMin = Number(input[0]);
  let xMax = Number(input[1]);
  let yMin = - Number(input[2]);
  let yMax = - Number(input[3]);

  let xVMin = Math.sqrt(xMin*2+0.25)-0.5;
  
  let total = 0;
  
  
  for (let yVOrig = -yMin;yVOrig>=yMin;yVOrig--) {
    for (let xVOrig = xMax;xVOrig>xVMin;xVOrig--) {
      let x=0;
      let y=0;
      let xV = xVOrig;
      let yV = yVOrig;
      loop:
      while (x<=xMax && y>=yMin) {
        x+=xV;
        if (xV>0) {
          xV--;
        }
        y+=yV;
        yV--;
        if (x>=xMin && x<=xMax && y<=yMax && y>=yMin) {
          total++;
          console.log(xVOrig,yVOrig);
          break loop;
        }
      }
    }
  }
  
  console.log(total);
}

export function Part1() {

  const input = fs.readFileSync("./inputs/17.txt","utf8").match(/\d+/g)!;
  let xMin = Number(input[0]);
  let xMax = Number(input[1]);
  let yMin = - Number(input[2]);
  let yMax = - Number(input[3]);

  let xVMin = Math.sqrt(xMin*2+0.25)-0.5;
  
  loop:
  for (let yVOrig = -yMin;yVOrig>=yMin;yVOrig--) {
    for (let xVOrig = xMax;xVOrig>xVMin;xVOrig--) {
      let x=0;
      let y=0;
      let xV = xVOrig;
      let yV = yVOrig;
      while (x<=xMax && y>=yMin) {
        x+=xV;
        if (xV>0) {
          xV--;
        }
        y+=yV;
        yV--;
        if (x>=xMin && x<=xMax && y<=yMax && y>=yMin) {
          console.log(xVOrig,yVOrig);
          console.log((yVOrig*yVOrig+yVOrig)/2);
          break loop;
        }
      }
    }
  }
  
  
}
