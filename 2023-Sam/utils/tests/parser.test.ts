import { test, expect, assertType } from "vitest";
import { assertTypeNotAny, p, type Parser } from "../src";

const gameSeq = p.seqObj`Game ${p.digit("game")}: ${p.num("value")} / ${p.num("total")}`;

test("p.seqObj types", () => {
  assertType<Parser<{
    game: number;
    value: number;
    total: number;
  }>>(gameSeq);
});

test("seqObj parser works", () => {
  expect(p.parse(gameSeq, "Game 1: 1 / 10")).toStrictEqual({
    game: 1,
    value: 1,
    total: 10
  });
});

const gameSeqArray = p.seq`Game ${p.digit}: ${p.num} / ${p.num}`;

test("p.seq types", () => {
  assertType<Parser<[
    number,
    number,
    number
  ]>>(gameSeqArray);
});

test("seq parser works", () => {
  expect(p.parse(gameSeqArray, "Game 1: 1 / 10")).toStrictEqual([1, 1, 10]);
});

const commaSepNums = p.sep(p.num, p.regexp(/,/));
test("p.sep types", () => {
  assertType<Parser<number[]>>(commaSepNums);
});

test("sep parser works", () => {
  expect(p.parse(commaSepNums, "1,23,4,")).toStrictEqual([1, 23, 4]);
});

test("day2 parser works", () => {
  const parser = p.seqObj`Game ${p.num("game")}: ${p.sep(
    p.sep(
      p.seqObj`${p.num("value")} ${p.word("key")}`,
      p.regexp(/,\s*/)
    ).map(p.dictWithDefault({
      red: 0,
      blue: 0,
      green: 0
    })),
    p.regexp(/;\s*/)
  )("rounds")}`;
  expect(p.parse(parser, "Game 1: 1 green, 2 blue; 13 red, 2 blue, 3 green; 4 green, 14 red")).toStrictEqual({
    game: 1,
    rounds: [
      {
        red: 0,
        green: 1,
        blue: 2
      },
      {
        red: 13,
        blue: 2,
        green: 3
      },
      {
        blue: 0,
        green: 4,
        red: 14
      }
    ]
  });
});

test("day2 clean parser works", () => {
  const parser = p.seqObj`Game ${p.num("game")}: ${
    p.seqObj`${p.num("value")} ${p.word("key")}`
      .list(", ")
      .dict({
        red: 0,
        blue: 0,
        green: 0
      })
      .list("; ")
      ("rounds")
  }`;
  expect(p.parse(parser, "Game 1: 1 green, 2 blue; 13 red, 2 blue, 3 green; 4 green, 14 red")).toStrictEqual({
    game: 1,
    rounds: [
      {
        red: 0,
        green: 1,
        blue: 2
      },
      {
        red: 13,
        blue: 2,
        green: 3
      },
      {
        blue: 0,
        green: 4,
        red: 14
      }
    ]
  });
});
{

  const input = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

  test("2022 day 17 fields parser works", () => {
    const fields = p.parse(
      p.seqObj`${p(/[^:]+/)("name")}: ${
        p.seq`${p.num}-${p.num}`.list(" or ")("ranges")
      }`.list("\n"),
      input.groups[0]
    );

    assertType<{
      name: string;
      ranges: [number, number][]
    }[]>(fields);

    expect(fields).toStrictEqual([
      {
        name: "class",
        ranges: [[1, 3], [5, 7]]
      },
      {
        name: "row",
        ranges: [[6, 11], [33, 44]]
      },
      {
        name: "seat",
        ranges: [[13, 40], [45, 50]]
      }
    ]);
  });

  test("2022 day 17 your ticket parser works", () => {
    const ticket = p.num.list(",");
    const yourTicket = p.parse(
      p.wrap`your ticket:\n${ticket}`,
      input.groups[1]
    );

    assertType<number[]>(yourTicket);

    expect(yourTicket).toStrictEqual([
      7, 1, 14
    ]);
  });

  test("2022 day 17 nearby ticket parser works", () => {
    const ticket = p.num.list(",");
    const nearbyTickets = p.parse(
      p.wrap`nearby tickets:\n${ticket.list("\n")}`,
      input.groups[2]
    );

    assertType<number[][]>(nearbyTickets);

    expect(nearbyTickets).toStrictEqual([
      [7, 3, 47],
      [40, 4, 50],
      [55, 2, 20],
      [38, 6, 12]
    ]);
  });

  test("2022 day 17 parser works", () => {
    const ticket = p.num.list(",");
    const range = p.seq`${p.num}-${p.num}`;
    const field = p.seqObj`${p(/[^:]+/)("name")}: ${range.list(" or ")("ranges")}`;
    const data = p.parse(
      p.seqObj`${field.list("\n")("fields")}\nyour ticket:\n${ticket("mine")}\n\nnearby tickets:\n${ticket.list("\n")("nearby")}`,
      input
    );

    assertTypeNotAny(data);
    assertType<{
      fields: {
        name: string;
        ranges: [number, number][];
      }[];
      mine: number[];
      nearby: number[][];
    }>(data);
  });
}
