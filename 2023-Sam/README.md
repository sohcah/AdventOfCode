# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#aeff00](https://placehold.co/10x10/aeff00/aeff00.png) <span style="color: #e4ffaa">2.288ms</span> / ![#a9ff00](https://placehold.co/10x10/a9ff00/a9ff00.png) <span style="color: #e2ffaa">2.192ms</span>|![#ffdd00](https://placehold.co/10x10/ffdd00/ffdd00.png) <span style="color: #fff4aa">0.858ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">1.981ms</span>|
|2|![#f3ff00](https://placehold.co/10x10/f3ff00/f3ff00.png) <span style="color: #fbffaa">4.289ms</span> / ![#fffd00](https://placehold.co/10x10/fffd00/fffd00.png) <span style="color: #fffeaa">4.838ms</span>|- / -|
|3|![#a8ff00](https://placehold.co/10x10/a8ff00/a8ff00.png) <span style="color: #e2ffaa">2.166ms</span> / ![#fffe00](https://placehold.co/10x10/fffe00/fffe00.png) <span style="color: #ffffaa">4.769ms</span>|- / -|
|4|![#f8ff00](https://placehold.co/10x10/f8ff00/f8ff00.png) <span style="color: #fdffaa">4.457ms</span> / ![#f7ff00](https://placehold.co/10x10/f7ff00/f7ff00.png) <span style="color: #fcffaa">4.444ms</span>|- / -|
|5|![#85ff00](https://placehold.co/10x10/85ff00/85ff00.png) <span style="color: #d6ffaa">1.485ms</span> / ![#e3ff00](https://placehold.co/10x10/e3ff00/e3ff00.png) <span style="color: #f6ffaa">3.751ms</span>|- / -|
|6|![#33ff00](https://placehold.co/10x10/33ff00/33ff00.png) <span style="color: #bbffaa">0.421ms</span> / ![#34ff00](https://placehold.co/10x10/34ff00/34ff00.png) <span style="color: #bbffaa">0.424ms</span>|- / -|
|7|![#f5ff00](https://placehold.co/10x10/f5ff00/f5ff00.png) <span style="color: #fcffaa">4.360ms</span> / ![#dfff00](https://placehold.co/10x10/dfff00/dfff00.png) <span style="color: #f4ffaa">3.616ms</span>|- / -|
|8|![#f1ff00](https://placehold.co/10x10/f1ff00/f1ff00.png) <span style="color: #faffaa">4.234ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">31.970ms</span>|- / -|
|9|![#e4ff00](https://placehold.co/10x10/e4ff00/e4ff00.png) <span style="color: #f6ffaa">3.768ms</span> / ![#dfff00](https://placehold.co/10x10/dfff00/dfff00.png) <span style="color: #f4ffaa">3.610ms</span>|- / -|
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
|Total|87.082ms|2.839ms|<!--BENCHMARKEND-->

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
