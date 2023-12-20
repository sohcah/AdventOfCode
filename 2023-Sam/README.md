# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#78ff00](https://placehold.co/10x10/78ff00/78ff00.png) <span style="color: #d2ffaa">2.023ms</span> / ![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">2.000ms</span>|![#61ff00](https://placehold.co/10x10/61ff00/61ff00.png) <span style="color: #caffaa">1.524ms</span> / ![#57ff00](https://placehold.co/10x10/57ff00/57ff00.png) <span style="color: #c7ffaa">1.284ms</span>|![#ff4a00](https://placehold.co/10x10/ff4a00/ff4a00.png) <span style="color: #ffc3aa">0.135ms</span> / ![#ff4b00](https://placehold.co/10x10/ff4b00/ff4b00.png) <span style="color: #ffc3aa">0.135ms</span>|
|2|![#b2ff00](https://placehold.co/10x10/b2ff00/b2ff00.png) <span style="color: #e5ffaa">4.128ms</span> / ![#bcff00](https://placehold.co/10x10/bcff00/bcff00.png) <span style="color: #e9ffaa">4.641ms</span>|![#96ff00](https://placehold.co/10x10/96ff00/96ff00.png) <span style="color: #dcffaa">3.183ms</span> / ![#9cff00](https://placehold.co/10x10/9cff00/9cff00.png) <span style="color: #deffaa">3.428ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.160ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.160ms</span>|
|3|![#75ff00](https://placehold.co/10x10/75ff00/75ff00.png) <span style="color: #d1ffaa">1.939ms</span> / ![#bcff00](https://placehold.co/10x10/bcff00/bcff00.png) <span style="color: #e9ffaa">4.625ms</span>|![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">1.201ms</span> / ![#8bff00](https://placehold.co/10x10/8bff00/8bff00.png) <span style="color: #d8ffaa">2.775ms</span>|- / -|
|4|![#b0ff00](https://placehold.co/10x10/b0ff00/b0ff00.png) <span style="color: #e5ffaa">4.037ms</span> / ![#b1ff00](https://placehold.co/10x10/b1ff00/b1ff00.png) <span style="color: #e5ffaa">4.111ms</span>|![#acff00](https://placehold.co/10x10/acff00/acff00.png) <span style="color: #e3ffaa">4.183ms</span> / ![#b0ff00](https://placehold.co/10x10/b0ff00/b0ff00.png) <span style="color: #e5ffaa">4.350ms</span>|- / -|
|5|![#5aff00](https://placehold.co/10x10/5aff00/5aff00.png) <span style="color: #c8ffaa">1.296ms</span> / ![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">3.376ms</span>|![#5aff00](https://placehold.co/10x10/5aff00/5aff00.png) <span style="color: #c8ffaa">1.351ms</span> / ![#95ff00](https://placehold.co/10x10/95ff00/95ff00.png) <span style="color: #dcffaa">3.133ms</span>|- / -|
|6|![#22ff00](https://placehold.co/10x10/22ff00/22ff00.png) <span style="color: #b5ffaa">0.367ms</span> / ![#1fff00](https://placehold.co/10x10/1fff00/1fff00.png) <span style="color: #b4ffaa">0.328ms</span>|![#18ff00](https://placehold.co/10x10/18ff00/18ff00.png) <span style="color: #b2ffaa">0.256ms</span> / ![#1aff00](https://placehold.co/10x10/1aff00/1aff00.png) <span style="color: #b3ffaa">0.277ms</span>|- / -|
|7|![#b0ff00](https://placehold.co/10x10/b0ff00/b0ff00.png) <span style="color: #e5ffaa">4.028ms</span> / ![#9cff00](https://placehold.co/10x10/9cff00/9cff00.png) <span style="color: #deffaa">3.213ms</span>|![#95ff00](https://placehold.co/10x10/95ff00/95ff00.png) <span style="color: #dcffaa">3.128ms</span> / ![#8aff00](https://placehold.co/10x10/8aff00/8aff00.png) <span style="color: #d8ffaa">2.720ms</span>|- / -|
|8|![#aaff00](https://placehold.co/10x10/aaff00/aaff00.png) <span style="color: #e3ffaa">3.755ms</span> / ![#ffde00](https://placehold.co/10x10/ffde00/ffde00.png) <span style="color: #fff4aa">13.177ms</span>|![#c4ff00](https://placehold.co/10x10/c4ff00/c4ff00.png) <span style="color: #ebffaa">5.494ms</span> / ![#ffe300](https://placehold.co/10x10/ffe300/ffe300.png) <span style="color: #fff6aa">13.927ms</span>|- / -|
|9|![#adff00](https://placehold.co/10x10/adff00/adff00.png) <span style="color: #e4ffaa">3.893ms</span> / ![#a2ff00](https://placehold.co/10x10/a2ff00/a2ff00.png) <span style="color: #e0ffaa">3.443ms</span>|![#9fff00](https://placehold.co/10x10/9fff00/9fff00.png) <span style="color: #dfffaa">3.566ms</span> / ![#9dff00](https://placehold.co/10x10/9dff00/9dff00.png) <span style="color: #deffaa">3.460ms</span>|- / -|
|10|![#b5ff00](https://placehold.co/10x10/b5ff00/b5ff00.png) <span style="color: #e6ffaa">4.276ms</span> / ![#ffe900](https://placehold.co/10x10/ffe900/ffe900.png) <span style="color: #fff8aa">11.789ms</span>|![#cfff00](https://placehold.co/10x10/cfff00/cfff00.png) <span style="color: #efffaa">6.205ms</span> / ![#ffd900](https://placehold.co/10x10/ffd900/ffd900.png) <span style="color: #fff2aa">15.448ms</span>|- / -|
|11|![#a8ff00](https://placehold.co/10x10/a8ff00/a8ff00.png) <span style="color: #e2ffaa">3.673ms</span> / ![#a9ff00](https://placehold.co/10x10/a9ff00/a9ff00.png) <span style="color: #e2ffaa">3.715ms</span>|![#9eff00](https://placehold.co/10x10/9eff00/9eff00.png) <span style="color: #dfffaa">3.506ms</span> / ![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">3.610ms</span>|- / -|
|12|![#d5ff00](https://placehold.co/10x10/d5ff00/d5ff00.png) <span style="color: #f1ffaa">6.085ms</span> / ![#ffba00](https://placehold.co/10x10/ffba00/ffba00.png) <span style="color: #ffe8aa">18.767ms</span>|![#d0ff00](https://placehold.co/10x10/d0ff00/d0ff00.png) <span style="color: #efffaa">6.299ms</span> / ![#ffad00](https://placehold.co/10x10/ffad00/ffad00.png) <span style="color: #ffe4aa">23.848ms</span>|- / -|
|13|![#58ff00](https://placehold.co/10x10/58ff00/58ff00.png) <span style="color: #c7ffaa">1.248ms</span> / ![#62ff00](https://placehold.co/10x10/62ff00/62ff00.png) <span style="color: #cbffaa">1.468ms</span>|![#55ff00](https://placehold.co/10x10/55ff00/55ff00.png) <span style="color: #c6ffaa">1.260ms</span> / ![#6fff00](https://placehold.co/10x10/6fff00/6fff00.png) <span style="color: #cfffaa">1.892ms</span>|- / -|
|14|![#71ff00](https://placehold.co/10x10/71ff00/71ff00.png) <span style="color: #d0ffaa">1.824ms</span> / ![#ff9000](https://placehold.co/10x10/ff9000/ff9000.png) <span style="color: #ffdaaa">27.927ms</span>|![#76ff00](https://placehold.co/10x10/76ff00/76ff00.png) <span style="color: #d1ffaa">2.095ms</span> / ![#ff5700](https://placehold.co/10x10/ff5700/ff5700.png) <span style="color: #ffc7aa">55.643ms</span>|- / -|
|15|![#66ff00](https://placehold.co/10x10/66ff00/66ff00.png) <span style="color: #ccffaa">1.565ms</span> / ![#93ff00](https://placehold.co/10x10/93ff00/93ff00.png) <span style="color: #dbffaa">2.850ms</span>|![#60ff00](https://placehold.co/10x10/60ff00/60ff00.png) <span style="color: #caffaa">1.505ms</span> / ![#82ff00](https://placehold.co/10x10/82ff00/82ff00.png) <span style="color: #d5ffaa">2.463ms</span>|- / -|
|16|![#acff00](https://placehold.co/10x10/acff00/acff00.png) <span style="color: #e3ffaa">3.883ms</span> / ![#ff6c00](https://placehold.co/10x10/ff6c00/ff6c00.png) <span style="color: #ffceaa">39.271ms</span>|![#baff00](https://placehold.co/10x10/baff00/baff00.png) <span style="color: #e8ffaa">4.904ms</span> / ![#ff5d00](https://placehold.co/10x10/ff5d00/ff5d00.png) <span style="color: #ffc9aa">52.685ms</span>|- / -|
|17|![#ff5f00](https://placehold.co/10x10/ff5f00/ff5f00.png) <span style="color: #ffcaaa">44.459ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">107.955ms</span>|![#ff6200](https://placehold.co/10x10/ff6200/ff6200.png) <span style="color: #ffcbaa">50.200ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">128.876ms</span>|- / -|
|18|![#83ff00](https://placehold.co/10x10/83ff00/83ff00.png) <span style="color: #d6ffaa">2.342ms</span> / ![#84ff00](https://placehold.co/10x10/84ff00/84ff00.png) <span style="color: #d6ffaa">2.354ms</span>|![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">1.712ms</span> / ![#6bff00](https://placehold.co/10x10/6bff00/6bff00.png) <span style="color: #ceffaa">1.772ms</span>|- / -|
|19|![#67ff00](https://placehold.co/10x10/67ff00/67ff00.png) <span style="color: #ccffaa">1.569ms</span> / ![#7cff00](https://placehold.co/10x10/7cff00/7cff00.png) <span style="color: #d3ffaa">2.114ms</span>|![#6eff00](https://placehold.co/10x10/6eff00/6eff00.png) <span style="color: #cfffaa">1.854ms</span> / ![#85ff00](https://placehold.co/10x10/85ff00/85ff00.png) <span style="color: #d6ffaa">2.566ms</span>|- / -|
|20|![#fffd00](https://placehold.co/10x10/fffd00/fffd00.png) <span style="color: #fffeaa">9.640ms</span> / ![#ff9800](https://placehold.co/10x10/ff9800/ff9800.png) <span style="color: #ffddaa">25.938ms</span>|![#f1ff00](https://placehold.co/10x10/f1ff00/f1ff00.png) <span style="color: #faffaa">8.967ms</span> / ![#ffb800](https://placehold.co/10x10/ffb800/ffb800.png) <span style="color: #ffe7aa">21.519ms</span>|- / -|
|21|- / -|- / -|- / -|
|22|- / -|- / -|- / -|
|23|- / -|- / -|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|389.092ms|458.069ms|0.590ms|
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
