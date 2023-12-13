# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->
*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|![#a0ff00](https://placehold.co/10x10/a0ff00/a0ff00.png) <span style="color: #dfffaa">2.430ms</span> / ![#99ff00](https://placehold.co/10x10/99ff00/99ff00.png) <span style="color: #ddffaa">2.255ms</span>|![#ff6c00](https://placehold.co/10x10/ff6c00/ff6c00.png) <span style="color: #ffceaa">0.136ms</span> / ![#ff4700](https://placehold.co/10x10/ff4700/ff4700.png) <span style="color: #ffc2aa">0.149ms</span>|
|2|![#daff00](https://placehold.co/10x10/daff00/daff00.png) <span style="color: #f3ffaa">4.375ms</span> / ![#ecff00](https://placehold.co/10x10/ecff00/ecff00.png) <span style="color: #f9ffaa">5.184ms</span>|![#ff0900](https://placehold.co/10x10/ff0900/ff0900.png) <span style="color: #ffadaa">0.172ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">0.175ms</span>|
|3|![#98ff00](https://placehold.co/10x10/98ff00/98ff00.png) <span style="color: #ddffaa">2.221ms</span> / ![#ebff00](https://placehold.co/10x10/ebff00/ebff00.png) <span style="color: #f8ffaa">5.120ms</span>|- / -|
|4|![#e0ff00](https://placehold.co/10x10/e0ff00/e0ff00.png) <span style="color: #f5ffaa">4.627ms</span> / ![#e0ff00](https://placehold.co/10x10/e0ff00/e0ff00.png) <span style="color: #f5ffaa">4.639ms</span>|- / -|
|5|![#78ff00](https://placehold.co/10x10/78ff00/78ff00.png) <span style="color: #d2ffaa">1.529ms</span> / ![#cfff00](https://placehold.co/10x10/cfff00/cfff00.png) <span style="color: #efffaa">3.961ms</span>|- / -|
|6|![#36ff00](https://placehold.co/10x10/36ff00/36ff00.png) <span style="color: #bcffaa">0.514ms</span> / ![#2eff00](https://placehold.co/10x10/2eff00/2eff00.png) <span style="color: #b9ffaa">0.428ms</span>|- / -|
|7|![#dfff00](https://placehold.co/10x10/dfff00/dfff00.png) <span style="color: #f4ffaa">4.579ms</span> / ![#c8ff00](https://placehold.co/10x10/c8ff00/c8ff00.png) <span style="color: #edffaa">3.669ms</span>|- / -|
|8|![#dcff00](https://placehold.co/10x10/dcff00/dcff00.png) <span style="color: #f3ffaa">4.449ms</span> / ![#ff7600](https://placehold.co/10x10/ff7600/ff7600.png) <span style="color: #ffd1aa">19.634ms</span>|- / -|
|9|![#cfff00](https://placehold.co/10x10/cfff00/cfff00.png) <span style="color: #efffaa">3.944ms</span> / ![#ceff00](https://placehold.co/10x10/ceff00/ceff00.png) <span style="color: #efffaa">3.907ms</span>|- / -|
|10|![#ffee00](https://placehold.co/10x10/ffee00/ffee00.png) <span style="color: #fff9aa">7.198ms</span> / ![#ff5a00](https://placehold.co/10x10/ff5a00/ff5a00.png) <span style="color: #ffc8aa">24.549ms</span>|- / -|
|11|![#d6ff00](https://placehold.co/10x10/d6ff00/d6ff00.png) <span style="color: #f1ffaa">4.230ms</span> / ![#d8ff00](https://placehold.co/10x10/d8ff00/d8ff00.png) <span style="color: #f2ffaa">4.284ms</span>|- / -|
|12|![#ffee00](https://placehold.co/10x10/ffee00/ffee00.png) <span style="color: #fff9aa">7.194ms</span> / ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) <span style="color: #ffaaaa">50.293ms</span>|- / -|
|13|![#79ff00](https://placehold.co/10x10/79ff00/79ff00.png) <span style="color: #d2ffaa">1.549ms</span> / ![#7dff00](https://placehold.co/10x10/7dff00/7dff00.png) <span style="color: #d4ffaa">1.628ms</span>|- / -|
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
|Total|178.390ms|0.632ms|
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
