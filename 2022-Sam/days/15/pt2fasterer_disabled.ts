//usenode
import { loadLines, output } from "aocutils";
import { GPU, IKernelRunShortcutBase } from "gpu.js";

const gpu = new GPU({ mode: "gpu" });

const lines = loadLines()
	.map((i) => i.match(/-?\d+/g)!.map(Number))
	.map((i) => {
		const mhd = Math.abs(i[0] - i[2]) + Math.abs(i[1] - i[3]);
		return {
			x: i[0],
			y: i[1],
			top: i[1] - mhd,
			bottom: i[1] + mhd,
			mhd,
		};
	});

let max = 4000000;
if (process.env.AOCTEST) {
	max = 20;
}

const kernel: IKernelRunShortcutBase = gpu
	.createKernel(function () {
		let y = this.thread.x * 50;
		while (y < (this.thread.x + 1) * 50) {
			let x = 0;
			while (x <= this.constants.max) {
				let found = false;
				for (let l = 0; l < this.constants.lineCount; l += 1) {
					if (
						Math.abs(this.constants.lines[l][0] - x) + Math.abs(this.constants.lines[l][1] - y) <=
						this.constants.lines[l][2]
					) {
						const diff = Math.abs(y - this.constants.lines[l][1]);
						x = this.constants.lines[l][0] + (this.constants.lines[l][2] - diff);
						found = true;
						break;
					}
				}
				if (!found) {
					return [x, y];
				}
				x = x + 1;
			}
			y++;
		}
		return [-1, this.thread.x];
	})
	.setConstants({
		lines: lines.map((i) => [i.x, i.y, i.mhd]), //: [x: number, y: number, mhd: number][],
		lineCount: lines.length, //number,
		max,
	})
	.setImmutable(true)
	.setDynamicOutput(false)
	.setOutput([Math.ceil(max / 50)])
	.setLoopMaxIterations(10000);

// let start = performance.now();
const answer = (kernel() as [[number, number]]).find((i) => i[0] !== -1)!;
// console.log(performance.now() - start);
// console.log(answer);
output(answer[0] * 4000000 + answer[1])
	.forTest(56000011)
	.forActual(13134039205729);
