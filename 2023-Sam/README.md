# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#65ff00](https://placehold.co/10x10/65ff00/65ff00.png) <span style="color: #ccffaa">2.306ms</span> / ![#62ff00](https://placehold.co/10x10/62ff00/62ff00.png) <span style="color: #cbffaa">2.201ms</span>|![#60ff00](https://placehold.co/10x10/60ff00/60ff00.png) <span style="color: #caffaa">2.025ms</span> / ![#4eff00](https://placehold.co/10x10/4eff00/4eff00.png) <span style="color: #c4ffaa">1.452ms</span>|![#ff9600](https://placehold.co/10x10/ff9600/ff9600.png) <span style="color: #ffdcaa">0.131ms</span> / ![#ff6d00](https://placehold.co/10x10/ff6d00/ff6d00.png) <span style="color: #ffceaa">0.146ms</span>|
|2|![#8dff00](https://placehold.co/10x10/8dff00/8dff00.png) <span style="color: #d9ffaa">4.350ms</span> / ![#97ff00](https://placehold.co/10x10/97ff00/97ff00.png) <span style="color: #dcffaa">4.961ms</span>|![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">3.727ms</span> / ![#8cff00](https://placehold.co/10x10/8cff00/8cff00.png) <span style="color: #d9ffaa">4.076ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.190ms</span> / ![#ff3900](https://placehold.co/10x10/ff3900/ff3900.png) <span style="color: #ffbdaa">0.167ms</span>|
|3|![#60ff00](https://placehold.co/10x10/60ff00/60ff00.png) <span style="color: #caffaa">2.138ms</span> / ![#96ff00](https://placehold.co/10x10/96ff00/96ff00.png) <span style="color: #dcffaa">4.914ms</span>|![#4aff00](https://placehold.co/10x10/4aff00/4aff00.png) <span style="color: #c3ffaa">1.361ms</span> / ![#78ff00](https://placehold.co/10x10/78ff00/78ff00.png) <span style="color: #d2ffaa">3.025ms</span>|- / -|
|4|![#8fff00](https://placehold.co/10x10/8fff00/8fff00.png) <span style="color: #daffaa">4.449ms</span> / ![#92ff00](https://placehold.co/10x10/92ff00/92ff00.png) <span style="color: #dbffaa">4.658ms</span>|![#95ff00](https://placehold.co/10x10/95ff00/95ff00.png) <span style="color: #dcffaa">4.630ms</span> / ![#95ff00](https://placehold.co/10x10/95ff00/95ff00.png) <span style="color: #dcffaa">4.625ms</span>|- / -|
|5|![#4dff00](https://placehold.co/10x10/4dff00/4dff00.png) <span style="color: #c4ffaa">1.484ms</span> / ![#84ff00](https://placehold.co/10x10/84ff00/84ff00.png) <span style="color: #d6ffaa">3.768ms</span>|![#56ff00](https://placehold.co/10x10/56ff00/56ff00.png) <span style="color: #c7ffaa">1.711ms</span> / ![#80ff00](https://placehold.co/10x10/80ff00/80ff00.png) <span style="color: #d5ffaa">3.416ms</span>|- / -|
|6|![#1cff00](https://placehold.co/10x10/1cff00/1cff00.png) <span style="color: #b3ffaa">0.395ms</span> / ![#1aff00](https://placehold.co/10x10/1aff00/1aff00.png) <span style="color: #b3ffaa">0.362ms</span>|![#1cff00](https://placehold.co/10x10/1cff00/1cff00.png) <span style="color: #b3ffaa">0.382ms</span> / ![#17ff00](https://placehold.co/10x10/17ff00/17ff00.png) <span style="color: #b2ffaa">0.308ms</span>|- / -|
|7|![#8eff00](https://placehold.co/10x10/8eff00/8eff00.png) <span style="color: #d9ffaa">4.365ms</span> / ![#7eff00](https://placehold.co/10x10/7eff00/7eff00.png) <span style="color: #d4ffaa">3.452ms</span>|![#81ff00](https://placehold.co/10x10/81ff00/81ff00.png) <span style="color: #d5ffaa">3.454ms</span> / ![#7cff00](https://placehold.co/10x10/7cff00/7cff00.png) <span style="color: #d3ffaa">3.196ms</span>|- / -|
|8|![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">4.044ms</span> / ![#e4ff00](https://placehold.co/10x10/e4ff00/e4ff00.png) <span style="color: #f6ffaa">14.026ms</span>|![#a8ff00](https://placehold.co/10x10/a8ff00/a8ff00.png) <span style="color: #e2ffaa">6.005ms</span> / ![#f1ff00](https://placehold.co/10x10/f1ff00/f1ff00.png) <span style="color: #faffaa">15.298ms</span>|- / -|
|9|![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">3.905ms</span> / ![#83ff00](https://placehold.co/10x10/83ff00/83ff00.png) <span style="color: #d6ffaa">3.709ms</span>|![#93ff00](https://placehold.co/10x10/93ff00/93ff00.png) <span style="color: #dbffaa">4.453ms</span> / ![#85ff00](https://placehold.co/10x10/85ff00/85ff00.png) <span style="color: #d6ffaa">3.642ms</span>|- / -|
|10|![#8eff00](https://placehold.co/10x10/8eff00/8eff00.png) <span style="color: #d9ffaa">4.364ms</span> / ![#d8ff00](https://placehold.co/10x10/d8ff00/d8ff00.png) <span style="color: #f2ffaa">12.022ms</span>|![#b8ff00](https://placehold.co/10x10/b8ff00/b8ff00.png) <span style="color: #e7ffaa">7.384ms</span> / ![#fcff00](https://placehold.co/10x10/fcff00/fcff00.png) <span style="color: #feffaa">17.440ms</span>|- / -|
|11|![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">4.005ms</span> / ![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">4.008ms</span>|![#87ff00](https://placehold.co/10x10/87ff00/87ff00.png) <span style="color: #d7ffaa">3.786ms</span> / ![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">3.817ms</span>|- / -|
|12|![#abff00](https://placehold.co/10x10/abff00/abff00.png) <span style="color: #e3ffaa">6.606ms</span> / ![#fff700](https://placehold.co/10x10/fff700/fff700.png) <span style="color: #fffcaa">21.752ms</span>|![#b3ff00](https://placehold.co/10x10/b3ff00/b3ff00.png) <span style="color: #e6ffaa">6.896ms</span> / ![#ffe200](https://placehold.co/10x10/ffe200/ffe200.png) <span style="color: #fff5aa">25.620ms</span>|- / -|
|13|![#49ff00](https://placehold.co/10x10/49ff00/49ff00.png) <span style="color: #c2ffaa">1.383ms</span> / ![#51ff00](https://placehold.co/10x10/51ff00/51ff00.png) <span style="color: #c5ffaa">1.623ms</span>|![#51ff00](https://placehold.co/10x10/51ff00/51ff00.png) <span style="color: #c5ffaa">1.553ms</span> / ![#61ff00](https://placehold.co/10x10/61ff00/61ff00.png) <span style="color: #caffaa">2.071ms</span>|- / -|
|14|![#5dff00](https://placehold.co/10x10/5dff00/5dff00.png) <span style="color: #c9ffaa">2.015ms</span> / ![#ffde00](https://placehold.co/10x10/ffde00/ffde00.png) <span style="color: #fff4aa">29.403ms</span>|![#68ff00](https://placehold.co/10x10/68ff00/68ff00.png) <span style="color: #cdffaa">2.313ms</span> / ![#ff9b00](https://placehold.co/10x10/ff9b00/ff9b00.png) <span style="color: #ffdeaa">59.420ms</span>|- / -|
|15|![#57ff00](https://placehold.co/10x10/57ff00/57ff00.png) <span style="color: #c7ffaa">1.817ms</span> / ![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">3.077ms</span>|![#56ff00](https://placehold.co/10x10/56ff00/56ff00.png) <span style="color: #c7ffaa">1.709ms</span> / ![#72ff00](https://placehold.co/10x10/72ff00/72ff00.png) <span style="color: #d0ffaa">2.730ms</span>|- / -|
|16|![#89ff00](https://placehold.co/10x10/89ff00/89ff00.png) <span style="color: #d8ffaa">4.073ms</span> / ![#ffc000](https://placehold.co/10x10/ffc000/ffc000.png) <span style="color: #ffeaaa">42.278ms</span>|![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">5.607ms</span> / ![#ffa200](https://placehold.co/10x10/ffa200/ffa200.png) <span style="color: #ffe0aa">55.198ms</span>|- / -|
|17|![#ff6700](https://placehold.co/10x10/ff6700/ff6700.png) <span style="color: #ffccaa">124.088ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">422.475ms</span>|![#ff5800](https://placehold.co/10x10/ff5800/ff5800.png) <span style="color: #ffc7aa">131.336ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">363.266ms</span>|- / -|
|18|![#6bff00](https://placehold.co/10x10/6bff00/6bff00.png) <span style="color: #ceffaa">2.541ms</span> / ![#6dff00](https://placehold.co/10x10/6dff00/6dff00.png) <span style="color: #ceffaa">2.637ms</span>|![#5bff00](https://placehold.co/10x10/5bff00/5bff00.png) <span style="color: #c8ffaa">1.862ms</span> / ![#5cff00](https://placehold.co/10x10/5cff00/5cff00.png) <span style="color: #c9ffaa">1.892ms</span>|- / -|
|19|- / -|- / -|- / -|
|20|- / -|- / -|- / -|
|21|- / -|- / -|- / -|
|22|- / -|- / -|- / -|
|23|- / -|- / -|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|759.656ms|760.684ms|0.634ms|
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
