# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">2.013ms</span> / ![#51ff00](https://placehold.co/10x10/51ff00/51ff00.png) <span style="color: #c5ffaa">1.936ms</span>|![#3fff00](https://placehold.co/10x10/3fff00/3fff00.png) <span style="color: #bfffaa">1.545ms</span> / ![#38ff00](https://placehold.co/10x10/38ff00/38ff00.png) <span style="color: #bdffaa">1.317ms</span>|![#ff3500](https://placehold.co/10x10/ff3500/ff3500.png) <span style="color: #ffbcaa">0.164ms</span> / ![#ff2700](https://placehold.co/10x10/ff2700/ff2700.png) <span style="color: #ffb7aa">0.169ms</span>|
|2|![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">3.911ms</span> / ![#80ff00](https://placehold.co/10x10/80ff00/80ff00.png) <span style="color: #d5ffaa">4.541ms</span>|![#62ff00](https://placehold.co/10x10/62ff00/62ff00.png) <span style="color: #cbffaa">3.302ms</span> / ![#65ff00](https://placehold.co/10x10/65ff00/65ff00.png) <span style="color: #ccffaa">3.497ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.184ms</span> / ![#ff0400](https://placehold.co/10x10/ff0400/ff0400.png) <span style="color: #ffabaa">0.183ms</span>|
|3|![#51ff00](https://placehold.co/10x10/51ff00/51ff00.png) <span style="color: #c5ffaa">1.962ms</span> / ![#81ff00](https://placehold.co/10x10/81ff00/81ff00.png) <span style="color: #d5ffaa">4.562ms</span>|![#37ff00](https://placehold.co/10x10/37ff00/37ff00.png) <span style="color: #bcffaa">1.273ms</span> / ![#5aff00](https://placehold.co/10x10/5aff00/5aff00.png) <span style="color: #c8ffaa">2.862ms</span>|- / -|
|4|![#7bff00](https://placehold.co/10x10/7bff00/7bff00.png) <span style="color: #d3ffaa">4.153ms</span> / ![#7dff00](https://placehold.co/10x10/7dff00/7dff00.png) <span style="color: #d4ffaa">4.304ms</span>|![#6fff00](https://placehold.co/10x10/6fff00/6fff00.png) <span style="color: #cfffaa">4.274ms</span> / ![#71ff00](https://placehold.co/10x10/71ff00/71ff00.png) <span style="color: #d0ffaa">4.374ms</span>|- / -|
|5|![#3fff00](https://placehold.co/10x10/3fff00/3fff00.png) <span style="color: #bfffaa">1.317ms</span> / ![#70ff00](https://placehold.co/10x10/70ff00/70ff00.png) <span style="color: #cfffaa">3.449ms</span>|![#37ff00](https://placehold.co/10x10/37ff00/37ff00.png) <span style="color: #bcffaa">1.278ms</span> / ![#5dff00](https://placehold.co/10x10/5dff00/5dff00.png) <span style="color: #c9ffaa">3.003ms</span>|- / -|
|6|![#18ff00](https://placehold.co/10x10/18ff00/18ff00.png) <span style="color: #b2ffaa">0.373ms</span> / ![#16ff00](https://placehold.co/10x10/16ff00/16ff00.png) <span style="color: #b1ffaa">0.348ms</span>|![#12ff00](https://placehold.co/10x10/12ff00/12ff00.png) <span style="color: #b0ffaa">0.306ms</span> / ![#11ff00](https://placehold.co/10x10/11ff00/11ff00.png) <span style="color: #b0ffaa">0.297ms</span>|- / -|
|7|![#78ff00](https://placehold.co/10x10/78ff00/78ff00.png) <span style="color: #d2ffaa">3.967ms</span> / ![#6bff00](https://placehold.co/10x10/6bff00/6bff00.png) <span style="color: #ceffaa">3.170ms</span>|![#60ff00](https://placehold.co/10x10/60ff00/60ff00.png) <span style="color: #caffaa">3.220ms</span> / ![#58ff00](https://placehold.co/10x10/58ff00/58ff00.png) <span style="color: #c7ffaa">2.728ms</span>|- / -|
|8|![#76ff00](https://placehold.co/10x10/76ff00/76ff00.png) <span style="color: #d1ffaa">3.829ms</span> / ![#c8ff00](https://placehold.co/10x10/c8ff00/c8ff00.png) <span style="color: #edffaa">13.293ms</span>|![#7dff00](https://placehold.co/10x10/7dff00/7dff00.png) <span style="color: #d4ffaa">5.499ms</span> / ![#b5ff00](https://placehold.co/10x10/b5ff00/b5ff00.png) <span style="color: #e6ffaa">13.935ms</span>|- / -|
|9|![#72ff00](https://placehold.co/10x10/72ff00/72ff00.png) <span style="color: #d0ffaa">3.561ms</span> / ![#70ff00](https://placehold.co/10x10/70ff00/70ff00.png) <span style="color: #cfffaa">3.421ms</span>|![#66ff00](https://placehold.co/10x10/66ff00/66ff00.png) <span style="color: #ccffaa">3.589ms</span> / ![#64ff00](https://placehold.co/10x10/64ff00/64ff00.png) <span style="color: #cbffaa">3.481ms</span>|- / -|
|10|![#7bff00](https://placehold.co/10x10/7bff00/7bff00.png) <span style="color: #d3ffaa">4.128ms</span> / ![#bcff00](https://placehold.co/10x10/bcff00/bcff00.png) <span style="color: #e9ffaa">11.325ms</span>|![#84ff00](https://placehold.co/10x10/84ff00/84ff00.png) <span style="color: #d6ffaa">6.199ms</span> / ![#bcff00](https://placehold.co/10x10/bcff00/bcff00.png) <span style="color: #e9ffaa">15.660ms</span>|- / -|
|11|![#75ff00](https://placehold.co/10x10/75ff00/75ff00.png) <span style="color: #d1ffaa">3.754ms</span> / ![#75ff00](https://placehold.co/10x10/75ff00/75ff00.png) <span style="color: #d1ffaa">3.738ms</span>|![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">3.774ms</span> / ![#66ff00](https://placehold.co/10x10/66ff00/66ff00.png) <span style="color: #ccffaa">3.569ms</span>|- / -|
|12|![#93ff00](https://placehold.co/10x10/93ff00/93ff00.png) <span style="color: #dbffaa">6.088ms</span> / ![#e0ff00](https://placehold.co/10x10/e0ff00/e0ff00.png) <span style="color: #f5ffaa">18.726ms</span>|![#83ff00](https://placehold.co/10x10/83ff00/83ff00.png) <span style="color: #d6ffaa">6.116ms</span> / ![#d7ff00](https://placehold.co/10x10/d7ff00/d7ff00.png) <span style="color: #f2ffaa">23.958ms</span>|- / -|
|13|![#3fff00](https://placehold.co/10x10/3fff00/3fff00.png) <span style="color: #bfffaa">1.302ms</span> / ![#44ff00](https://placehold.co/10x10/44ff00/44ff00.png) <span style="color: #c1ffaa">1.478ms</span>|![#33ff00](https://placehold.co/10x10/33ff00/33ff00.png) <span style="color: #bbffaa">1.138ms</span> / ![#42ff00](https://placehold.co/10x10/42ff00/42ff00.png) <span style="color: #c0ffaa">1.672ms</span>|- / -|
|14|![#4fff00](https://placehold.co/10x10/4fff00/4fff00.png) <span style="color: #c4ffaa">1.876ms</span> / ![#fdff00](https://placehold.co/10x10/fdff00/fdff00.png) <span style="color: #feffaa">28.036ms</span>|![#48ff00](https://placehold.co/10x10/48ff00/48ff00.png) <span style="color: #c2ffaa">1.915ms</span> / ![#fff000](https://placehold.co/10x10/fff000/fff000.png) <span style="color: #fffaaa">55.586ms</span>|- / -|
|15|![#4aff00](https://placehold.co/10x10/4aff00/4aff00.png) <span style="color: #c3ffaa">1.692ms</span> / ![#67ff00](https://placehold.co/10x10/67ff00/67ff00.png) <span style="color: #ccffaa">2.941ms</span>|![#3dff00](https://placehold.co/10x10/3dff00/3dff00.png) <span style="color: #beffaa">1.486ms</span> / ![#54ff00](https://placehold.co/10x10/54ff00/54ff00.png) <span style="color: #c6ffaa">2.533ms</span>|- / -|
|16|![#78ff00](https://placehold.co/10x10/78ff00/78ff00.png) <span style="color: #d2ffaa">3.955ms</span> / ![#ffe800](https://placehold.co/10x10/ffe800/ffe800.png) <span style="color: #fff7aa">39.612ms</span>|![#78ff00](https://placehold.co/10x10/78ff00/78ff00.png) <span style="color: #d2ffaa">5.002ms</span> / ![#fff400](https://placehold.co/10x10/fff400/fff400.png) <span style="color: #fffbaa">52.338ms</span>|- / -|
|17|![#ffdf00](https://placehold.co/10x10/ffdf00/ffdf00.png) <span style="color: #fff4aa">44.848ms</span> / ![#ff9e00](https://placehold.co/10x10/ff9e00/ff9e00.png) <span style="color: #ffdfaa">107.894ms</span>|![#fff500](https://placehold.co/10x10/fff500/fff500.png) <span style="color: #fffcaa">51.225ms</span> / ![#ffba00](https://placehold.co/10x10/ffba00/ffba00.png) <span style="color: #ffe8aa">126.526ms</span>|- / -|
|18|![#5bff00](https://placehold.co/10x10/5bff00/5bff00.png) <span style="color: #c8ffaa">2.372ms</span> / ![#5bff00](https://placehold.co/10x10/5bff00/5bff00.png) <span style="color: #c8ffaa">2.380ms</span>|![#43ff00](https://placehold.co/10x10/43ff00/43ff00.png) <span style="color: #c0ffaa">1.711ms</span> / ![#45ff00](https://placehold.co/10x10/45ff00/45ff00.png) <span style="color: #c1ffaa">1.793ms</span>|- / -|
|19|![#49ff00](https://placehold.co/10x10/49ff00/49ff00.png) <span style="color: #c2ffaa">1.629ms</span> / ![#55ff00](https://placehold.co/10x10/55ff00/55ff00.png) <span style="color: #c6ffaa">2.110ms</span>|![#47ff00](https://placehold.co/10x10/47ff00/47ff00.png) <span style="color: #c2ffaa">1.908ms</span> / ![#55ff00](https://placehold.co/10x10/55ff00/55ff00.png) <span style="color: #c6ffaa">2.553ms</span>|- / -|
|20|![#b9ff00](https://placehold.co/10x10/b9ff00/b9ff00.png) <span style="color: #e8ffaa">10.764ms</span> / ![#fbff00](https://placehold.co/10x10/fbff00/fbff00.png) <span style="color: #feffaa">27.405ms</span>|![#9aff00](https://placehold.co/10x10/9aff00/9aff00.png) <span style="color: #ddffaa">9.043ms</span> / ![#d0ff00](https://placehold.co/10x10/d0ff00/d0ff00.png) <span style="color: #efffaa">21.403ms</span>|- / -|
|21|![#c0ff00](https://placehold.co/10x10/c0ff00/c0ff00.png) <span style="color: #eaffaa">11.922ms</span> / ![#fffe00](https://placehold.co/10x10/fffe00/fffe00.png) <span style="color: #ffffaa">29.190ms</span>|![#adff00](https://placehold.co/10x10/adff00/adff00.png) <span style="color: #e4ffaa">12.210ms</span> / ![#fffa00](https://placehold.co/10x10/fffa00/fffa00.png) <span style="color: #fffdaa">47.494ms</span>|- / -|
|22|![#71ff00](https://placehold.co/10x10/71ff00/71ff00.png) <span style="color: #d0ffaa">3.513ms</span> / ![#9aff00](https://placehold.co/10x10/9aff00/9aff00.png) <span style="color: #ddffaa">6.803ms</span>|![#6cff00](https://placehold.co/10x10/6cff00/6cff00.png) <span style="color: #ceffaa">4.037ms</span> / ![#93ff00](https://placehold.co/10x10/93ff00/93ff00.png) <span style="color: #dbffaa">8.005ms</span>|- / -|
|23|![#ff8300](https://placehold.co/10x10/ff8300/ff8300.png) <span style="color: #ffd6aa">155.295ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">895.714ms</span>|![#ff6000](https://placehold.co/10x10/ff6000/ff6000.png) <span style="color: #ffcaaa">483.451ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">2039.839ms</span>|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|1494.601ms|3051.923ms|0.700ms|
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
