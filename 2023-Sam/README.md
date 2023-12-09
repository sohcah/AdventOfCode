# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#bbff00](https://placehold.co/10x10/bbff00/bbff00.png) <span style="color: #e8ffaa">2.613ms</span> / ![#c0ff00](https://placehold.co/10x10/c0ff00/c0ff00.png) <span style="color: #eaffaa">2.737ms</span>|![#beff00](https://placehold.co/10x10/beff00/beff00.png) <span style="color: #e9ffaa">0.241ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.786ms</span>|
|2|![#ffdf00](https://placehold.co/10x10/ffdf00/ffdf00.png) <span style="color: #fff4aa">6.210ms</span> / ![#fffb00](https://placehold.co/10x10/fffb00/fffb00.png) <span style="color: #fffeaa">4.924ms</span>|- / -|
|3|![#a4ff00](https://placehold.co/10x10/a4ff00/a4ff00.png) <span style="color: #e1ffaa">2.082ms</span> / ![#fffe00](https://placehold.co/10x10/fffe00/fffe00.png) <span style="color: #ffffaa">4.812ms</span>|- / -|
|4|![#f3ff00](https://placehold.co/10x10/f3ff00/f3ff00.png) <span style="color: #fbffaa">4.332ms</span> / ![#f5ff00](https://placehold.co/10x10/f5ff00/f5ff00.png) <span style="color: #fcffaa">4.396ms</span>|- / -|
|5|![#84ff00](https://placehold.co/10x10/84ff00/84ff00.png) <span style="color: #d6ffaa">1.482ms</span> / ![#dbff00](https://placehold.co/10x10/dbff00/dbff00.png) <span style="color: #f3ffaa">3.493ms</span>|- / -|
|6|![#38ff00](https://placehold.co/10x10/38ff00/38ff00.png) <span style="color: #bdffaa">0.471ms</span> / ![#2cff00](https://placehold.co/10x10/2cff00/2cff00.png) <span style="color: #b9ffaa">0.358ms</span>|- / -|
|7|![#f6ff00](https://placehold.co/10x10/f6ff00/f6ff00.png) <span style="color: #fcffaa">4.421ms</span> / ![#deff00](https://placehold.co/10x10/deff00/deff00.png) <span style="color: #f4ffaa">3.586ms</span>|- / -|
|8|![#edff00](https://placehold.co/10x10/edff00/edff00.png) <span style="color: #f9ffaa">4.116ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">32.324ms</span>|- / -|
|9|![#ffcc00](https://placehold.co/10x10/ffcc00/ffcc00.png) <span style="color: #ffeeaa">7.193ms</span> / ![#e2ff00](https://placehold.co/10x10/e2ff00/e2ff00.png) <span style="color: #f5ffaa">3.730ms</span>|- / -|
|10|- / -|- / -|
|11|- / -|- / -|
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
|Total|93.278ms|1.027ms|
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
