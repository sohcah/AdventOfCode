# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript (Bun)|TypeScript (Node.js)|Rust|
|-|-|-|-|
|1|![#75ff00](https://placehold.co/10x10/75ff00/75ff00.png) <span style="color: #d1ffaa">2.267ms</span> / ![#6eff00](https://placehold.co/10x10/6eff00/6eff00.png) <span style="color: #cfffaa">2.049ms</span>|![#58ff00](https://placehold.co/10x10/58ff00/58ff00.png) <span style="color: #c7ffaa">1.595ms</span> / ![#4dff00](https://placehold.co/10x10/4dff00/4dff00.png) <span style="color: #c4ffaa">1.297ms</span>|![#ff4300](https://placehold.co/10x10/ff4300/ff4300.png) <span style="color: #ffc0aa">0.171ms</span> / ![#ff4700](https://placehold.co/10x10/ff4700/ff4700.png) <span style="color: #ffc2aa">0.169ms</span>|
|2|![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">4.095ms</span> / ![#acff00](https://placehold.co/10x10/acff00/acff00.png) <span style="color: #e3ffaa">4.713ms</span>|![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">3.286ms</span> / ![#8bff00](https://placehold.co/10x10/8bff00/8bff00.png) <span style="color: #d8ffaa">3.524ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.199ms</span> / ![#ff3800](https://placehold.co/10x10/ff3800/ff3800.png) <span style="color: #ffbdaa">0.175ms</span>|
|3|![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">1.931ms</span> / ![#aaff00](https://placehold.co/10x10/aaff00/aaff00.png) <span style="color: #e3ffaa">4.640ms</span>|![#4bff00](https://placehold.co/10x10/4bff00/4bff00.png) <span style="color: #c3ffaa">1.255ms</span> / ![#83ff00](https://placehold.co/10x10/83ff00/83ff00.png) <span style="color: #d6ffaa">3.126ms</span>|- / -|
|4|![#a2ff00](https://placehold.co/10x10/a2ff00/a2ff00.png) <span style="color: #e0ffaa">4.178ms</span> / ![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">4.239ms</span>|![#9eff00](https://placehold.co/10x10/9eff00/9eff00.png) <span style="color: #dfffaa">4.549ms</span> / ![#a3ff00](https://placehold.co/10x10/a3ff00/a3ff00.png) <span style="color: #e0ffaa">4.871ms</span>|- / -|
|5|![#56ff00](https://placehold.co/10x10/56ff00/56ff00.png) <span style="color: #c7ffaa">1.387ms</span> / ![#95ff00](https://placehold.co/10x10/95ff00/95ff00.png) <span style="color: #dcffaa">3.518ms</span>|![#5bff00](https://placehold.co/10x10/5bff00/5bff00.png) <span style="color: #c8ffaa">1.683ms</span> / ![#87ff00](https://placehold.co/10x10/87ff00/87ff00.png) <span style="color: #d7ffaa">3.326ms</span>|- / -|
|6|![#23ff00](https://placehold.co/10x10/23ff00/23ff00.png) <span style="color: #b6ffaa">0.421ms</span> / ![#1dff00](https://placehold.co/10x10/1dff00/1dff00.png) <span style="color: #b4ffaa">0.338ms</span>|![#1dff00](https://placehold.co/10x10/1dff00/1dff00.png) <span style="color: #b4ffaa">0.374ms</span> / ![#17ff00](https://placehold.co/10x10/17ff00/17ff00.png) <span style="color: #b2ffaa">0.283ms</span>|- / -|
|7|![#9fff00](https://placehold.co/10x10/9fff00/9fff00.png) <span style="color: #dfffaa">4.039ms</span> / ![#91ff00](https://placehold.co/10x10/91ff00/91ff00.png) <span style="color: #daffaa">3.333ms</span>|![#86ff00](https://placehold.co/10x10/86ff00/86ff00.png) <span style="color: #d7ffaa">3.276ms</span> / ![#7aff00](https://placehold.co/10x10/7aff00/7aff00.png) <span style="color: #d3ffaa">2.752ms</span>|- / -|
|8|![#9eff00](https://placehold.co/10x10/9eff00/9eff00.png) <span style="color: #dfffaa">3.973ms</span> / ![#fff600](https://placehold.co/10x10/fff600/fff600.png) <span style="color: #fffcaa">13.533ms</span>|![#b0ff00](https://placehold.co/10x10/b0ff00/b0ff00.png) <span style="color: #e5ffaa">5.714ms</span> / ![#feff00](https://placehold.co/10x10/feff00/feff00.png) <span style="color: #ffffaa">14.745ms</span>|- / -|
|9|![#97ff00](https://placehold.co/10x10/97ff00/97ff00.png) <span style="color: #dcffaa">3.622ms</span> / ![#95ff00](https://placehold.co/10x10/95ff00/95ff00.png) <span style="color: #dcffaa">3.547ms</span>|![#8fff00](https://placehold.co/10x10/8fff00/8fff00.png) <span style="color: #daffaa">3.698ms</span> / ![#8aff00](https://placehold.co/10x10/8aff00/8aff00.png) <span style="color: #d8ffaa">3.465ms</span>|- / -|
|10|![#aaff00](https://placehold.co/10x10/aaff00/aaff00.png) <span style="color: #e3ffaa">4.608ms</span> / ![#faff00](https://placehold.co/10x10/faff00/faff00.png) <span style="color: #fdffaa">11.661ms</span>|![#b8ff00](https://placehold.co/10x10/b8ff00/b8ff00.png) <span style="color: #e7ffaa">6.322ms</span> / ![#fff700](https://placehold.co/10x10/fff700/fff700.png) <span style="color: #fffcaa">16.321ms</span>|- / -|
|11|![#9bff00](https://placehold.co/10x10/9bff00/9bff00.png) <span style="color: #deffaa">3.821ms</span> / ![#9dff00](https://placehold.co/10x10/9dff00/9dff00.png) <span style="color: #deffaa">3.918ms</span>|![#8dff00](https://placehold.co/10x10/8dff00/8dff00.png) <span style="color: #d9ffaa">3.606ms</span> / ![#8bff00](https://placehold.co/10x10/8bff00/8bff00.png) <span style="color: #d8ffaa">3.501ms</span>|- / -|
|12|![#cfff00](https://placehold.co/10x10/cfff00/cfff00.png) <span style="color: #efffaa">7.207ms</span> / ![#ffd300](https://placehold.co/10x10/ffd300/ffd300.png) <span style="color: #fff0aa">19.741ms</span>|![#beff00](https://placehold.co/10x10/beff00/beff00.png) <span style="color: #e9ffaa">6.845ms</span> / ![#ffd500](https://placehold.co/10x10/ffd500/ffd500.png) <span style="color: #fff1aa">23.926ms</span>|- / -|
|13|![#54ff00](https://placehold.co/10x10/54ff00/54ff00.png) <span style="color: #c6ffaa">1.333ms</span> / ![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">1.933ms</span>|![#50ff00](https://placehold.co/10x10/50ff00/50ff00.png) <span style="color: #c5ffaa">1.388ms</span> / ![#62ff00](https://placehold.co/10x10/62ff00/62ff00.png) <span style="color: #cbffaa">1.898ms</span>|- / -|
|14|![#6aff00](https://placehold.co/10x10/6aff00/6aff00.png) <span style="color: #cdffaa">1.934ms</span> / ![#ffb200](https://placehold.co/10x10/ffb200/ffb200.png) <span style="color: #ffe5aa">27.963ms</span>|![#6bff00](https://placehold.co/10x10/6bff00/6bff00.png) <span style="color: #ceffaa">2.197ms</span> / ![#ff8a00](https://placehold.co/10x10/ff8a00/ff8a00.png) <span style="color: #ffd8aa">55.638ms</span>|- / -|
|15|![#60ff00](https://placehold.co/10x10/60ff00/60ff00.png) <span style="color: #caffaa">1.661ms</span> / ![#87ff00](https://placehold.co/10x10/87ff00/87ff00.png) <span style="color: #d7ffaa">2.940ms</span>|![#58ff00](https://placehold.co/10x10/58ff00/58ff00.png) <span style="color: #c7ffaa">1.606ms</span> / ![#74ff00](https://placehold.co/10x10/74ff00/74ff00.png) <span style="color: #d1ffaa">2.512ms</span>|- / -|
|16|![#9fff00](https://placehold.co/10x10/9fff00/9fff00.png) <span style="color: #dfffaa">4.006ms</span> / ![#ff9000](https://placehold.co/10x10/ff9000/ff9000.png) <span style="color: #ffdaaa">39.919ms</span>|![#abff00](https://placehold.co/10x10/abff00/abff00.png) <span style="color: #e3ffaa">5.369ms</span> / ![#ff8f00](https://placehold.co/10x10/ff8f00/ff8f00.png) <span style="color: #ffdaaa">52.732ms</span>|- / -|
|17|![#ff6300](https://placehold.co/10x10/ff6300/ff6300.png) <span style="color: #ffcbaa">63.748ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">175.712ms</span>|![#ff6400](https://placehold.co/10x10/ff6400/ff6400.png) <span style="color: #ffcbaa">84.237ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">250.987ms</span>|- / -|
|18|![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">2.354ms</span> / ![#79ff00](https://placehold.co/10x10/79ff00/79ff00.png) <span style="color: #d2ffaa">2.422ms</span>|![#5fff00](https://placehold.co/10x10/5fff00/5fff00.png) <span style="color: #caffaa">1.788ms</span> / ![#5fff00](https://placehold.co/10x10/5fff00/5fff00.png) <span style="color: #caffaa">1.802ms</span>|- / -|
|19|![#61ff00](https://placehold.co/10x10/61ff00/61ff00.png) <span style="color: #caffaa">1.664ms</span> / ![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">2.223ms</span>|![#63ff00](https://placehold.co/10x10/63ff00/63ff00.png) <span style="color: #cbffaa">1.918ms</span> / ![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">2.623ms</span>|- / -|
|20|- / -|- / -|- / -|
|21|- / -|- / -|- / -|
|22|- / -|- / -|- / -|
|23|- / -|- / -|- / -|
|24|- / -|- / -|- / -|
|25|- / -|- / -|- / -|
|Total|446.591ms|590.036ms|0.713ms|
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
