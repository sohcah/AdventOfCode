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

export type ResultOf<T extends ImplicitParser> = GetParserResult<ImplicitParserType<T>[ParseFnSymbol]>;

interface NamedParser<TName extends string, TResult> extends Parser<TResult> {
  nameValue: TName;
}

interface UnnamedParser<TResult> extends Parser<TResult> {
  nameValue: never;
}

export interface Parser<TResult> {
  <const TName extends string>(name: TName): NamedParser<TName, TResult>;

  [parseFnSymbol]: ParseFn<TResult>;

  parse(text: string): TResult;

  map<TNewResult>(transformer: (value: TResult) => TNewResult): UnnamedParser<TNewResult>;

  list(parser?: ImplicitParser): UnnamedParser<TResult[]>;

  dict: TResult extends DictEntry<infer TKey, infer TValue>[] ? ((defaultValues?: Record<TKey, TValue>) => UnnamedParser<Record<TKey, TValue>>) : never;
}

function custom<TResult>(parse: ParseFn<TResult>): UnnamedParser<TResult> {
  const createNamed: any = function <const TName extends string>(name: TName) {
    const named = custom(parse) as NamedParser<TName, TResult>;
    named.nameValue = name;
    return named;
  };

  createNamed[parseFnSymbol] = parse;
  createNamed.parse = (text: string) => parseText(createNamed, text)
  createNamed.map = <TNewResult>(transformer: (value: TResult) => TNewResult) => {
    return custom(text => {
      const result = parse(text);
      return {
        result: transformer(result.result),
        taken: result.taken
      };
    });
  };
  createNamed.list = (separatorParser: ImplicitParser = /,\s*/) => {
    return sep(createNamed, separatorParser);
  };
  createNamed.dict = (defaultValues: any) => {
    return createNamed.map(dictWithDefault(defaultValues));
  };
  return createNamed;
}

function regexp<TResult = string>(regexp: RegExp, parse: (text: string, value: RegExpMatchArray) => TResult = ((i) => i as TResult)) {
  return custom(text => {
    const source = regexp.source.startsWith("^") ? regexp : `^(?:${regexp.source})`;
    const mutatedRegexp = new RegExp(source, regexp.flags);
    const result = text.match(mutatedRegexp);
    if (!result) throw new Error(`Unable to match ${regexp.toString()} with '${text}'`);
    return {
      taken: result[0].length,
      result: parse(result[0], result)
    };
  });
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

type ImplicitParser = Parser<any> | RegExp | string;
type ImplicitParserType<TParser extends ImplicitParser> =
  TParser extends Parser<any> ? TParser : TParser extends RegExp ? UnnamedParser<string> : TParser extends string ? UnnamedParser<string> : never;

function implicit<TParser extends ImplicitParser>(parser: TParser): ImplicitParserType<TParser> {
  if (typeof parser === "string") {
    return text(parser) as any;
  }
  if (parser instanceof RegExp) {
    return regexp(parser) as any;
  }
  return parser as any;
}

const digit = regexp(/\d/, (i) => Number(i));
const num = regexp(/\d+/, (i) => Number(i));
const word = regexp(/[a-zA-Z0-9]+/);

type SeqObjOutput<TParsers extends Parser<any>[] | NamedParser<any, any>[]> =
  TParsers extends UnnamedParser<any>[] ? TParsers extends [any] ? {
      [key in keyof TParsers]: GetParserResult<TParsers[key][ParseFnSymbol]>
    }[number] : {
      [key in keyof TParsers]: GetParserResult<TParsers[key][ParseFnSymbol]>
    }
    : TParsers extends NamedParser<any, any>[] ? UnionToIntersection<{
      [key in keyof TParsers]: { [key2 in TParsers[key]["nameValue"]]: GetParserResult<TParsers[key][ParseFnSymbol]> };
    }[number]> : never;

type ValidateSeqInput<TParsers extends Parser<any>[] | NamedParser<any, any>[]> =
  TParsers extends NamedParser<any, any>[] ? TParsers : TParsers extends UnnamedParser<any>[] ? TParsers : TParsers & {
    "You must have either all named parsers or all unnamed parsers in a sequence": ""
  }

function seq<const TParsers extends Parser<any>[] | NamedParser<any, any>[]>(strings: TemplateStringsArray, ...parsers: ValidateSeqInput<TParsers>): UnnamedParser<SeqObjOutput<TParsers>> {
  return custom(text => {
    let taken = 0;
    const shouldReturnArray = parsers.some(i => !("nameValue" in i));
    const result = (shouldReturnArray ? new Array(parsers.length).fill(null) : {}) as SeqObjOutput<TParsers>;
    for (let i = 0; i < strings.length; i++) {
      if (!text.slice(taken).startsWith(strings[i])) {
        throw new Error(`Unable to match '${strings[i]}' with '${text.slice(taken)}' in '${text}' at index ${taken}`);
      }
      taken += strings[i].length;
      if (!parsers[i]) continue;
      const { [parseFnSymbol]: parse, ...rest } = parsers[i];
      const parserResult = parse(text.slice(taken));
      taken += parserResult.taken;
      result[((rest as any).nameValue ?? i) as keyof typeof result] = parserResult.result as any;
    }
    return {
      result: result.length === 1 ? result[0] : result,
      taken
    };
  });
}

function sep<const TParser extends Parser<any>>(parser: TParser, sep: ImplicitParser): Parser<ResultOf<TParser>[]> {
  const sepParser = implicit(sep);
  return custom(text => {
    const finalResult: ParserResult<GetParserResult<TParser[ParseFnSymbol]>[]> = {
      result: [],
      taken: 0
    };
    let loops = 0;
    while (finalResult.taken < text.length) {
      if (loops++ > 1000) throw new Error("Over 1000 loops");
      try {
        const result = parser[parseFnSymbol](text.slice(finalResult.taken));
        finalResult.taken += result.taken;
        finalResult.result.push(result.result);
        const separator = sepParser[parseFnSymbol](text.slice(finalResult.taken));
        finalResult.taken += separator.taken;
      } catch {
        return finalResult;
      }
    }
    return finalResult;
  });
}

function or<TParser extends ImplicitParser>(...parsers: TParser[]): UnnamedParser<ResultOf<TParser>> {
  return custom(text => {
    for (const parser of parsers) {
      try {
        return implicit(parser)[parseFnSymbol](text);
      } catch {
      }
    }
    throw new Error(`No parsers matched '${text}'`);
  });
}

function parseText<TParser extends Parser<any>>(parserBuilder: TParser, text: string): ResultOf<TParser> {
  const { [parseFnSymbol]: parse } = parserBuilder("");
  const { result, taken } = parse(text);
  if (taken < text.length) {
    console.warn(`No parsers remaining with '${text.slice(taken)}' in '${text}' at index ${taken}`);
  }
  return result;
}

type DictEntry<TKey extends keyof any, TValue> = ({
  key: TKey,
  value: TValue
} | [TKey, TValue]);

function dict<TKey extends keyof any, TValue>(entries: DictEntry<TKey, TValue>[]): { [key in TKey]: TValue } {
  return Object.fromEntries(entries.map(i => {
    if (Array.isArray(i)) {
      return i;
    }
    return [i.key, i.value];
  })) as { [key in TKey]: TValue };
}

function dictWithDefault<TKey extends keyof any, TValue>(defaultValue: { [key in TKey]: TValue }): typeof dict {
  return (entries) => ({ ...defaultValue, ...dict(entries) });
}

function isTemplateStringsArray(value: any): value is TemplateStringsArray {
  return typeof value === "object" && Array.isArray(value) && "raw" in value;
}

export function p<const TParsers extends Parser<any>[] | NamedParser<any, any>[]>(strings: TemplateStringsArray, ...parsers: ValidateSeqInput<TParsers>): UnnamedParser<SeqObjOutput<TParsers>>;
export function p<TParser extends ImplicitParser>(parser: TParser): ImplicitParserType<TParser>
export function p<TParsers extends ImplicitParser[]>(parsers: TParsers): UnnamedParser<ResultOf<TParsers[number]>>;
export function p(...[mainParam, ...params]: (
  [TemplateStringsArray, ...Parser<any>[]] |
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
