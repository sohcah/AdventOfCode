const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n");

let memaddress = [];
let memcontent = [];
let maskOR = 0;
let maskAND = 0;
let mema = 0;
let result = 0;
let ans = 0;
for (let i = 0; i < input.length; i++) {
    if (input[i].slice(0,4) == "mask") {
        maskOR = BigInt("0b" + input[i].slice(7).replace(/X/g,"0"));
        maskAND = BigInt("0b" + input[i].slice(7).replace(/X/g,"1"));
        console.log(maskOR,maskAND);
    }

    else {
        mema = input[i].slice(4,input[i].indexOf("=") - 2);
        result = BigInt(input[i].slice(input[i].indexOf("=") + 2)) & maskAND | maskOR;
        console.log(mema,result);
        if (memaddress.includes(mema)) {
            memcontent[memaddress.indexOf(mema)] = result;
        } 
        else {
            memaddress.push(mema);
            memcontent.push(result);
        }
        
    }
}

let sum = 0n;
memcontent.map(function(x){sum+=x});

console.log(sum);