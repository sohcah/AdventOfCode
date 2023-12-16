# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#a4ff00](https://placehold.co/10x10/a4ff00/a4ff00.png) <span style="color: #e1ffaa">2.338ms</span> / ![#9bff00](https://placehold.co/10x10/9bff00/9bff00.png) <span style="color: #deffaa">2.118ms</span>|![#93ff00](https://placehold.co/10x10/93ff00/93ff00.png) <span style="color: #dbffaa">2.228ms</span> / ![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">1.329ms</span>|![#ff8100](https://placehold.co/10x10/ff8100/ff8100.png) <span style="color: #ffd5aa">0.146ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.200ms</span>|
|2|![#e1ff00](https://placehold.co/10x10/e1ff00/e1ff00.png) <span style="color: #f5ffaa">4.222ms</span> / ![#f4ff00](https://placehold.co/10x10/f4ff00/f4ff00.png) <span style="color: #fbffaa">5.000ms</span>|![#b8ff00](https://placehold.co/10x10/b8ff00/b8ff00.png) <span style="color: #e7ffaa">3.336ms</span> / ![#c6ff00](https://placehold.co/10x10/c6ff00/c6ff00.png) <span style="color: #ecffaa">3.822ms</span>|![#ff2600](https://placehold.co/10x10/ff2600/ff2600.png) <span style="color: #ffb7aa">0.184ms</span> / ![#ff4e00](https://placehold.co/10x10/ff4e00/ff4e00.png) <span style="color: #ffc4aa">0.167ms</span>|
|3|![#96ff00](https://placehold.co/10x10/96ff00/96ff00.png) <span style="color: #dcffaa">2.008ms</span> / ![#f1ff00](https://placehold.co/10x10/f1ff00/f1ff00.png) <span style="color: #faffaa">4.847ms</span>|![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">1.316ms</span> / ![#a9ff00](https://placehold.co/10x10/a9ff00/a9ff00.png) <span style="color: #e2ffaa">2.847ms</span>|- / -|
|4|![#e6ff00](https://placehold.co/10x10/e6ff00/e6ff00.png) <span style="color: #f7ffaa">4.395ms</span> / ![#e8ff00](https://placehold.co/10x10/e8ff00/e8ff00.png) <span style="color: #f7ffaa">4.483ms</span>|![#d5ff00](https://placehold.co/10x10/d5ff00/d5ff00.png) <span style="color: #f1ffaa">4.437ms</span> / ![#d5ff00](https://placehold.co/10x10/d5ff00/d5ff00.png) <span style="color: #f1ffaa">4.444ms</span>|- / -|
|5|![#7bff00](https://placehold.co/10x10/7bff00/7bff00.png) <span style="color: #d3ffaa">1.466ms</span> / ![#d2ff00](https://placehold.co/10x10/d2ff00/d2ff00.png) <span style="color: #f0ffaa">3.656ms</span>|![#79ff00](https://placehold.co/10x10/79ff00/79ff00.png) <span style="color: #d2ffaa">1.610ms</span> / ![#b7ff00](https://placehold.co/10x10/b7ff00/b7ff00.png) <span style="color: #e7ffaa">3.284ms</span>|- / -|
|6|![#2fff00](https://placehold.co/10x10/2fff00/2fff00.png) <span style="color: #baffaa">0.413ms</span> / ![#2cff00](https://placehold.co/10x10/2cff00/2cff00.png) <span style="color: #b9ffaa">0.380ms</span>|![#25ff00](https://placehold.co/10x10/25ff00/25ff00.png) <span style="color: #b6ffaa">0.348ms</span> / ![#21ff00](https://placehold.co/10x10/21ff00/21ff00.png) <span style="color: #b5ffaa">0.296ms</span>|- / -|
|7|![#e4ff00](https://placehold.co/10x10/e4ff00/e4ff00.png) <span style="color: #f6ffaa">4.335ms</span> / ![#ccff00](https://placehold.co/10x10/ccff00/ccff00.png) <span style="color: #eeffaa">3.460ms</span>|![#b7ff00](https://placehold.co/10x10/b7ff00/b7ff00.png) <span style="color: #e7ffaa">3.276ms</span> / ![#afff00](https://placehold.co/10x10/afff00/afff00.png) <span style="color: #e4ffaa">3.032ms</span>|- / -|
|8|![#dcff00](https://placehold.co/10x10/dcff00/dcff00.png) <span style="color: #f3ffaa">4.032ms</span> / ![#ff8a00](https://placehold.co/10x10/ff8a00/ff8a00.png) <span style="color: #ffd8aa">14.272ms</span>|![#efff00](https://placehold.co/10x10/efff00/efff00.png) <span style="color: #faffaa">5.688ms</span> / ![#ffa600](https://placehold.co/10x10/ffa600/ffa600.png) <span style="color: #ffe1aa">14.396ms</span>|- / -|
|9|![#d6ff00](https://placehold.co/10x10/d6ff00/d6ff00.png) <span style="color: #f1ffaa">3.793ms</span> / ![#d2ff00](https://placehold.co/10x10/d2ff00/d2ff00.png) <span style="color: #f0ffaa">3.666ms</span>|![#c1ff00](https://placehold.co/10x10/c1ff00/c1ff00.png) <span style="color: #eaffaa">3.656ms</span> / ![#bdff00](https://placehold.co/10x10/bdff00/bdff00.png) <span style="color: #e9ffaa">3.517ms</span>|- / -|
|10|![#e7ff00](https://placehold.co/10x10/e7ff00/e7ff00.png) <span style="color: #f7ffaa">4.428ms</span> / ![#ff9f00](https://placehold.co/10x10/ff9f00/ff9f00.png) <span style="color: #ffdfaa">12.152ms</span>|![#fbff00](https://placehold.co/10x10/fbff00/fbff00.png) <span style="color: #feffaa">6.400ms</span> / ![#ff9d00](https://placehold.co/10x10/ff9d00/ff9d00.png) <span style="color: #ffdeaa">15.660ms</span>|- / -|
|11|![#dcff00](https://placehold.co/10x10/dcff00/dcff00.png) <span style="color: #f3ffaa">4.018ms</span> / ![#daff00](https://placehold.co/10x10/daff00/daff00.png) <span style="color: #f3ffaa">3.939ms</span>|![#c2ff00](https://placehold.co/10x10/c2ff00/c2ff00.png) <span style="color: #ebffaa">3.680ms</span> / ![#c3ff00](https://placehold.co/10x10/c3ff00/c3ff00.png) <span style="color: #ebffaa">3.720ms</span>|- / -|
|12|![#ffef00](https://placehold.co/10x10/ffef00/ffef00.png) <span style="color: #fffaaa">6.323ms</span> / ![#ff6100](https://placehold.co/10x10/ff6100/ff6100.png) <span style="color: #ffcaaa">19.667ms</span>|![#fdff00](https://placehold.co/10x10/fdff00/fdff00.png) <span style="color: #feffaa">6.476ms</span> / ![#ff6700](https://placehold.co/10x10/ff6700/ff6700.png) <span style="color: #ffccaa">24.574ms</span>|- / -|
|13|![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">1.395ms</span> / ![#83ff00](https://placehold.co/10x10/83ff00/83ff00.png) <span style="color: #d6ffaa">1.621ms</span>|![#6eff00](https://placehold.co/10x10/6eff00/6eff00.png) <span style="color: #cfffaa">1.409ms</span> / ![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">1.958ms</span>|- / -|
|14|![#97ff00](https://placehold.co/10x10/97ff00/97ff00.png) <span style="color: #dcffaa">2.027ms</span> / ![#ff2d00](https://placehold.co/10x10/ff2d00/ff2d00.png) <span style="color: #ffb9aa">29.199ms</span>|![#92ff00](https://placehold.co/10x10/92ff00/92ff00.png) <span style="color: #dbffaa">2.184ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">56.937ms</span>|- / -|
|15|![#8aff00](https://placehold.co/10x10/8aff00/8aff00.png) <span style="color: #d8ffaa">1.749ms</span> / ![#bfff00](https://placehold.co/10x10/bfff00/bfff00.png) <span style="color: #eaffaa">3.072ms</span>|![#7bff00](https://placehold.co/10x10/7bff00/7bff00.png) <span style="color: #d3ffaa">1.658ms</span> / ![#9fff00](https://placehold.co/10x10/9fff00/9fff00.png) <span style="color: #dfffaa">2.546ms</span>|- / -|
|16|![#dfff00](https://placehold.co/10x10/dfff00/dfff00.png) <span style="color: #f4ffaa">4.147ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">41.143ms</span>|![#e5ff00](https://placehold.co/10x10/e5ff00/e5ff00.png) <span style="color: #f6ffaa">5.198ms</span> / ![#ff0900](https://placehold.co/10x10/ff0900/ff0900.png) <span style="color: #ffadaa">52.962ms</span>|- / -|
|17|- / -|- / -|- / -|
|18|- / -|- / -|- / -|
|19|- / -|- / -|- / -|
|20|- / -|- / -|- / -|
|21|- / -|- / -|- / -|
|22|- / -|- / -|- / -|
|23|- / -|- / -|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|203.762ms|248.228ms|0.696ms|
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
