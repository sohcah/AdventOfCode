# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#abff00](https://placehold.co/10x10/abff00/abff00.png) <span style="color: #e3ffaa">2.121ms</span> / ![#a4ff00](https://placehold.co/10x10/a4ff00/a4ff00.png) <span style="color: #e1ffaa">1.965ms</span>|![#ff3200](https://placehold.co/10x10/ff3200/ff3200.png) <span style="color: #ffbbaa">0.195ms</span> / ![#ff6f00](https://placehold.co/10x10/ff6f00/ff6f00.png) <span style="color: #ffcfaa">0.167ms</span>|
|2|![#f1ff00](https://placehold.co/10x10/f1ff00/f1ff00.png) <span style="color: #faffaa">3.938ms</span> / ![#fffb00](https://placehold.co/10x10/fffb00/fffb00.png) <span style="color: #fffeaa">4.584ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.219ms</span> / ![#ff2c00](https://placehold.co/10x10/ff2c00/ff2c00.png) <span style="color: #ffb9aa">0.198ms</span>|
|3|![#a2ff00](https://placehold.co/10x10/a2ff00/a2ff00.png) <span style="color: #e0ffaa">1.925ms</span> / ![#fff800](https://placehold.co/10x10/fff800/fff800.png) <span style="color: #fffdaa">4.687ms</span>|- / -|
|4|![#fbff00](https://placehold.co/10x10/fbff00/fbff00.png) <span style="color: #feffaa">4.295ms</span> / ![#feff00](https://placehold.co/10x10/feff00/feff00.png) <span style="color: #ffffaa">4.389ms</span>|- / -|
|5|![#84ff00](https://placehold.co/10x10/84ff00/84ff00.png) <span style="color: #d6ffaa">1.407ms</span> / ![#e3ff00](https://placehold.co/10x10/e3ff00/e3ff00.png) <span style="color: #f6ffaa">3.518ms</span>|- / -|
|6|![#31ff00](https://placehold.co/10x10/31ff00/31ff00.png) <span style="color: #baffaa">0.385ms</span> / ![#2dff00](https://placehold.co/10x10/2dff00/2dff00.png) <span style="color: #b9ffaa">0.345ms</span>|- / -|
|7|![#f5ff00](https://placehold.co/10x10/f5ff00/f5ff00.png) <span style="color: #fcffaa">4.097ms</span> / ![#deff00](https://placehold.co/10x10/deff00/deff00.png) <span style="color: #f4ffaa">3.363ms</span>|- / -|
|8|![#f2ff00](https://placehold.co/10x10/f2ff00/f2ff00.png) <span style="color: #fbffaa">3.993ms</span> / ![#ff6b00](https://placehold.co/10x10/ff6b00/ff6b00.png) <span style="color: #ffceaa">13.509ms</span>|- / -|
|9|![#eaff00](https://placehold.co/10x10/eaff00/eaff00.png) <span style="color: #f8ffaa">3.741ms</span> / ![#e5ff00](https://placehold.co/10x10/e5ff00/e5ff00.png) <span style="color: #f6ffaa">3.566ms</span>|- / -|
|10|![#fbff00](https://placehold.co/10x10/fbff00/fbff00.png) <span style="color: #feffaa">4.306ms</span> / ![#ff7800](https://placehold.co/10x10/ff7800/ff7800.png) <span style="color: #ffd2aa">12.340ms</span>|- / -|
|11|![#f1ff00](https://placehold.co/10x10/f1ff00/f1ff00.png) <span style="color: #faffaa">3.942ms</span> / ![#edff00](https://placehold.co/10x10/edff00/edff00.png) <span style="color: #f9ffaa">3.817ms</span>|- / -|
|12|![#ffd500](https://placehold.co/10x10/ffd500/ffd500.png) <span style="color: #fff1aa">6.169ms</span> / ![#ff3d00](https://placehold.co/10x10/ff3d00/ff3d00.png) <span style="color: #ffbeaa">18.745ms</span>|- / -|
|13|![#7bff00](https://placehold.co/10x10/7bff00/7bff00.png) <span style="color: #d3ffaa">1.263ms</span> / ![#8aff00](https://placehold.co/10x10/8aff00/8aff00.png) <span style="color: #d8ffaa">1.503ms</span>|- / -|
|14|![#a2ff00](https://placehold.co/10x10/a2ff00/a2ff00.png) <span style="color: #e0ffaa">1.933ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">28.530ms</span>|- / -|
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
|Total|148.378ms|0.779ms|
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
