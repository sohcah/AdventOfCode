
import fs  from "fs";
let input : string[][];

let modelNumber : string;
let x : number;
let z : number;

function readNextChunk (zInput: number) {
  if (modelNumber.length<14) {
    //if (modelNumber.length>12) {console.log(modelNumber)};
    for (let digit = 9;digit>5;digit--) {
      modelNumber += String.fromCharCode(digit+48);
      z = zInput;
      //if (Number(modelNumber) % 1000000 == 999999) {console.log(modelNumber)}
      x = z % 26;
      if (Number(input[18*modelNumber.length-14][2]) == 26) {
        z=Math.floor(z/26);
      }
      x+= Number(input[18*modelNumber.length-13][2]);
      if (x != digit) {
        z*=26; 
        z+=digit+Number(input[18*modelNumber.length-3][2]);
      }
     
      readNextChunk (z);
      modelNumber = modelNumber.slice(0,modelNumber.length-1);

    }
  } else {
    //console.log("modelNumber " + modelNumber + ",  z = " + z)
    if (z == 0) {
      console.log(modelNumber);
      //throw 'Done';
    }
  }
}

export function Part1() {

  input = fs.readFileSync("./inputs/24.txt","utf8").trim().split("\n").map(i=>i.split(" "));

  modelNumber = "";
  
  readNextChunk(0);
  
 
}

