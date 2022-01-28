
import fs  from "fs";
let input : string[][];
let wxyz = [0,0,0,0];
let value : number;
let modelNumber : string;

function readNextChunk (start : number) {
  if (modelNumber.length<14) {
    let lastwxyz = wxyz.slice();
    for (let digit = 9;digit>8;digit--) {
      modelNumber += String.fromCharCode(digit+48);
      if (Number(modelNumber) % 10000000000 == 9999999999) {console.log(modelNumber)}
      wxyz = lastwxyz.slice();
      let i = start;
      wxyz[input[i][1].charCodeAt(0)-119] = digit;
      i++;
      while (i< input.length && input[i][0] != "inp") {
        let index = input[i][1].charCodeAt(0)-119;
        let index2 = input[i][2].charCodeAt(0)-119;
        if (index2>=0 && index2<4) {
          value = wxyz[index2];
        } else {
          value = Number(input[i][2]);
        }
        if (input[i][0] == "add") {
          wxyz[index] += value;
        }
        if (input[i][0] == "mul") {
          wxyz[index] *= value;
        }
        if (input[i][0] == "div") {
          wxyz[index] = Math.floor(wxyz[index]/value);
        }
        if (input[i][0] == "mod") {
          wxyz[index] = wxyz[index] % value;
        }
        if (input[i][0] == "eql") {
          if (wxyz[index] == value) {
            wxyz[index] = 1;
          } else{
            wxyz[index] = 0;
          }
        }
        //console.log(wxyz);
        i++;

      }
      //console.log();
      readNextChunk (i);
      modelNumber = modelNumber.slice(0,modelNumber.length-1);

    }
  } else {
    console.log("modelNumber " + modelNumber + ", w = " + wxyz[0] + ", x = " + wxyz[1] + ", y = " + wxyz[2] + ", z = " + wxyz[3])
    if (wxyz[3] == 0) {
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

