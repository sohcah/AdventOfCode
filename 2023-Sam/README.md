# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">2.327ms</span> / ![#66ff00](https://placehold.co/10x10/66ff00/66ff00.png) <span style="color: #ccffaa">2.236ms</span>|![#62ff00](https://placehold.co/10x10/62ff00/62ff00.png) <span style="color: #cbffaa">2.130ms</span> / ![#4aff00](https://placehold.co/10x10/4aff00/4aff00.png) <span style="color: #c3ffaa">1.372ms</span>|![#ff6d00](https://placehold.co/10x10/ff6d00/ff6d00.png) <span style="color: #ffceaa">0.130ms</span> / ![#ff3a00](https://placehold.co/10x10/ff3a00/ff3a00.png) <span style="color: #ffbdaa">0.148ms</span>|
|2|![#99ff00](https://placehold.co/10x10/99ff00/99ff00.png) <span style="color: #ddffaa">4.813ms</span> / ![#beff00](https://placehold.co/10x10/beff00/beff00.png) <span style="color: #e9ffaa">7.829ms</span>|![#83ff00](https://placehold.co/10x10/83ff00/83ff00.png) <span style="color: #d6ffaa">3.564ms</span> / ![#89ff00](https://placehold.co/10x10/89ff00/89ff00.png) <span style="color: #d8ffaa">3.939ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.169ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.169ms</span>|
|3|![#66ff00](https://placehold.co/10x10/66ff00/66ff00.png) <span style="color: #ccffaa">2.214ms</span> / ![#afff00](https://placehold.co/10x10/afff00/afff00.png) <span style="color: #e4ffaa">6.459ms</span>|![#4bff00](https://placehold.co/10x10/4bff00/4bff00.png) <span style="color: #c3ffaa">1.382ms</span> / ![#78ff00](https://placehold.co/10x10/78ff00/78ff00.png) <span style="color: #d2ffaa">3.053ms</span>|- / -|
|4|![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">5.468ms</span> / ![#97ff00](https://placehold.co/10x10/97ff00/97ff00.png) <span style="color: #dcffaa">4.637ms</span>|![#94ff00](https://placehold.co/10x10/94ff00/94ff00.png) <span style="color: #dbffaa">4.583ms</span> / ![#97ff00](https://placehold.co/10x10/97ff00/97ff00.png) <span style="color: #dcffaa">4.749ms</span>|- / -|
|5|![#63ff00](https://placehold.co/10x10/63ff00/63ff00.png) <span style="color: #cbffaa">2.113ms</span> / ![#91ff00](https://placehold.co/10x10/91ff00/91ff00.png) <span style="color: #daffaa">4.286ms</span>|![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">1.631ms</span> / ![#7fff00](https://placehold.co/10x10/7fff00/7fff00.png) <span style="color: #d4ffaa">3.367ms</span>|- / -|
|6|![#22ff00](https://placehold.co/10x10/22ff00/22ff00.png) <span style="color: #b5ffaa">0.475ms</span> / ![#20ff00](https://placehold.co/10x10/20ff00/20ff00.png) <span style="color: #b5ffaa">0.437ms</span>|![#1dff00](https://placehold.co/10x10/1dff00/1dff00.png) <span style="color: #b4ffaa">0.400ms</span> / ![#17ff00](https://placehold.co/10x10/17ff00/17ff00.png) <span style="color: #b2ffaa">0.309ms</span>|- / -|
|7|![#97ff00](https://placehold.co/10x10/97ff00/97ff00.png) <span style="color: #dcffaa">4.671ms</span> / ![#85ff00](https://placehold.co/10x10/85ff00/85ff00.png) <span style="color: #d6ffaa">3.582ms</span>|![#7fff00](https://placehold.co/10x10/7fff00/7fff00.png) <span style="color: #d4ffaa">3.354ms</span> / ![#7fff00](https://placehold.co/10x10/7fff00/7fff00.png) <span style="color: #d4ffaa">3.360ms</span>|- / -|
|8|![#96ff00](https://placehold.co/10x10/96ff00/96ff00.png) <span style="color: #dcffaa">4.626ms</span> / ![#ecff00](https://placehold.co/10x10/ecff00/ecff00.png) <span style="color: #f9ffaa">14.070ms</span>|![#a4ff00](https://placehold.co/10x10/a4ff00/a4ff00.png) <span style="color: #e1ffaa">5.689ms</span> / ![#eeff00](https://placehold.co/10x10/eeff00/eeff00.png) <span style="color: #f9ffaa">14.888ms</span>|- / -|
|9|![#8aff00](https://placehold.co/10x10/8aff00/8aff00.png) <span style="color: #d8ffaa">3.847ms</span> / ![#90ff00](https://placehold.co/10x10/90ff00/90ff00.png) <span style="color: #daffaa">4.194ms</span>|![#98ff00](https://placehold.co/10x10/98ff00/98ff00.png) <span style="color: #ddffaa">4.817ms</span> / ![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">3.766ms</span>|- / -|
|10|![#92ff00](https://placehold.co/10x10/92ff00/92ff00.png) <span style="color: #dbffaa">4.332ms</span> / ![#dfff00](https://placehold.co/10x10/dfff00/dfff00.png) <span style="color: #f4ffaa">11.943ms</span>|![#bbff00](https://placehold.co/10x10/bbff00/bbff00.png) <span style="color: #e8ffaa">7.783ms</span> / ![#fbff00](https://placehold.co/10x10/fbff00/fbff00.png) <span style="color: #feffaa">17.457ms</span>|- / -|
|11|![#8cff00](https://placehold.co/10x10/8cff00/8cff00.png) <span style="color: #d9ffaa">4.003ms</span> / ![#8bff00](https://placehold.co/10x10/8bff00/8bff00.png) <span style="color: #d8ffaa">3.953ms</span>|![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">3.881ms</span> / ![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">3.763ms</span>|- / -|
|12|![#b0ff00](https://placehold.co/10x10/b0ff00/b0ff00.png) <span style="color: #e5ffaa">6.533ms</span> / ![#fff600](https://placehold.co/10x10/fff600/fff600.png) <span style="color: #fffcaa">19.700ms</span>|![#b1ff00](https://placehold.co/10x10/b1ff00/b1ff00.png) <span style="color: #e5ffaa">6.849ms</span> / ![#ffdc00](https://placehold.co/10x10/ffdc00/ffdc00.png) <span style="color: #fff3aa">27.988ms</span>|- / -|
|13|![#4dff00](https://placehold.co/10x10/4dff00/4dff00.png) <span style="color: #c4ffaa">1.421ms</span> / ![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">1.599ms</span>|![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">1.628ms</span> / ![#6bff00](https://placehold.co/10x10/6bff00/6bff00.png) <span style="color: #ceffaa">2.470ms</span>|- / -|
|14|![#5fff00](https://placehold.co/10x10/5fff00/5fff00.png) <span style="color: #caffaa">1.967ms</span> / ![#ffd500](https://placehold.co/10x10/ffd500/ffd500.png) <span style="color: #fff1aa">29.175ms</span>|![#74ff00](https://placehold.co/10x10/74ff00/74ff00.png) <span style="color: #d1ffaa">2.833ms</span> / ![#ff9b00](https://placehold.co/10x10/ff9b00/ff9b00.png) <span style="color: #ffdeaa">60.618ms</span>|- / -|
|15|![#58ff00](https://placehold.co/10x10/58ff00/58ff00.png) <span style="color: #c7ffaa">1.759ms</span> / ![#7bff00](https://placehold.co/10x10/7bff00/7bff00.png) <span style="color: #d3ffaa">3.085ms</span>|![#59ff00](https://placehold.co/10x10/59ff00/59ff00.png) <span style="color: #c8ffaa">1.818ms</span> / ![#72ff00](https://placehold.co/10x10/72ff00/72ff00.png) <span style="color: #d0ffaa">2.746ms</span>|- / -|
|16|![#8dff00](https://placehold.co/10x10/8dff00/8dff00.png) <span style="color: #d9ffaa">4.048ms</span> / ![#ffb700](https://placehold.co/10x10/ffb700/ffb700.png) <span style="color: #ffe7aa">41.894ms</span>|![#a5ff00](https://placehold.co/10x10/a5ff00/a5ff00.png) <span style="color: #e1ffaa">5.788ms</span> / ![#ffa200](https://placehold.co/10x10/ffa200/ffa200.png) <span style="color: #ffe0aa">56.116ms</span>|- / -|
|17|![#ff5a00](https://placehold.co/10x10/ff5a00/ff5a00.png) <span style="color: #ffc8aa">123.173ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">347.642ms</span>|![#ff5c00](https://placehold.co/10x10/ff5c00/ff5c00.png) <span style="color: #ffc9aa">127.631ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">373.999ms</span>|- / -|
|18|![#6cff00](https://placehold.co/10x10/6cff00/6cff00.png) <span style="color: #ceffaa">2.436ms</span> / ![#6dff00](https://placehold.co/10x10/6dff00/6dff00.png) <span style="color: #ceffaa">2.509ms</span>|![#61ff00](https://placehold.co/10x10/61ff00/61ff00.png) <span style="color: #caffaa">2.098ms</span> / ![#66ff00](https://placehold.co/10x10/66ff00/66ff00.png) <span style="color: #ccffaa">2.269ms</span>|- / -|
|19|- / -|- / -|- / -|
|20|- / -|- / -|- / -|
|21|- / -|- / -|- / -|
|22|- / -|- / -|- / -|
|23|- / -|- / -|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|689.456ms|774.090ms|0.616ms|
<!--BENCHMARKEND-->

## Commands

### Test Day

```bash
bun run {prefix}:test <day> <part>
```

For example to test TypeScript Day 1 Part 1
```bash
bun run ts:test 1 1
```

### Run Day

```bash
bun run {prefix}:start <day> <part>
```

For example to run Rust Day 1 Part 2
```bash
bun run rs:start 1 2
```

### Run All

```bash
bun run {prefix}:all[-test]
```

For example, to run all Rust

```bash
bun run rs:all
```

For example, to run all TypeScript Test

```bash
bun run ts:all-test
```

### Benchmark

```bash
bun run bench
```
