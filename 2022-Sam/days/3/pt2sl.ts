import {loadLines, output} from "aocutils";
import {intersection} from "mnemonist/set";

output(loadLines().reduce((a,b) => a.at(-1).length === 3 ? [...a, [b]] : [...a.slice(0,-1), [...a.at(-1), b]], [[]] as string[][]).reduce((sum,group) => ((cc: number) => sum + cc - (cc >= 97 ? 96 : 38))(Array.from(intersection(new Set(group[0].split("")), new Set(group[1].split("")), new Set(group[2].split(""))))[0].charCodeAt(0)), 0)).forTest(70);
