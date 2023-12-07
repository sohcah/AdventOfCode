import type { Number as TSNumber } from "ts-toolbelt";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);

type UnionToIntersection<U> =
  (U extends any ? (x: U) => void : never) extends ((x: infer I) => void) ? I : never

type ParseFn<TResult> = (value: string) => ParserResult<TResult>;

type ParserResult<TResult> = {
  taken: number;
  result: TResult;
}

type GetParserResult<T extends ParseFn<any>> = ReturnType<T>["result"];

export const parseFnSymbol = Symbol("parseFn");
type ParseFnSymbol = typeof parseFnSymbol;

type OptimiserHints = Partial<{
  regexp: RegExp;
  transform?(value: string): unknown;
}>;

export type ResultOf<T extends ImplicitParser> = GetParserResult<ImplicitParserType<T>[ParseFnSymbol]>;

export interface NamedParser<TName extends string | number, TResult> extends Parser<TResult> {
  nameValue: TName;
  hasNamedValue: true;
}

export interface UnnamedParser<TResult> extends Parser<TResult> {
  nameValue: never;
  hasNamedValue: false;
}

export interface Parser<TResult> {
  <const TName extends string | number>(name: TName): NamedParser<TName, TResult>;

  [parseFnSymbol]: ParseFn<TResult>;

  parse(text: string): TResult;

  map<TNewResult>(transformer: (value: TResult) => TNewResult): UnnamedParser<TNewResult>;

  list(parser?: ImplicitParser): UnnamedParser<TResult[]>;

  dict: TResult extends DictEntry<infer TKey, infer TValue>[] ? ((defaultValues?: Record<TKey, TValue>) => UnnamedParser<Record<TKey, TValue>>) : never;

  optimiserHints: OptimiserHints;
}

function custom<TResult>(parse: ParseFn<TResult>, optimiserHints: OptimiserHints = {}): UnnamedParser<TResult> {
  const createNamed: any = function <const TName extends string | number>(name: TName) {
    const named = custom(parse, optimiserHints) as any as NamedParser<TName, TResult>;
    named.nameValue = name;
    return named;
  };

  createNamed[parseFnSymbol] = parse;
  createNamed.parse = (text: string) => parseText(createNamed, text);
  createNamed.map = <TNewResult>(transformer: (value: TResult) => TNewResult) => {
    return custom(text => {
      const result = parse(text);
      return {
        result: transformer(result.result),
        taken: result.taken
      };
      // TODO: Optimiser hints for transforms
    });
  };
  createNamed.list = (separatorParser: ImplicitParser = /,\s*/) => {
    return sep(createNamed, separatorParser);
  };
  createNamed.dict = (defaultValues: any) => {
    return createNamed.map(dictWithDefault(defaultValues));
  };
  createNamed.optimiserHints = optimiserHints;
  return createNamed;
}

function regexp<TResult = string>(regexp: RegExp, parse: (text: string, value: RegExpMatchArray) => TResult = ((i) => i as TResult)) {
  const source = regexp.source.startsWith("^") ? regexp.source : `^(?:${regexp.source})`;
  const mutatedRegexp = new RegExp(source, regexp.flags);
  const canOptimise = !regexp.flags && parse.length === 1;

  return custom(text => {
    const result = text.match(mutatedRegexp);
    if (!result) throw new Error(`Unable to match ${regexp.toString()} with '${text}'`);
    return {
      taken: result[0].length,
      result: parse(result[0], result)
    };
  }, canOptimise ? { regexp: regexp.flags ? undefined : regexp, transform: parse as any } : undefined);
}

function text<TResult = string>(textMatch: string, result: TResult = text as TResult) {
  return custom(text => {
    if (!text.startsWith(textMatch)) throw new Error(`Unable to match ${textMatch} with '${text}'`);
    return {
      taken: textMatch.length,
      result: result
    };
  });
}

type ImplicitParser = UnnamedParser<any> | NamedParser<any, any> | RegExp | string;
type ImplicitParserType<TParser extends ImplicitParser> =
  TParser extends UnnamedParser<any> ? TParser : TParser extends NamedParser<any, any> ? TParser : TParser extends RegExp ? UnnamedParser<string> : TParser extends string ? UnnamedParser<string> : never;

function implicit<TParser extends ImplicitParser>(parser: TParser): ImplicitParserType<TParser> {
  if (typeof parser === "function") {
    return parser as any;
  }
  if (typeof parser === "string") {
    return text(parser) as any;
  }
  return regexp(parser) as any;
}

const digit = regexp(/\d/, (i) => Number(i));
const num = custom(text => {
  let num = 0;
  let index;
  for(index = 0; index < text.length; index++) {
    const char = text.charCodeAt(index);
    if (char < 48 || char > 57) break;
    num = num * 10 + char - 48;
  }
  if (!index) throw new Error(`Unable to match number with '${text}'`);
  return {
    taken: index,
    result: num,
  };
})
const word = custom(text => {
  let index;
  for(index = 0; index < text.length; index++) {
    const char = text.charCodeAt(index);
    if (char < 48 || char > 57 && char < 65 || char > 90 && char < 97 || char > 122) break;
  }
  if (!index) throw new Error(`Unable to match word with '${text}'`);
  return {
    taken: index,
    result: text.slice(0, index),
  };
});

type FilterTuple<T extends readonly any[], E> =
  T extends readonly [infer F, ...infer R] ? readonly [F] extends readonly [E] ?
    readonly [F, ...FilterTuple<R, E>] : FilterTuple<R, E> : []

type SeqObjNamedParsers<TParsers extends readonly ImplicitParser[]> =
  FilterTuple<TParsers, {
    nameValue: string | number
  }>;

type SeqObjHasOnlyOneNamedParser<TParsers extends readonly ImplicitParser[]> =
  SeqObjNamedParsers<TParsers>["length"] extends 1 ? true : false

type SeqObjHasStringNamedParser<TParsers extends readonly ImplicitParser[]> =
  {
    [key in keyof TParsers]: TParsers[key] extends NamedParser<string, any> ? 1 : 0;
  }[number] extends 0 ? false : true;

type SeqObjHasNamedParser<TParsers extends readonly ImplicitParser[]> =
  {
    [key in keyof TParsers]: TParsers[key] extends NamedParser<any, any> ? 1 : 0;
  }[number] extends 0 ? false : true;

type ResultOfIfNamed<TParser extends ImplicitParser> =
  TParser extends NamedParser<any, any> ? ResultOf<TParser> : never;

type GetNamedParsers<TParsers extends readonly ImplicitParser[]> =
  {
    [key in keyof TParsers]: TParsers[key] extends NamedParser<any, any> ? TParsers[key] : never;
  };

type NumberFrom<T extends string | number> = T extends `${infer N extends number}` ? N : T extends number ? T : never;

type GetNamedParsersConverting<TParsers extends readonly ImplicitParser[]> =
  GetNamedParsers<TParsers>[number] extends never ?
    {
      [key in keyof TParsers]: NamedParser<NumberFrom<key>, ResultOf<TParsers[key]>>;
    }
    : GetNamedParsers<TParsers>;

type Max<NN extends number, _a extends 0[] = []> =
  | number extends NN ? number
    : _a["length"] extends (999 | NN) ? (
      _a["length"] extends 999 ? number
        : [Exclude<NN, _a["length"]>] extends [never] ? (
          _a["length"]
          ) : Max<Exclude<NN, _a["length"]>, [..._a, 0]>
      ) : Max<NN, [..._a, 0]>

type Tuple<T, N extends number, A extends any[] = []> = A extends {
  length: N
} ? A : Tuple<T, N, [...A, T]>;

type SeqObjObjectOutput<TParsers extends readonly NamedParser<any, any>[]> = UnionToIntersection<{
  [key in keyof TParsers]: { readonly [key2 in TParsers[key]["nameValue"]]: ResultOf<TParsers[key]> };
}[number]>

type SeqObjTupleOutput<TParsers extends readonly NamedParser<number, any>[]> =
  Omit<Tuple<ResultOf<TParsers[number]>, TSNumber.Add<1, Max<TParsers[number]["nameValue"]>>>, number>
  &
  SeqObjObjectOutput<TParsers>

type SeqObjOutput<TParsers extends readonly ImplicitParser[]> =
// If only one named parser, return the value of that key
  SeqObjHasOnlyOneNamedParser<TParsers> extends true ?
    ResultOf<GetNamedParsers<TParsers>[number]> :
    // Otherwise if it has a string-named-parser, then it's a dict
    SeqObjHasStringNamedParser<TParsers> extends true ?
      SeqObjObjectOutput<GetNamedParsers<TParsers>> :
      // Otherwise if it has a number-named-parser, then it's a list
      SeqObjHasNamedParser<TParsers> extends true ?
        SeqObjTupleOutput<GetNamedParsers<TParsers>> :
        // Otherwise we convert it to a list
        SeqObjTupleOutput<GetNamedParsersConverting<TParsers>>;

type ValidateSeqInput<TParsers extends ImplicitParser[]> = TParsers;

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function seq<const TParsers extends ImplicitParser[]>(strings: TemplateStringsArray, ...implicitParsers: ValidateSeqInput<TParsers>): UnnamedParser<SeqObjOutput<TParsers>> {
  let parsers = implicitParsers.map(implicit);
  const shouldReturnObject = parsers.some(i => ("nameValue" in i) && typeof i.nameValue === "string");
  let namedParsers = parsers.filter(i => ("nameValue" in i)) as NamedParser<any, any>[];
  if (namedParsers.length === 0) {
    if (process.env.EXPERIMENTAL_OPTIMISER === "true" && parsers.every(i => i.optimiserHints.regexp)) {
      const optimizerId = nanoid();
      return regexp(new RegExp(strings.map((i, n) => `${escapeRegExp(i)}${parsers[n] ? `(?<optimizer_${optimizerId}_${n}>${parsers[n].optimiserHints.regexp?.source ?? ""})` : ""}`).join("")), (i, m) => {
        const items: any[] = [];
        for (let i = 0; i < parsers.length; i++) {
          const transformer = parsers[i].optimiserHints.transform;
          const match = m.groups![`optimizer_${optimizerId}_${i}`]
          items.push(transformer ? transformer(match) : match);
        }
        return items;
      }) as any;
    }
    parsers = namedParsers = parsers.map((i, index) => i(index));
  }
  return custom(text => {
    let taken = 0;
    const result = (shouldReturnObject ? {} : new Array((namedParsers.map(i => i.nameValue).max() as number) + 1).fill(null!)) as SeqObjOutput<TParsers>;
    for (let i = 0; i < strings.length; i++) {
      if (!text.slice(taken).startsWith(strings[i])) {
        throw new Error(`Unable to match '${strings[i]}' with '${text.slice(taken)}' in '${text}' at index ${taken}`);
      }
      taken += strings[i].length;
      if (!parsers[i]) continue;
      const { [parseFnSymbol]: parse, ...rest } = parsers[i];
      const parserResult = parse(text.slice(taken));
      taken += parserResult.taken;
      if ("nameValue" in rest) {
        result[((rest as any).nameValue ?? i) as keyof typeof result] = parserResult.result as any;
      }
    }
    return {
      result: namedParsers.length === 1 ? Object.values(result as any)[0] as any : result,
      taken
    };
  });
}

function sep<const TParser extends ImplicitParser>(parser: TParser, sep: ImplicitParser): Parser<ResultOf<TParser>[]> {
  const mainParser = implicit(parser);
  const sepParser = implicit(sep);
  return custom(text => {
    const finalResult: ParserResult<ResultOf<TParser>[]> = {
      result: [],
      taken: 0
    };
    let previousSeparatorTaken = 0;
    let loops = 0;
    while (finalResult.taken < text.length) {
      if (loops++ > 1000) throw new Error("Over 1000 loops");
      try {
        const result = mainParser[parseFnSymbol](text.slice(finalResult.taken + previousSeparatorTaken));
        finalResult.taken += result.taken + previousSeparatorTaken;
        finalResult.result.push(result.result);
        const separator = sepParser[parseFnSymbol](text.slice(finalResult.taken));
        previousSeparatorTaken = separator.taken;
      } catch (err) {
        if (finalResult.taken === 0) {
          throw err;
        }
        break;
      }
    }
    return finalResult;
  });
}

function or<TParser extends ImplicitParser>(...implicitParsers: TParser[]): UnnamedParser<ResultOf<TParser>> {
  const parsers = implicitParsers.map(p => implicit(p));
  return custom(text => {
    for (const parser of parsers) {
      try {
        return parser[parseFnSymbol](text);
      } catch {
      }
    }
    throw new Error(`No parsers matched '${text}'`);
  });
}

function parseText<TParser extends ImplicitParser>(parserBuilder: TParser, text: string): ResultOf<TParser> {
  const { [parseFnSymbol]: parse } = implicit(parserBuilder);
  const { result, taken } = parse(text);
  if (taken < text.length) {
    console.warn(`No parsers remaining with '${text.slice(taken)}' in '${text}' at index ${taken}`);
  }
  return result;
}

type DictEntry<TKey extends keyof any, TValue> = ({
  key: TKey,
  value: TValue
} | readonly [TKey, TValue]);

function dict<TKey extends keyof any, TValue>(entries: DictEntry<TKey, TValue>[]): { [key in TKey]: TValue } {
  return Object.fromEntries(entries.map(i => {
    if ("key" in i) {
      return [i.key, i.value];
    }
    return i;
  })) as { [key in TKey]: TValue };
}

function dictWithDefault<TKey extends keyof any, TValue>(defaultValue: { [key in TKey]: TValue }): typeof dict {
  return (entries) => ({ ...defaultValue, ...dict(entries) });
}

function isTemplateStringsArray(value: any): value is TemplateStringsArray {
  return typeof value === "object" && "raw" in value;
}

export function p<const TParsers extends ImplicitParser[]>(strings: TemplateStringsArray, ...parsers: ValidateSeqInput<TParsers>): UnnamedParser<SeqObjOutput<TParsers>>;
export function p<TParser extends ImplicitParser>(parser: TParser): ImplicitParserType<TParser>
export function p<TParsers extends ImplicitParser[]>(parsers: TParsers): UnnamedParser<ResultOf<TParsers[number]>>;
export function p(...[mainParam, ...params]: (
  [TemplateStringsArray, ...ImplicitParser[]] |
  [ImplicitParser] |
  [ImplicitParser[]]
  )): any {
  if (isTemplateStringsArray(mainParam)) return seq(mainParam, ...params as any);
  if (typeof mainParam === "object" && mainParam instanceof RegExp) return implicit(mainParam);
  if (Array.isArray(mainParam)) return or(...mainParam);
  return implicit(mainParam);
}

p.word = word;
p.num = num;
p.digit = digit;
