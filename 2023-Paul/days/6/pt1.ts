import { loadTrimmed, output} from "aocutils";

const input = loadTrimmed().split("\n").map(i=>i.split(/\s+/g).slice(1).map(Number))

let product = 1;
for (let i=0;i<input[0].length;i++) {
  let a = input[0][i];
  let b = input[1][i];
  let c = (a-Math.sqrt(a*a-4*b))/2
  let d = Math.ceil(c);
  let answer = a - 2*d+1;
  if (c ==d) {answer -= 2}
  product *=answer;
  console.log(answer);
}

output(product).forTest(288);
