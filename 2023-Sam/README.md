# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#80ff00](https://placehold.co/10x10/80ff00/80ff00.png) <span style="color: #d5ffaa">2.268ms</span> / ![#78ff00](https://placehold.co/10x10/78ff00/78ff00.png) <span style="color: #d2ffaa">2.048ms</span>|![#66ff00](https://placehold.co/10x10/66ff00/66ff00.png) <span style="color: #ccffaa">1.636ms</span> / ![#5bff00](https://placehold.co/10x10/5bff00/5bff00.png) <span style="color: #c8ffaa">1.377ms</span>|![#ff7b00](https://placehold.co/10x10/ff7b00/ff7b00.png) <span style="color: #ffd3aa">0.122ms</span> / ![#ff5200](https://placehold.co/10x10/ff5200/ff5200.png) <span style="color: #ffc5aa">0.136ms</span>|
|2|![#b4ff00](https://placehold.co/10x10/b4ff00/b4ff00.png) <span style="color: #e6ffaa">4.304ms</span> / ![#bbff00](https://placehold.co/10x10/bbff00/bbff00.png) <span style="color: #e8ffaa">4.655ms</span>|![#9cff00](https://placehold.co/10x10/9cff00/9cff00.png) <span style="color: #deffaa">3.448ms</span> / ![#9fff00](https://placehold.co/10x10/9fff00/9fff00.png) <span style="color: #dfffaa">3.572ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.164ms</span> / ![#ff1300](https://placehold.co/10x10/ff1300/ff1300.png) <span style="color: #ffb0aa">0.157ms</span>|
|3|![#79ff00](https://placehold.co/10x10/79ff00/79ff00.png) <span style="color: #d2ffaa">2.058ms</span> / ![#bcff00](https://placehold.co/10x10/bcff00/bcff00.png) <span style="color: #e9ffaa">4.724ms</span>|![#59ff00](https://placehold.co/10x10/59ff00/59ff00.png) <span style="color: #c8ffaa">1.338ms</span> / ![#8fff00](https://placehold.co/10x10/8fff00/8fff00.png) <span style="color: #daffaa">2.927ms</span>|- / -|
|4|![#b2ff00](https://placehold.co/10x10/b2ff00/b2ff00.png) <span style="color: #e5ffaa">4.184ms</span> / ![#b6ff00](https://placehold.co/10x10/b6ff00/b6ff00.png) <span style="color: #e7ffaa">4.426ms</span>|![#b1ff00](https://placehold.co/10x10/b1ff00/b1ff00.png) <span style="color: #e5ffaa">4.407ms</span> / ![#b5ff00](https://placehold.co/10x10/b5ff00/b5ff00.png) <span style="color: #e6ffaa">4.638ms</span>|- / -|
|5|![#5fff00](https://placehold.co/10x10/5fff00/5fff00.png) <span style="color: #caffaa">1.421ms</span> / ![#a5ff00](https://placehold.co/10x10/a5ff00/a5ff00.png) <span style="color: #e1ffaa">3.597ms</span>|![#5dff00](https://placehold.co/10x10/5dff00/5dff00.png) <span style="color: #c9ffaa">1.419ms</span> / ![#93ff00](https://placehold.co/10x10/93ff00/93ff00.png) <span style="color: #dbffaa">3.058ms</span>|- / -|
|6|![#25ff00](https://placehold.co/10x10/25ff00/25ff00.png) <span style="color: #b6ffaa">0.403ms</span> / ![#22ff00](https://placehold.co/10x10/22ff00/22ff00.png) <span style="color: #b5ffaa">0.374ms</span>|![#1fff00](https://placehold.co/10x10/1fff00/1fff00.png) <span style="color: #b4ffaa">0.343ms</span> / ![#1cff00](https://placehold.co/10x10/1cff00/1cff00.png) <span style="color: #b3ffaa">0.309ms</span>|- / -|
|7|![#b2ff00](https://placehold.co/10x10/b2ff00/b2ff00.png) <span style="color: #e5ffaa">4.191ms</span> / ![#9dff00](https://placehold.co/10x10/9dff00/9dff00.png) <span style="color: #deffaa">3.285ms</span>|![#a8ff00](https://placehold.co/10x10/a8ff00/a8ff00.png) <span style="color: #e2ffaa">3.976ms</span> / ![#8cff00](https://placehold.co/10x10/8cff00/8cff00.png) <span style="color: #d9ffaa">2.793ms</span>|- / -|
|8|![#adff00](https://placehold.co/10x10/adff00/adff00.png) <span style="color: #e4ffaa">3.970ms</span> / ![#ffd800](https://placehold.co/10x10/ffd800/ffd800.png) <span style="color: #fff2aa">14.287ms</span>|![#c5ff00](https://placehold.co/10x10/c5ff00/c5ff00.png) <span style="color: #ecffaa">5.576ms</span> / ![#ffe100](https://placehold.co/10x10/ffe100/ffe100.png) <span style="color: #fff5aa">14.129ms</span>|- / -|
|9|![#a6ff00](https://placehold.co/10x10/a6ff00/a6ff00.png) <span style="color: #e1ffaa">3.672ms</span> / ![#a4ff00](https://placehold.co/10x10/a4ff00/a4ff00.png) <span style="color: #e1ffaa">3.568ms</span>|![#a5ff00](https://placehold.co/10x10/a5ff00/a5ff00.png) <span style="color: #e1ffaa">3.827ms</span> / ![#a2ff00](https://placehold.co/10x10/a2ff00/a2ff00.png) <span style="color: #e0ffaa">3.694ms</span>|- / -|
|10|![#b3ff00](https://placehold.co/10x10/b3ff00/b3ff00.png) <span style="color: #e6ffaa">4.263ms</span> / ![#ffec00](https://placehold.co/10x10/ffec00/ffec00.png) <span style="color: #fff9aa">11.626ms</span>|![#d9ff00](https://placehold.co/10x10/d9ff00/d9ff00.png) <span style="color: #f2ffaa">6.952ms</span> / ![#ffcf00](https://placehold.co/10x10/ffcf00/ffcf00.png) <span style="color: #ffefaa">16.966ms</span>|- / -|
|11|![#abff00](https://placehold.co/10x10/abff00/abff00.png) <span style="color: #e3ffaa">3.869ms</span> / ![#b8ff00](https://placehold.co/10x10/b8ff00/b8ff00.png) <span style="color: #e7ffaa">4.499ms</span>|![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">3.730ms</span> / ![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">3.593ms</span>|- / -|
|12|![#d8ff00](https://placehold.co/10x10/d8ff00/d8ff00.png) <span style="color: #f2ffaa">6.384ms</span> / ![#ffbb00](https://placehold.co/10x10/ffbb00/ffbb00.png) <span style="color: #ffe8aa">18.975ms</span>|![#d2ff00](https://placehold.co/10x10/d2ff00/d2ff00.png) <span style="color: #f0ffaa">6.419ms</span> / ![#ffad00](https://placehold.co/10x10/ffad00/ffad00.png) <span style="color: #ffe4aa">23.903ms</span>|- / -|
|13|![#5dff00](https://placehold.co/10x10/5dff00/5dff00.png) <span style="color: #c9ffaa">1.358ms</span> / ![#66ff00](https://placehold.co/10x10/66ff00/66ff00.png) <span style="color: #ccffaa">1.564ms</span>|![#56ff00](https://placehold.co/10x10/56ff00/56ff00.png) <span style="color: #c7ffaa">1.263ms</span> / ![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">1.747ms</span>|- / -|
|14|![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">1.903ms</span> / ![#ff9000](https://placehold.co/10x10/ff9000/ff9000.png) <span style="color: #ffdaaa">28.637ms</span>|![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">2.002ms</span> / ![#ff5700](https://placehold.co/10x10/ff5700/ff5700.png) <span style="color: #ffc7aa">55.725ms</span>|- / -|
|15|![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">1.680ms</span> / ![#94ff00](https://placehold.co/10x10/94ff00/94ff00.png) <span style="color: #dbffaa">2.954ms</span>|![#65ff00](https://placehold.co/10x10/65ff00/65ff00.png) <span style="color: #ccffaa">1.626ms</span> / ![#87ff00](https://placehold.co/10x10/87ff00/87ff00.png) <span style="color: #d7ffaa">2.629ms</span>|- / -|
|16|![#aeff00](https://placehold.co/10x10/aeff00/aeff00.png) <span style="color: #e4ffaa">4.023ms</span> / ![#ff6b00](https://placehold.co/10x10/ff6b00/ff6b00.png) <span style="color: #ffceaa">40.743ms</span>|![#beff00](https://placehold.co/10x10/beff00/beff00.png) <span style="color: #e9ffaa">5.138ms</span> / ![#ff5d00](https://placehold.co/10x10/ff5d00/ff5d00.png) <span style="color: #ffc9aa">52.783ms</span>|- / -|
|17|![#ff5e00](https://placehold.co/10x10/ff5e00/ff5e00.png) <span style="color: #ffc9aa">46.225ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">111.880ms</span>|![#ff6000](https://placehold.co/10x10/ff6000/ff6000.png) <span style="color: #ffcaaa">51.038ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">129.270ms</span>|- / -|
|18|![#84ff00](https://placehold.co/10x10/84ff00/84ff00.png) <span style="color: #d6ffaa">2.406ms</span> / ![#85ff00](https://placehold.co/10x10/85ff00/85ff00.png) <span style="color: #d6ffaa">2.443ms</span>|![#6dff00](https://placehold.co/10x10/6dff00/6dff00.png) <span style="color: #ceffaa">1.841ms</span> / ![#6fff00](https://placehold.co/10x10/6fff00/6fff00.png) <span style="color: #cfffaa">1.876ms</span>|- / -|
|19|![#6bff00](https://placehold.co/10x10/6bff00/6bff00.png) <span style="color: #ceffaa">1.689ms</span> / ![#7fff00](https://placehold.co/10x10/7fff00/7fff00.png) <span style="color: #d4ffaa">2.232ms</span>|![#72ff00](https://placehold.co/10x10/72ff00/72ff00.png) <span style="color: #d0ffaa">1.977ms</span> / ![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">2.653ms</span>|- / -|
|20|![#fff500](https://placehold.co/10x10/fff500/fff500.png) <span style="color: #fffcaa">10.707ms</span> / ![#ffa000](https://placehold.co/10x10/ffa000/ffa000.png) <span style="color: #ffdfaa">24.586ms</span>|![#f4ff00](https://placehold.co/10x10/f4ff00/f4ff00.png) <span style="color: #fbffaa">9.269ms</span> / ![#ffb600](https://placehold.co/10x10/ffb600/ffb600.png) <span style="color: #ffe7aa">21.824ms</span>|- / -|
|21|![#ffe700](https://placehold.co/10x10/ffe700/ffe700.png) <span style="color: #fff7aa">12.272ms</span> / ![#ff8c00](https://placehold.co/10x10/ff8c00/ff8c00.png) <span style="color: #ffd9aa">29.924ms</span>|![#ffee00](https://placehold.co/10x10/ffee00/ffee00.png) <span style="color: #fff9aa">12.418ms</span> / ![#ff6700](https://placehold.co/10x10/ff6700/ff6700.png) <span style="color: #ffccaa">47.735ms</span>|- / -|
|22|![#ffc700](https://placehold.co/10x10/ffc700/ffc700.png) <span style="color: #ffecaa">16.802ms</span> / ![#ff3900](https://placehold.co/10x10/ff3900/ff3900.png) <span style="color: #ffbdaa">65.864ms</span>|![#ffed00](https://placehold.co/10x10/ffed00/ffed00.png) <span style="color: #fff9aa">12.510ms</span> / ![#ff4000](https://placehold.co/10x10/ff4000/ff4000.png) <span style="color: #ffbfaa">69.476ms</span>|- / -|
|23|- / -|- / -|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|526.945ms|608.829ms|0.578ms|
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
