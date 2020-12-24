const fs = require("fs");


const input = fs.readFileSync("input.txt", "utf8").split("\n").map(i => i.split(","));

let timestamp = parseInt(input[0]);
let buses = input[1];

let minwait = timestamp;
let minbus = 0;
for (bus of buses) {
    if (bus != 'x') {
        let wait = parseInt(bus,10) - timestamp % parseInt(bus,10);
        if (wait<minwait) {
            minbus = bus;
            minwait = wait;
        }
    }
}
console.log(minbus*minwait);