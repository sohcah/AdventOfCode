# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#4cff00](https://placehold.co/10x10/4cff00/4cff00.png) <span style="color: #c3ffaa">2.251ms</span> / ![#4bff00](https://placehold.co/10x10/4bff00/4bff00.png) <span style="color: #c3ffaa">2.202ms</span>|![#3bff00](https://placehold.co/10x10/3bff00/3bff00.png) <span style="color: #beffaa">1.667ms</span> / ![#37ff00](https://placehold.co/10x10/37ff00/37ff00.png) <span style="color: #bcffaa">1.494ms</span>|![#ff3400](https://placehold.co/10x10/ff3400/ff3400.png) <span style="color: #ffbbaa">0.136ms</span> / ![#ff3700](https://placehold.co/10x10/ff3700/ff3700.png) <span style="color: #ffbcaa">0.135ms</span>|
|2|![#6eff00](https://placehold.co/10x10/6eff00/6eff00.png) <span style="color: #cfffaa">4.463ms</span> / ![#7fff00](https://placehold.co/10x10/7fff00/7fff00.png) <span style="color: #d4ffaa">6.155ms</span>|![#5aff00](https://placehold.co/10x10/5aff00/5aff00.png) <span style="color: #c8ffaa">3.462ms</span> / ![#5dff00](https://placehold.co/10x10/5dff00/5dff00.png) <span style="color: #c9ffaa">3.694ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.153ms</span> / ![#ff0900](https://placehold.co/10x10/ff0900/ff0900.png) <span style="color: #ffadaa">0.150ms</span>|
|3|![#4aff00](https://placehold.co/10x10/4aff00/4aff00.png) <span style="color: #c3ffaa">2.159ms</span> / ![#75ff00](https://placehold.co/10x10/75ff00/75ff00.png) <span style="color: #d1ffaa">5.112ms</span>|![#33ff00](https://placehold.co/10x10/33ff00/33ff00.png) <span style="color: #bbffaa">1.357ms</span> / ![#55ff00](https://placehold.co/10x10/55ff00/55ff00.png) <span style="color: #c6ffaa">3.158ms</span>|- / -|
|4|![#6fff00](https://placehold.co/10x10/6fff00/6fff00.png) <span style="color: #cfffaa">4.604ms</span> / ![#71ff00](https://placehold.co/10x10/71ff00/71ff00.png) <span style="color: #d0ffaa">4.770ms</span>|![#68ff00](https://placehold.co/10x10/68ff00/68ff00.png) <span style="color: #cdffaa">4.692ms</span> / ![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">4.746ms</span>|- / -|
|5|![#3dff00](https://placehold.co/10x10/3dff00/3dff00.png) <span style="color: #beffaa">1.569ms</span> / ![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">4.958ms</span>|![#34ff00](https://placehold.co/10x10/34ff00/34ff00.png) <span style="color: #bbffaa">1.364ms</span> / ![#57ff00](https://placehold.co/10x10/57ff00/57ff00.png) <span style="color: #c7ffaa">3.259ms</span>|- / -|
|6|![#16ff00](https://placehold.co/10x10/16ff00/16ff00.png) <span style="color: #b1ffaa">0.411ms</span> / ![#16ff00](https://placehold.co/10x10/16ff00/16ff00.png) <span style="color: #b1ffaa">0.403ms</span>|![#11ff00](https://placehold.co/10x10/11ff00/11ff00.png) <span style="color: #b0ffaa">0.337ms</span> / ![#11ff00](https://placehold.co/10x10/11ff00/11ff00.png) <span style="color: #b0ffaa">0.331ms</span>|- / -|
|7|![#6bff00](https://placehold.co/10x10/6bff00/6bff00.png) <span style="color: #ceffaa">4.290ms</span> / ![#60ff00](https://placehold.co/10x10/60ff00/60ff00.png) <span style="color: #caffaa">3.460ms</span>|![#5bff00](https://placehold.co/10x10/5bff00/5bff00.png) <span style="color: #c8ffaa">3.594ms</span> / ![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">2.975ms</span>|- / -|
|8|![#6bff00](https://placehold.co/10x10/6bff00/6bff00.png) <span style="color: #ceffaa">4.289ms</span> / ![#b0ff00](https://placehold.co/10x10/b0ff00/b0ff00.png) <span style="color: #e5ffaa">14.336ms</span>|![#74ff00](https://placehold.co/10x10/74ff00/74ff00.png) <span style="color: #d1ffaa">5.942ms</span> / ![#a6ff00](https://placehold.co/10x10/a6ff00/a6ff00.png) <span style="color: #e1ffaa">15.061ms</span>|- / -|
|9|![#66ff00](https://placehold.co/10x10/66ff00/66ff00.png) <span style="color: #ccffaa">3.853ms</span> / ![#64ff00](https://placehold.co/10x10/64ff00/64ff00.png) <span style="color: #cbffaa">3.724ms</span>|![#5eff00](https://placehold.co/10x10/5eff00/5eff00.png) <span style="color: #c9ffaa">3.782ms</span> / ![#5dff00](https://placehold.co/10x10/5dff00/5dff00.png) <span style="color: #c9ffaa">3.726ms</span>|- / -|
|10|![#6dff00](https://placehold.co/10x10/6dff00/6dff00.png) <span style="color: #ceffaa">4.410ms</span> / ![#a4ff00](https://placehold.co/10x10/a4ff00/a4ff00.png) <span style="color: #e1ffaa">11.802ms</span>|![#7aff00](https://placehold.co/10x10/7aff00/7aff00.png) <span style="color: #d3ffaa">6.617ms</span> / ![#acff00](https://placehold.co/10x10/acff00/acff00.png) <span style="color: #e3ffaa">16.716ms</span>|- / -|
|11|![#74ff00](https://placehold.co/10x10/74ff00/74ff00.png) <span style="color: #d1ffaa">5.042ms</span> / ![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">4.102ms</span>|![#5eff00](https://placehold.co/10x10/5eff00/5eff00.png) <span style="color: #c9ffaa">3.818ms</span> / ![#5eff00](https://placehold.co/10x10/5eff00/5eff00.png) <span style="color: #c9ffaa">3.802ms</span>|- / -|
|12|![#83ff00](https://placehold.co/10x10/83ff00/83ff00.png) <span style="color: #d6ffaa">6.594ms</span> / ![#c3ff00](https://placehold.co/10x10/c3ff00/c3ff00.png) <span style="color: #ebffaa">19.417ms</span>|![#7aff00](https://placehold.co/10x10/7aff00/7aff00.png) <span style="color: #d3ffaa">6.633ms</span> / ![#c4ff00](https://placehold.co/10x10/c4ff00/c4ff00.png) <span style="color: #ebffaa">25.528ms</span>|- / -|
|13|![#3aff00](https://placehold.co/10x10/3aff00/3aff00.png) <span style="color: #bdffaa">1.441ms</span> / ![#40ff00](https://placehold.co/10x10/40ff00/40ff00.png) <span style="color: #bfffaa">1.694ms</span>|![#2fff00](https://placehold.co/10x10/2fff00/2fff00.png) <span style="color: #baffaa">1.183ms</span> / ![#3eff00](https://placehold.co/10x10/3eff00/3eff00.png) <span style="color: #bfffaa">1.799ms</span>|- / -|
|14|![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">2.648ms</span> / ![#dbff00](https://placehold.co/10x10/dbff00/dbff00.png) <span style="color: #f3ffaa">28.886ms</span>|![#41ff00](https://placehold.co/10x10/41ff00/41ff00.png) <span style="color: #c0ffaa">1.950ms</span> / ![#f3ff00](https://placehold.co/10x10/f3ff00/f3ff00.png) <span style="color: #fbffaa">57.191ms</span>|- / -|
|15|![#43ff00](https://placehold.co/10x10/43ff00/43ff00.png) <span style="color: #c0ffaa">1.833ms</span> / ![#5cff00](https://placehold.co/10x10/5cff00/5cff00.png) <span style="color: #c9ffaa">3.173ms</span>|![#3aff00](https://placehold.co/10x10/3aff00/3aff00.png) <span style="color: #bdffaa">1.615ms</span> / ![#51ff00](https://placehold.co/10x10/51ff00/51ff00.png) <span style="color: #c5ffaa">2.839ms</span>|- / -|
|16|![#6bff00](https://placehold.co/10x10/6bff00/6bff00.png) <span style="color: #ceffaa">4.214ms</span> / ![#f2ff00](https://placehold.co/10x10/f2ff00/f2ff00.png) <span style="color: #fbffaa">41.729ms</span>|![#72ff00](https://placehold.co/10x10/72ff00/72ff00.png) <span style="color: #d0ffaa">5.728ms</span> / ![#f0ff00](https://placehold.co/10x10/f0ff00/f0ff00.png) <span style="color: #faffaa">53.699ms</span>|- / -|
|17|![#fbff00](https://placehold.co/10x10/fbff00/fbff00.png) <span style="color: #feffaa">47.711ms</span> / ![#ffc700](https://placehold.co/10x10/ffc700/ffc700.png) <span style="color: #ffecaa">123.411ms</span>|![#f1ff00](https://placehold.co/10x10/f1ff00/f1ff00.png) <span style="color: #faffaa">54.754ms</span> / ![#ffd500](https://placehold.co/10x10/ffd500/ffd500.png) <span style="color: #fff1aa">141.312ms</span>|- / -|
|18|![#52ff00](https://placehold.co/10x10/52ff00/52ff00.png) <span style="color: #c5ffaa">2.578ms</span> / ![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">2.600ms</span>|![#44ff00](https://placehold.co/10x10/44ff00/44ff00.png) <span style="color: #c1ffaa">2.117ms</span> / ![#43ff00](https://placehold.co/10x10/43ff00/43ff00.png) <span style="color: #c0ffaa">2.038ms</span>|- / -|
|19|![#43ff00](https://placehold.co/10x10/43ff00/43ff00.png) <span style="color: #c0ffaa">1.821ms</span> / ![#51ff00](https://placehold.co/10x10/51ff00/51ff00.png) <span style="color: #c5ffaa">2.506ms</span>|![#45ff00](https://placehold.co/10x10/45ff00/45ff00.png) <span style="color: #c1ffaa">2.189ms</span> / ![#4fff00](https://placehold.co/10x10/4fff00/4fff00.png) <span style="color: #c4ffaa">2.723ms</span>|- / -|
|20|![#9dff00](https://placehold.co/10x10/9dff00/9dff00.png) <span style="color: #deffaa">10.478ms</span> / ![#d7ff00](https://placehold.co/10x10/d7ff00/d7ff00.png) <span style="color: #f2ffaa">27.010ms</span>|![#8dff00](https://placehold.co/10x10/8dff00/8dff00.png) <span style="color: #d9ffaa">9.478ms</span> / ![#bdff00](https://placehold.co/10x10/bdff00/bdff00.png) <span style="color: #e9ffaa">22.589ms</span>|- / -|
|21|![#a6ff00](https://placehold.co/10x10/a6ff00/a6ff00.png) <span style="color: #e1ffaa">12.187ms</span> / ![#deff00](https://placehold.co/10x10/deff00/deff00.png) <span style="color: #f4ffaa">30.450ms</span>|![#a1ff00](https://placehold.co/10x10/a1ff00/a1ff00.png) <span style="color: #e0ffaa">13.582ms</span> / ![#efff00](https://placehold.co/10x10/efff00/efff00.png) <span style="color: #faffaa">53.396ms</span>|- / -|
|22|![#65ff00](https://placehold.co/10x10/65ff00/65ff00.png) <span style="color: #ccffaa">3.791ms</span> / ![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">7.260ms</span>|![#68ff00](https://placehold.co/10x10/68ff00/68ff00.png) <span style="color: #cdffaa">4.713ms</span> / ![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">8.388ms</span>|- / -|
|23|![#ffb500](https://placehold.co/10x10/ffb500/ffb500.png) <span style="color: #ffe6aa">163.839ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">2716.829ms</span>|![#ff8700](https://placehold.co/10x10/ff8700/ff8700.png) <span style="color: #ffd7aa">518.739ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">4970.091ms</span>|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|3362.464ms|6059.868ms|0.573ms|
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
