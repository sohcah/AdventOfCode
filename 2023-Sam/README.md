# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#7cff00](https://placehold.co/10x10/7cff00/7cff00.png) <span style="color: #d3ffaa">2.162ms</span> / ![#76ff00](https://placehold.co/10x10/76ff00/76ff00.png) <span style="color: #d1ffaa">1.989ms</span>|![#62ff00](https://placehold.co/10x10/62ff00/62ff00.png) <span style="color: #cbffaa">1.556ms</span> / ![#59ff00](https://placehold.co/10x10/59ff00/59ff00.png) <span style="color: #c8ffaa">1.356ms</span>|![#ff1d00](https://placehold.co/10x10/ff1d00/ff1d00.png) <span style="color: #ffb4aa">0.137ms</span> / ![#ff4100](https://placehold.co/10x10/ff4100/ff4100.png) <span style="color: #ffc0aa">0.126ms</span>|
|2|![#adff00](https://placehold.co/10x10/adff00/adff00.png) <span style="color: #e4ffaa">3.989ms</span> / ![#bbff00](https://placehold.co/10x10/bbff00/bbff00.png) <span style="color: #e8ffaa">4.683ms</span>|![#9aff00](https://placehold.co/10x10/9aff00/9aff00.png) <span style="color: #ddffaa">3.355ms</span> / ![#9dff00](https://placehold.co/10x10/9dff00/9dff00.png) <span style="color: #deffaa">3.487ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.146ms</span> / ![#ff0b00](https://placehold.co/10x10/ff0b00/ff0b00.png) <span style="color: #ffaeaa">0.143ms</span>|
|3|![#74ff00](https://placehold.co/10x10/74ff00/74ff00.png) <span style="color: #d1ffaa">1.931ms</span> / ![#baff00](https://placehold.co/10x10/baff00/baff00.png) <span style="color: #e8ffaa">4.607ms</span>|![#58ff00](https://placehold.co/10x10/58ff00/58ff00.png) <span style="color: #c7ffaa">1.320ms</span> / ![#8eff00](https://placehold.co/10x10/8eff00/8eff00.png) <span style="color: #d9ffaa">2.886ms</span>|- / -|
|4|![#b2ff00](https://placehold.co/10x10/b2ff00/b2ff00.png) <span style="color: #e5ffaa">4.196ms</span> / ![#b6ff00](https://placehold.co/10x10/b6ff00/b6ff00.png) <span style="color: #e7ffaa">4.389ms</span>|![#b0ff00](https://placehold.co/10x10/b0ff00/b0ff00.png) <span style="color: #e5ffaa">4.391ms</span> / ![#b2ff00](https://placehold.co/10x10/b2ff00/b2ff00.png) <span style="color: #e5ffaa">4.501ms</span>|- / -|
|5|![#5dff00](https://placehold.co/10x10/5dff00/5dff00.png) <span style="color: #c9ffaa">1.379ms</span> / ![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">3.519ms</span>|![#5aff00](https://placehold.co/10x10/5aff00/5aff00.png) <span style="color: #c8ffaa">1.363ms</span> / ![#91ff00](https://placehold.co/10x10/91ff00/91ff00.png) <span style="color: #daffaa">3.028ms</span>|- / -|
|6|![#23ff00](https://placehold.co/10x10/23ff00/23ff00.png) <span style="color: #b6ffaa">0.380ms</span> / ![#20ff00](https://placehold.co/10x10/20ff00/20ff00.png) <span style="color: #b5ffaa">0.344ms</span>|![#22ff00](https://placehold.co/10x10/22ff00/22ff00.png) <span style="color: #b5ffaa">0.388ms</span> / ![#1cff00](https://placehold.co/10x10/1cff00/1cff00.png) <span style="color: #b3ffaa">0.309ms</span>|- / -|
|7|![#b3ff00](https://placehold.co/10x10/b3ff00/b3ff00.png) <span style="color: #e6ffaa">4.282ms</span> / ![#9eff00](https://placehold.co/10x10/9eff00/9eff00.png) <span style="color: #dfffaa">3.348ms</span>|![#97ff00](https://placehold.co/10x10/97ff00/97ff00.png) <span style="color: #dcffaa">3.263ms</span> / ![#8aff00](https://placehold.co/10x10/8aff00/8aff00.png) <span style="color: #d8ffaa">2.765ms</span>|- / -|
|8|![#a9ff00](https://placehold.co/10x10/a9ff00/a9ff00.png) <span style="color: #e2ffaa">3.796ms</span> / ![#ffdf00](https://placehold.co/10x10/ffdf00/ffdf00.png) <span style="color: #fff4aa">13.391ms</span>|![#c4ff00](https://placehold.co/10x10/c4ff00/c4ff00.png) <span style="color: #ebffaa">5.529ms</span> / ![#ffe300](https://placehold.co/10x10/ffe300/ffe300.png) <span style="color: #fff6aa">13.977ms</span>|- / -|
|9|![#a4ff00](https://placehold.co/10x10/a4ff00/a4ff00.png) <span style="color: #e1ffaa">3.594ms</span> / ![#a1ff00](https://placehold.co/10x10/a1ff00/a1ff00.png) <span style="color: #e0ffaa">3.434ms</span>|![#a2ff00](https://placehold.co/10x10/a2ff00/a2ff00.png) <span style="color: #e0ffaa">3.709ms</span> / ![#9dff00](https://placehold.co/10x10/9dff00/9dff00.png) <span style="color: #deffaa">3.506ms</span>|- / -|
|10|![#b1ff00](https://placehold.co/10x10/b1ff00/b1ff00.png) <span style="color: #e5ffaa">4.165ms</span> / ![#ffee00](https://placehold.co/10x10/ffee00/ffee00.png) <span style="color: #fff9aa">11.460ms</span>|![#cfff00](https://placehold.co/10x10/cfff00/cfff00.png) <span style="color: #efffaa">6.276ms</span> / ![#ffd800](https://placehold.co/10x10/ffd800/ffd800.png) <span style="color: #fff2aa">15.782ms</span>|- / -|
|11|![#a7ff00](https://placehold.co/10x10/a7ff00/a7ff00.png) <span style="color: #e2ffaa">3.719ms</span> / ![#a8ff00](https://placehold.co/10x10/a8ff00/a8ff00.png) <span style="color: #e2ffaa">3.754ms</span>|![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">3.630ms</span> / ![#9dff00](https://placehold.co/10x10/9dff00/9dff00.png) <span style="color: #deffaa">3.501ms</span>|- / -|
|12|![#d5ff00](https://placehold.co/10x10/d5ff00/d5ff00.png) <span style="color: #f1ffaa">6.206ms</span> / ![#ffbb00](https://placehold.co/10x10/ffbb00/ffbb00.png) <span style="color: #ffe8aa">18.978ms</span>|![#cfff00](https://placehold.co/10x10/cfff00/cfff00.png) <span style="color: #efffaa">6.288ms</span> / ![#ffae00](https://placehold.co/10x10/ffae00/ffae00.png) <span style="color: #ffe4aa">23.884ms</span>|- / -|
|13|![#5bff00](https://placehold.co/10x10/5bff00/5bff00.png) <span style="color: #c8ffaa">1.329ms</span> / ![#64ff00](https://placehold.co/10x10/64ff00/64ff00.png) <span style="color: #cbffaa">1.524ms</span>|![#51ff00](https://placehold.co/10x10/51ff00/51ff00.png) <span style="color: #c5ffaa">1.172ms</span> / ![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">1.769ms</span>|- / -|
|14|![#74ff00](https://placehold.co/10x10/74ff00/74ff00.png) <span style="color: #d1ffaa">1.924ms</span> / ![#ff9100](https://placehold.co/10x10/ff9100/ff9100.png) <span style="color: #ffdaaa">28.504ms</span>|![#72ff00](https://placehold.co/10x10/72ff00/72ff00.png) <span style="color: #d0ffaa">1.979ms</span> / ![#ff5800](https://placehold.co/10x10/ff5800/ff5800.png) <span style="color: #ffc7aa">55.982ms</span>|- / -|
|15|![#6cff00](https://placehold.co/10x10/6cff00/6cff00.png) <span style="color: #ceffaa">1.734ms</span> / ![#93ff00](https://placehold.co/10x10/93ff00/93ff00.png) <span style="color: #dbffaa">2.915ms</span>|![#64ff00](https://placehold.co/10x10/64ff00/64ff00.png) <span style="color: #cbffaa">1.595ms</span> / ![#84ff00](https://placehold.co/10x10/84ff00/84ff00.png) <span style="color: #d6ffaa">2.525ms</span>|- / -|
|16|![#adff00](https://placehold.co/10x10/adff00/adff00.png) <span style="color: #e4ffaa">3.993ms</span> / ![#ff6d00](https://placehold.co/10x10/ff6d00/ff6d00.png) <span style="color: #ffceaa">40.396ms</span>|![#c3ff00](https://placehold.co/10x10/c3ff00/c3ff00.png) <span style="color: #ebffaa">5.466ms</span> / ![#ff5d00](https://placehold.co/10x10/ff5d00/ff5d00.png) <span style="color: #ffc9aa">53.557ms</span>|- / -|
|17|![#ff6000](https://placehold.co/10x10/ff6000/ff6000.png) <span style="color: #ffcaaa">45.593ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">112.411ms</span>|![#ff6100](https://placehold.co/10x10/ff6100/ff6100.png) <span style="color: #ffcaaa">51.526ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">131.409ms</span>|- / -|
|18|![#83ff00](https://placehold.co/10x10/83ff00/83ff00.png) <span style="color: #d6ffaa">2.364ms</span> / ![#82ff00](https://placehold.co/10x10/82ff00/82ff00.png) <span style="color: #d5ffaa">2.351ms</span>|![#6cff00](https://placehold.co/10x10/6cff00/6cff00.png) <span style="color: #ceffaa">1.819ms</span> / ![#6dff00](https://placehold.co/10x10/6dff00/6dff00.png) <span style="color: #ceffaa">1.830ms</span>|- / -|
|19|![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">1.643ms</span> / ![#7bff00](https://placehold.co/10x10/7bff00/7bff00.png) <span style="color: #d3ffaa">2.133ms</span>|![#72ff00](https://placehold.co/10x10/72ff00/72ff00.png) <span style="color: #d0ffaa">1.992ms</span> / ![#94ff00](https://placehold.co/10x10/94ff00/94ff00.png) <span style="color: #dbffaa">3.122ms</span>|- / -|
|20|![#fff700](https://placehold.co/10x10/fff700/fff700.png) <span style="color: #fffcaa">10.500ms</span> / ![#ff9900](https://placehold.co/10x10/ff9900/ff9900.png) <span style="color: #ffddaa">26.311ms</span>|![#f3ff00](https://placehold.co/10x10/f3ff00/f3ff00.png) <span style="color: #fbffaa">9.264ms</span> / ![#ffb800](https://placehold.co/10x10/ffb800/ffb800.png) <span style="color: #ffe7aa">21.807ms</span>|- / -|
|21|![#ffea00](https://placehold.co/10x10/ffea00/ffea00.png) <span style="color: #fff8aa">11.988ms</span> / ![#ff8d00](https://placehold.co/10x10/ff8d00/ff8d00.png) <span style="color: #ffd9aa">29.645ms</span>|![#ffef00](https://placehold.co/10x10/ffef00/ffef00.png) <span style="color: #fffaaa">12.354ms</span> / ![#ff6700](https://placehold.co/10x10/ff6700/ff6700.png) <span style="color: #ffccaa">48.169ms</span>|- / -|
|22|![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">3.548ms</span> / ![#dfff00](https://placehold.co/10x10/dfff00/dfff00.png) <span style="color: #f4ffaa">6.884ms</span>|![#adff00](https://placehold.co/10x10/adff00/adff00.png) <span style="color: #e4ffaa">4.226ms</span> / ![#e8ff00](https://placehold.co/10x10/e8ff00/e8ff00.png) <span style="color: #f7ffaa">8.245ms</span>|- / -|
|23|- / -|- / -|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|451.386ms|539.860ms|0.552ms|
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
sudo bun run bench
```
