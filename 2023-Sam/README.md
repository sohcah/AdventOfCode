# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#b1ff00](https://placehold.co/10x10/b1ff00/b1ff00.png) <span style="color: #e5ffaa">2.201ms</span> / ![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">1.869ms</span>|![#ff8700](https://placehold.co/10x10/ff8700/ff8700.png) <span style="color: #ffd7aa">0.159ms</span> / ![#ff6700](https://placehold.co/10x10/ff6700/ff6700.png) <span style="color: #ffccaa">0.173ms</span>|
|2|![#f6ff00](https://placehold.co/10x10/f6ff00/f6ff00.png) <span style="color: #fcffaa">4.027ms</span> / ![#fff600](https://placehold.co/10x10/fff600/fff600.png) <span style="color: #fffcaa">4.652ms</span>|![#ff1f00](https://placehold.co/10x10/ff1f00/ff1f00.png) <span style="color: #ffb4aa">0.207ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.222ms</span>|
|3|![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">1.855ms</span> / ![#fff900](https://placehold.co/10x10/fff900/fff900.png) <span style="color: #fffdaa">4.548ms</span>|- / -|
|4|![#f6ff00](https://placehold.co/10x10/f6ff00/f6ff00.png) <span style="color: #fcffaa">4.026ms</span> / ![#faff00](https://placehold.co/10x10/faff00/faff00.png) <span style="color: #fdffaa">4.165ms</span>|- / -|
|5|![#7cff00](https://placehold.co/10x10/7cff00/7cff00.png) <span style="color: #d3ffaa">1.266ms</span> / ![#e2ff00](https://placehold.co/10x10/e2ff00/e2ff00.png) <span style="color: #f5ffaa">3.403ms</span>|- / -|
|6|![#30ff00](https://placehold.co/10x10/30ff00/30ff00.png) <span style="color: #baffaa">0.372ms</span> / ![#2bff00](https://placehold.co/10x10/2bff00/2bff00.png) <span style="color: #b8ffaa">0.329ms</span>|- / -|
|7|![#f5ff00](https://placehold.co/10x10/f5ff00/f5ff00.png) <span style="color: #fcffaa">4.019ms</span> / ![#daff00](https://placehold.co/10x10/daff00/daff00.png) <span style="color: #f3ffaa">3.200ms</span>|- / -|
|8|![#eeff00](https://placehold.co/10x10/eeff00/eeff00.png) <span style="color: #f9ffaa">3.787ms</span> / ![#ff6b00](https://placehold.co/10x10/ff6b00/ff6b00.png) <span style="color: #ffceaa">13.134ms</span>|- / -|
|9|![#e7ff00](https://placehold.co/10x10/e7ff00/e7ff00.png) <span style="color: #f7ffaa">3.568ms</span> / ![#e3ff00](https://placehold.co/10x10/e3ff00/e3ff00.png) <span style="color: #f6ffaa">3.450ms</span>|- / -|
|10|![#faff00](https://placehold.co/10x10/faff00/faff00.png) <span style="color: #fdffaa">4.164ms</span> / ![#ff7800](https://placehold.co/10x10/ff7800/ff7800.png) <span style="color: #ffd2aa">12.001ms</span>|- / -|
|11|![#ebff00](https://placehold.co/10x10/ebff00/ebff00.png) <span style="color: #f8ffaa">3.687ms</span> / ![#edff00](https://placehold.co/10x10/edff00/edff00.png) <span style="color: #f9ffaa">3.751ms</span>|- / -|
|12|![#ffd500](https://placehold.co/10x10/ffd500/ffd500.png) <span style="color: #fff1aa">6.028ms</span> / ![#ff3700](https://placehold.co/10x10/ff3700/ff3700.png) <span style="color: #ffbcaa">18.830ms</span>|- / -|
|13|![#7aff00](https://placehold.co/10x10/7aff00/7aff00.png) <span style="color: #d3ffaa">1.227ms</span> / ![#89ff00](https://placehold.co/10x10/89ff00/89ff00.png) <span style="color: #d8ffaa">1.456ms</span>|- / -|
|14|![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">1.861ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">27.549ms</span>|- / -|
|15|![#92ff00](https://placehold.co/10x10/92ff00/92ff00.png) <span style="color: #dbffaa">1.612ms</span> / ![#ceff00](https://placehold.co/10x10/ceff00/ceff00.png) <span style="color: #efffaa">2.870ms</span>|- / -|
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
|Total|148.905ms|0.761ms|
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
