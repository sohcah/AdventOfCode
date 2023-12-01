import {output, loadTrimmed} from "aocutils";

const input = loadTrimmed();

const items = new Map<string, number>();

function add(item: string) {
    items.set(item,(items.get(item) || 0)+1);
}

function remove(item: string) {
   if (items.get(item)>1) {
       items.set(item,items.get(item)-1);
   } else {
       items.delete(item);
   }
}

let answer;

add(input[0]);
add(input[1]);
add(input[2]);


for (let i=3; i<input.length; i++) {
    add(input[i]);
    if (items.size === 4) {
        answer = i+1;
        break;
    }
    remove(input[i-3]);
}


output(answer).forTest(11);
