import { loadLines, output } from "aocutils";

const numbers = loadLines();

const chars = {
	"0": 0,
	"1": 1,
	"2": 2,
	"-": -1,
	"=": -2,
};
const charsInv = {
	"0": "0",
	"1": "1",
	"2": "2",
	"-1": "-",
	"-2": "=",
};
function snafuToDecimal(snafu: string) {
	let decimal = 0;
	let power = 0;
	for (const char of snafu.split("").reverse()) {
		decimal += 5 ** power * chars[char];
		power++;
	}
	return decimal;
}

const sum = numbers.map((i) => snafuToDecimal(i)).sum;
function decToSnaf(dec: number) {
	let snafu = "";
	for (let power = 0; power <= 20; power++) {
		if (dec === 0) {
			break;
		}
		const digit = ((dec + 2) % 5) - 2;
		dec = Math.floor((dec - digit) / 5);
		snafu = charsInv[digit] + snafu;
	}
	return snafu;
}

output(decToSnaf(sum)).forTest("2=-1=0").forActual("2=0=02-0----2-=02-10");
