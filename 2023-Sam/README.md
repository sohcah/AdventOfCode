# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#ccff00](https://placehold.co/10x10/ccff00/ccff00.png) <span style="color: #eeffaa">2.498ms</span> / ![#c1ff00](https://placehold.co/10x10/c1ff00/c1ff00.png) <span style="color: #eaffaa">2.284ms</span>|![#ff6f00](https://placehold.co/10x10/ff6f00/ff6f00.png) <span style="color: #ffcfaa">0.137ms</span> / ![#ff4f00](https://placehold.co/10x10/ff4f00/ff4f00.png) <span style="color: #ffc4aa">0.149ms</span>|
|2|![#ffdf00](https://placehold.co/10x10/ffdf00/ffdf00.png) <span style="color: #fff4aa">4.830ms</span> / ![#ffc000](https://placehold.co/10x10/ffc000/ffc000.png) <span style="color: #ffeaaa">6.079ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.178ms</span> / ![#ff1800](https://placehold.co/10x10/ff1800/ff1800.png) <span style="color: #ffb2aa">0.169ms</span>|
|3|![#c2ff00](https://placehold.co/10x10/c2ff00/c2ff00.png) <span style="color: #ebffaa">2.290ms</span> / ![#ffcf00](https://placehold.co/10x10/ffcf00/ffcf00.png) <span style="color: #ffefaa">5.431ms</span>|- / -|
|4|![#ffe400](https://placehold.co/10x10/ffe400/ffe400.png) <span style="color: #fff6aa">4.675ms</span> / ![#ffe200](https://placehold.co/10x10/ffe200/ffe200.png) <span style="color: #fff5aa">4.753ms</span>|- / -|
|5|![#9aff00](https://placehold.co/10x10/9aff00/9aff00.png) <span style="color: #ddffaa">1.574ms</span> / ![#fffd00](https://placehold.co/10x10/fffd00/fffd00.png) <span style="color: #fffeaa">3.873ms</span>|- / -|
|6|![#42ff00](https://placehold.co/10x10/42ff00/42ff00.png) <span style="color: #c0ffaa">0.497ms</span> / ![#37ff00](https://placehold.co/10x10/37ff00/37ff00.png) <span style="color: #bcffaa">0.406ms</span>|- / -|
|7|![#ffe100](https://placehold.co/10x10/ffe100/ffe100.png) <span style="color: #fff5aa">4.776ms</span> / ![#fff500](https://placehold.co/10x10/fff500/fff500.png) <span style="color: #fffcaa">4.103ms</span>|- / -|
|8|![#ffee00](https://placehold.co/10x10/ffee00/ffee00.png) <span style="color: #fff9aa">4.317ms</span> / ![#ff0f00](https://placehold.co/10x10/ff0f00/ff0f00.png) <span style="color: #ffafaa">20.000ms</span>|- / -|
|9|![#fff500](https://placehold.co/10x10/fff500/fff500.png) <span style="color: #fffcaa">4.109ms</span> / ![#fffc00](https://placehold.co/10x10/fffc00/fffc00.png) <span style="color: #fffeaa">3.895ms</span>|- / -|
|10|![#ffe200](https://placehold.co/10x10/ffe200/ffe200.png) <span style="color: #fff5aa">4.727ms</span> / ![#ff4f00](https://placehold.co/10x10/ff4f00/ff4f00.png) <span style="color: #ffc4aa">13.180ms</span>|- / -|
|11|![#fff000](https://placehold.co/10x10/fff000/fff000.png) <span style="color: #fffaaa">4.251ms</span> / ![#fff400](https://placehold.co/10x10/fff400/fff400.png) <span style="color: #fffbaa">4.136ms</span>|- / -|
|12|![#ffae00](https://placehold.co/10x10/ffae00/ffae00.png) <span style="color: #ffe4aa">6.907ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">22.050ms</span>|- / -|
|13|![#94ff00](https://placehold.co/10x10/94ff00/94ff00.png) <span style="color: #dbffaa">1.490ms</span> / ![#afff00](https://placehold.co/10x10/afff00/afff00.png) <span style="color: #e4ffaa">1.927ms</span>|- / -|
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
|Total|139.054ms|0.632ms|
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
