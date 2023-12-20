# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#7bff00](https://placehold.co/10x10/7bff00/7bff00.png) <span style="color: #d3ffaa">2.124ms</span> / ![#79ff00](https://placehold.co/10x10/79ff00/79ff00.png) <span style="color: #d2ffaa">2.074ms</span>|![#75ff00](https://placehold.co/10x10/75ff00/75ff00.png) <span style="color: #d1ffaa">2.085ms</span> / ![#5bff00](https://placehold.co/10x10/5bff00/5bff00.png) <span style="color: #c8ffaa">1.409ms</span>|![#ff2000](https://placehold.co/10x10/ff2000/ff2000.png) <span style="color: #ffb5aa">0.151ms</span> / ![#ff2000](https://placehold.co/10x10/ff2000/ff2000.png) <span style="color: #ffb5aa">0.151ms</span>|
|2|![#b0ff00](https://placehold.co/10x10/b0ff00/b0ff00.png) <span style="color: #e5ffaa">4.113ms</span> / ![#b9ff00](https://placehold.co/10x10/b9ff00/b9ff00.png) <span style="color: #e8ffaa">4.526ms</span>|![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">3.815ms</span> / ![#a7ff00](https://placehold.co/10x10/a7ff00/a7ff00.png) <span style="color: #e2ffaa">4.025ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.162ms</span> / ![#ff0800](https://placehold.co/10x10/ff0800/ff0800.png) <span style="color: #ffadaa">0.159ms</span>|
|3|![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">1.904ms</span> / ![#b9ff00](https://placehold.co/10x10/b9ff00/b9ff00.png) <span style="color: #e8ffaa">4.565ms</span>|![#6cff00](https://placehold.co/10x10/6cff00/6cff00.png) <span style="color: #ceffaa">1.836ms</span> / ![#9bff00](https://placehold.co/10x10/9bff00/9bff00.png) <span style="color: #deffaa">3.467ms</span>|- / -|
|4|![#b2ff00](https://placehold.co/10x10/b2ff00/b2ff00.png) <span style="color: #e5ffaa">4.179ms</span> / ![#b2ff00](https://placehold.co/10x10/b2ff00/b2ff00.png) <span style="color: #e5ffaa">4.209ms</span>|![#b8ff00](https://placehold.co/10x10/b8ff00/b8ff00.png) <span style="color: #e7ffaa">4.912ms</span> / ![#b8ff00](https://placehold.co/10x10/b8ff00/b8ff00.png) <span style="color: #e7ffaa">4.921ms</span>|- / -|
|5|![#5eff00](https://placehold.co/10x10/5eff00/5eff00.png) <span style="color: #c9ffaa">1.390ms</span> / ![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">3.521ms</span>|![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">1.796ms</span> / ![#9cff00](https://placehold.co/10x10/9cff00/9cff00.png) <span style="color: #deffaa">3.526ms</span>|- / -|
|6|![#24ff00](https://placehold.co/10x10/24ff00/24ff00.png) <span style="color: #b6ffaa">0.395ms</span> / ![#20ff00](https://placehold.co/10x10/20ff00/20ff00.png) <span style="color: #b5ffaa">0.343ms</span>|![#21ff00](https://placehold.co/10x10/21ff00/21ff00.png) <span style="color: #b5ffaa">0.376ms</span> / ![#1eff00](https://placehold.co/10x10/1eff00/1eff00.png) <span style="color: #b4ffaa">0.334ms</span>|- / -|
|7|![#adff00](https://placehold.co/10x10/adff00/adff00.png) <span style="color: #e4ffaa">3.967ms</span> / ![#9cff00](https://placehold.co/10x10/9cff00/9cff00.png) <span style="color: #deffaa">3.232ms</span>|![#9eff00](https://placehold.co/10x10/9eff00/9eff00.png) <span style="color: #dfffaa">3.584ms</span> / ![#95ff00](https://placehold.co/10x10/95ff00/95ff00.png) <span style="color: #dcffaa">3.228ms</span>|- / -|
|8|![#abff00](https://placehold.co/10x10/abff00/abff00.png) <span style="color: #e3ffaa">3.866ms</span> / ![#ffdc00](https://placehold.co/10x10/ffdc00/ffdc00.png) <span style="color: #fff3aa">13.637ms</span>|![#d1ff00](https://placehold.co/10x10/d1ff00/d1ff00.png) <span style="color: #f0ffaa">6.502ms</span> / ![#ffd100](https://placehold.co/10x10/ffd100/ffd100.png) <span style="color: #fff0aa">17.273ms</span>|- / -|
|9|![#a5ff00](https://placehold.co/10x10/a5ff00/a5ff00.png) <span style="color: #e1ffaa">3.605ms</span> / ![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">3.527ms</span>|![#b3ff00](https://placehold.co/10x10/b3ff00/b3ff00.png) <span style="color: #e6ffaa">4.643ms</span> / ![#b1ff00](https://placehold.co/10x10/b1ff00/b1ff00.png) <span style="color: #e5ffaa">4.506ms</span>|- / -|
|10|![#b1ff00](https://placehold.co/10x10/b1ff00/b1ff00.png) <span style="color: #e5ffaa">4.168ms</span> / ![#ffeb00](https://placehold.co/10x10/ffeb00/ffeb00.png) <span style="color: #fff8aa">11.753ms</span>|![#ddff00](https://placehold.co/10x10/ddff00/ddff00.png) <span style="color: #f4ffaa">7.427ms</span> / ![#ffd600](https://placehold.co/10x10/ffd600/ffd600.png) <span style="color: #fff1aa">16.481ms</span>|- / -|
|11|![#a8ff00](https://placehold.co/10x10/a8ff00/a8ff00.png) <span style="color: #e2ffaa">3.721ms</span> / ![#a9ff00](https://placehold.co/10x10/a9ff00/a9ff00.png) <span style="color: #e2ffaa">3.781ms</span>|![#caff00](https://placehold.co/10x10/caff00/caff00.png) <span style="color: #edffaa">6.037ms</span> / ![#ccff00](https://placehold.co/10x10/ccff00/ccff00.png) <span style="color: #eeffaa">6.158ms</span>|- / -|
|12|![#d4ff00](https://placehold.co/10x10/d4ff00/d4ff00.png) <span style="color: #f1ffaa">6.153ms</span> / ![#ffb900](https://placehold.co/10x10/ffb900/ffb900.png) <span style="color: #ffe8aa">19.357ms</span>|![#daff00](https://placehold.co/10x10/daff00/daff00.png) <span style="color: #f3ffaa">7.251ms</span> / ![#ffa700](https://placehold.co/10x10/ffa700/ffa700.png) <span style="color: #ffe2aa">26.395ms</span>|- / -|
|13|![#5aff00](https://placehold.co/10x10/5aff00/5aff00.png) <span style="color: #c8ffaa">1.297ms</span> / ![#63ff00](https://placehold.co/10x10/63ff00/63ff00.png) <span style="color: #cbffaa">1.513ms</span>|![#70ff00](https://placehold.co/10x10/70ff00/70ff00.png) <span style="color: #cfffaa">1.947ms</span> / ![#82ff00](https://placehold.co/10x10/82ff00/82ff00.png) <span style="color: #d5ffaa">2.525ms</span>|- / -|
|14|![#74ff00](https://placehold.co/10x10/74ff00/74ff00.png) <span style="color: #d1ffaa">1.936ms</span> / ![#ff9100](https://placehold.co/10x10/ff9100/ff9100.png) <span style="color: #ffdaaa">28.493ms</span>|![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">2.723ms</span> / ![#ff5f00](https://placehold.co/10x10/ff5f00/ff5f00.png) <span style="color: #ffcaaa">54.263ms</span>|- / -|
|15|![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">1.633ms</span> / ![#94ff00](https://placehold.co/10x10/94ff00/94ff00.png) <span style="color: #dbffaa">2.938ms</span>|![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">2.026ms</span> / ![#9aff00](https://placehold.co/10x10/9aff00/9aff00.png) <span style="color: #ddffaa">3.414ms</span>|- / -|
|16|![#acff00](https://placehold.co/10x10/acff00/acff00.png) <span style="color: #e3ffaa">3.930ms</span> / ![#ff6b00](https://placehold.co/10x10/ff6b00/ff6b00.png) <span style="color: #ffceaa">40.903ms</span>|![#cfff00](https://placehold.co/10x10/cfff00/cfff00.png) <span style="color: #efffaa">6.400ms</span> / ![#ff6500](https://placehold.co/10x10/ff6500/ff6500.png) <span style="color: #ffccaa">51.090ms</span>|- / -|
|17|![#ff5e00](https://placehold.co/10x10/ff5e00/ff5e00.png) <span style="color: #ffc9aa">46.269ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">111.451ms</span>|![#ff5b00](https://placehold.co/10x10/ff5b00/ff5b00.png) <span style="color: #ffc8aa">56.389ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">136.883ms</span>|- / -|
|18|![#83ff00](https://placehold.co/10x10/83ff00/83ff00.png) <span style="color: #d6ffaa">2.354ms</span> / ![#84ff00](https://placehold.co/10x10/84ff00/84ff00.png) <span style="color: #d6ffaa">2.386ms</span>|![#7aff00](https://placehold.co/10x10/7aff00/7aff00.png) <span style="color: #d3ffaa">2.246ms</span> / ![#7bff00](https://placehold.co/10x10/7bff00/7bff00.png) <span style="color: #d3ffaa">2.289ms</span>|- / -|
|19|![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">1.653ms</span> / ![#7cff00](https://placehold.co/10x10/7cff00/7cff00.png) <span style="color: #d3ffaa">2.146ms</span>|![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">2.720ms</span> / ![#9dff00](https://placehold.co/10x10/9dff00/9dff00.png) <span style="color: #deffaa">3.550ms</span>|- / -|
|20|![#fff300](https://placehold.co/10x10/fff300/fff300.png) <span style="color: #fffbaa">10.901ms</span> / ![#ffa000](https://placehold.co/10x10/ffa000/ffa000.png) <span style="color: #ffdfaa">24.642ms</span>|![#fff500](https://placehold.co/10x10/fff500/fff500.png) <span style="color: #fffcaa">11.936ms</span> / ![#ffac00](https://placehold.co/10x10/ffac00/ffac00.png) <span style="color: #ffe3aa">25.152ms</span>|- / -|
|21|- / -|- / -|- / -|
|22|- / -|- / -|- / -|
|23|- / -|- / -|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|398.556ms|507.540ms|0.623ms|
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
