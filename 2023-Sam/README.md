# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#b6ff00](https://placehold.co/10x10/b6ff00/b6ff00.png) <span style="color: #e7ffaa">2.116ms</span> / ![#b1ff00](https://placehold.co/10x10/b1ff00/b1ff00.png) <span style="color: #e5ffaa">2.021ms</span>|![#d6ff00](https://placehold.co/10x10/d6ff00/d6ff00.png) <span style="color: #f1ffaa">0.338ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">1.001ms</span>|
|2|![#ffe900](https://placehold.co/10x10/ffe900/ffe900.png) <span style="color: #fff8aa">4.645ms</span> / ![#ffeb00](https://placehold.co/10x10/ffeb00/ffeb00.png) <span style="color: #fff8aa">4.574ms</span>|- / -|
|3|![#adff00](https://placehold.co/10x10/adff00/adff00.png) <span style="color: #e4ffaa">1.943ms</span> / ![#ffec00](https://placehold.co/10x10/ffec00/ffec00.png) <span style="color: #fff9aa">4.545ms</span>|- / -|
|4|![#fff600](https://placehold.co/10x10/fff600/fff600.png) <span style="color: #fffcaa">4.196ms</span> / ![#fff500](https://placehold.co/10x10/fff500/fff500.png) <span style="color: #fffcaa">4.233ms</span>|- / -|
|5|![#8dff00](https://placehold.co/10x10/8dff00/8dff00.png) <span style="color: #d9ffaa">1.419ms</span> / ![#f1ff00](https://placehold.co/10x10/f1ff00/f1ff00.png) <span style="color: #faffaa">3.497ms</span>|- / -|
|6|![#40ff00](https://placehold.co/10x10/40ff00/40ff00.png) <span style="color: #bfffaa">0.492ms</span> / ![#32ff00](https://placehold.co/10x10/32ff00/32ff00.png) <span style="color: #bbffaa">0.364ms</span>|- / -|
|7|![#fff700](https://placehold.co/10x10/fff700/fff700.png) <span style="color: #fffcaa">4.172ms</span> / ![#e6ff00](https://placehold.co/10x10/e6ff00/e6ff00.png) <span style="color: #f7ffaa">3.194ms</span>|- / -|
|8|![#fbff00](https://placehold.co/10x10/fbff00/fbff00.png) <span style="color: #feffaa">3.800ms</span> / ![#ff2a00](https://placehold.co/10x10/ff2a00/ff2a00.png) <span style="color: #ffb8aa">17.582ms</span>|- / -|
|9|![#f3ff00](https://placehold.co/10x10/f3ff00/f3ff00.png) <span style="color: #fbffaa">3.561ms</span> / ![#f0ff00](https://placehold.co/10x10/f0ff00/f0ff00.png) <span style="color: #faffaa">3.477ms</span>|- / -|
|10|![#ffb600](https://placehold.co/10x10/ffb600/ffb600.png) <span style="color: #ffe7aa">6.743ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">23.136ms</span>|- / -|
|11|![#f9ff00](https://placehold.co/10x10/f9ff00/f9ff00.png) <span style="color: #fdffaa">3.733ms</span> / ![#fffe00](https://placehold.co/10x10/fffe00/fffe00.png) <span style="color: #ffffaa">3.938ms</span>|- / -|
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
|Total|107.381ms|1.339ms|
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
