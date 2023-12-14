import { p, loadLines, output } from "aocutils";

const input = loadLines(p`${p(/[?.#]+/)("seq")} ${p.num.list(",")("pattern")}`)
  .map((i) => ({
    seq: `${i.seq}?${i.seq}?${i.seq}?${i.seq}?${i.seq}`,
    pattern: [...i.pattern, ...i.pattern, ...i.pattern, ...i.pattern, ...i.pattern],
  }))
  .map((i) => {
    const seq = [...i.seq.replace(/\.{2,}/g, ".")];
    return {
      seq: seq.map((i) => {
        switch (i) {
          case ".":
            return 0;
          case "#":
            return 1;
          case "?":
            return 2;
        }
      }),
      pattern: i.pattern,
    };
  })
  .map((i) => ({
    seq: [...i.seq, ...(i.seq.at(-1) === 0 ? [] : [0])] as (0 | 1 | 2)[],
    pattern: i.pattern,
  }));

function includesInRange<T>(arr: T[], item: T, start: number, end: number) {
  for (let i = start; i < end; i++) {
    if (arr[i] === item) return true;
  }
  return false;
}

function internal_getOptions(
  seqFull: (0 | 1 | 2)[],
  patternFull: number[],
  minLengths: number[],
  seqN: number,
  patternN: number
): number {
  const pattern = patternFull[patternN];
  const isLast = patternFull.length - patternN === 1;

  let sum = 0;
  for (let start = seqN; start <= seqFull.length - minLengths[patternN]; start++) {
    if (seqFull[start - 1] === 1) break;
    if (includesInRange(seqFull, 0, start, start + pattern)) continue;
    if (isLast) {
      if (seqFull.includes(1, start + pattern)) continue;
      sum++;
    } else {
      sum += getOptions(seqFull, patternFull, minLengths, start + pattern + 1, patternN + 1);
    }
  }

  if (isLast) return sum;

  return sum;
}

let optionsOutputs: number[];
function getOptions(
  seq: (0 | 1 | 2)[],
  pattern: number[],
  minLengths: number[],
  seqN: number,
  patternN: number
): number {
  const key = (seq.length - seqN) * pattern.length + (pattern.length - patternN);
  return (optionsOutputs[key] ??= internal_getOptions(seq, pattern, minLengths, seqN, patternN));
}

let sum = 0;
for (const { seq, pattern } of input) {
  optionsOutputs = new Array((seq.length + 1) * pattern.length);

  const minLengths = pattern
    .toReversed()
    .reduce((a, b) => {
      a.push((a.at(-1) ?? 0) + b + 1);
      return a;
    }, [] as number[])
    .reverse();

  sum += getOptions(seq, pattern, minLengths, 0, 0);
}

output(sum).forTest(525152).forActual(1566786613613);
