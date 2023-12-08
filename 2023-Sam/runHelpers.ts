import {resolve, join} from "node:path";
import * as child_process from "child_process";
import {mkdtempSync, readFileSync, existsSync, rmSync} from "node:fs";
import {tmpdir} from "os";
import { fileURLToPath } from "node:url";

import stringify from "fast-safe-stringify";

const language = process.env.AOCLANG ?? "typescript";
const languageExt = {
    typescript: "ts",
}[language];

export function cached<T extends (...a: P) => R, P extends any[], R extends any>(func: T) {
    const cache = new Map<string, R>();
    return (...args: P) => {
        const key = stringify.default.stableStringify(args);
        if (cache.has(key)) return cache.get(key)!;
        const output = func(...args);
        cache.set(key, output);
        return output;
    };
}

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const isTest = !!process.env.AOCTEST;

export interface DayInput {
    inputFile: string;
    stabiliseValue?: number;
}

export type DayResult = {
    type: "stabilise";
    start: number;
    increment: number;
    stableCount: number;
} | {
    type: "result";
    result: number | string;
    expected?: number | string | undefined;
    time: number;
}

async function callDay(day: string, part: string, input: DayInput, log = true, abortSignal?: AbortSignal): Promise<DayResult> {
    const tmpDir = mkdtempSync(join(tmpdir(), "aoc-"));
    const dir = resolve(__dirname, `./${language}/${day}`);
    const path = resolve(__dirname, `./${language}/${day}/pt${part}.${languageExt}`);
    const outFile = join(tmpDir, `${Math.floor(Math.random() * 1000000)}.json`);
    const useNode = readFileSync(path, "utf8").includes("//usenode");
    const proc = child_process.spawn(
        {
            typescript: useNode ? `bun run tsx ${path}` : `bun run ${path}`
        }[language] ?? (() => {throw new Error("Invalid language")})(),
        {
            cwd: dir,
            shell: true,
            env: {
                ...process.env,
                AOC_INPUT: JSON.stringify(input),
                AOC_OUTPUT: outFile,
                NO_LOG: log ? undefined : "1",
            },
            stdio: log ? "inherit" : undefined,
        },
    );
    for(let i = 0;i < 10000;i++) {
        if (abortSignal?.aborted) {
          proc.kill(0);
          abortSignal.throwIfAborted();
        }
        if(existsSync(outFile)) {
            proc.kill(0);
            break;
        }
        await new Promise(r => setTimeout(r, 10));
    }

    let output;
    try {
        output = readFileSync(outFile, "utf8");
    } catch(e) {
        console.error(`Failed running day ${day} part ${part}`);
        throw e;
    }
    rmSync(tmpDir, {recursive: true});

    return JSON.parse(output);
}


export async function runDay(day: string, part: string, log = true, abortSignal?: AbortSignal): Promise<DayResult & { type: "result"; outerTime: number; stabilisedAt?: number }> {
    const baseInputFile = resolve(__dirname, "inputs", day + (isTest ? "test" : ""));
    let inputFile = baseInputFile;
    for (let i = 1; i <= part.length; i++) {
        if (existsSync(baseInputFile + part.slice(0, i))) {
            inputFile = baseInputFile + part.slice(0, i);
        }
    }
    const start = performance.now();
    const result = await callDay(day, part, {
        inputFile,
    }, log, abortSignal);

    if (result.type === "stabilise") {
        const cachedCallDay = cached(callDay);
        for (let i = 0; i < 50; i++) {
            const resultPromises: Promise<DayResult>[] = [];
            for (let j = 0; j < result.stableCount; j++) {
                const call = cachedCallDay(day, part, {
                    inputFile,
                    stabiliseValue: result.start + ((i + j) * result.increment),
                }, log) as Promise<DayResult>;
                resultPromises.push(call);
                await call;
            }
            const results = await Promise.all(resultPromises);
            if (results.some(r => r.type === "stabilise")) {
                throw new Error("Can't stabilise");
            }
            const validResults = results as (DayResult & { type: "result" })[];
            if (!validResults.some(r => r.result !== validResults[0]!.result)) {
                return {...validResults[0]!, outerTime: performance.now() - start, stabilisedAt: result.start + (i * result.increment)};
            }
        }
        throw new Error("Could not stabilise");
    } else {
        return {...result, outerTime: performance.now() - start};
    }
}
