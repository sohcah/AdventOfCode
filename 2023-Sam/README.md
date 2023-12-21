# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#7dff00](https://placehold.co/10x10/7dff00/7dff00.png) <span style="color: #d4ffaa">2.180ms</span> / ![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">2.019ms</span>|![#64ff00](https://placehold.co/10x10/64ff00/64ff00.png) <span style="color: #cbffaa">1.642ms</span> / ![#5aff00](https://placehold.co/10x10/5aff00/5aff00.png) <span style="color: #c8ffaa">1.396ms</span>|![#ff8600](https://placehold.co/10x10/ff8600/ff8600.png) <span style="color: #ffd7aa">0.146ms</span> / ![#ff8500](https://placehold.co/10x10/ff8500/ff8500.png) <span style="color: #ffd6aa">0.146ms</span>|
|2|![#adff00](https://placehold.co/10x10/adff00/adff00.png) <span style="color: #e4ffaa">3.991ms</span> / ![#b8ff00](https://placehold.co/10x10/b8ff00/b8ff00.png) <span style="color: #e7ffaa">4.503ms</span>|![#97ff00](https://placehold.co/10x10/97ff00/97ff00.png) <span style="color: #dcffaa">3.338ms</span> / ![#9bff00](https://placehold.co/10x10/9bff00/9bff00.png) <span style="color: #deffaa">3.517ms</span>|![#ff4300](https://placehold.co/10x10/ff4300/ff4300.png) <span style="color: #ffc0aa">0.174ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.203ms</span>|
|3|![#7bff00](https://placehold.co/10x10/7bff00/7bff00.png) <span style="color: #d3ffaa">2.113ms</span> / ![#bbff00](https://placehold.co/10x10/bbff00/bbff00.png) <span style="color: #e8ffaa">4.668ms</span>|![#59ff00](https://placehold.co/10x10/59ff00/59ff00.png) <span style="color: #c8ffaa">1.375ms</span> / ![#8dff00](https://placehold.co/10x10/8dff00/8dff00.png) <span style="color: #d9ffaa">2.952ms</span>|- / -|
|4|![#b0ff00](https://placehold.co/10x10/b0ff00/b0ff00.png) <span style="color: #e5ffaa">4.124ms</span> / ![#b1ff00](https://placehold.co/10x10/b1ff00/b1ff00.png) <span style="color: #e5ffaa">4.152ms</span>|![#acff00](https://placehold.co/10x10/acff00/acff00.png) <span style="color: #e3ffaa">4.328ms</span> / ![#b0ff00](https://placehold.co/10x10/b0ff00/b0ff00.png) <span style="color: #e5ffaa">4.525ms</span>|- / -|
|5|![#5eff00](https://placehold.co/10x10/5eff00/5eff00.png) <span style="color: #c9ffaa">1.380ms</span> / ![#a1ff00](https://placehold.co/10x10/a1ff00/a1ff00.png) <span style="color: #e0ffaa">3.440ms</span>|![#5bff00](https://placehold.co/10x10/5bff00/5bff00.png) <span style="color: #c8ffaa">1.422ms</span> / ![#95ff00](https://placehold.co/10x10/95ff00/95ff00.png) <span style="color: #dcffaa">3.242ms</span>|- / -|
|6|![#24ff00](https://placehold.co/10x10/24ff00/24ff00.png) <span style="color: #b6ffaa">0.399ms</span> / ![#20ff00](https://placehold.co/10x10/20ff00/20ff00.png) <span style="color: #b5ffaa">0.342ms</span>|![#26ff00](https://placehold.co/10x10/26ff00/26ff00.png) <span style="color: #b7ffaa">0.442ms</span> / ![#24ff00](https://placehold.co/10x10/24ff00/24ff00.png) <span style="color: #b6ffaa">0.414ms</span>|- / -|
|7|![#afff00](https://placehold.co/10x10/afff00/afff00.png) <span style="color: #e4ffaa">4.041ms</span> / ![#9aff00](https://placehold.co/10x10/9aff00/9aff00.png) <span style="color: #ddffaa">3.162ms</span>|![#9fff00](https://placehold.co/10x10/9fff00/9fff00.png) <span style="color: #dfffaa">3.707ms</span> / ![#8bff00](https://placehold.co/10x10/8bff00/8bff00.png) <span style="color: #d8ffaa">2.842ms</span>|- / -|
|8|![#b5ff00](https://placehold.co/10x10/b5ff00/b5ff00.png) <span style="color: #e6ffaa">4.364ms</span> / ![#ffdb00](https://placehold.co/10x10/ffdb00/ffdb00.png) <span style="color: #fff3aa">13.837ms</span>|![#c4ff00](https://placehold.co/10x10/c4ff00/c4ff00.png) <span style="color: #ebffaa">5.701ms</span> / ![#ffe500](https://placehold.co/10x10/ffe500/ffe500.png) <span style="color: #fff6aa">14.391ms</span>|- / -|
|9|![#adff00](https://placehold.co/10x10/adff00/adff00.png) <span style="color: #e4ffaa">3.991ms</span> / ![#a4ff00](https://placehold.co/10x10/a4ff00/a4ff00.png) <span style="color: #e1ffaa">3.587ms</span>|![#a2ff00](https://placehold.co/10x10/a2ff00/a2ff00.png) <span style="color: #e0ffaa">3.808ms</span> / ![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">3.719ms</span>|- / -|
|10|![#afff00](https://placehold.co/10x10/afff00/afff00.png) <span style="color: #e4ffaa">4.044ms</span> / ![#ffee00](https://placehold.co/10x10/ffee00/ffee00.png) <span style="color: #fff9aa">11.394ms</span>|![#d3ff00](https://placehold.co/10x10/d3ff00/d3ff00.png) <span style="color: #f0ffaa">6.747ms</span> / ![#ffdc00](https://placehold.co/10x10/ffdc00/ffdc00.png) <span style="color: #fff3aa">15.734ms</span>|- / -|
|11|![#a9ff00](https://placehold.co/10x10/a9ff00/a9ff00.png) <span style="color: #e2ffaa">3.792ms</span> / ![#a8ff00](https://placehold.co/10x10/a8ff00/a8ff00.png) <span style="color: #e2ffaa">3.760ms</span>|![#9fff00](https://placehold.co/10x10/9fff00/9fff00.png) <span style="color: #dfffaa">3.676ms</span> / ![#9cff00](https://placehold.co/10x10/9cff00/9cff00.png) <span style="color: #deffaa">3.558ms</span>|- / -|
|12|![#d6ff00](https://placehold.co/10x10/d6ff00/d6ff00.png) <span style="color: #f1ffaa">6.269ms</span> / ![#ffba00](https://placehold.co/10x10/ffba00/ffba00.png) <span style="color: #ffe8aa">19.112ms</span>|![#ecff00](https://placehold.co/10x10/ecff00/ecff00.png) <span style="color: #f9ffaa">8.875ms</span> / ![#ffb100](https://placehold.co/10x10/ffb100/ffb100.png) <span style="color: #ffe5aa">24.305ms</span>|- / -|
|13|![#58ff00](https://placehold.co/10x10/58ff00/58ff00.png) <span style="color: #c7ffaa">1.266ms</span> / ![#63ff00](https://placehold.co/10x10/63ff00/63ff00.png) <span style="color: #cbffaa">1.507ms</span>|![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">1.239ms</span> / ![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">1.797ms</span>|- / -|
|14|![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">1.902ms</span> / ![#ff8d00](https://placehold.co/10x10/ff8d00/ff8d00.png) <span style="color: #ffd9aa">29.637ms</span>|![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">2.044ms</span> / ![#ff5d00](https://placehold.co/10x10/ff5d00/ff5d00.png) <span style="color: #ffc9aa">56.320ms</span>|- / -|
|15|![#6bff00](https://placehold.co/10x10/6bff00/6bff00.png) <span style="color: #ceffaa">1.707ms</span> / ![#94ff00](https://placehold.co/10x10/94ff00/94ff00.png) <span style="color: #dbffaa">2.958ms</span>|![#61ff00](https://placehold.co/10x10/61ff00/61ff00.png) <span style="color: #caffaa">1.568ms</span> / ![#83ff00](https://placehold.co/10x10/83ff00/83ff00.png) <span style="color: #d6ffaa">2.567ms</span>|- / -|
|16|![#bdff00](https://placehold.co/10x10/bdff00/bdff00.png) <span style="color: #e9ffaa">4.774ms</span> / ![#ff6b00](https://placehold.co/10x10/ff6b00/ff6b00.png) <span style="color: #ffceaa">41.056ms</span>|![#bcff00](https://placehold.co/10x10/bcff00/bcff00.png) <span style="color: #e9ffaa">5.217ms</span> / ![#ff6100](https://placehold.co/10x10/ff6100/ff6100.png) <span style="color: #ffcaaa">54.225ms</span>|- / -|
|17|![#ff5f00](https://placehold.co/10x10/ff5f00/ff5f00.png) <span style="color: #ffcaaa">45.975ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">111.957ms</span>|![#ff6200](https://placehold.co/10x10/ff6200/ff6200.png) <span style="color: #ffcbaa">53.456ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">140.615ms</span>|- / -|
|18|![#82ff00](https://placehold.co/10x10/82ff00/82ff00.png) <span style="color: #d5ffaa">2.349ms</span> / ![#83ff00](https://placehold.co/10x10/83ff00/83ff00.png) <span style="color: #d6ffaa">2.352ms</span>|![#70ff00](https://placehold.co/10x10/70ff00/70ff00.png) <span style="color: #cfffaa">1.954ms</span> / ![#72ff00](https://placehold.co/10x10/72ff00/72ff00.png) <span style="color: #d0ffaa">2.035ms</span>|- / -|
|19|![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">1.647ms</span> / ![#7cff00](https://placehold.co/10x10/7cff00/7cff00.png) <span style="color: #d3ffaa">2.158ms</span>|![#75ff00](https://placehold.co/10x10/75ff00/75ff00.png) <span style="color: #d1ffaa">2.120ms</span> / ![#90ff00](https://placehold.co/10x10/90ff00/90ff00.png) <span style="color: #daffaa">3.049ms</span>|- / -|
|20|![#fcff00](https://placehold.co/10x10/fcff00/fcff00.png) <span style="color: #feffaa">9.356ms</span> / ![#ff9e00](https://placehold.co/10x10/ff9e00/ff9e00.png) <span style="color: #ffdfaa">25.131ms</span>|![#f6ff00](https://placehold.co/10x10/f6ff00/f6ff00.png) <span style="color: #fcffaa">9.884ms</span> / ![#ffb600](https://placehold.co/10x10/ffb600/ffb600.png) <span style="color: #ffe7aa">23.144ms</span>|- / -|
|21|![#ffe900](https://placehold.co/10x10/ffe900/ffe900.png) <span style="color: #fff8aa">12.083ms</span> / ![#ff8c00](https://placehold.co/10x10/ff8c00/ff8c00.png) <span style="color: #ffd9aa">29.893ms</span>|![#fff200](https://placehold.co/10x10/fff200/fff200.png) <span style="color: #fffbaa">12.477ms</span> / ![#ff6900](https://placehold.co/10x10/ff6900/ff6900.png) <span style="color: #ffcdaa">50.149ms</span>|- / -|
|22|- / -|- / -|- / -|
|23|- / -|- / -|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|442.376ms|549.519ms|0.669ms|
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
