import { p, loadLines, output } from "aocutils";

const input = loadLines(p`${p(/[?.#]+/)("seq")} ${p.num.list(",")("pattern")}`)
  .map((i) => ({
    seq: `${i.seq}?${i.seq}?${i.seq}?${i.seq}?${i.seq}`,
    pattern: [...i.pattern, ...i.pattern, ...i.pattern, ...i.pattern, ...i.pattern],
  }))
  .map((i) => ({
    seq: i.seq.replace(/\.\./g, "."),
    pattern: i.pattern,
  }))
  .map((i) => ({
    seq: i.seq + (i.seq.endsWith(".") ? "" : "."),
    pattern: i.pattern,
  }));

function internal_getOptions(
  seqFull: string[],
  patternFull: number[],
  seqN: number,
  patternN: number
): number {
  const minLength = patternFull.reduce((a, b, n) => a + (n < patternN ? 0 : b + 1), 0);

  const output: number[] = [];

  for (let start = seqN; start <= seqFull.length - minLength; start++) {
    if (seqFull[start - 1] === "#") break;
    if (seqFull.slice(start, start + patternFull[patternN]).includes(".")) continue;
    if (seqFull[start + patternFull[patternN]] === "#") continue;
    if (patternFull.length - patternN === 1 && seqFull.includes("#", start + patternFull[patternN]))
      continue;
    output.push(start + patternFull[patternN] + 1);
  }

  if (patternFull.length - patternN <= 1) return output.length;

  return output.reduce((a, i) => a + getOptions(seqFull, patternFull, i, patternN + 1), 0);
}

let optionsOutputs: number[];
function getOptions(seq: string[], pattern: number[], seqN: number, patternN: number): number {
  const key = (seq.length - seqN) * 100 + (pattern.length - patternN);
  return (optionsOutputs[key] ??= internal_getOptions(seq, pattern, seqN, patternN));
}

const SLICE = [0, 10000];
const result = input.slice(SLICE[0], SLICE[1]).map(({ seq, pattern }) => {
  optionsOutputs = new Array((seq.length + 1) * 100);

  return getOptions([...seq], pattern, 0, 0);
});

output(result.sum).forTest(525152).forActual(1566786613613);
