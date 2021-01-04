const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n");

let memaddress = [];
let memcontent = [];
let maskOR = 0;
let maskAND = 0;
let mask = "";
let mema = [];
let result = 0;
let ans = 0;
for (let i = 0; i < input.length; i++) {
    if (input[i].slice(0,4) == "mask") {
        mask = input[i].slice(7);
        maskOR = BigInt("0b" + mask.replace(/X/g,"0"));
        maskAND = BigInt("0b" + mask.replace(/0/g,"1").replace(/X/g,"0"));

    }

    else {
        //mema = input[i].slice(4,input[i].indexOf("=") - 2);
        //result = BigInt(input[i].slice(input[i].indexOf("=") + 2)) & maskAND | maskOR;
        mema = [BigInt(input[i].slice(4,input[i].indexOf("=") - 2)) & maskAND | maskOR];
        result = BigInt(input[i].slice(input[i].indexOf("=") + 2));
        powof2 = 1n;
        for (let j = mask.length-1;j>=0;j--) {
            if (mask[j]=="X") {
                sofar = mema.length;
                for (k = 0; k<sofar;k++) {
                    mema.push(mema[k]+powof2);
                   
                }
                
            }
            
            powof2 *= 2n;
        }
        
        for (let m of mema) {
            if (memaddress.includes(m)) {
                memcontent[memaddress.indexOf(m)] = result;
            } 
            else {
                memaddress.push(m);
                memcontent.push(result);
            }
        }
    }
}

let sum = 0n;
memcontent.map(function(x){sum+=x});

console.log(sum);