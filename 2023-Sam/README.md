# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#abff00](https://placehold.co/10x10/abff00/abff00.png) <span style="color: #e3ffaa">2.328ms</span> / ![#9fff00](https://placehold.co/10x10/9fff00/9fff00.png) <span style="color: #dfffaa">2.067ms</span>|![#dcff00](https://placehold.co/10x10/dcff00/dcff00.png) <span style="color: #f3ffaa">0.320ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.904ms</span>|
|2|![#eaff00](https://placehold.co/10x10/eaff00/eaff00.png) <span style="color: #f8ffaa">4.197ms</span> / ![#f8ff00](https://placehold.co/10x10/f8ff00/f8ff00.png) <span style="color: #fdffaa">4.729ms</span>|- / -|
|3|![#9aff00](https://placehold.co/10x10/9aff00/9aff00.png) <span style="color: #ddffaa">1.948ms</span> / ![#f8ff00](https://placehold.co/10x10/f8ff00/f8ff00.png) <span style="color: #fdffaa">4.730ms</span>|- / -|
|4|![#e8ff00](https://placehold.co/10x10/e8ff00/e8ff00.png) <span style="color: #f7ffaa">4.107ms</span> / ![#efff00](https://placehold.co/10x10/efff00/efff00.png) <span style="color: #faffaa">4.388ms</span>|- / -|
|5|![#81ff00](https://placehold.co/10x10/81ff00/81ff00.png) <span style="color: #d5ffaa">1.474ms</span> / ![#e9ff00](https://placehold.co/10x10/e9ff00/e9ff00.png) <span style="color: #f8ffaa">4.176ms</span>|- / -|
|6|![#2fff00](https://placehold.co/10x10/2fff00/2fff00.png) <span style="color: #baffaa">0.391ms</span> / ![#2cff00](https://placehold.co/10x10/2cff00/2cff00.png) <span style="color: #b9ffaa">0.365ms</span>|- / -|
|7|![#e9ff00](https://placehold.co/10x10/e9ff00/e9ff00.png) <span style="color: #f8ffaa">4.168ms</span> / ![#d1ff00](https://placehold.co/10x10/d1ff00/d1ff00.png) <span style="color: #f0ffaa">3.358ms</span>|- / -|
|8|![#e4ff00](https://placehold.co/10x10/e4ff00/e4ff00.png) <span style="color: #f6ffaa">3.964ms</span> / ![#ff1b00](https://placehold.co/10x10/ff1b00/ff1b00.png) <span style="color: #ffb3aa">28.904ms</span>|- / -|
|9|![#daff00](https://placehold.co/10x10/daff00/daff00.png) <span style="color: #f3ffaa">3.650ms</span> / ![#d7ff00](https://placehold.co/10x10/d7ff00/d7ff00.png) <span style="color: #f2ffaa">3.544ms</span>|- / -|
|10|![#ffd200](https://placehold.co/10x10/ffd200/ffd200.png) <span style="color: #fff0aa">7.241ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">35.264ms</span>|- / -|
|11|![#e7ff00](https://placehold.co/10x10/e7ff00/e7ff00.png) <span style="color: #f7ffaa">4.075ms</span> / ![#dcff00](https://placehold.co/10x10/dcff00/dcff00.png) <span style="color: #f3ffaa">3.696ms</span>|- / -|
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
|Total|132.763ms|1.224ms|
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
