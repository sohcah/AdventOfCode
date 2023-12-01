import {output, loadLines} from "aocutils";

const input = loadLines();

const sizes = new Map<string, number>();
const dStack = [];

let line = 0;
while (line<input.length) {
    if (input[line].startsWith("$ cd")) {
        if (input[line].startsWith("$ cd ..")) {
            console.log("remove ", dStack.pop());
            line++;
        } else {
            dStack.push((dStack.length>0 ? dStack.at(-1) + "|" : "") + input[line].slice(5));
            sizes.set(dStack.at(-1), 0);
            console.log("add ", dStack.at(-1));
            line += 2;
            while (input[line][0] != "$") {
                if (!input[line].startsWith("dir")) {
                    let fileSize = Number(input[line].split(" ")[0]);
                    console.log(fileSize);
                    for (const dir of dStack) {
                        sizes.set(dir, sizes.get(dir) + fileSize);
                        console.log(dir, sizes.get(dir));
                    }
                }
                line++;
                if (line>=input.length) {
                    break
                }
            }
        }
    }
}

console.log(sizes);

let answer = Array.from(sizes.values()).sort((a,b)=> a - b).find(a => a >= sizes.get("/") - 40000000)

output(answer).forTest(24933642);
