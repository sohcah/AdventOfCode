import { loadLines, p, output, CountedSet } from "aocutils";

const input = loadLines(p`${p.word("hand")} ${p.num("bid")}`);
console.log(input);

const result = input
  .map((line) => {
    let jokers = 0;
    const counted = new CountedSet<string>();
    for (const card of line.hand.chars) {
      if (card === "J") {
        jokers++;
      } else {
        counted.add(card);
      }
    }
    const hand = line.hand;
    const entries = [...counted.entries].sort((a, b) => b[1] - a[1]);
    let type = 0;
    for (let n = 0; n < entries.length + 1; n++) {
      const newCounted = new Map<string, number>();
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        newCounted.set(entry[0], entry[1] + (i === n ? jokers : 0));
      }
      if (n === entries.length) {
        newCounted.set("J", jokers);
      }
      const values = [...newCounted.values()].length;
      const max = [...newCounted.values()].max();
      const min = [...newCounted.values()].min();
      const thisType =
        max === 5
          ? 6 // Full house
          : max === 4
            ? 5 // Four of a kind
            : max === 3 && min === 2
              ? 4 // Full house
              : max === 3
                ? 3 // Three of a kind
                : max === 2 && values === 3
                  ? 2 // Two pair
                  : max === 2 && values === 4
                    ? 1 // One pair
                    : 0; // high card
      if (thisType > type) {
        type = thisType;
        if (n === entries.length) {
          console.log("THIS HAND - ", hand);
        }
      }
    }
    const mHand = hand.chars
      .map((i) => {
        return (
          {
            A: "E",
            K: "D",
            Q: "C",
            J: "1",
            T: "A",
          }[i] ?? i
        );
      })
      .join("");
    return { ...line, mHand, type };
  })
  .sort((a, b) => {
    if (a.type > b.type) return 1;
    if (a.type < b.type) return -1;
    return a.mHand.localeCompare(b.mHand);
  });

// console.log(
// 	result.map((i, n) => `${i.hand}[${i.mHand}] - ${i.type} - ${i.bid} - ${n + 1}`).join("\n")
// );

const r = result.map((i, n) => i.bid * (n + 1));

// console.log(result);

output(r.sum).forTest(5905);
