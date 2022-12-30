import { loadLines, output } from "aocutils";

class File {
	constructor(public name: string, public size: number) {}
}

const allDirs = [];
class Directory {
	files: File[] = [];
	directories = new Map<string, Directory>();
	parent: Directory;

	constructor(parent: Directory) {
		this.parent = parent;
	}

	get size() {
		return (
			this.files.reduce((acc, file) => acc + file.size, 0) +
			Array.from(this.directories.values()).reduce((acc, dir) => acc + dir.size, 0)
		);
	}

	subdir(dir: string) {
		if (!this.directories.has(dir)) {
			const direct = new Directory(this);
			allDirs.push(direct);
			this.directories.set(dir, direct);
		}
		return this.directories.get(dir);
	}

	addFile(file: File) {
		this.files.push(file);
	}
}

const rootDir = new Directory(null!);
let currentDir = rootDir;
for (const line of loadLines()) {
	if (line.startsWith("$")) {
		if (line.startsWith("$ cd")) {
			const dir = line.split(" ")[2];
			if (dir === "..") {
				currentDir = currentDir.parent;
			} else if (dir === "/") {
				currentDir = rootDir;
			} else {
				currentDir = currentDir.subdir(dir);
			}
		}
	} else {
		const [size, name] = line.split(" ");
		if (size === "dir") {
			currentDir.subdir(name);
		} else {
			currentDir.addFile(new File(name, Number(size)));
		}
	}
}

const neededSpace = 30_000_000;
const totalSpace = 70_000_000;
const freeSpace = totalSpace - rootDir.size;
const spaceToFreeUp = neededSpace - freeSpace;

const answer = Math.min(...allDirs.filter((i) => i.size >= spaceToFreeUp).map((i) => i.size));

output(answer).forTest(24933642);
