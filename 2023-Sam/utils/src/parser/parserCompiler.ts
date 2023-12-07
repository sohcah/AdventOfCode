import { customAlphabet } from "nanoid";
import type { Number as TSNumber } from "ts-toolbelt";
import { writeFileSync } from "fs";
import { assertType } from "../index";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 10);

const internalTypeSymbol = Symbol("internalType");
type InternalTypeSymbol = typeof internalTypeSymbol;

const internalNameSymbol = Symbol("internalName");
type InternalNameSymbol = typeof internalNameSymbol;

type GenerateCodeOptions = {
  useTextAfter?: boolean;
}

export interface Parser<TResult> {
  <TName extends string | number>(name: TName): NamedParser<TResult, TName>;
  generateCode(options?: GenerateCodeOptions): {
    result: string;
    taken: string;
    content: {
      global?: string;
      local?: string;
    };
  };
  list<TSeparatorParser extends ImplicitParser>(separatorParser: TSeparatorParser): UnnamedParser<TResult[]>;
  parse(text: string): TResult;
  map<TNewResult>(fn: (result: TResult) => TNewResult): UnnamedParser<TNewResult>;
  dict: TResult extends DictEntry<infer TKey, infer TValue>[] ? ((defaultValues?: Record<TKey, TValue>) => UnnamedParser<Record<TKey, TValue>>) : never;
  [internalTypeSymbol]: TResult;
}

export interface UnnamedParser<TResult> extends Parser<TResult> {
  type: "unnamed";
  [internalNameSymbol]: null;
}

export interface NamedParser<TResult, TName extends string | number> extends Parser<TResult> {
  type: "named";
  [internalNameSymbol]: TName;
}

type ImplicitParser = NamedParser<any, any> | UnnamedParser<any> | RegExp | string;

export type ResultOf<TParser extends ImplicitParser> = ParserOf<TParser>[InternalTypeSymbol];

export type ParserOf<TParser extends ImplicitParser> = TParser extends NamedParser<any, any> ? TParser :
  TParser extends UnnamedParser<any> ? TParser :
    TParser extends RegExp ? UnnamedParser<string> :
      TParser extends string ? UnnamedParser<string> :
        never;

function fromImplicit<const TParser extends ImplicitParser>(parser: TParser): ParserOf<TParser> {
  if (parser instanceof RegExp) {
    return regexp(parser) as any;
  }
  if (typeof parser === "string") {
    return text(parser) as any;
  }
  return parser as any;
}

type DictEntry<TKey extends keyof any, TValue> = ({
  key: TKey,
  value: TValue
} | readonly [TKey, TValue]);

function dict<const TKey extends keyof any, const TValue>(entries: DictEntry<TKey, TValue>[]): { [key in TKey]: TValue } {
  return Object.fromEntries(entries.map(i => {
    if ("key" in i) {
      return [i.key, i.value];
    }
    return i;
  })) as { [key in TKey]: TValue };
}

function dictWithDefault<const TKey extends keyof any, const TValue>(defaultValue: { [key in TKey]: TValue }): typeof dict {
  return (entries) => ({ ...defaultValue, ...dict(entries) });
}

function createParser<const TResult>(contentBuilder: (result: string, taken: string, breakLabel: string) => Generator<string | {
  global?: string;
  local?: string;
}>): UnnamedParser<TResult> {
  function toNamed<TName extends string | number>(name: TName): NamedParser<TResult, TName> {
    return Object.assign(createParser<TResult>(contentBuilder), {
      type: "named",
      [internalNameSymbol]: name
    }) as any as NamedParser<TResult, TName>;
  }

  toNamed.generateCode = ({
    useTextAfter = false
                          }: GenerateCodeOptions = {}) => {
    const id = nanoid();
    const content = contentBuilder(`${id}_result`, `${id}_taken`, `${id}_break`);
    const lines = [];
    const globalLines = [];
    for (const line of content) {
      if (typeof line === "string") {
        lines.push(line);
      } else {
        if (line.local) lines.push(line.local);
        if (line.global) globalLines.push(line.global);
      }
    }
    const text = lines.join("\n");
    return {
      result: `${id}_result`,
      taken: `${id}_taken`,
      content: {
        global: globalLines.join("\n"),
        local: `const ${id}_outerText = text;let ${id}_result,${id}_taken;\n${text.includes(`${id}_break`) ? `${id}_break: ` : ""}{\nlet text = ${id}_outerText;\n${text}\n}${useTextAfter ? `\nif(${id}_taken!==FAIL)text = text.slice(${id}_taken);` : ""}`,
      }
    };
  };
  toNamed.list = <const TSeparatorParser extends ImplicitParser>(separatorParser: TSeparatorParser): any => {
    return list(toNamed as ImplicitParser, fromImplicit(separatorParser));
  }
  toNamed.parse = (text: string) => {
    return createParserFunction(toNamed as ImplicitParser)(text) as TResult;
  }
  toNamed.map = <const TNewResult>(fn: (result: TResult) => TNewResult): any => {
    const id = `parserCompiler__${nanoid()}__map`;
    // @ts-expect-error
    globalThis[id] = fn;
    return createParser<TNewResult>(function* (result, taken, breakLabel) {
      const n = toNamed.generateCode();
      yield n.content;
      yield `if (${n.taken}===FAIL) {${result}=${n.result},${taken}=FAIL;break ${breakLabel};}`;
      yield `${result}=${id}(${n.result});${taken}=${n.taken};`;
    });
  }
  toNamed.dict = ((defaultValues: any) => {
    return toNamed.map(dictWithDefault(defaultValues) as any);
  }) as any;
  toNamed[internalTypeSymbol] = null as TResult;
  toNamed["type"] = "unnamed" as const;
  toNamed[internalNameSymbol] = null;

  return toNamed;
}

export const num = createParser<number>(function* (result, taken) {
  yield `let num = 0;
let index;
for (index = 0; index < text.length; index++) {
  const char = text.charCodeAt(index);
  if (char < 48 || char > 57) break;
  num = num * 10 + char - 48;
}
if (!index) ${result}="Unable to match number",${taken}=FAIL;
else ${result}=num,${taken}=index;`;
});

export const digit = createParser<number>(function* (result, taken) {
  yield `if (text.length === 0) ${result}="Unable to match digit",${taken}=FAIL;
const char = text.charCodeAt(0);
if (char < 48 || char > 57) ${result}="Unable to match digit",${taken}=FAIL;
else ${result}=char-48,${taken}=1;`;
});

export const regexp = (regexp: RegExp) => createParser<string>(function* (result, taken) {
  const source = regexp.source.startsWith("^") ? regexp.source : `^(?:${regexp.source})`;
  const mutatedRegexp = new RegExp(source, regexp.flags);
  const id = nanoid();
  yield { global: `const ${id}_regex = ${mutatedRegexp.toString()};` }
  yield `const match = ${id}_regex.exec(text);
if (!match) ${result}="Unable to match regex",${taken}=FAIL;
else ${result}=match[0],${taken}=match[0].length;`;
});

export const text = (text: string) => createParser<string>(function* (result, taken) {
  yield `if (text.slice(0,${text.length}) !== ${JSON.stringify(text)}) ${result}="Unable to match text (\\"${JSON.stringify(text).slice(1, -1)}\\") with " + text,${taken}=FAIL;
else ${result}=${JSON.stringify(text)},${taken}=${text.length};`;
});

export const or = <const TParsers extends ImplicitParser[]>(...parsers: TParsers) => createParser<ResultOf<TParsers[number]>>(function* (result, taken, breakLabel) {
  for (const parser of parsers) {
    const n = fromImplicit(parser).generateCode();
    yield n.content;
    yield `if (${n.taken}!==FAIL) {${result}=${n.result};${taken}=${n.taken};break ${breakLabel};}`;
  }
  yield `${result}="Unable to match or",${taken}=FAIL;`;
});

export const sequence = <const TParsers extends ImplicitParser[]>(...parsers: TParsers) => createParser<{
  [K in keyof TParsers]: ResultOf<TParsers[K]>;
}>(function* (result, taken, breakLabel) {
  const results = [];
  yield `${taken}=0;`;
  for (let i = 0; i < parsers.length; i++) {
    const parser = parsers[i];
    const n = fromImplicit(parser).generateCode({ useTextAfter: i !== parsers.length - 1 });
    yield n.content;
    results.push(n.result);
    yield `if (${n.taken}===FAIL) {${result}="Unable to match sequence - " + ${n.result},${taken}=FAIL;break ${breakLabel};}`;
    yield `${taken}+=${n.taken};`;
  }
  yield `${result}=[${results.join(",")}];`;
});

export const list = <const TItemParser extends ImplicitParser, TSeparatorParser extends ImplicitParser>(itemParser: TItemParser, separatorParser: TSeparatorParser) => createParser<ResultOf<TItemParser>[]>(function* (result, taken, breakLabel) {
  yield `${result}=[];${taken}=0;`;
  const n = fromImplicit(itemParser).generateCode({ useTextAfter: true });
  yield n.content;
  yield `if (${n.taken}===FAIL) {${result}="Unable to match list - " + ${n.result},${taken}=FAIL;break ${breakLabel};}`;
  yield `${result}.push(${n.result});${taken}+=${n.taken};`;
  yield `while (true) {`;
  {
    const n = fromImplicit(separatorParser).generateCode({ useTextAfter: true });
    yield n.content;
    yield `if (${n.taken}===FAIL) break;`;
    const n2 = fromImplicit(itemParser).generateCode({ useTextAfter: true });
    yield n2.content;
    yield `if (${n2.taken}===FAIL) break;`;
    yield `${taken}+=${n.taken};`;
    yield `${result}.push(${n2.result});${taken}+=${n2.taken};`;
  }
  yield `}`;
});


type FilterTuple<T extends readonly any[], E> =
  T extends readonly [infer F, ...infer R] ? readonly [F] extends readonly [E] ?
    readonly [F, ...FilterTuple<R, E>] : FilterTuple<R, E> : []

type SeqObjNamedParsers<TParsers extends readonly ImplicitParser[]> =
  FilterTuple<TParsers, {
    type: "named";
    [internalNameSymbol]: string | number;
  }>;

type SeqObjHasOnlyOneNamedParser<TParsers extends readonly ImplicitParser[]> =
  SeqObjNamedParsers<GetNamedParsersConverting<TParsers>>["length"] extends 1 ? true : false

type SeqObjHasStringNamedParser<TParsers extends readonly ImplicitParser[]> =
  {
    [key in keyof TParsers]: TParsers[key] extends NamedParser<any, string> ? 1 : 0;
  }[number] extends 0 ? false : true;

type SeqObjHasNamedParser<TParsers extends readonly ImplicitParser[]> =
  {
    [key in keyof TParsers]: TParsers[key] extends NamedParser<any, any> ? 1 : 0;
  }[number] extends 0 ? false : true;

type GetNamedParsers<TParsers extends readonly ImplicitParser[]> =
  {
    [key in keyof TParsers]: TParsers[key] extends NamedParser<any, any> ? TParsers[key] : never;
  };

type NumberFrom<T extends string | number> = T extends `${infer N extends number}` ? N : T extends number ? T : never;

type GetNamedParsersConverting<TParsers extends readonly ImplicitParser[]> =
  GetNamedParsers<TParsers>[number] extends never ?
    {
      [key in keyof TParsers]: NamedParser<ResultOf<TParsers[key]>, NumberFrom<key>>;
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

type UnionToIntersection<U> =
  (U extends any ? (x: U) => void : never) extends ((x: infer I) => void) ? I : never

type SeqObjObjectOutput<TParsers extends readonly NamedParser<any, any>[]> = UnionToIntersection<{
  [key in keyof TParsers]: { readonly [key2 in TParsers[key][InternalNameSymbol]]: ResultOf<TParsers[key]> };
}[number]>

type SeqObjTupleOutput<TParsers extends readonly NamedParser<any, number>[]> =
  Omit<Tuple<ResultOf<TParsers[number]>, TSNumber.Add<1, Max<TParsers[number][InternalNameSymbol]>>>, number>
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

export const seq = <const TParsers extends ImplicitParser[]>(strings: TemplateStringsArray, ...implicitParsers: TParsers): UnnamedParser<SeqObjOutput<TParsers>> => {
  let parsers = implicitParsers.map(fromImplicit);
  let namedParsers = parsers.filter(i => i[internalNameSymbol] !== null) as NamedParser<any, any>[];
  if (namedParsers.length === 0) {
    parsers = namedParsers = parsers.map((i, index) => i(index)) as NamedParser<any, any>[];
  }
  const shouldReturnObject = namedParsers.some(i => typeof i[internalNameSymbol] === "string");

  const baseSequence = sequence(
    ...strings
      .flatMap((i, index) => [text(i), parsers[index] || text("")])
  );

  return createParser<SeqObjOutput<TParsers>>(function* (result, taken, breakLabel) {
    const baseContent = baseSequence.generateCode();
    yield baseContent.content;
    yield `if (${baseContent.taken}===FAIL) {${result}="Unable to match seq - " + ${baseContent.result},${taken}=FAIL;break ${breakLabel};}`;
    if (namedParsers.length === 1) {
      const namedParserIndex = parsers.indexOf(namedParsers[0]) * 2 + 1;
      yield `${result}=${baseContent.result}?.[${namedParserIndex}];`;
      yield `${taken}=${baseContent.taken};`;
      return;
    }
    if (shouldReturnObject) {
      yield `${result}={`;
      for (let i = 0; i < parsers.length; i++) {
        const index = i * 2 + 1;
        const parser = parsers[i];
        if (!parser) continue;
        if (parser[internalNameSymbol] === null) continue;
        yield `${JSON.stringify(parser[internalNameSymbol])}: ${baseContent.result}[${index}],`;
      }
      yield `};`;
    } else {
      const arr = new Array(namedParsers.length).fill("null");
      for (let i = 0; i < parsers.length; i++) {
        const index = i * 2 + 1;
        const parser = parsers[i];
        if (!parser) continue;
        if (parser[internalNameSymbol] === null) continue;
        arr[parser[internalNameSymbol]] = `${baseContent.result}[${index}]`;
      }
      yield `${result}=[${arr.join(",")}];`;
    }
    yield `${taken}=${baseContent.taken};`;
  });
};

export function compileParser(parser: ImplicitParser) {
  let lines = [];
  lines.push(`const FAIL = Symbol("fail");`);
  const n = fromImplicit(parser).generateCode({ useTextAfter: true });
  if (n.content.global) lines.push(n.content.global);
  if (n.content.local) lines.push(n.content.local);
  lines.push(`if (${n.taken}===FAIL) throw new Error(${n.result});`);
  // lines.push(`if (text.length !== 0) throw new Error("Unable to finish matching");`)
  lines.push(`if (text.length !== 0) console.warn(\`Unable to match entire string, $\{text.length} left.\`);`)
  lines.push(`return ${n.result};`);
  return lines.join("\n");
}

export function createParserFunction<const TParser extends ImplicitParser>(parser: TParser) {
  const compiled = compileParser(parser);
  try {
    return (new Function("text", compiled)) as (text: string) => ResultOf<TParser>;
  } catch {
    console.log(compiled);
    writeFileSync("parserCompilerError.txt", compiled);
    throw new Error("Failed to compile parser");
  }
}


function isTemplateStringsArray(value: any): value is TemplateStringsArray {
  return typeof value === "object" && "raw" in value;
}

export function p<const TParsers extends readonly ImplicitParser[]>(strings: TemplateStringsArray, ...parsers: TParsers): UnnamedParser<SeqObjOutput<TParsers>>;
export function p<const TParser extends ImplicitParser>(parser: TParser): ParserOf<TParser>
export function p<const TParsers extends ImplicitParser[]>(parsers: TParsers): UnnamedParser<ResultOf<TParsers[number]>>;
export function p(...[mainParam, ...params]: (
  [TemplateStringsArray, ...ImplicitParser[]] |
  [ImplicitParser] |
  [ImplicitParser[]]
  )): any {
  if (isTemplateStringsArray(mainParam)) return seq(mainParam, ...params as any);
  if (typeof mainParam === "object" && mainParam instanceof RegExp) return fromImplicit(mainParam);
  if (Array.isArray(mainParam)) return or(...mainParam);
  return fromImplicit(mainParam);
}
p.num = num;
p.regexp = regexp;
p.text = text;
p.digit = digit;
p.word = regexp(/^\w+/);
