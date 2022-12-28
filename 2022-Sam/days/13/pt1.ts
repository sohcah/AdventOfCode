import {adjacentPositionsWithoutDiagonals, loadLines, loadTrimmed, output} from "aocutils";

const pairs = loadTrimmed().split("\n\n").map(i => i.split("\n").map(j => JSON.parse(j))) as [Value, Value][];

type Value = number | Value[];

type CompareResult = "continue" | "out_of_order" | "in_order";

function ensureArray(value: Value): Value[] {
  return Array.isArray(value) ? value : [value];
}

function compare(a: Value, b: Value): CompareResult {
  if (typeof a === "number" && typeof b === "number") {
    return b > a ? "in_order" : (b === a ? "continue" : "out_of_order");
  }
  const aArray = ensureArray(a);
  const bArray = ensureArray(b);

  for(let i = 0;i < Math.max(aArray.length, bArray.length) + 1;i++) {
    const aItem = aArray[i];
    const bItem = bArray[i];
    if(aItem === undefined && bItem === undefined) return "continue";
    if(aItem === undefined) return "in_order";
    if(bItem === undefined) return "out_of_order";
    const result = compare(aItem, bItem);
    if(result !== "continue") return result;
  }
}


const pairResults = pairs.map((i, n) => [n+1,compare(i[0], i[1]), i[0], i[1]] as const);

console.log(pairResults);
for(const result of pairResults) {
  console.log(result[0], result[1], JSON.stringify(result[2]), JSON.stringify(result[3]));
}

output(pairResults.filter(i => i[1] === "in_order").map(i => i[0]).sum).forTest(13);
