export const languages: Record<string, {
  name: string;
  folder: string;
  prefix: string;
  fileExt: string;
  watch?: string[];
  runCommand: (directory: string, file: string, compile: boolean) => {
    cwd: string;
    buildCommand?: string;
    command: string;
    cleanupCommand?: string;
  },
}> = {
  typescript: {
    name: "TypeScript (Bun)",
    folder: "typescript/days",
    prefix: "ts",
    fileExt: ".ts",
    runCommand(directory, path) {
      // if (compile) {
      //   return {
      //     cwd: directory,
      //     buildCommand: `bun build ${path} --target bun --outfile ${path}.compiled.cjs`,
      //     command: `bun ${path}.compiled.cjs`,
      //     cleanupCommand: `rm ${path}.compiled.cjs`
      //   }
      // }
      return {
        cwd: directory,
        command: `bun run ${path}`
      }
    }
  },
  typescriptnode: {
    name: "TypeScript (Node.js)",
    folder: "typescript/days",
    prefix: "ts",
    fileExt: ".ts",
    runCommand(directory, path) {
      // if (compile) {
      //   return {
      //     cwd: directory,
      //     buildCommand: `bun build ${path} --outfile ${path}.compiled.mjs`,
      //     command: `node ${path}.compiled.mjs`,
      //     cleanupCommand: `rm ${path}.compiled.mjs`
      //   }
      // }
      return {
        cwd: directory,
        command: `bun run tsx ${path}`
      }
    }
  },
  rust: {
    name: "Rust",
    folder: "rust/days",
    prefix: "rs",
    fileExt: ".rs",
    watch: ["rust/utils/src"],
    runCommand(directory, path) {
      return {
        cwd: directory,
        command: `cargo run${process.env.RELEASE_MODE ? " -r" : ""} --quiet --bin ${path.replace(".rs", "")}`
      }
    }
  },
}

export type Language = typeof languages[string];

export const currentLanguage = languages[process.env.AOCLANG ?? "typescript"];
if (!currentLanguage) throw new Error(`Invalid Language: ${process.env.AOCLANG}`);
