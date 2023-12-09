# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|<span style="color: #d0ffaa">2.249ms</span> / <span style="color: #cdffaa">2.109ms</span>|<span style="color: #aaffcd">0.880ms</span> / <span style="color: #ffaaaa">1.865ms</span>|
|2|<span style="color: #eeffaa">4.322ms</span> / <span style="color: #f2ffaa">4.699ms</span>|- / -|
|3|<span style="color: #cbffaa">2.055ms</span> / <span style="color: #f3ffaa">4.817ms</span>|- / -|
|4|<span style="color: #efffaa">4.447ms</span> / <span style="color: #efffaa">4.419ms</span>|- / -|
|5|<span style="color: #bdffaa">1.495ms</span> / <span style="color: #e7ffaa">3.711ms</span>|- / -|
|6|<span style="color: #aaffce">0.460ms</span> / <span style="color: #aaffd5">0.399ms</span>|- / -|
|7|<span style="color: #efffaa">4.428ms</span> / <span style="color: #eaffaa">4.005ms</span>|- / -|
|8|<span style="color: #eeffaa">4.301ms</span> / <span style="color: #ffaaaa">39.064ms</span>|- / -|
|9|<span style="color: #eeffaa">4.357ms</span> / <span style="color: #eaffaa">3.953ms</span>|- / -|
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
|Total|95.290ms|2.745ms|<!--BENCHMARKEND-->

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
