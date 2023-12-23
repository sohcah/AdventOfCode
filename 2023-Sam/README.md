# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#6dff00](https://placehold.co/10x10/6dff00/6dff00.png) <span style="color: #ceffaa">2.009ms</span> / ![#6cff00](https://placehold.co/10x10/6cff00/6cff00.png) <span style="color: #ceffaa">1.989ms</span>|![#4cff00](https://placehold.co/10x10/4cff00/4cff00.png) <span style="color: #c3ffaa">1.501ms</span> / ![#46ff00](https://placehold.co/10x10/46ff00/46ff00.png) <span style="color: #c1ffaa">1.316ms</span>|![#ff4e00](https://placehold.co/10x10/ff4e00/ff4e00.png) <span style="color: #ffc4aa">0.157ms</span> / ![#ff2800](https://placehold.co/10x10/ff2800/ff2800.png) <span style="color: #ffb7aa">0.172ms</span>|
|2|![#9eff00](https://placehold.co/10x10/9eff00/9eff00.png) <span style="color: #dfffaa">3.952ms</span> / ![#a7ff00](https://placehold.co/10x10/a7ff00/a7ff00.png) <span style="color: #e2ffaa">4.429ms</span>|![#78ff00](https://placehold.co/10x10/78ff00/78ff00.png) <span style="color: #d2ffaa">3.224ms</span> / ![#7eff00](https://placehold.co/10x10/7eff00/7eff00.png) <span style="color: #d4ffaa">3.574ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.188ms</span> / ![#ff1500](https://placehold.co/10x10/ff1500/ff1500.png) <span style="color: #ffb1aa">0.179ms</span>|
|3|![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">1.898ms</span> / ![#a9ff00](https://placehold.co/10x10/a9ff00/a9ff00.png) <span style="color: #e2ffaa">4.559ms</span>|![#43ff00](https://placehold.co/10x10/43ff00/43ff00.png) <span style="color: #c0ffaa">1.233ms</span> / ![#6fff00](https://placehold.co/10x10/6fff00/6fff00.png) <span style="color: #cfffaa">2.822ms</span>|- / -|
|4|![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">4.072ms</span> / ![#a2ff00](https://placehold.co/10x10/a2ff00/a2ff00.png) <span style="color: #e0ffaa">4.137ms</span>|![#89ff00](https://placehold.co/10x10/89ff00/89ff00.png) <span style="color: #d8ffaa">4.206ms</span> / ![#8dff00](https://placehold.co/10x10/8dff00/8dff00.png) <span style="color: #d9ffaa">4.464ms</span>|- / -|
|5|![#55ff00](https://placehold.co/10x10/55ff00/55ff00.png) <span style="color: #c6ffaa">1.361ms</span> / ![#93ff00](https://placehold.co/10x10/93ff00/93ff00.png) <span style="color: #dbffaa">3.412ms</span>|![#43ff00](https://placehold.co/10x10/43ff00/43ff00.png) <span style="color: #c0ffaa">1.241ms</span> / ![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">3.002ms</span>|- / -|
|6|![#1eff00](https://placehold.co/10x10/1eff00/1eff00.png) <span style="color: #b4ffaa">0.360ms</span> / ![#1dff00](https://placehold.co/10x10/1dff00/1dff00.png) <span style="color: #b4ffaa">0.339ms</span>|![#17ff00](https://placehold.co/10x10/17ff00/17ff00.png) <span style="color: #b2ffaa">0.314ms</span> / ![#16ff00](https://placehold.co/10x10/16ff00/16ff00.png) <span style="color: #b1ffaa">0.304ms</span>|- / -|
|7|![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">4.042ms</span> / ![#8eff00](https://placehold.co/10x10/8eff00/8eff00.png) <span style="color: #d9ffaa">3.193ms</span>|![#78ff00](https://placehold.co/10x10/78ff00/78ff00.png) <span style="color: #d2ffaa">3.247ms</span> / ![#6eff00](https://placehold.co/10x10/6eff00/6eff00.png) <span style="color: #cfffaa">2.743ms</span>|- / -|
|8|![#9bff00](https://placehold.co/10x10/9bff00/9bff00.png) <span style="color: #deffaa">3.797ms</span> / ![#fff900](https://placehold.co/10x10/fff900/fff900.png) <span style="color: #fffdaa">13.090ms</span>|![#9bff00](https://placehold.co/10x10/9bff00/9bff00.png) <span style="color: #deffaa">5.453ms</span> / ![#e1ff00](https://placehold.co/10x10/e1ff00/e1ff00.png) <span style="color: #f5ffaa">14.004ms</span>|- / -|
|9|![#96ff00](https://placehold.co/10x10/96ff00/96ff00.png) <span style="color: #dcffaa">3.578ms</span> / ![#94ff00](https://placehold.co/10x10/94ff00/94ff00.png) <span style="color: #dbffaa">3.484ms</span>|![#7fff00](https://placehold.co/10x10/7fff00/7fff00.png) <span style="color: #d4ffaa">3.597ms</span> / ![#7cff00](https://placehold.co/10x10/7cff00/7cff00.png) <span style="color: #d3ffaa">3.460ms</span>|- / -|
|10|![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">4.190ms</span> / ![#f8ff00](https://placehold.co/10x10/f8ff00/f8ff00.png) <span style="color: #fdffaa">11.314ms</span>|![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">6.104ms</span> / ![#e9ff00](https://placehold.co/10x10/e9ff00/e9ff00.png) <span style="color: #f8ffaa">15.451ms</span>|- / -|
|11|![#99ff00](https://placehold.co/10x10/99ff00/99ff00.png) <span style="color: #ddffaa">3.691ms</span> / ![#9cff00](https://placehold.co/10x10/9cff00/9cff00.png) <span style="color: #deffaa">3.858ms</span>|![#7dff00](https://placehold.co/10x10/7dff00/7dff00.png) <span style="color: #d4ffaa">3.524ms</span> / ![#7dff00](https://placehold.co/10x10/7dff00/7dff00.png) <span style="color: #d4ffaa">3.510ms</span>|- / -|
|12|![#c1ff00](https://placehold.co/10x10/c1ff00/c1ff00.png) <span style="color: #eaffaa">6.070ms</span> / ![#ffd800](https://placehold.co/10x10/ffd800/ffd800.png) <span style="color: #fff2aa">18.606ms</span>|![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">6.108ms</span> / ![#fff300](https://placehold.co/10x10/fff300/fff300.png) <span style="color: #fffbaa">23.896ms</span>|- / -|
|13|![#52ff00](https://placehold.co/10x10/52ff00/52ff00.png) <span style="color: #c5ffaa">1.298ms</span> / ![#5aff00](https://placehold.co/10x10/5aff00/5aff00.png) <span style="color: #c8ffaa">1.485ms</span>|![#3eff00](https://placehold.co/10x10/3eff00/3eff00.png) <span style="color: #bfffaa">1.111ms</span> / ![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">1.709ms</span>|- / -|
|14|![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">1.889ms</span> / ![#ffb300](https://placehold.co/10x10/ffb300/ffb300.png) <span style="color: #ffe6aa">27.667ms</span>|![#5bff00](https://placehold.co/10x10/5bff00/5bff00.png) <span style="color: #c8ffaa">1.984ms</span> / ![#ffaf00](https://placehold.co/10x10/ffaf00/ffaf00.png) <span style="color: #ffe4aa">55.324ms</span>|- / -|
|15|![#5eff00](https://placehold.co/10x10/5eff00/5eff00.png) <span style="color: #c9ffaa">1.583ms</span> / ![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">2.876ms</span>|![#4dff00](https://placehold.co/10x10/4dff00/4dff00.png) <span style="color: #c4ffaa">1.517ms</span> / ![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">2.523ms</span>|- / -|
|16|![#9dff00](https://placehold.co/10x10/9dff00/9dff00.png) <span style="color: #deffaa">3.887ms</span> / ![#ff9100](https://placehold.co/10x10/ff9100/ff9100.png) <span style="color: #ffdaaa">39.164ms</span>|![#96ff00](https://placehold.co/10x10/96ff00/96ff00.png) <span style="color: #dcffaa">5.080ms</span> / ![#ffb300](https://placehold.co/10x10/ffb300/ffb300.png) <span style="color: #ffe6aa">52.760ms</span>|- / -|
|17|![#ff8300](https://placehold.co/10x10/ff8300/ff8300.png) <span style="color: #ffd6aa">45.149ms</span> / ![#ff3000](https://placehold.co/10x10/ff3000/ff3000.png) <span style="color: #ffbaaa">106.888ms</span>|![#ffb600](https://placehold.co/10x10/ffb600/ffb600.png) <span style="color: #ffe7aa">50.957ms</span> / ![#ff6a00](https://placehold.co/10x10/ff6a00/ff6a00.png) <span style="color: #ffcdaa">127.819ms</span>|- / -|
|18|![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">2.337ms</span> / ![#78ff00](https://placehold.co/10x10/78ff00/78ff00.png) <span style="color: #d2ffaa">2.373ms</span>|![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">1.728ms</span> / ![#56ff00](https://placehold.co/10x10/56ff00/56ff00.png) <span style="color: #c7ffaa">1.823ms</span>|- / -|
|19|![#60ff00](https://placehold.co/10x10/60ff00/60ff00.png) <span style="color: #caffaa">1.650ms</span> / ![#71ff00](https://placehold.co/10x10/71ff00/71ff00.png) <span style="color: #d0ffaa">2.131ms</span>|![#58ff00](https://placehold.co/10x10/58ff00/58ff00.png) <span style="color: #c7ffaa">1.867ms</span> / ![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">2.578ms</span>|- / -|
|20|![#f3ff00](https://placehold.co/10x10/f3ff00/f3ff00.png) <span style="color: #fbffaa">10.707ms</span> / ![#ffb800](https://placehold.co/10x10/ffb800/ffb800.png) <span style="color: #ffe7aa">26.165ms</span>|![#bfff00](https://placehold.co/10x10/bfff00/bfff00.png) <span style="color: #eaffaa">8.965ms</span> / ![#fffb00](https://placehold.co/10x10/fffb00/fffb00.png) <span style="color: #fffeaa">21.441ms</span>|- / -|
|21|![#fbff00](https://placehold.co/10x10/fbff00/fbff00.png) <span style="color: #feffaa">11.683ms</span> / ![#ffae00](https://placehold.co/10x10/ffae00/ffae00.png) <span style="color: #ffe4aa">28.865ms</span>|![#d6ff00](https://placehold.co/10x10/d6ff00/d6ff00.png) <span style="color: #f1ffaa">12.180ms</span> / ![#ffbc00](https://placehold.co/10x10/ffbc00/ffbc00.png) <span style="color: #ffe9aa">47.125ms</span>|- / -|
|22|![#95ff00](https://placehold.co/10x10/95ff00/95ff00.png) <span style="color: #dcffaa">3.512ms</span> / ![#cbff00](https://placehold.co/10x10/cbff00/cbff00.png) <span style="color: #eeffaa">6.838ms</span>|![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">4.161ms</span> / ![#b7ff00](https://placehold.co/10x10/b7ff00/b7ff00.png) <span style="color: #e7ffaa">8.018ms</span>|- / -|
|23|![#a9ff00](https://placehold.co/10x10/a9ff00/a9ff00.png) <span style="color: #e2ffaa">4.536ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">173.648ms</span>|![#95ff00](https://placehold.co/10x10/95ff00/95ff00.png) <span style="color: #dcffaa">5.029ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">460.902ms</span>|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|617.759ms|994.900ms|0.696ms|
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
