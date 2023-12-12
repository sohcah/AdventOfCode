# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#9aff00](https://placehold.co/10x10/9aff00/9aff00.png) <span style="color: #ddffaa">2.254ms</span> / ![#97ff00](https://placehold.co/10x10/97ff00/97ff00.png) <span style="color: #dcffaa">2.173ms</span>|![#e8ff00](https://placehold.co/10x10/e8ff00/e8ff00.png) <span style="color: #f7ffaa">0.318ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.834ms</span>|
|2|![#d7ff00](https://placehold.co/10x10/d7ff00/d7ff00.png) <span style="color: #f2ffaa">4.173ms</span> / ![#e4ff00](https://placehold.co/10x10/e4ff00/e4ff00.png) <span style="color: #f6ffaa">4.706ms</span>|- / -|
|3|![#8dff00](https://placehold.co/10x10/8dff00/8dff00.png) <span style="color: #d9ffaa">1.935ms</span> / ![#e8ff00](https://placehold.co/10x10/e8ff00/e8ff00.png) <span style="color: #f7ffaa">4.869ms</span>|- / -|
|4|![#dbff00](https://placehold.co/10x10/dbff00/dbff00.png) <span style="color: #f3ffaa">4.345ms</span> / ![#e4ff00](https://placehold.co/10x10/e4ff00/e4ff00.png) <span style="color: #f6ffaa">4.699ms</span>|- / -|
|5|![#76ff00](https://placehold.co/10x10/76ff00/76ff00.png) <span style="color: #d1ffaa">1.467ms</span> / ![#c7ff00](https://placehold.co/10x10/c7ff00/c7ff00.png) <span style="color: #ecffaa">3.584ms</span>|- / -|
|6|![#30ff00](https://placehold.co/10x10/30ff00/30ff00.png) <span style="color: #baffaa">0.439ms</span> / ![#29ff00](https://placehold.co/10x10/29ff00/29ff00.png) <span style="color: #b8ffaa">0.363ms</span>|- / -|
|7|![#dbff00](https://placehold.co/10x10/dbff00/dbff00.png) <span style="color: #f3ffaa">4.332ms</span> / ![#c3ff00](https://placehold.co/10x10/c3ff00/c3ff00.png) <span style="color: #ebffaa">3.423ms</span>|- / -|
|8|![#d3ff00](https://placehold.co/10x10/d3ff00/d3ff00.png) <span style="color: #f0ffaa">4.011ms</span> / ![#ff7300](https://placehold.co/10x10/ff7300/ff7300.png) <span style="color: #ffd0aa">19.484ms</span>|- / -|
|9|![#caff00](https://placehold.co/10x10/caff00/caff00.png) <span style="color: #edffaa">3.670ms</span> / ![#d0ff00](https://placehold.co/10x10/d0ff00/d0ff00.png) <span style="color: #efffaa">3.907ms</span>|- / -|
|10|![#ffed00](https://placehold.co/10x10/ffed00/ffed00.png) <span style="color: #fff9aa">7.083ms</span> / ![#ff5a00](https://placehold.co/10x10/ff5a00/ff5a00.png) <span style="color: #ffc8aa">23.673ms</span>|- / -|
|11|![#e3ff00](https://placehold.co/10x10/e3ff00/e3ff00.png) <span style="color: #f6ffaa">4.649ms</span> / ![#d1ff00](https://placehold.co/10x10/d1ff00/d1ff00.png) <span style="color: #f0ffaa">3.931ms</span>|- / -|
|12|![#fff200](https://placehold.co/10x10/fff200/fff200.png) <span style="color: #fffbaa">6.765ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">48.254ms</span>|- / -|
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
|Total|168.188ms|1.153ms|
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
