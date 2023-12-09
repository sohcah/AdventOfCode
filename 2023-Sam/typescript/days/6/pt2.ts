import { load, p, output } from "aocutils";

const num = p(/(\d[^\S\n]*)+/).map((i) => Number(i.replace(/\s+/g, "")));
const { time, distance } = load(
  p`Time:${/\s+/}${num("time")}
Distance:${/\s+/}${num("distance")}`
);

let sum = 0;
console.log(time, distance);
for (let t = 0; t < time; t++) {
  const newDistance = (time - t) * t;
  if (newDistance > distance) {
    sum++;
  }
}

output(sum).forTest(71503);
