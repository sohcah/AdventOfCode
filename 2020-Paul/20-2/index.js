const fs = require("fs");
const { POINT_CONVERSION_COMPRESSED } = require("constants");


const input = fs.readFileSync("input.txt", "utf8").replace(/\#/g,"1").replace(/\./g,"0").split("\n");

let tiles = [];
let width = input[1].length;
let tileno = [];
let corners = [];
let edges  = [];
let middles = [];
let counts = [];
let c = 0;
let lastgoodj = 0;

let t = 0;
let tr = 0;
let r = 0;
let rr = 0;
let b = 0;
let br = 0;
let l = 0;
let lr = 0;

for (i = 0; i< input.length;i += 12) {
    tileno.push( parseInt(input[i].slice(5,9),10));
    t = parseInt(input[i+1],2);
    tr = parseInt(input[i+1].split("").reverse().join(""),2);
    r = parseInt(input.slice(i+1,i+11).map(i=>i[width-1]).join(""),2);
    rr = parseInt(input.slice(i+1,i+11).map(i=>i[width-1]).reverse().join(""),2);
    b = parseInt(input[i+10].split("").reverse().join(""),2);
    br = parseInt(input[i+10],2)
    l = parseInt(input.slice(i+1,i+11).map(i=>i[0]).reverse().join(""),2);
    lr = parseInt(input.slice(i+1,i+11).map(i=>i[0]).join(""),2);
    tiles.push(t,r,b,l,tr,lr,br,rr);
}


for (i = 0; i< tiles.length;i += 8) {
    c = 0;
    
    for (j = 0;j<4;j++) {
        if (tiles.slice(i+8).includes(tiles[i+j]) || tiles.slice(0,i).includes(tiles[i+j])) {
            c++;
            lastgoodj = j;
        }
    }
    if (c == 2) {
        corners.push([i/8,(lastgoodj+3) % 4]);
    }
    else if (c == 3) {
        edges.push([i/8,(lastgoodj+2) % 4]);
    }
    else {
        middles.push(i/8);
    }
    ;
    
}
for (i=0; i<tiles.length; i++) {
    counts.push(tiles.filter(x => x==tiles[i]).length);
}

//work across top?
//work down each column?


console.log(corners,edges,middles,counts.filter(x=>x==1).length,counts.filter(x=>x==2).length,counts.filter(x=>x>2).length);