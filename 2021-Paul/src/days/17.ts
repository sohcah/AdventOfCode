
import fs  from "fs";

export function Part1() {

  const input = fs.readFileSync("./inputs/17.txt","utf8").match(/\d+/g)!;
  let xMin = Number(input[0]);
  let xMax = Number(input[1]);
  let yMin = - Number(input[2]);
  let yMax = - Number(input[3]);

  let xVMin = Math.sqrt(xMin*2+0.25)-0.5;
  let x=0;
  let y=0;
  let step = 0;
  let xInAtStep = new Array(1001).fill([]);
  
  for (let xVOrig = xMax;xVOrig>xVMin;xVOrig--) {
    x = 0;
    step = 0;
    let xV = xVOrig;
    while (x<=xMax && step<1000) {
      x+=xV;
      if (xV>0) {xV--};
      step++;
      if (x>=xMin && x<=xMax) {xInAtStep[step].push(xVOrig)}
    }
  }
  let hit = false;
  let yVOrig = -yMin;
  console.log(yVOrig);
  while (!hit) {
    y = 0;
    step = yVOrig*2+1;
    let yV = -yVOrig;
    while (y>=yMin && step<1000) {
      y+=yV;
      yV--;
      step++;
      if (y>=yMin && y<=yMax) {
        if (xInAtStep[step].length>0) {
          console.log(step,xInAtStep[step]);
          hit = true;
        }
      }
    }
    yVOrig--;
  }
  yVOrig++;

  console.log((yVOrig*yVOrig-yVOrig)/2);
  
  console.log(xMin,xMax,yMin,yMax);
}

export function Part2() {

  const input = fs.readFileSync("./inputs/17.txt","utf8").match(/\d+/g)!;
  let xMin = Number(input[0]);
  let xMax = Number(input[1]);
  let yMin = - Number(input[2]);
  let yMax = - Number(input[3]);
  let velocities = new Set();

  let xVMin = Math.sqrt(xMin*2+0.25)-0.5;
  let x=0;
  let y=0;
  let step = 0;
  let xInAtStep = new Array(101).fill([]);
  
  for (let xVOrig = xMax;xVOrig>xVMin;xVOrig--) {
    x = 0;
    step = 0;
    let xV = xVOrig;
    while (x<=xMax && step<100) {
      x+=xV;
      if (xV>0) {xV--};
      step++;
      if (x>=xMin && x<=xMax) {xInAtStep[step].push(xVOrig)}
    }
  }
  console.log(yMin);
  
  for (let yVOrig = -yMin;yVOrig>=yMin;yVOrig--) {
    console.log(yVOrig);
    y = 0;
    step = 0;
    let yV = yVOrig;
    if (yVOrig>0) {
      step = yVOrig*2+1;
      yV = -yVOrig;
    }
    
    while (y>=yMin && step<100) {
      y+=yV;
      yV--;
      step++;
      if (y>=yMin && y<=yMax) {
        for(const xVOrig of xInAtStep[step]) {
          velocities.add(1000*xVOrig+yVOrig);
        }
      }
    }
  }
  
  console.log(velocities.size);
}
