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

for (let i=0; i<13; i++) {
    add(input[i]);
}

for (let i=13; i<input.length; i++) {
    add(input[i]);
    if (items.size === 14) {
        answer = i+1;
        break;
    }
    remove(input[i-13]);
}


output(answer).forTest(26);
