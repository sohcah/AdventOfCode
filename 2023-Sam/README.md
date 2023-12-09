# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#82ff00](https://placehold.co/10x10/82ff00/82ff00.png) <span style="color: #d5ffaa">2.374ms</span> / ![#76ff00](https://placehold.co/10x10/76ff00/76ff00.png) <span style="color: #d1ffaa">2.202ms</span>|![#00ff5c](https://placehold.co/10x10/00ff5c/00ff5c.png) <span style="color: #aaffc9">0.892ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">1.884ms</span>|
|2|![#dfff00](https://placehold.co/10x10/dfff00/dfff00.png) <span style="color: #f4ffaa">4.411ms</span> / ![#eaff00](https://placehold.co/10x10/eaff00/eaff00.png) <span style="color: #f8ffaa">4.737ms</span>|- / -|
|3|![#73ff00](https://placehold.co/10x10/73ff00/73ff00.png) <span style="color: #d0ffaa">2.145ms</span> / ![#f2ff00](https://placehold.co/10x10/f2ff00/f2ff00.png) <span style="color: #fbffaa">5.017ms</span>|- / -|
|4|![#e1ff00](https://placehold.co/10x10/e1ff00/e1ff00.png) <span style="color: #f5ffaa">4.476ms</span> / ![#e3ff00](https://placehold.co/10x10/e3ff00/e3ff00.png) <span style="color: #f6ffaa">4.551ms</span>|- / -|
|5|![#3dff00](https://placehold.co/10x10/3dff00/3dff00.png) <span style="color: #beffaa">1.501ms</span> / ![#d8ff00](https://placehold.co/10x10/d8ff00/d8ff00.png) <span style="color: #f2ffaa">4.204ms</span>|- / -|
|6|![#00ff7b](https://placehold.co/10x10/00ff7b/00ff7b.png) <span style="color: #aaffd3">0.442ms</span> / ![#00ff8a](https://placehold.co/10x10/00ff8a/00ff8a.png) <span style="color: #aaffd8">0.398ms</span>|- / -|
|7|![#ffea00](https://placehold.co/10x10/ffea00/ffea00.png) <span style="color: #fff8aa">6.269ms</span> / ![#bdff00](https://placehold.co/10x10/bdff00/bdff00.png) <span style="color: #e9ffaa">3.523ms</span>|- / -|
|8|![#d7ff00](https://placehold.co/10x10/d7ff00/d7ff00.png) <span style="color: #f2ffaa">4.193ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">29.881ms</span>|- / -|
|9|![#c4ff00](https://placehold.co/10x10/c4ff00/c4ff00.png) <span style="color: #ebffaa">3.681ms</span> / ![#beff00](https://placehold.co/10x10/beff00/beff00.png) <span style="color: #e9ffaa">3.539ms</span>|- / -|
|10|- / -|- / -|
|11|- / -|- / -|
|12|- / -|- / -|
|13|- / -|- / -|
|14|- / -|- / -|
|15|- / -|- / -|
|16|- / -|- / -|
|17|- / -|- / -|
|18|- / -|- / -|
|19|- / -|- / -|
|20|- / -|- / -|
|21|- / -|- / -|
|22|- / -|- / -|
|23|- / -|- / -|
|24|- / -|- / -|
|25|- / -|- / -|
|Total|87.544ms|2.776ms|<!--BENCHMARKEND-->

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
