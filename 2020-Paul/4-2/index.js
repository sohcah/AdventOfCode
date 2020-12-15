const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\n\n").map(i => i.split(/[\n ]/g));

fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.

count = 0;

for (let x of input) {
    pres = [0, 0, 0, 0, 0, 0, 0];
    valid = true;
    for (let y of x) {
        for (let i = 0; i < 7; i++) {
            let fkey = y.slice(0, 3);
            fval = y.slice(4);
            if (y.slice(0, 3) == fields[i]) { pres[i] = 1 }
            if (fkey == fields[0]) { if (fval < 1920 || fval > 2002) { valid = false } }
            if (fkey == fields[1]) { if (fval < 2010 || fval > 2020) { valid = false } }
            if (fkey == fields[2]) { if (fval < 2020 || fval > 2030) { valid = false } }
            if (fkey == fields[3]) {
                if (fval.slice(-2) != "cm" && fval.slice(-2) != "in") {
                    valid = false
                } else if (fval.slice(-2) == "cm") {
                    if (fval.slice(0, -2) < 150 || fval.slice(0, -2) > 193) { valid = false }
                } else if (fval.slice(-2) == "in") {
                    if (fval.slice(0, -2) < 59 || fval.slice(0, -2) > 76) { valid = false }
                }
            }
            if (fkey == fields[4]) { if (!fval.match(/^#[0-9a-f]{6}$/)) { valid = false } }
            if (fkey == fields[5]) { if (fval != "amb" && fval != "blu" && fval != "brn" && fval != "gry" && fval != "grn" && fval != "hzl" && fval != "oth") { valid = false } }
            if (fkey == fields[6]) { if (!fval.match(/^[0-9]{9}$/)) { valid = false } }
        }
    }

    if (!pres.includes(0) && valid == true) { count++ };
}


console.log(count);