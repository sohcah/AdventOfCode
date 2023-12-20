import { p, loadLines, output } from "aocutils";

const input = loadLines(p`${p(/[?.#]+/)("seq")} ${p.num.list(",")("pattern")}`);

console.log(input);

function seqMatches(seq: string, pattern: number[]) {
  const m = seq.split(/\.+/g).filter(Boolean);
  return m.every((i, n) => i.length === pattern[n]) && m.length === pattern.length;
}

const result = input.map(({ seq, pattern }) => {
  let options = [""];
  for (const char of seq) {
    if (char === "?") {
      options = options.flatMap((i) => [`${i}#`, `${i}.`]);
    } else {
      options = options.map((i) => `${i}${char}`);
    }
  }
  // console.log(options);
  const o = options.filter((i) => seqMatches(i, pattern));
  console.log(o.length);
  return o.length;
});
console.log(JSON.stringify(result));

output(result.sum).forTest(21).forActual(7110);
