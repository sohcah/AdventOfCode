import { output, CountedSet } from "aocutils";

const input = load()
  .replaceAll("A", "E")
  .replaceAll("K", "D")
  .replaceAll("Q", "C")
  .replaceAll("J", "1")
  .replaceAll("T", "A")
  .split("\n")
  .map((i) => i.split(" "))
  .map((i) => ({ hand: i[0], bid: Number(i[1]) }));

const result = input
  .map((line) => {
    let jokers = 0;
    const counted = new CountedSet<string>();
    for (const card of line.hand.chars) {
      if (card === "1") {
        jokers++;
      } else {
        counted.add(card);
      }
    }
    const values = counted.size || 1;
    const max = Math.max(...counted.values, 0) + jokers;
    const min = counted.size < 2 ? max : Math.min(...counted.values);
    const type =
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
    return { ...line, type };
  })
  .sort((a, b) => {
    if (a.type > b.type) return 1;
    if (a.type < b.type) return -1;
    if (a.hand > b.hand) return 1;
    return -1;
  });

const r = result.map((i, n) => i.bid * (n + 1));

output(r.sum).forTest(5905).forActual(253473930);
