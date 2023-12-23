# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#5eff00](https://placehold.co/10x10/5eff00/5eff00.png) <span style="color: #c9ffaa">2.100ms</span> / ![#5cff00](https://placehold.co/10x10/5cff00/5cff00.png) <span style="color: #c9ffaa">2.011ms</span>|![#61ff00](https://placehold.co/10x10/61ff00/61ff00.png) <span style="color: #caffaa">1.511ms</span> / ![#59ff00](https://placehold.co/10x10/59ff00/59ff00.png) <span style="color: #c8ffaa">1.322ms</span>|![#ff7f00](https://placehold.co/10x10/ff7f00/ff7f00.png) <span style="color: #ffd4aa">0.164ms</span> / ![#ff5200](https://placehold.co/10x10/ff5200/ff5200.png) <span style="color: #ffc5aa">0.185ms</span>|
|2|![#85ff00](https://placehold.co/10x10/85ff00/85ff00.png) <span style="color: #d6ffaa">3.929ms</span> / ![#8dff00](https://placehold.co/10x10/8dff00/8dff00.png) <span style="color: #d9ffaa">4.486ms</span>|![#99ff00](https://placehold.co/10x10/99ff00/99ff00.png) <span style="color: #ddffaa">3.265ms</span> / ![#9eff00](https://placehold.co/10x10/9eff00/9eff00.png) <span style="color: #dfffaa">3.472ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.224ms</span> / ![#ff1900](https://placehold.co/10x10/ff1900/ff1900.png) <span style="color: #ffb2aa">0.212ms</span>|
|3|![#57ff00](https://placehold.co/10x10/57ff00/57ff00.png) <span style="color: #c7ffaa">1.857ms</span> / ![#8eff00](https://placehold.co/10x10/8eff00/8eff00.png) <span style="color: #d9ffaa">4.530ms</span>|![#56ff00](https://placehold.co/10x10/56ff00/56ff00.png) <span style="color: #c7ffaa">1.256ms</span> / ![#8cff00](https://placehold.co/10x10/8cff00/8cff00.png) <span style="color: #d9ffaa">2.789ms</span>|- / -|
|4|![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">4.040ms</span> / ![#89ff00](https://placehold.co/10x10/89ff00/89ff00.png) <span style="color: #d8ffaa">4.196ms</span>|![#afff00](https://placehold.co/10x10/afff00/afff00.png) <span style="color: #e4ffaa">4.289ms</span> / ![#b0ff00](https://placehold.co/10x10/b0ff00/b0ff00.png) <span style="color: #e5ffaa">4.355ms</span>|- / -|
|5|![#46ff00](https://placehold.co/10x10/46ff00/46ff00.png) <span style="color: #c1ffaa">1.320ms</span> / ![#7bff00](https://placehold.co/10x10/7bff00/7bff00.png) <span style="color: #d3ffaa">3.392ms</span>|![#55ff00](https://placehold.co/10x10/55ff00/55ff00.png) <span style="color: #c6ffaa">1.253ms</span> / ![#93ff00](https://placehold.co/10x10/93ff00/93ff00.png) <span style="color: #dbffaa">3.054ms</span>|- / -|
|6|![#1bff00](https://placehold.co/10x10/1bff00/1bff00.png) <span style="color: #b3ffaa">0.377ms</span> / ![#18ff00](https://placehold.co/10x10/18ff00/18ff00.png) <span style="color: #b2ffaa">0.337ms</span>|![#1cff00](https://placehold.co/10x10/1cff00/1cff00.png) <span style="color: #b3ffaa">0.307ms</span> / ![#1cff00](https://placehold.co/10x10/1cff00/1cff00.png) <span style="color: #b3ffaa">0.299ms</span>|- / -|
|7|![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">3.989ms</span> / ![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">3.212ms</span>|![#96ff00](https://placehold.co/10x10/96ff00/96ff00.png) <span style="color: #dcffaa">3.174ms</span> / ![#8bff00](https://placehold.co/10x10/8bff00/8bff00.png) <span style="color: #d8ffaa">2.736ms</span>|- / -|
|8|![#84ff00](https://placehold.co/10x10/84ff00/84ff00.png) <span style="color: #d6ffaa">3.918ms</span> / ![#ddff00](https://placehold.co/10x10/ddff00/ddff00.png) <span style="color: #f4ffaa">13.260ms</span>|![#c4ff00](https://placehold.co/10x10/c4ff00/c4ff00.png) <span style="color: #ebffaa">5.465ms</span> / ![#ffe100](https://placehold.co/10x10/ffe100/ffe100.png) <span style="color: #fff5aa">14.071ms</span>|- / -|
|9|![#7eff00](https://placehold.co/10x10/7eff00/7eff00.png) <span style="color: #d4ffaa">3.572ms</span> / ![#7cff00](https://placehold.co/10x10/7cff00/7cff00.png) <span style="color: #d3ffaa">3.445ms</span>|![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">3.570ms</span> / ![#9dff00](https://placehold.co/10x10/9dff00/9dff00.png) <span style="color: #deffaa">3.465ms</span>|- / -|
|10|![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">4.114ms</span> / ![#d1ff00](https://placehold.co/10x10/d1ff00/d1ff00.png) <span style="color: #f0ffaa">11.310ms</span>|![#cfff00](https://placehold.co/10x10/cfff00/cfff00.png) <span style="color: #efffaa">6.189ms</span> / ![#ffd400](https://placehold.co/10x10/ffd400/ffd400.png) <span style="color: #fff1aa">15.976ms</span>|- / -|
|11|![#81ff00](https://placehold.co/10x10/81ff00/81ff00.png) <span style="color: #d5ffaa">3.722ms</span> / ![#82ff00](https://placehold.co/10x10/82ff00/82ff00.png) <span style="color: #d5ffaa">3.775ms</span>|![#9eff00](https://placehold.co/10x10/9eff00/9eff00.png) <span style="color: #dfffaa">3.484ms</span> / ![#9eff00](https://placehold.co/10x10/9eff00/9eff00.png) <span style="color: #dfffaa">3.486ms</span>|- / -|
|12|![#a4ff00](https://placehold.co/10x10/a4ff00/a4ff00.png) <span style="color: #e1ffaa">6.207ms</span> / ![#f8ff00](https://placehold.co/10x10/f8ff00/f8ff00.png) <span style="color: #fdffaa">18.674ms</span>|![#ceff00](https://placehold.co/10x10/ceff00/ceff00.png) <span style="color: #efffaa">6.096ms</span> / ![#ffad00](https://placehold.co/10x10/ffad00/ffad00.png) <span style="color: #ffe4aa">23.631ms</span>|- / -|
|13|![#46ff00](https://placehold.co/10x10/46ff00/46ff00.png) <span style="color: #c1ffaa">1.322ms</span> / ![#4dff00](https://placehold.co/10x10/4dff00/4dff00.png) <span style="color: #c4ffaa">1.515ms</span>|![#4fff00](https://placehold.co/10x10/4fff00/4fff00.png) <span style="color: #c4ffaa">1.117ms</span> / ![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">1.743ms</span>|- / -|
|14|![#58ff00](https://placehold.co/10x10/58ff00/58ff00.png) <span style="color: #c7ffaa">1.898ms</span> / ![#ffe600](https://placehold.co/10x10/ffe600/ffe600.png) <span style="color: #fff7aa">27.996ms</span>|![#70ff00](https://placehold.co/10x10/70ff00/70ff00.png) <span style="color: #cfffaa">1.895ms</span> / ![#ff5600](https://placehold.co/10x10/ff5600/ff5600.png) <span style="color: #ffc7aa">55.472ms</span>|- / -|
|15|![#51ff00](https://placehold.co/10x10/51ff00/51ff00.png) <span style="color: #c5ffaa">1.658ms</span> / ![#71ff00](https://placehold.co/10x10/71ff00/71ff00.png) <span style="color: #d0ffaa">2.894ms</span>|![#60ff00](https://placehold.co/10x10/60ff00/60ff00.png) <span style="color: #caffaa">1.482ms</span> / ![#84ff00](https://placehold.co/10x10/84ff00/84ff00.png) <span style="color: #d6ffaa">2.507ms</span>|- / -|
|16|![#85ff00](https://placehold.co/10x10/85ff00/85ff00.png) <span style="color: #d6ffaa">3.950ms</span> / ![#ffca00](https://placehold.co/10x10/ffca00/ffca00.png) <span style="color: #ffedaa">39.597ms</span>|![#bcff00](https://placehold.co/10x10/bcff00/bcff00.png) <span style="color: #e9ffaa">5.000ms</span> / ![#ff5b00](https://placehold.co/10x10/ff5b00/ff5b00.png) <span style="color: #ffc8aa">52.862ms</span>|- / -|
|17|![#ffc000](https://placehold.co/10x10/ffc000/ffc000.png) <span style="color: #ffeaaa">44.709ms</span> / ![#ff7800](https://placehold.co/10x10/ff7800/ff7800.png) <span style="color: #ffd2aa">107.717ms</span>|![#ff5e00](https://placehold.co/10x10/ff5e00/ff5e00.png) <span style="color: #ffc9aa">51.166ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">126.637ms</span>|- / -|
|18|![#63ff00](https://placehold.co/10x10/63ff00/63ff00.png) <span style="color: #cbffaa">2.308ms</span> / ![#65ff00](https://placehold.co/10x10/65ff00/65ff00.png) <span style="color: #ccffaa">2.354ms</span>|![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">1.714ms</span> / ![#6dff00](https://placehold.co/10x10/6dff00/6dff00.png) <span style="color: #ceffaa">1.808ms</span>|- / -|
|19|![#52ff00](https://placehold.co/10x10/52ff00/52ff00.png) <span style="color: #c5ffaa">1.681ms</span> / ![#60ff00](https://placehold.co/10x10/60ff00/60ff00.png) <span style="color: #caffaa">2.172ms</span>|![#6fff00](https://placehold.co/10x10/6fff00/6fff00.png) <span style="color: #cfffaa">1.880ms</span> / ![#85ff00](https://placehold.co/10x10/85ff00/85ff00.png) <span style="color: #d6ffaa">2.556ms</span>|- / -|
|20|![#cfff00](https://placehold.co/10x10/cfff00/cfff00.png) <span style="color: #efffaa">11.021ms</span> / ![#fff200](https://placehold.co/10x10/fff200/fff200.png) <span style="color: #fffbaa">24.206ms</span>|![#f1ff00](https://placehold.co/10x10/f1ff00/f1ff00.png) <span style="color: #faffaa">8.884ms</span> / ![#ffb700](https://placehold.co/10x10/ffb700/ffb700.png) <span style="color: #ffe7aa">21.430ms</span>|- / -|
|21|![#d4ff00](https://placehold.co/10x10/d4ff00/d4ff00.png) <span style="color: #f1ffaa">11.791ms</span> / ![#ffe300](https://placehold.co/10x10/ffe300/ffe300.png) <span style="color: #fff6aa">28.982ms</span>|![#ffef00](https://placehold.co/10x10/ffef00/ffef00.png) <span style="color: #fffaaa">12.167ms</span> / ![#ff6600](https://placehold.co/10x10/ff6600/ff6600.png) <span style="color: #ffccaa">47.611ms</span>|- / -|
|22|![#7dff00](https://placehold.co/10x10/7dff00/7dff00.png) <span style="color: #d4ffaa">3.491ms</span> / ![#abff00](https://placehold.co/10x10/abff00/abff00.png) <span style="color: #e3ffaa">6.858ms</span>|![#adff00](https://placehold.co/10x10/adff00/adff00.png) <span style="color: #e4ffaa">4.182ms</span> / ![#e8ff00](https://placehold.co/10x10/e8ff00/e8ff00.png) <span style="color: #f7ffaa">8.064ms</span>|- / -|
|23|![#8fff00](https://placehold.co/10x10/8fff00/8fff00.png) <span style="color: #daffaa">4.592ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">461.842ms</span>|![#beff00](https://placehold.co/10x10/beff00/beff00.png) <span style="color: #e9ffaa">5.083ms</span> / 🚨 FAILED 🚨|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|906.330ms|532.776ms|0.785ms|
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
