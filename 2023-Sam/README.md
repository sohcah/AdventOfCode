# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#c4ff00](https://placehold.co/10x10/c4ff00/c4ff00.png) <span style="color: #ebffaa">2.461ms</span> / ![#bbff00](https://placehold.co/10x10/bbff00/bbff00.png) <span style="color: #e8ffaa">2.268ms</span>|![#ff4000](https://placehold.co/10x10/ff4000/ff4000.png) <span style="color: #ffbfaa">0.151ms</span> / ![#ff4400](https://placehold.co/10x10/ff4400/ff4400.png) <span style="color: #ffc1aa">0.150ms</span>|
|2|![#ffdb00](https://placehold.co/10x10/ffdb00/ffdb00.png) <span style="color: #fff3aa">5.332ms</span> / ![#ffd400](https://placehold.co/10x10/ffd400/ffd400.png) <span style="color: #fff1aa">5.637ms</span>|![#ff1400](https://placehold.co/10x10/ff1400/ff1400.png) <span style="color: #ffb1aa">0.167ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.175ms</span>|
|3|![#b4ff00](https://placehold.co/10x10/b4ff00/b4ff00.png) <span style="color: #e6ffaa">2.143ms</span> / ![#ffe400](https://placehold.co/10x10/ffe400/ffe400.png) <span style="color: #fff6aa">5.000ms</span>|- / -|
|4|![#fff000](https://placehold.co/10x10/fff000/fff000.png) <span style="color: #fffaaa">4.536ms</span> / ![#ffe900](https://placehold.co/10x10/ffe900/ffe900.png) <span style="color: #fff8aa">4.790ms</span>|- / -|
|5|![#90ff00](https://placehold.co/10x10/90ff00/90ff00.png) <span style="color: #daffaa">1.497ms</span> / ![#fbff00](https://placehold.co/10x10/fbff00/fbff00.png) <span style="color: #feffaa">3.915ms</span>|- / -|
|6|![#3eff00](https://placehold.co/10x10/3eff00/3eff00.png) <span style="color: #bfffaa">0.485ms</span> / ![#37ff00](https://placehold.co/10x10/37ff00/37ff00.png) <span style="color: #bcffaa">0.414ms</span>|- / -|
|7|![#ffea00](https://placehold.co/10x10/ffea00/ffea00.png) <span style="color: #fff8aa">4.758ms</span> / ![#f5ff00](https://placehold.co/10x10/f5ff00/f5ff00.png) <span style="color: #fcffaa">3.720ms</span>|- / -|
|8|![#fff500](https://placehold.co/10x10/fff500/fff500.png) <span style="color: #fffcaa">4.358ms</span> / ![#ff2400](https://placehold.co/10x10/ff2400/ff2400.png) <span style="color: #ffb6aa">19.246ms</span>|- / -|
|9|![#ffff00](https://placehold.co/10x10/ffff00/ffff00.png) <span style="color: #ffffaa">4.050ms</span> / ![#feff00](https://placehold.co/10x10/feff00/feff00.png) <span style="color: #ffffaa">4.000ms</span>|- / -|
|10|![#ffad00](https://placehold.co/10x10/ffad00/ffad00.png) <span style="color: #ffe4aa">7.463ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">24.428ms</span>|- / -|
|11|![#fffc00](https://placehold.co/10x10/fffc00/fffc00.png) <span style="color: #fffeaa">4.129ms</span> / ![#fff700](https://placehold.co/10x10/fff700/fff700.png) <span style="color: #fffcaa">4.320ms</span>|- / -|
|12|![#ffb700](https://placehold.co/10x10/ffb700/ffb700.png) <span style="color: #ffe7aa">6.973ms</span> / ![#ff1400](https://placehold.co/10x10/ff1400/ff1400.png) <span style="color: #ffb1aa">21.386ms</span>|- / -|
|13|![#8dff00](https://placehold.co/10x10/8dff00/8dff00.png) <span style="color: #d9ffaa">1.451ms</span> / ![#9bff00](https://placehold.co/10x10/9bff00/9bff00.png) <span style="color: #deffaa">1.668ms</span>|- / -|
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
|Total|150.431ms|0.644ms|
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
