import { test, expect, assertType } from "vitest";
import { p, type Parser } from "../src";

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
