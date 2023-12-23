# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`
- Python - Prefix: `py:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|Python|
|-|-|-|-|-|
|1|![#70ff00](https://placehold.co/10x10/70ff00/70ff00.png) <span style="color: #cfffaa">2.089ms</span> / ![#6eff00](https://placehold.co/10x10/6eff00/6eff00.png) <span style="color: #cfffaa">2.041ms</span>|![#4eff00](https://placehold.co/10x10/4eff00/4eff00.png) <span style="color: #c4ffaa">1.545ms</span> / ![#46ff00](https://placehold.co/10x10/46ff00/46ff00.png) <span style="color: #c1ffaa">1.316ms</span>|![#ff5a00](https://placehold.co/10x10/ff5a00/ff5a00.png) <span style="color: #ffc8aa">0.175ms</span> / ![#ff2800](https://placehold.co/10x10/ff2800/ff2800.png) <span style="color: #ffb7aa">0.198ms</span>|![#a2ff00](https://placehold.co/10x10/a2ff00/a2ff00.png) <span style="color: #e0ffaa">1.489ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">16.784ms</span>|
|2|![#9fff00](https://placehold.co/10x10/9fff00/9fff00.png) <span style="color: #dfffaa">3.974ms</span> / ![#a9ff00](https://placehold.co/10x10/a9ff00/a9ff00.png) <span style="color: #e2ffaa">4.528ms</span>|![#7aff00](https://placehold.co/10x10/7aff00/7aff00.png) <span style="color: #d3ffaa">3.321ms</span> / ![#7cff00](https://placehold.co/10x10/7cff00/7cff00.png) <span style="color: #d3ffaa">3.468ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.216ms</span> / ![#ff3500](https://placehold.co/10x10/ff3500/ff3500.png) <span style="color: #ffbcaa">0.192ms</span>|- / -|
|3|![#68ff00](https://placehold.co/10x10/68ff00/68ff00.png) <span style="color: #cdffaa">1.857ms</span> / ![#acff00](https://placehold.co/10x10/acff00/acff00.png) <span style="color: #e3ffaa">4.691ms</span>|![#43ff00](https://placehold.co/10x10/43ff00/43ff00.png) <span style="color: #c0ffaa">1.247ms</span> / ![#6fff00](https://placehold.co/10x10/6fff00/6fff00.png) <span style="color: #cfffaa">2.807ms</span>|- / -|- / -|
|4|![#a2ff00](https://placehold.co/10x10/a2ff00/a2ff00.png) <span style="color: #e0ffaa">4.131ms</span> / ![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">4.201ms</span>|![#89ff00](https://placehold.co/10x10/89ff00/89ff00.png) <span style="color: #d8ffaa">4.220ms</span> / ![#8bff00](https://placehold.co/10x10/8bff00/8bff00.png) <span style="color: #d8ffaa">4.311ms</span>|- / -|- / -|
|5|![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">1.324ms</span> / ![#94ff00](https://placehold.co/10x10/94ff00/94ff00.png) <span style="color: #dbffaa">3.448ms</span>|![#43ff00](https://placehold.co/10x10/43ff00/43ff00.png) <span style="color: #c0ffaa">1.251ms</span> / ![#74ff00](https://placehold.co/10x10/74ff00/74ff00.png) <span style="color: #d1ffaa">3.024ms</span>|- / -|- / -|
|6|![#1fff00](https://placehold.co/10x10/1fff00/1fff00.png) <span style="color: #b4ffaa">0.369ms</span> / ![#1dff00](https://placehold.co/10x10/1dff00/1dff00.png) <span style="color: #b4ffaa">0.341ms</span>|![#16ff00](https://placehold.co/10x10/16ff00/16ff00.png) <span style="color: #b1ffaa">0.310ms</span> / ![#16ff00](https://placehold.co/10x10/16ff00/16ff00.png) <span style="color: #b1ffaa">0.309ms</span>|- / -|- / -|
|7|![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">4.021ms</span> / ![#8eff00](https://placehold.co/10x10/8eff00/8eff00.png) <span style="color: #d9ffaa">3.185ms</span>|![#78ff00](https://placehold.co/10x10/78ff00/78ff00.png) <span style="color: #d2ffaa">3.233ms</span> / ![#6dff00](https://placehold.co/10x10/6dff00/6dff00.png) <span style="color: #ceffaa">2.729ms</span>|- / -|- / -|
|8|![#9cff00](https://placehold.co/10x10/9cff00/9cff00.png) <span style="color: #deffaa">3.815ms</span> / ![#fff400](https://placehold.co/10x10/fff400/fff400.png) <span style="color: #fffbaa">13.671ms</span>|![#9bff00](https://placehold.co/10x10/9bff00/9bff00.png) <span style="color: #deffaa">5.429ms</span> / ![#e1ff00](https://placehold.co/10x10/e1ff00/e1ff00.png) <span style="color: #f5ffaa">13.975ms</span>|- / -|- / -|
|9|![#99ff00](https://placehold.co/10x10/99ff00/99ff00.png) <span style="color: #ddffaa">3.704ms</span> / ![#93ff00](https://placehold.co/10x10/93ff00/93ff00.png) <span style="color: #dbffaa">3.421ms</span>|![#7eff00](https://placehold.co/10x10/7eff00/7eff00.png) <span style="color: #d4ffaa">3.573ms</span> / ![#7cff00](https://placehold.co/10x10/7cff00/7cff00.png) <span style="color: #d3ffaa">3.452ms</span>|- / -|- / -|
|10|![#a1ff00](https://placehold.co/10x10/a1ff00/a1ff00.png) <span style="color: #e0ffaa">4.110ms</span> / ![#fdff00](https://placehold.co/10x10/fdff00/fdff00.png) <span style="color: #feffaa">11.935ms</span>|![#a4ff00](https://placehold.co/10x10/a4ff00/a4ff00.png) <span style="color: #e1ffaa">6.208ms</span> / ![#e9ff00](https://placehold.co/10x10/e9ff00/e9ff00.png) <span style="color: #f8ffaa">15.534ms</span>|- / -|- / -|
|11|![#9cff00](https://placehold.co/10x10/9cff00/9cff00.png) <span style="color: #deffaa">3.819ms</span> / ![#9aff00](https://placehold.co/10x10/9aff00/9aff00.png) <span style="color: #ddffaa">3.729ms</span>|![#7dff00](https://placehold.co/10x10/7dff00/7dff00.png) <span style="color: #d4ffaa">3.492ms</span> / ![#7dff00](https://placehold.co/10x10/7dff00/7dff00.png) <span style="color: #d4ffaa">3.513ms</span>|- / -|- / -|
|12|![#c3ff00](https://placehold.co/10x10/c3ff00/c3ff00.png) <span style="color: #ebffaa">6.144ms</span> / ![#ffd700](https://placehold.co/10x10/ffd700/ffd700.png) <span style="color: #fff2aa">18.759ms</span>|![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">6.089ms</span> / ![#fff400](https://placehold.co/10x10/fff400/fff400.png) <span style="color: #fffbaa">23.563ms</span>|- / -|- / -|
|13|![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">1.317ms</span> / ![#5bff00](https://placehold.co/10x10/5bff00/5bff00.png) <span style="color: #c8ffaa">1.501ms</span>|![#3eff00](https://placehold.co/10x10/3eff00/3eff00.png) <span style="color: #bfffaa">1.110ms</span> / ![#54ff00](https://placehold.co/10x10/54ff00/54ff00.png) <span style="color: #c6ffaa">1.738ms</span>|- / -|- / -|
|14|![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">1.923ms</span> / ![#ffb000](https://placehold.co/10x10/ffb000/ffb000.png) <span style="color: #ffe5aa">28.243ms</span>|![#5aff00](https://placehold.co/10x10/5aff00/5aff00.png) <span style="color: #c8ffaa">1.956ms</span> / ![#ffaf00](https://placehold.co/10x10/ffaf00/ffaf00.png) <span style="color: #ffe4aa">55.097ms</span>|- / -|- / -|
|15|![#61ff00](https://placehold.co/10x10/61ff00/61ff00.png) <span style="color: #caffaa">1.666ms</span> / ![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">2.947ms</span>|![#4cff00](https://placehold.co/10x10/4cff00/4cff00.png) <span style="color: #c3ffaa">1.499ms</span> / ![#68ff00](https://placehold.co/10x10/68ff00/68ff00.png) <span style="color: #cdffaa">2.490ms</span>|- / -|- / -|
|16|![#9fff00](https://placehold.co/10x10/9fff00/9fff00.png) <span style="color: #dfffaa">3.988ms</span> / ![#ff9000](https://placehold.co/10x10/ff9000/ff9000.png) <span style="color: #ffdaaa">39.460ms</span>|![#94ff00](https://placehold.co/10x10/94ff00/94ff00.png) <span style="color: #dbffaa">4.960ms</span> / ![#ffb300](https://placehold.co/10x10/ffb300/ffb300.png) <span style="color: #ffe6aa">52.435ms</span>|- / -|- / -|
|17|![#ff8300](https://placehold.co/10x10/ff8300/ff8300.png) <span style="color: #ffd6aa">45.069ms</span> / ![#ff2e00](https://placehold.co/10x10/ff2e00/ff2e00.png) <span style="color: #ffb9aa">107.895ms</span>|![#ffb500](https://placehold.co/10x10/ffb500/ffb500.png) <span style="color: #ffe6aa">50.987ms</span> / ![#ff6b00](https://placehold.co/10x10/ff6b00/ff6b00.png) <span style="color: #ffceaa">126.297ms</span>|- / -|- / -|
|18|![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">2.330ms</span> / ![#79ff00](https://placehold.co/10x10/79ff00/79ff00.png) <span style="color: #d2ffaa">2.387ms</span>|![#52ff00](https://placehold.co/10x10/52ff00/52ff00.png) <span style="color: #c5ffaa">1.691ms</span> / ![#56ff00](https://placehold.co/10x10/56ff00/56ff00.png) <span style="color: #c7ffaa">1.821ms</span>|- / -|- / -|
|19|![#61ff00](https://placehold.co/10x10/61ff00/61ff00.png) <span style="color: #caffaa">1.659ms</span> / ![#72ff00](https://placehold.co/10x10/72ff00/72ff00.png) <span style="color: #d0ffaa">2.156ms</span>|![#58ff00](https://placehold.co/10x10/58ff00/58ff00.png) <span style="color: #c7ffaa">1.874ms</span> / ![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">2.543ms</span>|- / -|- / -|
|20|![#edff00](https://placehold.co/10x10/edff00/edff00.png) <span style="color: #f9ffaa">10.014ms</span> / ![#ffad00](https://placehold.co/10x10/ffad00/ffad00.png) <span style="color: #ffe4aa">28.977ms</span>|![#bfff00](https://placehold.co/10x10/bfff00/bfff00.png) <span style="color: #eaffaa">8.950ms</span> / ![#fffb00](https://placehold.co/10x10/fffb00/fffb00.png) <span style="color: #fffeaa">21.397ms</span>|- / -|- / -|
|21|![#fcff00](https://placehold.co/10x10/fcff00/fcff00.png) <span style="color: #feffaa">11.755ms</span> / ![#ffad00](https://placehold.co/10x10/ffad00/ffad00.png) <span style="color: #ffe4aa">28.974ms</span>|![#d6ff00](https://placehold.co/10x10/d6ff00/d6ff00.png) <span style="color: #f1ffaa">12.152ms</span> / ![#ffbc00](https://placehold.co/10x10/ffbc00/ffbc00.png) <span style="color: #ffe9aa">47.282ms</span>|- / -|- / -|
|22|![#95ff00](https://placehold.co/10x10/95ff00/95ff00.png) <span style="color: #dcffaa">3.494ms</span> / ![#ccff00](https://placehold.co/10x10/ccff00/ccff00.png) <span style="color: #eeffaa">6.852ms</span>|![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">4.019ms</span> / ![#b8ff00](https://placehold.co/10x10/b8ff00/b8ff00.png) <span style="color: #e7ffaa">8.109ms</span>|- / -|- / -|
|23|![#abff00](https://placehold.co/10x10/abff00/abff00.png) <span style="color: #e3ffaa">4.634ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">171.792ms</span>|![#96ff00](https://placehold.co/10x10/96ff00/96ff00.png) <span style="color: #dcffaa">5.092ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">459.334ms</span>|- / -|- / -|
|24|- / -|- / -|- / -|- / -|
|25|- / -|- / -|- / -|- / -|
|Total|622.340ms|990.751ms|0.781ms|18.273ms|
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
