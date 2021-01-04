const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n").map(i => i.split(","));

let buses = input[1];
let decbus = [];
for (bus of buses) {
    if (bus != 'x') {decbus.push(parseInt(bus,10))} 
}
decbus = decbus.sort((a,b) => b-a);

let relbus = [];
for (let i = 1; i< decbus.length;i++) {
    relbus.push(buses.indexOf(decbus[i].toString(10))-buses.indexOf(decbus[i-1].toString(10)));
}


console.log(decbus,relbus);