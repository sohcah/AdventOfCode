import { test, expect, assertType } from "vitest";
import {
  p,
  type UnnamedParser,
  type Parser,
  createParserFunction,
  list,
  num,
  or,
  regexp,
  sequence,
} from "../src/parser/parserCompiler";
import { assertTypeNotAny } from "../src";

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

test("dict parser works", () => {
  const parser = p`${p.word("key")}: ${p.num("value")}`.list(",").dict();
  expect(parser.parse("abc: 123")).toStrictEqual({
    abc: 123,
  });
  expect(parser.parse("abc: 123,def: 456")).toStrictEqual({
    abc: 123,
    def: 456,
  });
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

test("parserCompiler - num works", () => {
  const parser = createParserFunction(num);
  expect(parser("123")).toEqual(123);
  expect(() => parser("abc")).toThrowError("Unable to match number");
});

test("parserCompiler - regex works", () => {
  const parser = createParserFunction(regexp(/ab[cd]/));
  expect(parser("abc")).toEqual("abc");
  expect(parser("abd")).toEqual("abd");
  expect(() => parser("123")).toThrowError("Unable to match regex");
});

test("parserCompiler - or works", () => {
  const parser = createParserFunction(or(regexp(/ab[cd]/), regexp(/ab/), num));
  expect(parser("abc")).toEqual("abc");
  expect(parser("abd")).toEqual("abd");
  expect(parser("ab")).toEqual("ab");
  expect(parser("123")).toEqual(123);
  expect(() => parser("xyz")).toThrowError("Unable to match or");
});

test("parserCompiler - sequence works", () => {
  const parser = createParserFunction(sequence(regexp(/ab[cd]/), num));
  expect(parser("abc123")).toEqual(["abc", 123]);
  expect(parser("abd123")).toEqual(["abd", 123]);
  expect(parser("abc134583")).toEqual(["abc", 134583]);
  expect(() => parser("abc")).toThrowError("Unable to match sequence");
  expect(() => parser("123")).toThrowError("Unable to match sequence");
  expect(() => parser("xyz")).toThrowError("Unable to match sequence");
});

test("parserCompiler - list works", () => {
  const parser = createParserFunction(list(num, regexp(/,/)));
  expect(parser("1,2,3")).toEqual([1, 2, 3]);
  expect(parser("12,3,4,5")).toEqual([12, 3, 4, 5]);
  expect(parser("123")).toEqual([123]);
  expect(() => parser("abc")).toThrowError("Unable to match list");
  expect(() => parser("1,2,3,")).toThrowError("Unable to finish matching");
  expect(() => parser("")).toThrowError("Unable to match list");
});

test("parserCompiler - complex works", () => {
  const parser = createParserFunction(
    sequence(regexp(/ab[cd]/), list(num, regexp(/,/)), or(regexp(/ab[cd]/), regexp(/ab/), num))
  );
  expect(parser("abc1,2,3abc")).toEqual(["abc", [1, 2, 3], "abc"]);
  expect(parser("abd1,2,3ab")).toEqual(["abd", [1, 2, 3], "ab"]);
  expect(parser("abc134583ab")).toEqual(["abc", [134583], "ab"]);
  expect(() => parser("abc")).toThrowError("Unable to match sequence");
  expect(() => parser("123")).toThrowError("Unable to match sequence");
  expect(() => parser("xyz")).toThrowError("Unable to match sequence");
});
