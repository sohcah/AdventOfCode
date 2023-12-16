# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#77ff00](https://placehold.co/10x10/77ff00/77ff00.png) <span style="color: #d2ffaa">2.287ms</span> / ![#71ff00](https://placehold.co/10x10/71ff00/71ff00.png) <span style="color: #d0ffaa">2.081ms</span>|![#ff2800](https://placehold.co/10x10/ff2800/ff2800.png) <span style="color: #ffb7aa">0.150ms</span> / ![#ff4200](https://placehold.co/10x10/ff4200/ff4200.png) <span style="color: #ffc0aa">0.141ms</span>|
|2|![#a5ff00](https://placehold.co/10x10/a5ff00/a5ff00.png) <span style="color: #e1ffaa">4.184ms</span> / ![#bbff00](https://placehold.co/10x10/bbff00/bbff00.png) <span style="color: #e8ffaa">5.451ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.163ms</span> / ![#ff1100](https://placehold.co/10x10/ff1100/ff1100.png) <span style="color: #ffb0aa">0.158ms</span>|
|3|![#6fff00](https://placehold.co/10x10/6fff00/6fff00.png) <span style="color: #cfffaa">2.019ms</span> / ![#b0ff00](https://placehold.co/10x10/b0ff00/b0ff00.png) <span style="color: #e5ffaa">4.803ms</span>|- / -|
|4|![#b6ff00](https://placehold.co/10x10/b6ff00/b6ff00.png) <span style="color: #e7ffaa">5.152ms</span> / ![#afff00](https://placehold.co/10x10/afff00/afff00.png) <span style="color: #e4ffaa">4.725ms</span>|- / -|
|5|![#5cff00](https://placehold.co/10x10/5cff00/5cff00.png) <span style="color: #c9ffaa">1.512ms</span> / ![#aaff00](https://placehold.co/10x10/aaff00/aaff00.png) <span style="color: #e3ffaa">4.449ms</span>|- / -|
|6|![#23ff00](https://placehold.co/10x10/23ff00/23ff00.png) <span style="color: #b6ffaa">0.413ms</span> / ![#21ff00](https://placehold.co/10x10/21ff00/21ff00.png) <span style="color: #b5ffaa">0.389ms</span>|- / -|
|7|![#a8ff00](https://placehold.co/10x10/a8ff00/a8ff00.png) <span style="color: #e2ffaa">4.351ms</span> / ![#d6ff00](https://placehold.co/10x10/d6ff00/d6ff00.png) <span style="color: #f1ffaa">7.451ms</span>|- / -|
|8|![#a2ff00](https://placehold.co/10x10/a2ff00/a2ff00.png) <span style="color: #e0ffaa">4.058ms</span> / ![#fff100](https://placehold.co/10x10/fff100/fff100.png) <span style="color: #fffaaa">13.588ms</span>|- / -|
|9|![#a1ff00](https://placehold.co/10x10/a1ff00/a1ff00.png) <span style="color: #e0ffaa">3.994ms</span> / ![#98ff00](https://placehold.co/10x10/98ff00/98ff00.png) <span style="color: #ddffaa">3.566ms</span>|- / -|
|10|![#a7ff00](https://placehold.co/10x10/a7ff00/a7ff00.png) <span style="color: #e2ffaa">4.294ms</span> / ![#fffb00](https://placehold.co/10x10/fffb00/fffb00.png) <span style="color: #fffeaa">12.192ms</span>|- / -|
|11|![#a4ff00](https://placehold.co/10x10/a4ff00/a4ff00.png) <span style="color: #e1ffaa">4.135ms</span> / ![#9fff00](https://placehold.co/10x10/9fff00/9fff00.png) <span style="color: #dfffaa">3.906ms</span>|- / -|
|12|![#c9ff00](https://placehold.co/10x10/c9ff00/c9ff00.png) <span style="color: #edffaa">6.426ms</span> / ![#ffd000](https://placehold.co/10x10/ffd000/ffd000.png) <span style="color: #ffefaa">19.323ms</span>|- / -|
|13|![#56ff00](https://placehold.co/10x10/56ff00/56ff00.png) <span style="color: #c7ffaa">1.366ms</span> / ![#5eff00](https://placehold.co/10x10/5eff00/5eff00.png) <span style="color: #c9ffaa">1.561ms</span>|- / -|
|14|![#6dff00](https://placehold.co/10x10/6dff00/6dff00.png) <span style="color: #ceffaa">1.975ms</span> / ![#ffac00](https://placehold.co/10x10/ffac00/ffac00.png) <span style="color: #ffe3aa">28.276ms</span>|- / -|
|15|![#61ff00](https://placehold.co/10x10/61ff00/61ff00.png) <span style="color: #caffaa">1.638ms</span> / ![#8aff00](https://placehold.co/10x10/8aff00/8aff00.png) <span style="color: #d8ffaa">2.979ms</span>|- / -|
|16|![#a1ff00](https://placehold.co/10x10/a1ff00/a1ff00.png) <span style="color: #e0ffaa">3.994ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">161.068ms</span>|- / -|
|17|- / -|- / -|
|18|- / -|- / -|
|19|- / -|- / -|
|20|- / -|- / -|
|21|- / -|- / -|
|22|- / -|- / -|
|23|- / -|- / -|
|24|- / -|- / -|
|25|- / -|- / -|
|Total|327.606ms|0.611ms|
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
