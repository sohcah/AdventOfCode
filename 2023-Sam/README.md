# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">2.218ms</span> / ![#97ff00](https://placehold.co/10x10/97ff00/97ff00.png) <span style="color: #dcffaa">2.022ms</span>|![#ff5800](https://placehold.co/10x10/ff5800/ff5800.png) <span style="color: #ffc7aa">0.159ms</span> / ![#ff6a00](https://placehold.co/10x10/ff6a00/ff6a00.png) <span style="color: #ffcdaa">0.152ms</span>|
|2|![#ddff00](https://placehold.co/10x10/ddff00/ddff00.png) <span style="color: #f4ffaa">4.045ms</span> / ![#ecff00](https://placehold.co/10x10/ecff00/ecff00.png) <span style="color: #f9ffaa">4.620ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.195ms</span> / ![#ff0d00](https://placehold.co/10x10/ff0d00/ff0d00.png) <span style="color: #ffaeaa">0.190ms</span>|
|3|![#94ff00](https://placehold.co/10x10/94ff00/94ff00.png) <span style="color: #dbffaa">1.960ms</span> / ![#efff00](https://placehold.co/10x10/efff00/efff00.png) <span style="color: #faffaa">4.768ms</span>|- / -|
|4|![#e6ff00](https://placehold.co/10x10/e6ff00/e6ff00.png) <span style="color: #f7ffaa">4.371ms</span> / ![#e7ff00](https://placehold.co/10x10/e7ff00/e7ff00.png) <span style="color: #f7ffaa">4.426ms</span>|- / -|
|5|![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">1.393ms</span> / ![#d0ff00](https://placehold.co/10x10/d0ff00/d0ff00.png) <span style="color: #efffaa">3.573ms</span>|- / -|
|6|![#2cff00](https://placehold.co/10x10/2cff00/2cff00.png) <span style="color: #b9ffaa">0.382ms</span> / ![#28ff00](https://placehold.co/10x10/28ff00/28ff00.png) <span style="color: #b7ffaa">0.342ms</span>|- / -|
|7|![#e2ff00](https://placehold.co/10x10/e2ff00/e2ff00.png) <span style="color: #f5ffaa">4.228ms</span> / ![#c8ff00](https://placehold.co/10x10/c8ff00/c8ff00.png) <span style="color: #edffaa">3.320ms</span>|- / -|
|8|![#d9ff00](https://placehold.co/10x10/d9ff00/d9ff00.png) <span style="color: #f2ffaa">3.888ms</span> / ![#ff9000](https://placehold.co/10x10/ff9000/ff9000.png) <span style="color: #ffdaaa">13.585ms</span>|- / -|
|9|![#d1ff00](https://placehold.co/10x10/d1ff00/d1ff00.png) <span style="color: #f0ffaa">3.628ms</span> / ![#ceff00](https://placehold.co/10x10/ceff00/ceff00.png) <span style="color: #efffaa">3.531ms</span>|- / -|
|10|![#e0ff00](https://placehold.co/10x10/e0ff00/e0ff00.png) <span style="color: #f5ffaa">4.162ms</span> / ![#ffa300](https://placehold.co/10x10/ffa300/ffa300.png) <span style="color: #ffe0aa">11.691ms</span>|- / -|
|11|![#d8ff00](https://placehold.co/10x10/d8ff00/d8ff00.png) <span style="color: #f2ffaa">3.873ms</span> / ![#d7ff00](https://placehold.co/10x10/d7ff00/d7ff00.png) <span style="color: #f2ffaa">3.813ms</span>|- / -|
|12|![#ffee00](https://placehold.co/10x10/ffee00/ffee00.png) <span style="color: #fff9aa">6.343ms</span> / ![#ff6300](https://placehold.co/10x10/ff6300/ff6300.png) <span style="color: #ffcbaa">19.349ms</span>|- / -|
|13|![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">1.387ms</span> / ![#82ff00](https://placehold.co/10x10/82ff00/82ff00.png) <span style="color: #d5ffaa">1.598ms</span>|- / -|
|14|![#94ff00](https://placehold.co/10x10/94ff00/94ff00.png) <span style="color: #dbffaa">1.967ms</span> / ![#ff3000](https://placehold.co/10x10/ff3000/ff3000.png) <span style="color: #ffbaaa">28.455ms</span>|- / -|
|15|![#85ff00](https://placehold.co/10x10/85ff00/85ff00.png) <span style="color: #d6ffaa">1.656ms</span> / ![#bcff00](https://placehold.co/10x10/bcff00/bcff00.png) <span style="color: #e9ffaa">2.965ms</span>|- / -|
|16|![#dcff00](https://placehold.co/10x10/dcff00/dcff00.png) <span style="color: #f3ffaa">4.018ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">40.884ms</span>|- / -|
|17|- / -|- / -|
|18|- / -|- / -|
|19|- / -|- / -|
|20|- / -|- / -|
|21|- / -|- / -|
|22|- / -|- / -|
|23|- / -|- / -|
|24|- / -|- / -|
|25|- / -|- / -|
|Total|198.462ms|0.696ms|
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
