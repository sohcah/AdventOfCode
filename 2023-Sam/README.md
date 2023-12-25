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
|1| ![#6eff00](https://placehold.co/10x10/6eff00/6eff00.png) <span style="color: #cfffaa">2.024ms</span> / ![#6dff00](https://placehold.co/10x10/6dff00/6dff00.png) <span style="color: #ceffaa">1.996ms</span>    | ![#4fff00](https://placehold.co/10x10/4fff00/4fff00.png) <span style="color: #c4ffaa">1.595ms</span> / ![#44ff00](https://placehold.co/10x10/44ff00/44ff00.png) <span style="color: #c1ffaa">1.279ms</span>  |![#ff5c00](https://placehold.co/10x10/ff5c00/ff5c00.png) <span style="color: #ffc9aa">0.142ms</span> / ![#ff4e00](https://placehold.co/10x10/ff4e00/ff4e00.png) <span style="color: #ffc4aa">0.148ms</span>|![#9eff00](https://placehold.co/10x10/9eff00/9eff00.png) <span style="color: #dfffaa">1.452ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">17.199ms</span>|
|2| ![#9dff00](https://placehold.co/10x10/9dff00/9dff00.png) <span style="color: #deffaa">3.883ms</span> / ![#a9ff00](https://placehold.co/10x10/a9ff00/a9ff00.png) <span style="color: #e2ffaa">4.483ms</span>    | ![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">3.199ms</span> / ![#7cff00](https://placehold.co/10x10/7cff00/7cff00.png) <span style="color: #d3ffaa">3.419ms</span>  |![#ff2d00](https://placehold.co/10x10/ff2d00/ff2d00.png) <span style="color: #ffb9aa">0.160ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.176ms</span>|- / -|
|3| ![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">1.913ms</span> / ![#aaff00](https://placehold.co/10x10/aaff00/aaff00.png) <span style="color: #e3ffaa">4.550ms</span>    | ![#42ff00](https://placehold.co/10x10/42ff00/42ff00.png) <span style="color: #c0ffaa">1.209ms</span> / ![#6eff00](https://placehold.co/10x10/6eff00/6eff00.png) <span style="color: #cfffaa">2.757ms</span>  |- / -|- / -|
|4| ![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">4.046ms</span> / ![#a2ff00](https://placehold.co/10x10/a2ff00/a2ff00.png) <span style="color: #e0ffaa">4.141ms</span>    | ![#89ff00](https://placehold.co/10x10/89ff00/89ff00.png) <span style="color: #d8ffaa">4.192ms</span> / ![#8bff00](https://placehold.co/10x10/8bff00/8bff00.png) <span style="color: #d8ffaa">4.343ms</span>  |- / -|- / -|
|5| ![#54ff00](https://placehold.co/10x10/54ff00/54ff00.png) <span style="color: #c6ffaa">1.343ms</span> / ![#94ff00](https://placehold.co/10x10/94ff00/94ff00.png) <span style="color: #dbffaa">3.468ms</span>    | ![#42ff00](https://placehold.co/10x10/42ff00/42ff00.png) <span style="color: #c0ffaa">1.215ms</span> / ![#71ff00](https://placehold.co/10x10/71ff00/71ff00.png) <span style="color: #d0ffaa">2.890ms</span>  |- / -|- / -|
|6| ![#23ff00](https://placehold.co/10x10/23ff00/23ff00.png) <span style="color: #b6ffaa">0.423ms</span> / ![#1cff00](https://placehold.co/10x10/1cff00/1cff00.png) <span style="color: #b3ffaa">0.325ms</span>    | ![#12ff00](https://placehold.co/10x10/12ff00/12ff00.png) <span style="color: #b0ffaa">0.248ms</span> / ![#14ff00](https://placehold.co/10x10/14ff00/14ff00.png) <span style="color: #b1ffaa">0.275ms</span>  |- / -|- / -|
|7| ![#9eff00](https://placehold.co/10x10/9eff00/9eff00.png) <span style="color: #dfffaa">3.924ms</span> / ![#8dff00](https://placehold.co/10x10/8dff00/8dff00.png) <span style="color: #d9ffaa">3.164ms</span>    | ![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">2.989ms</span> / ![#6dff00](https://placehold.co/10x10/6dff00/6dff00.png) <span style="color: #ceffaa">2.712ms</span>  |- / -|- / -|
|8| ![#99ff00](https://placehold.co/10x10/99ff00/99ff00.png) <span style="color: #ddffaa">3.685ms</span> / ![#fff900](https://placehold.co/10x10/fff900/fff900.png) <span style="color: #fffdaa">13.016ms</span>   | ![#9aff00](https://placehold.co/10x10/9aff00/9aff00.png) <span style="color: #ddffaa">5.371ms</span> / ![#dfff00](https://placehold.co/10x10/dfff00/dfff00.png) <span style="color: #f4ffaa">13.671ms</span> |- / -|- / -|
|9| ![#97ff00](https://placehold.co/10x10/97ff00/97ff00.png) <span style="color: #dcffaa">3.575ms</span> / ![#93ff00](https://placehold.co/10x10/93ff00/93ff00.png) <span style="color: #dbffaa">3.420ms</span>    | ![#7eff00](https://placehold.co/10x10/7eff00/7eff00.png) <span style="color: #d4ffaa">3.524ms</span> / ![#7dff00](https://placehold.co/10x10/7dff00/7dff00.png) <span style="color: #d4ffaa">3.477ms</span>  |- / -|- / -|
|10| ![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">4.013ms</span> / ![#f9ff00](https://placehold.co/10x10/f9ff00/f9ff00.png) <span style="color: #fdffaa">11.309ms</span>   | ![#a6ff00](https://placehold.co/10x10/a6ff00/a6ff00.png) <span style="color: #e1ffaa">6.381ms</span> / ![#e9ff00](https://placehold.co/10x10/e9ff00/e9ff00.png) <span style="color: #f8ffaa">15.424ms</span> |- / -|- / -|
|11| ![#98ff00](https://placehold.co/10x10/98ff00/98ff00.png) <span style="color: #ddffaa">3.657ms</span> / ![#99ff00](https://placehold.co/10x10/99ff00/99ff00.png) <span style="color: #ddffaa">3.708ms</span>    | ![#7dff00](https://placehold.co/10x10/7dff00/7dff00.png) <span style="color: #d4ffaa">3.496ms</span> / ![#7dff00](https://placehold.co/10x10/7dff00/7dff00.png) <span style="color: #d4ffaa">3.468ms</span>  |- / -|- / -|
|12| ![#c2ff00](https://placehold.co/10x10/c2ff00/c2ff00.png) <span style="color: #ebffaa">6.099ms</span> / ![#ffd800](https://placehold.co/10x10/ffd800/ffd800.png) <span style="color: #fff2aa">18.413ms</span>   | ![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">6.108ms</span> / ![#fff300](https://placehold.co/10x10/fff300/fff300.png) <span style="color: #fffbaa">23.646ms</span> |- / -|- / -|
|13| ![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">1.310ms</span> / ![#5aff00](https://placehold.co/10x10/5aff00/5aff00.png) <span style="color: #c8ffaa">1.480ms</span>    | ![#3cff00](https://placehold.co/10x10/3cff00/3cff00.png) <span style="color: #beffaa">1.068ms</span> / ![#51ff00](https://placehold.co/10x10/51ff00/51ff00.png) <span style="color: #c5ffaa">1.659ms</span>  |- / -|- / -|
|14| ![#68ff00](https://placehold.co/10x10/68ff00/68ff00.png) <span style="color: #cdffaa">1.859ms</span> / ![#ffb100](https://placehold.co/10x10/ffb100/ffb100.png) <span style="color: #ffe5aa">27.958ms</span>   | ![#58ff00](https://placehold.co/10x10/58ff00/58ff00.png) <span style="color: #c7ffaa">1.895ms</span> / ![#ffae00](https://placehold.co/10x10/ffae00/ffae00.png) <span style="color: #ffe4aa">55.493ms</span> |- / -|- / -|
|15| ![#5eff00](https://placehold.co/10x10/5eff00/5eff00.png) <span style="color: #c9ffaa">1.583ms</span> / ![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">2.934ms</span>    | ![#4fff00](https://placehold.co/10x10/4fff00/4fff00.png) <span style="color: #c4ffaa">1.590ms</span> / ![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">2.537ms</span>  |- / -|- / -|
|16| ![#9dff00](https://placehold.co/10x10/9dff00/9dff00.png) <span style="color: #deffaa">3.856ms</span> / ![#ff9000](https://placehold.co/10x10/ff9000/ff9000.png) <span style="color: #ffdaaa">39.251ms</span>   | ![#95ff00](https://placehold.co/10x10/95ff00/95ff00.png) <span style="color: #dcffaa">4.982ms</span> / ![#ffb300](https://placehold.co/10x10/ffb300/ffb300.png) <span style="color: #ffe6aa">52.784ms</span> |- / -|- / -|
|17| ![#ff8400](https://placehold.co/10x10/ff8400/ff8400.png) <span style="color: #ffd6aa">44.476ms</span> / ![#ff2e00](https://placehold.co/10x10/ff2e00/ff2e00.png) <span style="color: #ffb9aa">107.227ms</span> | ![#ffb700](https://placehold.co/10x10/ffb700/ffb700.png) <span style="color: #ffe7aa">50.216ms</span> / ![#ff6a00](https://placehold.co/10x10/ff6a00/ff6a00.png) <span style="color: #ffcdaa">127.101ms</span>|- / -|- / -|
|18| ![#76ff00](https://placehold.co/10x10/76ff00/76ff00.png) <span style="color: #d1ffaa">2.290ms</span> / ![#78ff00](https://placehold.co/10x10/78ff00/78ff00.png) <span style="color: #d2ffaa">2.352ms</span>    | ![#56ff00](https://placehold.co/10x10/56ff00/56ff00.png) <span style="color: #c7ffaa">1.800ms</span> / ![#57ff00](https://placehold.co/10x10/57ff00/57ff00.png) <span style="color: #c7ffaa">1.843ms</span>  |- / -|- / -|
|19| ![#60ff00](https://placehold.co/10x10/60ff00/60ff00.png) <span style="color: #caffaa">1.636ms</span> / ![#72ff00](https://placehold.co/10x10/72ff00/72ff00.png) <span style="color: #d0ffaa">2.162ms</span>    | ![#57ff00](https://placehold.co/10x10/57ff00/57ff00.png) <span style="color: #c7ffaa">1.860ms</span> / ![#6bff00](https://placehold.co/10x10/6bff00/6bff00.png) <span style="color: #ceffaa">2.601ms</span>  |- / -|- / -|
|20| ![#e4ff00](https://placehold.co/10x10/e4ff00/e4ff00.png) <span style="color: #f6ffaa">8.979ms</span> / ![#ffc000](https://placehold.co/10x10/ffc000/ffc000.png) <span style="color: #ffeaaa">23.871ms</span>   | ![#beff00](https://placehold.co/10x10/beff00/beff00.png) <span style="color: #e9ffaa">8.849ms</span> / ![#fffb00](https://placehold.co/10x10/fffb00/fffb00.png) <span style="color: #fffeaa">21.625ms</span> |- / -|- / -|
|21| ![#fcff00](https://placehold.co/10x10/fcff00/fcff00.png) <span style="color: #feffaa">11.679ms</span> / ![#ffad00](https://placehold.co/10x10/ffad00/ffad00.png) <span style="color: #ffe4aa">29.025ms</span>  | ![#d6ff00](https://placehold.co/10x10/d6ff00/d6ff00.png) <span style="color: #f1ffaa">12.116ms</span> / ![#ffbb00](https://placehold.co/10x10/ffbb00/ffbb00.png) <span style="color: #ffe8aa">47.480ms</span>|- / -|- / -|
|22| ![#94ff00](https://placehold.co/10x10/94ff00/94ff00.png) <span style="color: #dbffaa">3.472ms</span> / ![#cbff00](https://placehold.co/10x10/cbff00/cbff00.png) <span style="color: #eeffaa">6.763ms</span>    | ![#87ff00](https://placehold.co/10x10/87ff00/87ff00.png) <span style="color: #d7ffaa">4.086ms</span> / ![#b7ff00](https://placehold.co/10x10/b7ff00/b7ff00.png) <span style="color: #e7ffaa">7.997ms</span>  |- / -|- / -|
|23| ![#a8ff00](https://placehold.co/10x10/a8ff00/a8ff00.png) <span style="color: #e2ffaa">4.439ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">171.300ms</span>  | ![#98ff00](https://placehold.co/10x10/98ff00/98ff00.png) <span style="color: #ddffaa">5.200ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">459.223ms</span>|- / -|- / -|
|24| ![#89ff00](https://placehold.co/10x10/89ff00/89ff00.png) <span style="color: #d8ffaa">2.974ms</span> / ![#ff6a00](https://placehold.co/10x10/ff6a00/ff6a00.png) <span style="color: #ffcdaa">58.339ms</span>   | ![#85ff00](https://placehold.co/10x10/85ff00/85ff00.png) <span style="color: #d6ffaa">3.950ms</span> / ![#ffa900](https://placehold.co/10x10/ffa900/ffa900.png) <span style="color: #ffe2aa">59.238ms</span> |- / -|- / -|
|25| ![#fff100](https://placehold.co/10x10/fff100/fff100.png) <span style="color: #fffaaa">14.049ms</span> / ![#0dff00](https://placehold.co/10x10/0dff00/0dff00.png) <span style="color: #aeffaa">0.145ms</span>   | ![#eeff00](https://placehold.co/10x10/eeff00/eeff00.png) <span style="color: #f9ffaa">16.497ms</span> / ![#06ff00](https://placehold.co/10x10/06ff00/06ff00.png) <span style="color: #acffaa">0.074ms</span> |- / -|- / -|
|Total| 685.988ms                                                                                                                                                                                                      | 1070.655ms                                                                                                                                                                                                   |0.626ms|18.651ms|
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
