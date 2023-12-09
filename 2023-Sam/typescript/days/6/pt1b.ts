import { load, p, output } from "aocutils";

const input = load(
  p`Time:${/\s+/}${p.num.list(/\s+/)("times")}
Distance:${/\s+/}${p.num.list(/\s+/)("distances")}`
);

let result = 1;
for (let race = 0; race < input.times.length; race++) {
  let sum = 0;
  const time = input.times[race];
  const distance = input.distances[race];
  for (let t = 0; t < time; t++) {
    const newDistance = (time - t) * t;
    if (newDistance > distance) {
      sum++;
    } else if (sum) {
      break;
    }
  }
  result *= sum;
}

output(result).forTest(288).forActual(5133600);
