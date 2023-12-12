# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#abff00](https://placehold.co/10x10/abff00/abff00.png) <span style="color: #e3ffaa">2.694ms</span> / ![#9aff00](https://placehold.co/10x10/9aff00/9aff00.png) <span style="color: #ddffaa">2.245ms</span>|![#ff2c00](https://placehold.co/10x10/ff2c00/ff2c00.png) <span style="color: #ffb9aa">0.182ms</span> / ![#ff4d00](https://placehold.co/10x10/ff4d00/ff4d00.png) <span style="color: #ffc4aa">0.168ms</span>|
|2|![#dcff00](https://placehold.co/10x10/dcff00/dcff00.png) <span style="color: #f3ffaa">4.336ms</span> / ![#fffe00](https://placehold.co/10x10/fffe00/fffe00.png) <span style="color: #ffffaa">6.045ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.201ms</span> / ![#ff0800](https://placehold.co/10x10/ff0800/ff0800.png) <span style="color: #ffadaa">0.198ms</span>|
|3|![#a5ff00](https://placehold.co/10x10/a5ff00/a5ff00.png) <span style="color: #e1ffaa">2.528ms</span> / ![#f8ff00](https://placehold.co/10x10/f8ff00/f8ff00.png) <span style="color: #fdffaa">5.633ms</span>|- / -|
|4|![#e3ff00](https://placehold.co/10x10/e3ff00/e3ff00.png) <span style="color: #f6ffaa">4.661ms</span> / ![#ddff00](https://placehold.co/10x10/ddff00/ddff00.png) <span style="color: #f4ffaa">4.384ms</span>|- / -|
|5|![#76ff00](https://placehold.co/10x10/76ff00/76ff00.png) <span style="color: #d1ffaa">1.452ms</span> / ![#d6ff00](https://placehold.co/10x10/d6ff00/d6ff00.png) <span style="color: #f1ffaa">4.117ms</span>|- / -|
|6|![#33ff00](https://placehold.co/10x10/33ff00/33ff00.png) <span style="color: #bbffaa">0.479ms</span> / ![#2aff00](https://placehold.co/10x10/2aff00/2aff00.png) <span style="color: #b8ffaa">0.376ms</span>|- / -|
|7|![#e4ff00](https://placehold.co/10x10/e4ff00/e4ff00.png) <span style="color: #f6ffaa">4.680ms</span> / ![#c3ff00](https://placehold.co/10x10/c3ff00/c3ff00.png) <span style="color: #ebffaa">3.427ms</span>|- / -|
|8|![#d0ff00](https://placehold.co/10x10/d0ff00/d0ff00.png) <span style="color: #efffaa">3.881ms</span> / ![#ff7b00](https://placehold.co/10x10/ff7b00/ff7b00.png) <span style="color: #ffd3aa">18.118ms</span>|- / -|
|9|![#c8ff00](https://placehold.co/10x10/c8ff00/c8ff00.png) <span style="color: #edffaa">3.610ms</span> / ![#c7ff00](https://placehold.co/10x10/c7ff00/c7ff00.png) <span style="color: #ecffaa">3.573ms</span>|- / -|
|10|![#ffed00](https://placehold.co/10x10/ffed00/ffed00.png) <span style="color: #fff9aa">7.042ms</span> / ![#ff5600](https://placehold.co/10x10/ff5600/ff5600.png) <span style="color: #ffc7aa">24.319ms</span>|- / -|
|11|![#d3ff00](https://placehold.co/10x10/d3ff00/d3ff00.png) <span style="color: #f0ffaa">3.994ms</span> / ![#d2ff00](https://placehold.co/10x10/d2ff00/d2ff00.png) <span style="color: #f0ffaa">3.946ms</span>|- / -|
|12|![#ffa900](https://placehold.co/10x10/ffa900/ffa900.png) <span style="color: #ffe2aa">12.508ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">47.932ms</span>|- / -|
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
|Total|175.979ms|0.749ms|
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
