import { test, expect, assertType } from "vitest";
import { assertTypeNotAny } from "../src";
import { p, type Parser, type UnnamedParser } from "../src/parser/parser";

const gameSeq = p`Game ${p.digit("game")}: ${p.num("value")} / ${p.num("total")}`;

test("p seq types - object", () => {
  assertType<
    UnnamedParser<{
      game: number;
      value: number;
      total: number;
    }>
  >(gameSeq);
});

test("seq parser works - object", () => {
  expect(gameSeq.parse("Game 1: 1 / 10")).toStrictEqual({
    game: 1,
    value: 1,
    total: 10,
  });
});

const gameSeqArray = p`Game ${p.digit(0)}: ${p.num(1)} / ${p.num(2)}`;

test("p seq types - array", () => {
  assertType<Parser<readonly [number, number, number]>>(gameSeqArray);
});

test("seq parser works - array", () => {
  expect(gameSeqArray.parse("Game 1: 1 / 10")).toStrictEqual([1, 1, 10]);
});

const commaSepNums = p.num.list(/,/);
test("list types", () => {
  assertType<Parser<number[]>>(commaSepNums);
});

test("list parser works", () => {
  expect(commaSepNums.parse("1,23,4")).toStrictEqual([1, 23, 4]);
});

test("day2 clean parser works", () => {
  const parser = p`Game ${p.num("game")}: ${p`${p.num("value")} ${p.word("key")}`
    .list(", ")
    .dict({
      red: 0,
      blue: 0,
      green: 0,
    })
    .list("; ")("rounds")}`;
  expect(
    parser.parse("Game 1: 1 green, 2 blue; 13 red, 2 blue, 3 green; 4 green, 14 red")
  ).toStrictEqual({
    game: 1,
    rounds: [
      {
        red: 0,
        green: 1,
        blue: 2,
      },
      {
        red: 13,
        blue: 2,
        green: 3,
      },
      {
        blue: 0,
        green: 4,
        red: 14,
      },
    ],
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
    const range = p`${p.num}-${p.num}`;
    assertType<Parser<[number, number]>>(range);
    const fields = p`${p(/[^:]+/)("name")}: ${range.list(" or ")("ranges")}`
      .list("\n")
      .parse(input.groups[0]);

    assertType<
      {
        name: string;
        ranges: [number, number][];
      }[]
    >(fields);

    expect(fields).toStrictEqual([
      {
        name: "class",
        ranges: [
          [1, 3],
          [5, 7],
        ],
      },
      {
        name: "row",
        ranges: [
          [6, 11],
          [33, 44],
        ],
      },
      {
        name: "seat",
        ranges: [
          [13, 40],
          [45, 50],
        ],
      },
    ]);
  });

  test("2022 day 17 your ticket parser works", () => {
    const ticket = p.num.list(",");
    const yourTicket = p`your ticket:\n${ticket}`.parse(input.groups[1]);

    assertType<number[]>(yourTicket);

    expect(yourTicket).toStrictEqual([7, 1, 14]);
  });

  test("2022 day 17 nearby ticket parser works", () => {
    const ticket = p.num.list(",");
    const nearbyTickets = p`nearby tickets:\n${ticket.list("\n")}`.parse(input.groups[2]);

    assertType<number[][]>(nearbyTickets);

    expect(nearbyTickets).toStrictEqual([
      [7, 3, 47],
      [40, 4, 50],
      [55, 2, 20],
      [38, 6, 12],
    ]);
  });

  test("2022 day 17 parser works", () => {
    const ticket = p.num.list(",");
    const range = p`${p.num(0)}-${p.num(1)}`;
    const field = p`${p(/[^:]+/)("name")}: ${range.list(" or ")("ranges")}`;
    const data = p`${field.list("\n")("fields")}\n\nyour ticket:\n${ticket(
      "mine"
    )}\n\nnearby tickets:\n${ticket.list("\n")("nearby")}`.parse(input);

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

test("or works", () => {
  const parser = p([p.num, p.word]);

  assertType<Parser<number | string>>(parser);
  expect(parser.parse("123")).toBe(123);
  expect(parser.parse("abc")).toBe("abc");
});
