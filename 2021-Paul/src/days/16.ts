
import fs  from "fs";

let vSum = 0;

function readPacket (binary: string) {

  let v = parseInt(binary.slice(0,3),2);
  let t = parseInt(binary.slice(3,6),2);
  console.log("version:", v);
  console.log("type:", t);
  vSum+=v;
  let value = 0;

  console.log(v,t);
  let index = 6;
  if (t == 4) {
    console.log("literal");
    value = 0;
    while (binary[index] == "1") {
      value=value*16+parseInt(binary.slice(index+1,index+5),2);
      index+=5;
    }
    value=value*16+parseInt(binary.slice(index+1,index+5),2);
    index+=5;
      
    console.log(value,index);
  } else {
    console.log("operator");
    let values = [];
    if (binary[index] == "0") {
      console.log(index,binary.slice(index+1,index+16));
      let subLength = parseInt(binary.slice(index+1,index+16),2);
      index+=16;
      console.log("subLength:", subLength);
      while (subLength>0) {
        let tuple = readPacket(binary.slice(index));
        let packetLength = tuple[0];
        values.push(tuple[1]);
        subLength-=packetLength;
        index+=packetLength;
      }
    } else {
      let noOfSubPackets = parseInt(binary.slice(index+1,index+12),2);
      index+=12;
      console.log("SubPackets:", noOfSubPackets);
      for (let i = 0; i<noOfSubPackets;i++) {
        let tuple = readPacket(binary.slice(index));
        let packetLength = tuple[0];
        values.push(tuple[1]);
        index+=packetLength;
      }
    }
    console.log(values);
    if (t == 0) {
      value = values.reduce((a,b)=>a+b,0);
    }
    if (t == 1) {
      value = values.reduce((a,b)=>a*b,1);
    }
    if (t == 2) {
      value = Math.min(...values);
    }
    if (t == 3) {
      value = Math.max(...values);
    }
    if (t == 5) {
      value = Number(values[0]>values[1]);
    }
    if (t == 6) {
      value = Number(values[0]<values[1]);
    }
    if (t == 7) {
      value = Number(values[0]==values[1]);
    }
    
  }
  //console.log("out:",index);
  return [index,value];
}

export function Part1() {

  const input = fs.readFileSync("./inputs/16.txt","utf8");
  
  let inputBin = ""
  for (let i = 0;i<input.length;i+=2) {
    inputBin+= parseInt(input.slice(i,i+2), 16).toString(2).padStart(8, '0');
  }
  let tuple = readPacket(inputBin);

  console.log("vSum:", vSum);
  console.log("value:", tuple[1]);

}
