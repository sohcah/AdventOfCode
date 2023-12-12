# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#92ff00](https://placehold.co/10x10/92ff00/92ff00.png) <span style="color: #dbffaa">2.370ms</span> / ![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">2.044ms</span>|![#e9ff00](https://placehold.co/10x10/e9ff00/e9ff00.png) <span style="color: #f8ffaa">0.295ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.764ms</span>|
|2|![#c4ff00](https://placehold.co/10x10/c4ff00/c4ff00.png) <span style="color: #ebffaa">4.095ms</span> / ![#cfff00](https://placehold.co/10x10/cfff00/cfff00.png) <span style="color: #efffaa">4.593ms</span>|- / -|
|3|![#82ff00](https://placehold.co/10x10/82ff00/82ff00.png) <span style="color: #d5ffaa">1.960ms</span> / ![#f5ff00](https://placehold.co/10x10/f5ff00/f5ff00.png) <span style="color: #fcffaa">6.711ms</span>|- / -|
|4|![#caff00](https://placehold.co/10x10/caff00/caff00.png) <span style="color: #edffaa">4.370ms</span> / ![#cdff00](https://placehold.co/10x10/cdff00/cdff00.png) <span style="color: #eeffaa">4.513ms</span>|- / -|
|5|![#6bff00](https://placehold.co/10x10/6bff00/6bff00.png) <span style="color: #ceffaa">1.443ms</span> / ![#baff00](https://placehold.co/10x10/baff00/baff00.png) <span style="color: #e8ffaa">3.695ms</span>|- / -|
|6|![#2bff00](https://placehold.co/10x10/2bff00/2bff00.png) <span style="color: #b8ffaa">0.432ms</span> / ![#27ff00](https://placehold.co/10x10/27ff00/27ff00.png) <span style="color: #b7ffaa">0.383ms</span>|- / -|
|7|![#ccff00](https://placehold.co/10x10/ccff00/ccff00.png) <span style="color: #eeffaa">4.475ms</span> / ![#b1ff00](https://placehold.co/10x10/b1ff00/b1ff00.png) <span style="color: #e5ffaa">3.361ms</span>|- / -|
|8|![#c0ff00](https://placehold.co/10x10/c0ff00/c0ff00.png) <span style="color: #eaffaa">3.923ms</span> / ![#ff9400](https://placehold.co/10x10/ff9400/ff9400.png) <span style="color: #ffdbaa">19.417ms</span>|- / -|
|9|![#b7ff00](https://placehold.co/10x10/b7ff00/b7ff00.png) <span style="color: #e7ffaa">3.579ms</span> / ![#b1ff00](https://placehold.co/10x10/b1ff00/b1ff00.png) <span style="color: #e5ffaa">3.376ms</span>|- / -|
|10|![#f7ff00](https://placehold.co/10x10/f7ff00/f7ff00.png) <span style="color: #fcffaa">6.834ms</span> / ![#ff7800](https://placehold.co/10x10/ff7800/ff7800.png) <span style="color: #ffd2aa">24.723ms</span>|- / -|
|11|![#bcff00](https://placehold.co/10x10/bcff00/bcff00.png) <span style="color: #e9ffaa">3.794ms</span> / ![#c1ff00](https://placehold.co/10x10/c1ff00/c1ff00.png) <span style="color: #eaffaa">4.004ms</span>|- / -|
|12|![#f2ff00](https://placehold.co/10x10/f2ff00/f2ff00.png) <span style="color: #fbffaa">6.491ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">68.734ms</span>|- / -|
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
|Total|189.319ms|1.059ms|
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
