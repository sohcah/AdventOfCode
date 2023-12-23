# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#5dff00](https://placehold.co/10x10/5dff00/5dff00.png) <span style="color: #c9ffaa">2.060ms</span> / ![#5bff00](https://placehold.co/10x10/5bff00/5bff00.png) <span style="color: #c8ffaa">1.992ms</span>|![#4aff00](https://placehold.co/10x10/4aff00/4aff00.png) <span style="color: #c3ffaa">1.535ms</span> / ![#45ff00](https://placehold.co/10x10/45ff00/45ff00.png) <span style="color: #c1ffaa">1.374ms</span>|![#ff4300](https://placehold.co/10x10/ff4300/ff4300.png) <span style="color: #ffc0aa">0.166ms</span> / ![#ff2300](https://placehold.co/10x10/ff2300/ff2300.png) <span style="color: #ffb6aa">0.179ms</span>|
|2|![#84ff00](https://placehold.co/10x10/84ff00/84ff00.png) <span style="color: #d6ffaa">3.904ms</span> / ![#8eff00](https://placehold.co/10x10/8eff00/8eff00.png) <span style="color: #d9ffaa">4.515ms</span>|![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">3.243ms</span> / ![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">3.489ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.193ms</span> / ![#ff0200](https://placehold.co/10x10/ff0200/ff0200.png) <span style="color: #ffabaa">0.193ms</span>|
|3|![#58ff00](https://placehold.co/10x10/58ff00/58ff00.png) <span style="color: #c7ffaa">1.862ms</span> / ![#8fff00](https://placehold.co/10x10/8fff00/8fff00.png) <span style="color: #daffaa">4.588ms</span>|![#40ff00](https://placehold.co/10x10/40ff00/40ff00.png) <span style="color: #bfffaa">1.253ms</span> / ![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">2.804ms</span>|- / -|
|4|![#87ff00](https://placehold.co/10x10/87ff00/87ff00.png) <span style="color: #d7ffaa">4.093ms</span> / ![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">4.114ms</span>|![#83ff00](https://placehold.co/10x10/83ff00/83ff00.png) <span style="color: #d6ffaa">4.213ms</span> / ![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">4.390ms</span>|- / -|
|5|![#47ff00](https://placehold.co/10x10/47ff00/47ff00.png) <span style="color: #c2ffaa">1.354ms</span> / ![#7cff00](https://placehold.co/10x10/7cff00/7cff00.png) <span style="color: #d3ffaa">3.414ms</span>|![#41ff00](https://placehold.co/10x10/41ff00/41ff00.png) <span style="color: #c0ffaa">1.264ms</span> / ![#6eff00](https://placehold.co/10x10/6eff00/6eff00.png) <span style="color: #cfffaa">2.992ms</span>|- / -|
|6|![#1bff00](https://placehold.co/10x10/1bff00/1bff00.png) <span style="color: #b3ffaa">0.376ms</span> / ![#19ff00](https://placehold.co/10x10/19ff00/19ff00.png) <span style="color: #b2ffaa">0.349ms</span>|![#15ff00](https://placehold.co/10x10/15ff00/15ff00.png) <span style="color: #b1ffaa">0.310ms</span> / ![#15ff00](https://placehold.co/10x10/15ff00/15ff00.png) <span style="color: #b1ffaa">0.305ms</span>|- / -|
|7|![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">3.992ms</span> / ![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">3.171ms</span>|![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">3.241ms</span> / ![#69ff00](https://placehold.co/10x10/69ff00/69ff00.png) <span style="color: #cdffaa">2.760ms</span>|- / -|
|8|![#82ff00](https://placehold.co/10x10/82ff00/82ff00.png) <span style="color: #d5ffaa">3.797ms</span> / ![#ddff00](https://placehold.co/10x10/ddff00/ddff00.png) <span style="color: #f4ffaa">13.217ms</span>|![#93ff00](https://placehold.co/10x10/93ff00/93ff00.png) <span style="color: #dbffaa">5.381ms</span> / ![#d8ff00](https://placehold.co/10x10/d8ff00/d8ff00.png) <span style="color: #f2ffaa">14.104ms</span>|- / -|
|9|![#7fff00](https://placehold.co/10x10/7fff00/7fff00.png) <span style="color: #d4ffaa">3.609ms</span> / ![#7bff00](https://placehold.co/10x10/7bff00/7bff00.png) <span style="color: #d3ffaa">3.399ms</span>|![#79ff00](https://placehold.co/10x10/79ff00/79ff00.png) <span style="color: #d2ffaa">3.612ms</span> / ![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">3.472ms</span>|- / -|
|10|![#88ff00](https://placehold.co/10x10/88ff00/88ff00.png) <span style="color: #d7ffaa">4.099ms</span> / ![#d2ff00](https://placehold.co/10x10/d2ff00/d2ff00.png) <span style="color: #f0ffaa">11.493ms</span>|![#9eff00](https://placehold.co/10x10/9eff00/9eff00.png) <span style="color: #dfffaa">6.343ms</span> / ![#e1ff00](https://placehold.co/10x10/e1ff00/e1ff00.png) <span style="color: #f5ffaa">16.055ms</span>|- / -|
|11|![#81ff00](https://placehold.co/10x10/81ff00/81ff00.png) <span style="color: #d5ffaa">3.727ms</span> / ![#82ff00](https://placehold.co/10x10/82ff00/82ff00.png) <span style="color: #d5ffaa">3.741ms</span>|![#78ff00](https://placehold.co/10x10/78ff00/78ff00.png) <span style="color: #d2ffaa">3.541ms</span> / ![#78ff00](https://placehold.co/10x10/78ff00/78ff00.png) <span style="color: #d2ffaa">3.522ms</span>|- / -|
|12|![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">6.104ms</span> / ![#f7ff00](https://placehold.co/10x10/f7ff00/f7ff00.png) <span style="color: #fcffaa">18.527ms</span>|![#9cff00](https://placehold.co/10x10/9cff00/9cff00.png) <span style="color: #deffaa">6.124ms</span> / ![#ffff00](https://placehold.co/10x10/ffff00/ffff00.png) <span style="color: #ffffaa">23.704ms</span>|- / -|
|13|![#45ff00](https://placehold.co/10x10/45ff00/45ff00.png) <span style="color: #c1ffaa">1.289ms</span> / ![#4cff00](https://placehold.co/10x10/4cff00/4cff00.png) <span style="color: #c3ffaa">1.504ms</span>|![#3cff00](https://placehold.co/10x10/3cff00/3cff00.png) <span style="color: #beffaa">1.128ms</span> / ![#50ff00](https://placehold.co/10x10/50ff00/50ff00.png) <span style="color: #c5ffaa">1.729ms</span>|- / -|
|14|![#59ff00](https://placehold.co/10x10/59ff00/59ff00.png) <span style="color: #c8ffaa">1.899ms</span> / ![#ffe600](https://placehold.co/10x10/ffe600/ffe600.png) <span style="color: #fff7aa">27.771ms</span>|![#58ff00](https://placehold.co/10x10/58ff00/58ff00.png) <span style="color: #c7ffaa">2.020ms</span> / ![#ffbe00](https://placehold.co/10x10/ffbe00/ffbe00.png) <span style="color: #ffe9aa">55.389ms</span>|- / -|
|15|![#51ff00](https://placehold.co/10x10/51ff00/51ff00.png) <span style="color: #c5ffaa">1.649ms</span> / ![#72ff00](https://placehold.co/10x10/72ff00/72ff00.png) <span style="color: #d0ffaa">2.923ms</span>|![#49ff00](https://placehold.co/10x10/49ff00/49ff00.png) <span style="color: #c2ffaa">1.504ms</span> / ![#64ff00](https://placehold.co/10x10/64ff00/64ff00.png) <span style="color: #cbffaa">2.503ms</span>|- / -|
|16|![#85ff00](https://placehold.co/10x10/85ff00/85ff00.png) <span style="color: #d6ffaa">3.952ms</span> / ![#ffca00](https://placehold.co/10x10/ffca00/ffca00.png) <span style="color: #ffedaa">39.568ms</span>|![#8fff00](https://placehold.co/10x10/8fff00/8fff00.png) <span style="color: #daffaa">5.069ms</span> / ![#ffc200](https://placehold.co/10x10/ffc200/ffc200.png) <span style="color: #ffebaa">52.492ms</span>|- / -|
|17|![#ffc000](https://placehold.co/10x10/ffc000/ffc000.png) <span style="color: #ffeaaa">44.844ms</span> / ![#ff7800](https://placehold.co/10x10/ff7800/ff7800.png) <span style="color: #ffd2aa">107.627ms</span>|![#ffc500](https://placehold.co/10x10/ffc500/ffc500.png) <span style="color: #ffecaa">50.675ms</span> / ![#ff7c00](https://placehold.co/10x10/ff7c00/ff7c00.png) <span style="color: #ffd3aa">128.198ms</span>|- / -|
|18|![#64ff00](https://placehold.co/10x10/64ff00/64ff00.png) <span style="color: #cbffaa">2.310ms</span> / ![#64ff00](https://placehold.co/10x10/64ff00/64ff00.png) <span style="color: #cbffaa">2.334ms</span>|![#4fff00](https://placehold.co/10x10/4fff00/4fff00.png) <span style="color: #c4ffaa">1.720ms</span> / ![#52ff00](https://placehold.co/10x10/52ff00/52ff00.png) <span style="color: #c5ffaa">1.811ms</span>|- / -|
|19|![#52ff00](https://placehold.co/10x10/52ff00/52ff00.png) <span style="color: #c5ffaa">1.669ms</span> / ![#5fff00](https://placehold.co/10x10/5fff00/5fff00.png) <span style="color: #caffaa">2.124ms</span>|![#53ff00](https://placehold.co/10x10/53ff00/53ff00.png) <span style="color: #c6ffaa">1.859ms</span> / ![#64ff00](https://placehold.co/10x10/64ff00/64ff00.png) <span style="color: #cbffaa">2.545ms</span>|- / -|
|20|![#cbff00](https://placehold.co/10x10/cbff00/cbff00.png) <span style="color: #eeffaa">10.479ms</span> / ![#ffec00](https://placehold.co/10x10/ffec00/ffec00.png) <span style="color: #fff9aa">25.761ms</span>|![#b6ff00](https://placehold.co/10x10/b6ff00/b6ff00.png) <span style="color: #e7ffaa">8.955ms</span> / ![#f7ff00](https://placehold.co/10x10/f7ff00/f7ff00.png) <span style="color: #fcffaa">21.380ms</span>|- / -|
|21|![#d4ff00](https://placehold.co/10x10/d4ff00/d4ff00.png) <span style="color: #f1ffaa">11.833ms</span> / ![#ffe300](https://placehold.co/10x10/ffe300/ffe300.png) <span style="color: #fff6aa">28.841ms</span>|![#cdff00](https://placehold.co/10x10/cdff00/cdff00.png) <span style="color: #eeffaa">12.197ms</span> / ![#ffca00](https://placehold.co/10x10/ffca00/ffca00.png) <span style="color: #ffedaa">47.274ms</span>|- / -|
|22|![#7dff00](https://placehold.co/10x10/7dff00/7dff00.png) <span style="color: #d4ffaa">3.478ms</span> / ![#abff00](https://placehold.co/10x10/abff00/abff00.png) <span style="color: #e3ffaa">6.821ms</span>|![#82ff00](https://placehold.co/10x10/82ff00/82ff00.png) <span style="color: #d5ffaa">4.171ms</span> / ![#afff00](https://placehold.co/10x10/afff00/afff00.png) <span style="color: #e4ffaa">8.120ms</span>|- / -|
|23|![#8fff00](https://placehold.co/10x10/8fff00/8fff00.png) <span style="color: #daffaa">4.601ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">457.919ms</span>|![#91ff00](https://placehold.co/10x10/91ff00/91ff00.png) <span style="color: #daffaa">5.242ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">616.076ms</span>|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|902.695ms|1151.086ms|0.731ms|
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
