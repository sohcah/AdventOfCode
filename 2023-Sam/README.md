# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#baff00](https://placehold.co/10x10/baff00/baff00.png) <span style="color: #e8ffaa">2.207ms</span> / ![#afff00](https://placehold.co/10x10/afff00/afff00.png) <span style="color: #e4ffaa">2.000ms</span>|![#c5ff00](https://placehold.co/10x10/c5ff00/c5ff00.png) <span style="color: #ecffaa">0.253ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.793ms</span>|
|2|![#fffc00](https://placehold.co/10x10/fffc00/fffc00.png) <span style="color: #fffeaa">4.056ms</span> / ![#fff000](https://placehold.co/10x10/fff000/fff000.png) <span style="color: #fffaaa">4.430ms</span>|- / -|
|3|![#adff00](https://placehold.co/10x10/adff00/adff00.png) <span style="color: #e4ffaa">1.949ms</span> / ![#ffe900](https://placehold.co/10x10/ffe900/ffe900.png) <span style="color: #fff8aa">4.690ms</span>|- / -|
|4|![#fff500](https://placehold.co/10x10/fff500/fff500.png) <span style="color: #fffcaa">4.272ms</span> / ![#fff400](https://placehold.co/10x10/fff400/fff400.png) <span style="color: #fffbaa">4.293ms</span>|- / -|
|5|![#98ff00](https://placehold.co/10x10/98ff00/98ff00.png) <span style="color: #ddffaa">1.589ms</span> / ![#f4ff00](https://placehold.co/10x10/f4ff00/f4ff00.png) <span style="color: #fbffaa">3.612ms</span>|- / -|
|6|![#38ff00](https://placehold.co/10x10/38ff00/38ff00.png) <span style="color: #bdffaa">0.418ms</span> / ![#31ff00](https://placehold.co/10x10/31ff00/31ff00.png) <span style="color: #baffaa">0.361ms</span>|- / -|
|7|![#fff200](https://placehold.co/10x10/fff200/fff200.png) <span style="color: #fffbaa">4.381ms</span> / ![#e8ff00](https://placehold.co/10x10/e8ff00/e8ff00.png) <span style="color: #f7ffaa">3.287ms</span>|- / -|
|8|![#fffd00](https://placehold.co/10x10/fffd00/fffd00.png) <span style="color: #fffeaa">4.009ms</span> / ![#ff2700](https://placehold.co/10x10/ff2700/ff2700.png) <span style="color: #ffb7aa">18.118ms</span>|- / -|
|9|![#f6ff00](https://placehold.co/10x10/f6ff00/f6ff00.png) <span style="color: #fcffaa">3.685ms</span> / ![#f1ff00](https://placehold.co/10x10/f1ff00/f1ff00.png) <span style="color: #faffaa">3.533ms</span>|- / -|
|10|![#ffae00](https://placehold.co/10x10/ffae00/ffae00.png) <span style="color: #ffe4aa">7.198ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">23.470ms</span>|- / -|
|11|![#fbff00](https://placehold.co/10x10/fbff00/fbff00.png) <span style="color: #feffaa">3.832ms</span> / ![#fcff00](https://placehold.co/10x10/fcff00/fcff00.png) <span style="color: #feffaa">3.867ms</span>|- / -|
|12|- / -|- / -|
|13|- / -|- / -|
|14|- / -|- / -|
|15|- / -|- / -|
|16|- / -|- / -|
|17|- / -|- / -|
|18|- / -|- / -|
|19|- / -|- / -|
|20|- / -|- / -|
|21|- / -|- / -|
|22|- / -|- / -|
|23|- / -|- / -|
|24|- / -|- / -|
|25|- / -|- / -|
|Total|109.254ms|1.046ms|
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
