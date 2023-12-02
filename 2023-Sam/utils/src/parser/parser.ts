type UnionToIntersection<U> =
  (U extends any ? (x: U) => void : never) extends ((x: infer I) => void) ? I : never

type ParseFn<TResult> = (value: string) => ParserResult<TResult>;

type ParserResult<TResult> = {
  taken: number;
  result: TResult;
}

type GetParserResult<T extends ParseFn<any>> = ReturnType<T>["result"];

export type ResultOf<T extends ImplicitParser> = GetParserResult<ImplicitParserType<T>["parse"]>;

type NamedParser<TName extends string, TResult> = {
  nameValue: TName;
} & Parser<TResult>;

export interface Parser<TResult> {
  <const TName extends string>(name: TName): NamedParser<TName, TResult>;

  parse: ParseFn<TResult>;

  map<TNewResult>(transformer: (value: TResult) => TNewResult): Parser<TNewResult>;

  list(parser?: ImplicitParser): Parser<TResult[]>;

  dict: TResult extends DictEntry<infer TKey, infer TValue>[] ? ((defaultValues?: Record<TKey, TValue>) => Parser<Record<TKey, TValue>>) : never;
}

function custom<TResult>(parse: ParseFn<TResult>): Parser<TResult> {
  const createNamed: any = function <const TName extends string>(name: TName) {
    const named = custom(parse) as NamedParser<TName, TResult>;
    named.nameValue = name;
    return named;
  };

  createNamed.parse = parse;
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
  TParser extends Parser<any> ? TParser : TParser extends RegExp ? Parser<string> : TParser extends string ? Parser<string> : never;

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

type SeqObjOutput<TParsers extends NamedParser<any, any>[]> = UnionToIntersection<{
  [key in keyof TParsers]: { [key2 in TParsers[key]["nameValue"]]: GetParserResult<TParsers[key]["parse"]> };
}[number]>

function seqObj<const TParsers extends NamedParser<any, any>[]>(strings: TemplateStringsArray, ...parsers: TParsers): Parser<SeqObjOutput<TParsers>> {
  return custom(text => {
    let taken = 0;
    const result = {} as SeqObjOutput<TParsers>;
    for (let i = 0; i < strings.length; i++) {
      if (!text.slice(taken).startsWith(strings[i])) {
        throw new Error(`Unable to match '${strings[i]}' with '${text.slice(taken)}' in '${text}' at index ${taken}`);
      }
      taken += strings[i].length;
      if (!parsers[i]) continue;
      const { parse, nameValue } = parsers[i];
      const parserResult = parse(text.slice(taken));
      taken += parserResult.taken;
      result[nameValue as TParsers[number]["nameValue"]] = parserResult.result as any;
    }
    return {
      result,
      taken
    };
  });
}

function seq<const TParsers extends Parser<any>[]>(strings: TemplateStringsArray, ...parsers: TParsers): Parser<{
  [key in keyof TParsers]: GetParserResult<TParsers[key]["parse"]>
}> {
  const objSeq = seqObj(strings, ...parsers.map((i, n) => i(String(n))));
  return custom(text => {
    const result = objSeq.parse(text);
    return {
      result: Object.assign(new Array(parsers.length).fill(null), result.result) as {
        [key in keyof TParsers]: GetParserResult<TParsers[key]["parse"]>
      },
      taken: result.taken
    };
  });
}

function sep<const TParser extends Parser<any>>(parser: TParser, sep: ImplicitParser): Parser<GetParserResult<TParser["parse"]>[]> {
  const sepParser = implicit(sep);
  return custom(text => {
    const finalResult: ParserResult<GetParserResult<TParser["parse"]>[]> = {
      result: [],
      taken: 0
    };
    let loops = 0;
    while (finalResult.taken < text.length) {
      if (loops++ > 1000) throw new Error("Over 1000 loops");
      try {
        const result = parser.parse(text.slice(finalResult.taken));
        finalResult.taken += result.taken;
        finalResult.result.push(result.result);
        const separator = sepParser.parse(text.slice(finalResult.taken));
        finalResult.taken += separator.taken;
      } catch {
        return finalResult;
      }
    }
    return finalResult;
  });
}

function parse<TParser extends Parser<any>>(parserBuilder: TParser, text: string): ResultOf<TParser> {
  const { parse } = parserBuilder("");
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

export const p = function <TParser extends ImplicitParser>(parser: TParser): ImplicitParserType<TParser> {
  return implicit(parser);
};
p.regexp = regexp;
p.seqObj = seqObj;
p.seq = seq;
p.sep = sep;
p.parse = parse;
p.word = word;
p.num = num;
p.digit = digit;
p.dict = dict;
p.dictWithDefault = dictWithDefault;
