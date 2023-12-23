# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#58ff00](https://placehold.co/10x10/58ff00/58ff00.png) <span style="color: #c7ffaa">2.093ms</span> / ![#56ff00](https://placehold.co/10x10/56ff00/56ff00.png) <span style="color: #c7ffaa">1.997ms</span>|![#42ff00](https://placehold.co/10x10/42ff00/42ff00.png) <span style="color: #c0ffaa">1.545ms</span> / ![#3cff00](https://placehold.co/10x10/3cff00/3cff00.png) <span style="color: #beffaa">1.334ms</span>|![#ff5400](https://placehold.co/10x10/ff5400/ff5400.png) <span style="color: #ffc6aa">0.153ms</span> / ![#ff1000](https://placehold.co/10x10/ff1000/ff1000.png) <span style="color: #ffafaa">0.180ms</span>|
|2|![#80ff00](https://placehold.co/10x10/80ff00/80ff00.png) <span style="color: #d5ffaa">4.170ms</span> / ![#90ff00](https://placehold.co/10x10/90ff00/90ff00.png) <span style="color: #daffaa">5.335ms</span>|![#67ff00](https://placehold.co/10x10/67ff00/67ff00.png) <span style="color: #ccffaa">3.326ms</span> / ![#6bff00](https://placehold.co/10x10/6bff00/6bff00.png) <span style="color: #ceffaa">3.528ms</span>|![#ff1400](https://placehold.co/10x10/ff1400/ff1400.png) <span style="color: #ffb1aa">0.178ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.186ms</span>|
|3|![#54ff00](https://placehold.co/10x10/54ff00/54ff00.png) <span style="color: #c6ffaa">1.920ms</span> / ![#85ff00](https://placehold.co/10x10/85ff00/85ff00.png) <span style="color: #d6ffaa">4.511ms</span>|![#39ff00](https://placehold.co/10x10/39ff00/39ff00.png) <span style="color: #bdffaa">1.249ms</span> / ![#5fff00](https://placehold.co/10x10/5fff00/5fff00.png) <span style="color: #caffaa">2.835ms</span>|- / -|
|4|![#81ff00](https://placehold.co/10x10/81ff00/81ff00.png) <span style="color: #d5ffaa">4.235ms</span> / ![#81ff00](https://placehold.co/10x10/81ff00/81ff00.png) <span style="color: #d5ffaa">4.215ms</span>|![#75ff00](https://placehold.co/10x10/75ff00/75ff00.png) <span style="color: #d1ffaa">4.237ms</span> / ![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">4.378ms</span>|- / -|
|5|![#41ff00](https://placehold.co/10x10/41ff00/41ff00.png) <span style="color: #c0ffaa">1.315ms</span> / ![#74ff00](https://placehold.co/10x10/74ff00/74ff00.png) <span style="color: #d1ffaa">3.421ms</span>|![#3aff00](https://placehold.co/10x10/3aff00/3aff00.png) <span style="color: #bdffaa">1.277ms</span> / ![#62ff00](https://placehold.co/10x10/62ff00/62ff00.png) <span style="color: #cbffaa">3.024ms</span>|- / -|
|6|![#19ff00](https://placehold.co/10x10/19ff00/19ff00.png) <span style="color: #b2ffaa">0.386ms</span> / ![#17ff00](https://placehold.co/10x10/17ff00/17ff00.png) <span style="color: #b2ffaa">0.349ms</span>|![#13ff00](https://placehold.co/10x10/13ff00/13ff00.png) <span style="color: #b0ffaa">0.315ms</span> / ![#13ff00](https://placehold.co/10x10/13ff00/13ff00.png) <span style="color: #b0ffaa">0.305ms</span>|- / -|
|7|![#7eff00](https://placehold.co/10x10/7eff00/7eff00.png) <span style="color: #d4ffaa">4.048ms</span> / ![#6eff00](https://placehold.co/10x10/6eff00/6eff00.png) <span style="color: #cfffaa">3.122ms</span>|![#66ff00](https://placehold.co/10x10/66ff00/66ff00.png) <span style="color: #ccffaa">3.272ms</span> / ![#5dff00](https://placehold.co/10x10/5dff00/5dff00.png) <span style="color: #c9ffaa">2.720ms</span>|- / -|
|8|![#7bff00](https://placehold.co/10x10/7bff00/7bff00.png) <span style="color: #d3ffaa">3.821ms</span> / ![#d1ff00](https://placehold.co/10x10/d1ff00/d1ff00.png) <span style="color: #f0ffaa">13.531ms</span>|![#83ff00](https://placehold.co/10x10/83ff00/83ff00.png) <span style="color: #d6ffaa">5.437ms</span> / ![#bfff00](https://placehold.co/10x10/bfff00/bfff00.png) <span style="color: #eaffaa">13.973ms</span>|- / -|
|9|![#76ff00](https://placehold.co/10x10/76ff00/76ff00.png) <span style="color: #d1ffaa">3.531ms</span> / ![#74ff00](https://placehold.co/10x10/74ff00/74ff00.png) <span style="color: #d1ffaa">3.452ms</span>|![#6bff00](https://placehold.co/10x10/6bff00/6bff00.png) <span style="color: #ceffaa">3.580ms</span> / ![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">3.497ms</span>|- / -|
|10|![#7eff00](https://placehold.co/10x10/7eff00/7eff00.png) <span style="color: #d4ffaa">4.065ms</span> / ![#c4ff00](https://placehold.co/10x10/c4ff00/c4ff00.png) <span style="color: #ebffaa">11.426ms</span>|![#8cff00](https://placehold.co/10x10/8cff00/8cff00.png) <span style="color: #d9ffaa">6.240ms</span> / ![#c6ff00](https://placehold.co/10x10/c6ff00/c6ff00.png) <span style="color: #ecffaa">15.474ms</span>|- / -|
|11|![#79ff00](https://placehold.co/10x10/79ff00/79ff00.png) <span style="color: #d2ffaa">3.696ms</span> / ![#79ff00](https://placehold.co/10x10/79ff00/79ff00.png) <span style="color: #d2ffaa">3.716ms</span>|![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">3.521ms</span> / ![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">3.523ms</span>|- / -|
|12|![#99ff00](https://placehold.co/10x10/99ff00/99ff00.png) <span style="color: #ddffaa">6.137ms</span> / ![#e9ff00](https://placehold.co/10x10/e9ff00/e9ff00.png) <span style="color: #f8ffaa">18.895ms</span>|![#8cff00](https://placehold.co/10x10/8cff00/8cff00.png) <span style="color: #d9ffaa">6.285ms</span> / ![#e2ff00](https://placehold.co/10x10/e2ff00/e2ff00.png) <span style="color: #f5ffaa">23.727ms</span>|- / -|
|13|![#41ff00](https://placehold.co/10x10/41ff00/41ff00.png) <span style="color: #c0ffaa">1.312ms</span> / ![#47ff00](https://placehold.co/10x10/47ff00/47ff00.png) <span style="color: #c2ffaa">1.502ms</span>|![#35ff00](https://placehold.co/10x10/35ff00/35ff00.png) <span style="color: #bcffaa">1.125ms</span> / ![#46ff00](https://placehold.co/10x10/46ff00/46ff00.png) <span style="color: #c1ffaa">1.682ms</span>|- / -|
|14|![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">1.909ms</span> / ![#fff700](https://placehold.co/10x10/fff700/fff700.png) <span style="color: #fffcaa">28.171ms</span>|![#4cff00](https://placehold.co/10x10/4cff00/4cff00.png) <span style="color: #c3ffaa">1.940ms</span> / ![#ffe100](https://placehold.co/10x10/ffe100/ffe100.png) <span style="color: #fff5aa">55.527ms</span>|- / -|
|15|![#4bff00](https://placehold.co/10x10/4bff00/4bff00.png) <span style="color: #c3ffaa">1.615ms</span> / ![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">2.916ms</span>|![#40ff00](https://placehold.co/10x10/40ff00/40ff00.png) <span style="color: #bfffaa">1.478ms</span> / ![#59ff00](https://placehold.co/10x10/59ff00/59ff00.png) <span style="color: #c8ffaa">2.517ms</span>|- / -|
|16|![#7cff00](https://placehold.co/10x10/7cff00/7cff00.png) <span style="color: #d3ffaa">3.918ms</span> / ![#ffdd00](https://placehold.co/10x10/ffdd00/ffdd00.png) <span style="color: #fff4aa">39.921ms</span>|![#7eff00](https://placehold.co/10x10/7eff00/7eff00.png) <span style="color: #d4ffaa">4.990ms</span> / ![#ffe600](https://placehold.co/10x10/ffe600/ffe600.png) <span style="color: #fff7aa">52.262ms</span>|- / -|
|17|![#ffd300](https://placehold.co/10x10/ffd300/ffd300.png) <span style="color: #fff0aa">45.292ms</span> / ![#ff8e00](https://placehold.co/10x10/ff8e00/ff8e00.png) <span style="color: #ffd9aa">110.876ms</span>|![#ffe700](https://placehold.co/10x10/ffe700/ffe700.png) <span style="color: #fff7aa">51.058ms</span> / ![#ffa800](https://placehold.co/10x10/ffa800/ffa800.png) <span style="color: #ffe2aa">126.340ms</span>|- / -|
|18|![#5fff00](https://placehold.co/10x10/5fff00/5fff00.png) <span style="color: #caffaa">2.372ms</span> / ![#5eff00](https://placehold.co/10x10/5eff00/5eff00.png) <span style="color: #c9ffaa">2.336ms</span>|![#47ff00](https://placehold.co/10x10/47ff00/47ff00.png) <span style="color: #c2ffaa">1.728ms</span> / ![#49ff00](https://placehold.co/10x10/49ff00/49ff00.png) <span style="color: #c2ffaa">1.832ms</span>|- / -|
|19|![#4bff00](https://placehold.co/10x10/4bff00/4bff00.png) <span style="color: #c3ffaa">1.627ms</span> / ![#59ff00](https://placehold.co/10x10/59ff00/59ff00.png) <span style="color: #c8ffaa">2.151ms</span>|![#4bff00](https://placehold.co/10x10/4bff00/4bff00.png) <span style="color: #c3ffaa">1.878ms</span> / ![#5aff00](https://placehold.co/10x10/5aff00/5aff00.png) <span style="color: #c8ffaa">2.558ms</span>|- / -|
|20|![#bbff00](https://placehold.co/10x10/bbff00/bbff00.png) <span style="color: #e8ffaa">10.001ms</span> / ![#fdff00](https://placehold.co/10x10/fdff00/fdff00.png) <span style="color: #feffaa">24.683ms</span>|![#a2ff00](https://placehold.co/10x10/a2ff00/a2ff00.png) <span style="color: #e0ffaa">8.939ms</span> / ![#dcff00](https://placehold.co/10x10/dcff00/dcff00.png) <span style="color: #f3ffaa">21.646ms</span>|- / -|
|21|![#c6ff00](https://placehold.co/10x10/c6ff00/c6ff00.png) <span style="color: #ecffaa">11.736ms</span> / ![#fff500](https://placehold.co/10x10/fff500/fff500.png) <span style="color: #fffcaa">29.051ms</span>|![#b5ff00](https://placehold.co/10x10/b5ff00/b5ff00.png) <span style="color: #e6ffaa">12.110ms</span> / ![#ffec00](https://placehold.co/10x10/ffec00/ffec00.png) <span style="color: #fff9aa">47.531ms</span>|- / -|
|22|![#75ff00](https://placehold.co/10x10/75ff00/75ff00.png) <span style="color: #d1ffaa">3.476ms</span> / ![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">6.832ms</span>|![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">4.082ms</span> / ![#9bff00](https://placehold.co/10x10/9bff00/9bff00.png) <span style="color: #deffaa">7.990ms</span>|- / -|
|23|![#ff7200](https://placehold.co/10x10/ff7200/ff7200.png) <span style="color: #ffd0aa">158.927ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">692.698ms</span>|![#ff4a00](https://placehold.co/10x10/ff4a00/ff4a00.png) <span style="color: #ffc3aa">483.541ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">1381.359ms</span>|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|1296.708ms|2392.713ms|0.697ms|
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
