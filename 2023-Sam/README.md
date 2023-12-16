# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">2.187ms</span> / ![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">2.188ms</span>|![#ff4500](https://placehold.co/10x10/ff4500/ff4500.png) <span style="color: #ffc1aa">0.163ms</span> / ![#ff4b00](https://placehold.co/10x10/ff4b00/ff4b00.png) <span style="color: #ffc3aa">0.161ms</span>|
|2|![#a1ff00](https://placehold.co/10x10/a1ff00/a1ff00.png) <span style="color: #e0ffaa">4.090ms</span> / ![#acff00](https://placehold.co/10x10/acff00/acff00.png) <span style="color: #e3ffaa">4.703ms</span>|![#ff0e00](https://placehold.co/10x10/ff0e00/ff0e00.png) <span style="color: #ffafaa">0.185ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.191ms</span>|
|3|![#6fff00](https://placehold.co/10x10/6fff00/6fff00.png) <span style="color: #cfffaa">2.058ms</span> / ![#adff00](https://placehold.co/10x10/adff00/adff00.png) <span style="color: #e4ffaa">4.756ms</span>|- / -|
|4|![#a5ff00](https://placehold.co/10x10/a5ff00/a5ff00.png) <span style="color: #e1ffaa">4.318ms</span> / ![#a5ff00](https://placehold.co/10x10/a5ff00/a5ff00.png) <span style="color: #e1ffaa">4.304ms</span>|- / -|
|5|![#58ff00](https://placehold.co/10x10/58ff00/58ff00.png) <span style="color: #c7ffaa">1.440ms</span> / ![#97ff00](https://placehold.co/10x10/97ff00/97ff00.png) <span style="color: #dcffaa">3.617ms</span>|- / -|
|6|![#23ff00](https://placehold.co/10x10/23ff00/23ff00.png) <span style="color: #b6ffaa">0.427ms</span> / ![#1eff00](https://placehold.co/10x10/1eff00/1eff00.png) <span style="color: #b4ffaa">0.349ms</span>|- / -|
|7|![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">4.181ms</span> / ![#8fff00](https://placehold.co/10x10/8fff00/8fff00.png) <span style="color: #daffaa">3.255ms</span>|- / -|
|8|![#9fff00](https://placehold.co/10x10/9fff00/9fff00.png) <span style="color: #dfffaa">3.996ms</span> / ![#fff500](https://placehold.co/10x10/fff500/fff500.png) <span style="color: #fffcaa">13.597ms</span>|- / -|
|9|![#acff00](https://placehold.co/10x10/acff00/acff00.png) <span style="color: #e3ffaa">4.672ms</span> / ![#baff00](https://placehold.co/10x10/baff00/baff00.png) <span style="color: #e8ffaa">5.547ms</span>|- / -|
|10|![#a8ff00](https://placehold.co/10x10/a8ff00/a8ff00.png) <span style="color: #e2ffaa">4.470ms</span> / ![#fffe00](https://placehold.co/10x10/fffe00/fffe00.png) <span style="color: #ffffaa">12.232ms</span>|- / -|
|11|![#9dff00](https://placehold.co/10x10/9dff00/9dff00.png) <span style="color: #deffaa">3.902ms</span> / ![#9eff00](https://placehold.co/10x10/9eff00/9eff00.png) <span style="color: #dfffaa">3.912ms</span>|- / -|
|12|![#c7ff00](https://placehold.co/10x10/c7ff00/c7ff00.png) <span style="color: #ecffaa">6.463ms</span> / ![#ffd400](https://placehold.co/10x10/ffd400/ffd400.png) <span style="color: #fff1aa">19.293ms</span>|- / -|
|13|![#56ff00](https://placehold.co/10x10/56ff00/56ff00.png) <span style="color: #c7ffaa">1.380ms</span> / ![#5dff00](https://placehold.co/10x10/5dff00/5dff00.png) <span style="color: #c9ffaa">1.569ms</span>|- / -|
|14|![#6dff00](https://placehold.co/10x10/6dff00/6dff00.png) <span style="color: #ceffaa">2.009ms</span> / ![#ffae00](https://placehold.co/10x10/ffae00/ffae00.png) <span style="color: #ffe4aa">28.693ms</span>|- / -|
|15|![#63ff00](https://placehold.co/10x10/63ff00/63ff00.png) <span style="color: #cbffaa">1.716ms</span> / ![#87ff00](https://placehold.co/10x10/87ff00/87ff00.png) <span style="color: #d7ffaa">2.926ms</span>|- / -|
|16|![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">4.020ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">172.022ms</span>|- / -|
|17|- / -|- / -|
|18|- / -|- / -|
|19|- / -|- / -|
|20|- / -|- / -|
|21|- / -|- / -|
|22|- / -|- / -|
|23|- / -|- / -|
|24|- / -|- / -|
|25|- / -|- / -|
|Total|334.294ms|0.700ms|
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
