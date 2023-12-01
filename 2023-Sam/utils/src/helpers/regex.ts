export function matchAllOverlapping(regex: RegExp, text: string): string[][] {
  const mutatedRegex = new RegExp(`(?=(${regex.source}))`, regex.flags.includes("g") ? regex.flags : regex.flags + "g");
  const matches = text.matchAll(mutatedRegex);

  return [...matches].map(i => i.slice(1));
}

export function matchLast(regex: RegExp, text: string): string[] | null {
  const all = matchAllOverlapping(regex, text);
  return all.at(-1) ?? null;
}
