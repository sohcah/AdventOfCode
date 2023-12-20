import { loadTrimmed, output} from "aocutils";

const input = loadTrimmed().replaceAll(" ","").split("\n").map(i=>i.split(/:+/g).slice(1).map(Number))

console.log(input);



  let a = input[0][0];
  let b = input[1][0];
  let c = (a-Math.sqrt(a*a-4*b))/2
  let d = Math.ceil(c);
  let answer = a - 2*d+1;
  if (c ==d) {answer -= 2}

output(answer).forTest(288);
