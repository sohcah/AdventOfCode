# Sam's 2023 Advent of Code

## Languages

- TypeScript - Prefix: `ts:`
- Rust - Prefix: `rs:`

## Benchmarks

<!--BENCHMARKSTART-->*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*

|Day|TypeScript|Rust|
|-|-|-|
|1|<span style="color: #faffaa">6.125ms</span> / <span style="color: #f0ffaa">4.895ms</span>|<span style="color: #aaffb8">0.924ms</span> / <span style="color: #ffaaaa">2.583ms</span>|
|2|<span style="color: #fff8aa">8.088ms</span> / <span style="color: #ffefaa">9.931ms</span>|- / -|
|3|<span style="color: #e7ffaa">3.977ms</span> / <span style="color: #fff8aa">8.210ms</span>|- / -|
|4|<span style="color: #fff4aa">8.920ms</span> / <span style="color: #fff0aa">9.752ms</span>|- / -|
|5|<span style="color: #deffaa">3.294ms</span> / <span style="color: #fffeaa">7.090ms</span>|- / -|
|6|<span style="color: #aaffbb">0.683ms</span> / <span style="color: #aaffc1">0.586ms</span>|- / -|
|7|<span style="color: #fff6aa">8.422ms</span> / <span style="color: #ffffaa">6.931ms</span>|- / -|
|8|<span style="color: #faffaa">6.127ms</span> / <span style="color: #ffaaaa">47.923ms</span>|- / -|
|9|<span style="color: #fffdaa">7.225ms</span> / <span style="color: #fffbaa">7.543ms</span>|- / -|
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
|Total|155.722ms|3.507ms|<!--BENCHMARKEND-->

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
