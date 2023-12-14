# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#baff00](https://placehold.co/10x10/baff00/baff00.png) <span style="color: #e8ffaa">2.497ms</span> / ![#b2ff00](https://placehold.co/10x10/b2ff00/b2ff00.png) <span style="color: #e5ffaa">2.316ms</span>|![#ff5a00](https://placehold.co/10x10/ff5a00/ff5a00.png) <span style="color: #ffc8aa">0.134ms</span> / ![#ff4300](https://placehold.co/10x10/ff4300/ff4300.png) <span style="color: #ffc0aa">0.142ms</span>|
|2|![#ffff00](https://placehold.co/10x10/ffff00/ffff00.png) <span style="color: #ffffaa">4.561ms</span> / ![#ffee00](https://placehold.co/10x10/ffee00/ffee00.png) <span style="color: #fff9aa">5.219ms</span>|![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.165ms</span> / ![#ff0500](https://placehold.co/10x10/ff0500/ff0500.png) <span style="color: #ffacaa">0.164ms</span>|
|3|![#adff00](https://placehold.co/10x10/adff00/adff00.png) <span style="color: #e4ffaa">2.200ms</span> / ![#fff100](https://placehold.co/10x10/fff100/fff100.png) <span style="color: #fffaaa">5.128ms</span>|- / -|
|4|![#fffc00](https://placehold.co/10x10/fffc00/fffc00.png) <span style="color: #fffeaa">4.682ms</span> / ![#fff800](https://placehold.co/10x10/fff800/fff800.png) <span style="color: #fffdaa">4.826ms</span>|- / -|
|5|![#90ff00](https://placehold.co/10x10/90ff00/90ff00.png) <span style="color: #daffaa">1.644ms</span> / ![#edff00](https://placehold.co/10x10/edff00/edff00.png) <span style="color: #f9ffaa">3.930ms</span>|- / -|
|6|![#3bff00](https://placehold.co/10x10/3bff00/3bff00.png) <span style="color: #beffaa">0.487ms</span> / ![#36ff00](https://placehold.co/10x10/36ff00/36ff00.png) <span style="color: #bcffaa">0.437ms</span>|- / -|
|7|![#fffd00](https://placehold.co/10x10/fffd00/fffd00.png) <span style="color: #fffeaa">4.642ms</span> / ![#e8ff00](https://placehold.co/10x10/e8ff00/e8ff00.png) <span style="color: #f7ffaa">3.757ms</span>|- / -|
|8|![#f8ff00](https://placehold.co/10x10/f8ff00/f8ff00.png) <span style="color: #fdffaa">4.321ms</span> / ![#ff3e00](https://placehold.co/10x10/ff3e00/ff3e00.png) <span style="color: #ffbfaa">19.415ms</span>|- / -|
|9|![#f4ff00](https://placehold.co/10x10/f4ff00/f4ff00.png) <span style="color: #fbffaa">4.150ms</span> / ![#eeff00](https://placehold.co/10x10/eeff00/eeff00.png) <span style="color: #f9ffaa">3.954ms</span>|- / -|
|10|![#fff100](https://placehold.co/10x10/fff100/fff100.png) <span style="color: #fffaaa">5.104ms</span> / ![#ff7500](https://placehold.co/10x10/ff7500/ff7500.png) <span style="color: #ffd1aa">13.035ms</span>|- / -|
|11|![#f7ff00](https://placehold.co/10x10/f7ff00/f7ff00.png) <span style="color: #fcffaa">4.272ms</span> / ![#f6ff00](https://placehold.co/10x10/f6ff00/f6ff00.png) <span style="color: #fcffaa">4.232ms</span>|- / -|
|12|![#ffce00](https://placehold.co/10x10/ffce00/ffce00.png) <span style="color: #ffefaa">6.759ms</span> / ![#ff2e00](https://placehold.co/10x10/ff2e00/ff2e00.png) <span style="color: #ffb9aa">21.639ms</span>|- / -|
|13|![#89ff00](https://placehold.co/10x10/89ff00/89ff00.png) <span style="color: #d8ffaa">1.511ms</span> / ![#93ff00](https://placehold.co/10x10/93ff00/93ff00.png) <span style="color: #dbffaa">1.695ms</span>|- / -|
|14|![#b4ff00](https://placehold.co/10x10/b4ff00/b4ff00.png) <span style="color: #e6ffaa">2.360ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">29.933ms</span>|- / -|
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
|Total|168.708ms|0.605ms|
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
