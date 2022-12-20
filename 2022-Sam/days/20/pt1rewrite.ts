import {IS_TEST, loadLines, loadNumbers, output, stabilise} from "aocutils";
import {N} from "./n";

const numbers = loadNumbers();

const list = [...numbers];

for(const number of numbers.slice(0,N)) {
  let index = list.indexOf(number);

  console.log(list.at(index - 1), '<-', list.at(index), '->', list.at(index + 1));

  list.splice(index, 1);
  let newIndex = (index + number) % list.length;
  // console.log(index, newIndex);
  //
  // console.log("move", number)
  if(IS_TEST)console.log(list);
  // if(newIndex >= index) {
    if(newIndex === 0) {
      list.push(number);
    } else {
      list.splice(newIndex, 0, number);
    }
  // } else {
  //   list.splice(newIndex, 0, number);
  //   list.splice(index, 1);
  // }
  // if(IS_TEST)console.log(list);

  console.log(list.at(newIndex - 2), '<-', list.at(newIndex - 1), '->', list.at(newIndex));
}

console.log("IDX", list.indexOf(-3883), list.indexOf(-1293), list.indexOf(1605), list.indexOf(0));

let sum = 0;
let index = list.indexOf(0);
for(let i = 1; i <= 3000;i++) {
  index++;
  if(i % 1000 === 0) {
    console.log("n", index);
    sum += list[index % list.length];
    console.log(list[index % list.length]);
  }
}



output(sum).forTest(3);
