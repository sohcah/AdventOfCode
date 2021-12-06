
import fs  from "fs";

export function Part1() {

  const lines = fs.readFileSync("./inputs/5.txt","utf8").trim().replace(/ -> /g,",").split("\n").map(i=>i.split(",").map(i=>Number(i)));
  
  let x1;
  let y1;
  let x2;
  let y2;
  let once = new Set();
  let more = new Set();
  
  for (let i=0;i<lines.length;i++) {
    x1 = lines[i][0];
    y1 = lines[i][1];
    x2 = lines[i][2];
    y2 = lines[i][3];
  
    if (x1 == x2) {
      if (y2 < y1) {
        [y1,y2] = [y2,y1]
      }
      for (let y = y1;y<=y2;y++) {
        if (once.has(x1*1000+y)) {
          more.add(x1*1000+y)
        }
        else {
          once.add(x1*1000+y)
        }
      }
    }

    if (y1 == y2) {
      if (x2 < x1) {
        [x1,x2] = [x2,x1]
      }
      for (let x = x1;x<=x2;x++) {
        if (once.has(x*1000+y1)) {
          more.add(x*1000+y1)
        }
        else {
          once.add(x*1000+y1)
        }
      }
    }
  }
  
  console.log(more.size);
}

export function Part2() {

  const lines = fs.readFileSync("./inputs/5.txt","utf8").trim().replace(/ -> /g,",").split("\n").map(i=>i.split(",").map(i=>Number(i)));
  
  let x1;
  let y1;
  let x2;
  let y2;
  let xm = 0;
  let ym = 0;
  let loopLen = 0;
  let once = new Set();
  let more = new Set();
  
  for (let i=0;i<lines.length;i++) {
    x1 = lines[i][0];
    y1 = lines[i][1];
    x2 = lines[i][2];
    y2 = lines[i][3];
    loopLen = 0;

    if (x1 < x2) {
      xm = 1;
      loopLen = x2 - x1;
    }
    if (x1 > x2) {
      xm = -1;
      loopLen = x1 - x2;
    }
    if (x1 == x2) {xm = 0};

    if (y1 < y2) {
      ym = 1;
      loopLen = y2 - y1;
    }
    if (y1 > y2) {
      ym = -1;
      loopLen = y1 - y2;
    }
    if (y1 == y2) {ym = 0};


    
    for (let loop = 0;loop<=loopLen;loop++) {
      if (once.has((x1+xm*loop)*1000+(y1+ym*loop))) {
        more.add((x1+xm*loop)*1000+(y1+ym*loop))
      }
      else {
        once.add((x1+xm*loop)*1000+(y1+ym*loop))
      }
    }
  }
  
  console.log(more.size);
}

