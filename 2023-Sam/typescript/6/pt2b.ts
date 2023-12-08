import { load, p, output } from "aocutils";

const num = p(/(\d[^\S\n]*)+/).map((i) => Number(i.replace(/\s+/g, "")));
const { time, distance } = load(
	p`Time:${/\s+/}${num("time")}
Distance:${/\s+/}${num("distance")}`
);

let startTime;
{
	let left = 0;
	let right = time;
	while (left !== right) {
		const mid = Math.floor((left + right) / 2);
		const newDistance = (time - mid) * mid;
		const newDistanceM1 = (time - mid + 1) * (mid - 1);
		if (newDistance > distance && newDistanceM1 <= distance) {
			left = mid;
			right = mid;
		} else if (newDistance > distance) {
			right = mid;
		} else if (newDistance <= distance) {
			left = mid;
		}
	}
	startTime = left;
}

let endTime;
{
	let left = 0;
	let right = time;
	while (left !== right) {
		const mid = Math.floor((left + right) / 2);
		const newDistance = (time - mid) * mid;
		const newDistanceM1 = (time - mid + 1) * (mid - 1);
		if (newDistance <= distance && newDistanceM1 > distance) {
			left = mid;
			right = mid;
		} else if (newDistance <= distance) {
			right = mid;
		} else if (newDistance > distance) {
			left = mid;
		}
	}
	endTime = left;
}

output(endTime - startTime)
	.forTest(71503)
	.forActual(40651271);
