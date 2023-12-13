# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#b6ff00](https://placehold.co/10x10/b6ff00/b6ff00.png) <span style="color: #e7ffaa">3.066ms</span> / ![#a1ff00](https://placehold.co/10x10/a1ff00/a1ff00.png) <span style="color: #e0ffaa">2.446ms</span>|![#ff9900](https://placehold.co/10x10/ff9900/ff9900.png) <span style="color: #ffddaa">0.133ms</span> / ![#ff6700](https://placehold.co/10x10/ff6700/ff6700.png) <span style="color: #ffccaa">0.153ms</span>|
|2|![#e3ff00](https://placehold.co/10x10/e3ff00/e3ff00.png) <span style="color: #f6ffaa">4.758ms</span> / ![#fff500](https://placehold.co/10x10/fff500/fff500.png) <span style="color: #fffcaa">6.660ms</span>|![#ff2b00](https://placehold.co/10x10/ff2b00/ff2b00.png) <span style="color: #ffb8aa">0.177ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.195ms</span>|
|3|![#bbff00](https://placehold.co/10x10/bbff00/bbff00.png) <span style="color: #e8ffaa">3.211ms</span> / ![#ebff00](https://placehold.co/10x10/ebff00/ebff00.png) <span style="color: #f8ffaa">5.094ms</span>|- / -|
|4|![#e1ff00](https://placehold.co/10x10/e1ff00/e1ff00.png) <span style="color: #f5ffaa">4.670ms</span> / ![#edff00](https://placehold.co/10x10/edff00/edff00.png) <span style="color: #f9ffaa">5.208ms</span>|- / -|
|5|![#83ff00](https://placehold.co/10x10/83ff00/83ff00.png) <span style="color: #d6ffaa">1.736ms</span> / ![#e1ff00](https://placehold.co/10x10/e1ff00/e1ff00.png) <span style="color: #f5ffaa">4.655ms</span>|- / -|
|6|![#31ff00](https://placehold.co/10x10/31ff00/31ff00.png) <span style="color: #baffaa">0.457ms</span> / ![#2eff00](https://placehold.co/10x10/2eff00/2eff00.png) <span style="color: #b9ffaa">0.422ms</span>|- / -|
|7|![#e5ff00](https://placehold.co/10x10/e5ff00/e5ff00.png) <span style="color: #f6ffaa">4.809ms</span> / ![#c9ff00](https://placehold.co/10x10/c9ff00/c9ff00.png) <span style="color: #edffaa">3.704ms</span>|- / -|
|8|![#ddff00](https://placehold.co/10x10/ddff00/ddff00.png) <span style="color: #f4ffaa">4.468ms</span> / ![#ff7600](https://placehold.co/10x10/ff7600/ff7600.png) <span style="color: #ffd1aa">19.366ms</span>|- / -|
|9|![#dfff00](https://placehold.co/10x10/dfff00/dfff00.png) <span style="color: #f4ffaa">4.582ms</span> / ![#cfff00](https://placehold.co/10x10/cfff00/cfff00.png) <span style="color: #efffaa">3.922ms</span>|- / -|
|10|![#ffe900](https://placehold.co/10x10/ffe900/ffe900.png) <span style="color: #fff8aa">7.413ms</span> / ![#ff5800](https://placehold.co/10x10/ff5800/ff5800.png) <span style="color: #ffc7aa">24.652ms</span>|- / -|
|11|![#d6ff00](https://placehold.co/10x10/d6ff00/d6ff00.png) <span style="color: #f1ffaa">4.191ms</span> / ![#d6ff00](https://placehold.co/10x10/d6ff00/d6ff00.png) <span style="color: #f1ffaa">4.185ms</span>|- / -|
|12|![#ffec00](https://placehold.co/10x10/ffec00/ffec00.png) <span style="color: #fff9aa">7.222ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">49.663ms</span>|- / -|
|13|![#beff00](https://placehold.co/10x10/beff00/beff00.png) <span style="color: #e9ffaa">3.328ms</span> / ![#afff00](https://placehold.co/10x10/afff00/afff00.png) <span style="color: #e4ffaa">2.839ms</span>|- / -|
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
|Total|186.726ms|0.657ms|
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
