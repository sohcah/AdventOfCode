# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#8fff00](https://placehold.co/10x10/8fff00/8fff00.png) <span style="color: #daffaa">2.566ms</span> / ![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">2.285ms</span>|![#ff5d00](https://placehold.co/10x10/ff5d00/ff5d00.png) <span style="color: #ffc9aa">0.135ms</span> / ![#ff3e00](https://placehold.co/10x10/ff3e00/ff3e00.png) <span style="color: #ffbfaa">0.146ms</span>|
|2|![#cdff00](https://placehold.co/10x10/cdff00/cdff00.png) <span style="color: #eeffaa">5.167ms</span> / ![#e7ff00](https://placehold.co/10x10/e7ff00/e7ff00.png) <span style="color: #f7ffaa">6.799ms</span>|![#ff0200](https://placehold.co/10x10/ff0200/ff0200.png) <span style="color: #ffabaa">0.167ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.168ms</span>|
|3|![#9bff00](https://placehold.co/10x10/9bff00/9bff00.png) <span style="color: #deffaa">2.946ms</span> / ![#d6ff00](https://placehold.co/10x10/d6ff00/d6ff00.png) <span style="color: #f1ffaa">5.675ms</span>|- / -|
|4|![#cbff00](https://placehold.co/10x10/cbff00/cbff00.png) <span style="color: #eeffaa">5.074ms</span> / ![#c6ff00](https://placehold.co/10x10/c6ff00/c6ff00.png) <span style="color: #ecffaa">4.791ms</span>|- / -|
|5|![#6dff00](https://placehold.co/10x10/6dff00/6dff00.png) <span style="color: #ceffaa">1.629ms</span> / ![#b5ff00](https://placehold.co/10x10/b5ff00/b5ff00.png) <span style="color: #e6ffaa">4.013ms</span>|- / -|
|6|![#2eff00](https://placehold.co/10x10/2eff00/2eff00.png) <span style="color: #b9ffaa">0.503ms</span> / ![#27ff00](https://placehold.co/10x10/27ff00/27ff00.png) <span style="color: #b7ffaa">0.413ms</span>|- / -|
|7|![#c4ff00](https://placehold.co/10x10/c4ff00/c4ff00.png) <span style="color: #ebffaa">4.710ms</span> / ![#b5ff00](https://placehold.co/10x10/b5ff00/b5ff00.png) <span style="color: #e6ffaa">3.991ms</span>|- / -|
|8|![#c3ff00](https://placehold.co/10x10/c3ff00/c3ff00.png) <span style="color: #ebffaa">4.652ms</span> / ![#ffaa00](https://placehold.co/10x10/ffaa00/ffaa00.png) <span style="color: #ffe3aa">19.575ms</span>|- / -|
|9|![#b8ff00](https://placehold.co/10x10/b8ff00/b8ff00.png) <span style="color: #e7ffaa">4.144ms</span> / ![#b9ff00](https://placehold.co/10x10/b9ff00/b9ff00.png) <span style="color: #e8ffaa">4.161ms</span>|- / -|
|10|![#caff00](https://placehold.co/10x10/caff00/caff00.png) <span style="color: #edffaa">4.990ms</span> / ![#ffd400](https://placehold.co/10x10/ffd400/ffd400.png) <span style="color: #fff1aa">13.095ms</span>|- / -|
|11|![#bdff00](https://placehold.co/10x10/bdff00/bdff00.png) <span style="color: #e9ffaa">4.336ms</span> / ![#bcff00](https://placehold.co/10x10/bcff00/bcff00.png) <span style="color: #e9ffaa">4.329ms</span>|- / -|
|12|![#edff00](https://placehold.co/10x10/edff00/edff00.png) <span style="color: #f9ffaa">7.221ms</span> / ![#ff9600](https://placehold.co/10x10/ff9600/ff9600.png) <span style="color: #ffdcaa">23.464ms</span>|- / -|
|13|![#6eff00](https://placehold.co/10x10/6eff00/6eff00.png) <span style="color: #cfffaa">1.666ms</span> / ![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">1.769ms</span>|- / -|
|14|![#99ff00](https://placehold.co/10x10/99ff00/99ff00.png) <span style="color: #ddffaa">2.876ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">91.763ms</span>|- / -|
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
|Total|238.603ms|0.615ms|
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
