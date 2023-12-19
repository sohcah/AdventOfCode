# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#81ff00](https://placehold.co/10x10/81ff00/81ff00.png) <span style="color: #d5ffaa">2.287ms</span> / ![#7bff00](https://placehold.co/10x10/7bff00/7bff00.png) <span style="color: #d3ffaa">2.116ms</span>|![#62ff00](https://placehold.co/10x10/62ff00/62ff00.png) <span style="color: #cbffaa">1.564ms</span> / ![#57ff00](https://placehold.co/10x10/57ff00/57ff00.png) <span style="color: #c7ffaa">1.309ms</span>|![#ff5500](https://placehold.co/10x10/ff5500/ff5500.png) <span style="color: #ffc6aa">0.155ms</span> / ![#ff4000](https://placehold.co/10x10/ff4000/ff4000.png) <span style="color: #ffbfaa">0.164ms</span>|
|2|![#b3ff00](https://placehold.co/10x10/b3ff00/b3ff00.png) <span style="color: #e6ffaa">4.235ms</span> / ![#b9ff00](https://placehold.co/10x10/b9ff00/b9ff00.png) <span style="color: #e8ffaa">4.508ms</span>|![#98ff00](https://placehold.co/10x10/98ff00/98ff00.png) <span style="color: #ddffaa">3.334ms</span> / ![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">3.824ms</span>|![#ff1e00](https://placehold.co/10x10/ff1e00/ff1e00.png) <span style="color: #ffb4aa">0.177ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.189ms</span>|
|3|![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">1.999ms</span> / ![#bcff00](https://placehold.co/10x10/bcff00/bcff00.png) <span style="color: #e9ffaa">4.678ms</span>|![#5eff00](https://placehold.co/10x10/5eff00/5eff00.png) <span style="color: #c9ffaa">1.468ms</span> / ![#adff00](https://placehold.co/10x10/adff00/adff00.png) <span style="color: #e4ffaa">4.315ms</span>|- / -|
|4|![#b3ff00](https://placehold.co/10x10/b3ff00/b3ff00.png) <span style="color: #e6ffaa">4.211ms</span> / ![#b3ff00](https://placehold.co/10x10/b3ff00/b3ff00.png) <span style="color: #e6ffaa">4.256ms</span>|![#b6ff00](https://placehold.co/10x10/b6ff00/b6ff00.png) <span style="color: #e7ffaa">4.796ms</span> / ![#b6ff00](https://placehold.co/10x10/b6ff00/b6ff00.png) <span style="color: #e7ffaa">4.745ms</span>|- / -|
|5|![#64ff00](https://placehold.co/10x10/64ff00/64ff00.png) <span style="color: #cbffaa">1.511ms</span> / ![#a2ff00](https://placehold.co/10x10/a2ff00/a2ff00.png) <span style="color: #e0ffaa">3.470ms</span>|![#66ff00](https://placehold.co/10x10/66ff00/66ff00.png) <span style="color: #ccffaa">1.661ms</span> / ![#ebff00](https://placehold.co/10x10/ebff00/ebff00.png) <span style="color: #f8ffaa">8.647ms</span>|- / -|
|6|![#25ff00](https://placehold.co/10x10/25ff00/25ff00.png) <span style="color: #b6ffaa">0.414ms</span> / ![#20ff00](https://placehold.co/10x10/20ff00/20ff00.png) <span style="color: #b5ffaa">0.341ms</span>|![#26ff00](https://placehold.co/10x10/26ff00/26ff00.png) <span style="color: #b7ffaa">0.440ms</span> / ![#1eff00](https://placehold.co/10x10/1eff00/1eff00.png) <span style="color: #b4ffaa">0.341ms</span>|- / -|
|7|![#b1ff00](https://placehold.co/10x10/b1ff00/b1ff00.png) <span style="color: #e5ffaa">4.142ms</span> / ![#9eff00](https://placehold.co/10x10/9eff00/9eff00.png) <span style="color: #dfffaa">3.294ms</span>|![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">3.661ms</span> / ![#8bff00](https://placehold.co/10x10/8bff00/8bff00.png) <span style="color: #d8ffaa">2.826ms</span>|- / -|
|8|![#afff00](https://placehold.co/10x10/afff00/afff00.png) <span style="color: #e4ffaa">4.025ms</span> / ![#ffdd00](https://placehold.co/10x10/ffdd00/ffdd00.png) <span style="color: #fff4aa">13.450ms</span>|![#c6ff00](https://placehold.co/10x10/c6ff00/c6ff00.png) <span style="color: #ecffaa">5.730ms</span> / ![#ffe400](https://placehold.co/10x10/ffe400/ffe400.png) <span style="color: #fff6aa">14.095ms</span>|- / -|
|9|![#a7ff00](https://placehold.co/10x10/a7ff00/a7ff00.png) <span style="color: #e2ffaa">3.678ms</span> / ![#a5ff00](https://placehold.co/10x10/a5ff00/a5ff00.png) <span style="color: #e1ffaa">3.591ms</span>|![#a2ff00](https://placehold.co/10x10/a2ff00/a2ff00.png) <span style="color: #e0ffaa">3.777ms</span> / ![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">3.663ms</span>|- / -|
|10|![#b2ff00](https://placehold.co/10x10/b2ff00/b2ff00.png) <span style="color: #e5ffaa">4.163ms</span> / ![#ffec00](https://placehold.co/10x10/ffec00/ffec00.png) <span style="color: #fff9aa">11.575ms</span>|![#d3ff00](https://placehold.co/10x10/d3ff00/d3ff00.png) <span style="color: #f0ffaa">6.615ms</span> / ![#ffd700](https://placehold.co/10x10/ffd700/ffd700.png) <span style="color: #fff2aa">16.068ms</span>|- / -|
|11|![#bfff00](https://placehold.co/10x10/bfff00/bfff00.png) <span style="color: #eaffaa">4.839ms</span> / ![#aaff00](https://placehold.co/10x10/aaff00/aaff00.png) <span style="color: #e3ffaa">3.794ms</span>|![#9dff00](https://placehold.co/10x10/9dff00/9dff00.png) <span style="color: #deffaa">3.549ms</span> / ![#9dff00](https://placehold.co/10x10/9dff00/9dff00.png) <span style="color: #deffaa">3.523ms</span>|- / -|
|12|![#d7ff00](https://placehold.co/10x10/d7ff00/d7ff00.png) <span style="color: #f2ffaa">6.273ms</span> / ![#ffba00](https://placehold.co/10x10/ffba00/ffba00.png) <span style="color: #ffe8aa">19.022ms</span>|![#ceff00](https://placehold.co/10x10/ceff00/ceff00.png) <span style="color: #efffaa">6.241ms</span> / ![#ffb000](https://placehold.co/10x10/ffb000/ffb000.png) <span style="color: #ffe5aa">24.048ms</span>|- / -|
|13|![#5dff00](https://placehold.co/10x10/5dff00/5dff00.png) <span style="color: #c9ffaa">1.368ms</span> / ![#68ff00](https://placehold.co/10x10/68ff00/68ff00.png) <span style="color: #cdffaa">1.611ms</span>|![#5bff00](https://placehold.co/10x10/5bff00/5bff00.png) <span style="color: #c8ffaa">1.394ms</span> / ![#70ff00](https://placehold.co/10x10/70ff00/70ff00.png) <span style="color: #cfffaa">1.943ms</span>|- / -|
|14|![#75ff00](https://placehold.co/10x10/75ff00/75ff00.png) <span style="color: #d1ffaa">1.956ms</span> / ![#ff9200](https://placehold.co/10x10/ff9200/ff9200.png) <span style="color: #ffdbaa">28.035ms</span>|![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">2.150ms</span> / ![#ff5b00](https://placehold.co/10x10/ff5b00/ff5b00.png) <span style="color: #ffc8aa">55.645ms</span>|- / -|
|15|![#6dff00](https://placehold.co/10x10/6dff00/6dff00.png) <span style="color: #ceffaa">1.727ms</span> / ![#98ff00](https://placehold.co/10x10/98ff00/98ff00.png) <span style="color: #ddffaa">3.075ms</span>|![#63ff00](https://placehold.co/10x10/63ff00/63ff00.png) <span style="color: #cbffaa">1.593ms</span> / ![#87ff00](https://placehold.co/10x10/87ff00/87ff00.png) <span style="color: #d7ffaa">2.658ms</span>|- / -|
|16|![#b0ff00](https://placehold.co/10x10/b0ff00/b0ff00.png) <span style="color: #e5ffaa">4.106ms</span> / ![#ff6c00](https://placehold.co/10x10/ff6c00/ff6c00.png) <span style="color: #ffceaa">40.237ms</span>|![#b9ff00](https://placehold.co/10x10/b9ff00/b9ff00.png) <span style="color: #e8ffaa">4.943ms</span> / ![#ff6000](https://placehold.co/10x10/ff6000/ff6000.png) <span style="color: #ffcaaa">52.700ms</span>|- / -|
|17|![#ff5c00](https://placehold.co/10x10/ff5c00/ff5c00.png) <span style="color: #ffc9aa">46.501ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">110.641ms</span>|![#ff6400](https://placehold.co/10x10/ff6400/ff6400.png) <span style="color: #ffcbaa">50.728ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">134.751ms</span>|- / -|
|18|![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">2.439ms</span> / ![#84ff00](https://placehold.co/10x10/84ff00/84ff00.png) <span style="color: #d6ffaa">2.399ms</span>|![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">1.780ms</span> / ![#6eff00](https://placehold.co/10x10/6eff00/6eff00.png) <span style="color: #cfffaa">1.882ms</span>|- / -|
|19|![#6bff00](https://placehold.co/10x10/6bff00/6bff00.png) <span style="color: #ceffaa">1.689ms</span> / ![#80ff00](https://placehold.co/10x10/80ff00/80ff00.png) <span style="color: #d5ffaa">2.268ms</span>|![#6eff00](https://placehold.co/10x10/6eff00/6eff00.png) <span style="color: #cfffaa">1.870ms</span> / ![#87ff00](https://placehold.co/10x10/87ff00/87ff00.png) <span style="color: #d7ffaa">2.686ms</span>|- / -|
|20|- / -|- / -|- / -|
|21|- / -|- / -|- / -|
|22|- / -|- / -|- / -|
|23|- / -|- / -|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|363.925ms|446.965ms|0.685ms|
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
