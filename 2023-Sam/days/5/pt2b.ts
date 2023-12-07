// This is a version which doesn't use the `parse` but instead manually input processing, in order to speed it up.
import { output } from "aocutils";

const rawInput = load()
	.split("\n\n")
	.map((i) => i.split("\n"));

const mappedInput = rawInput.slice(1).map((i) =>
	i
		.slice(1)
		.map((j) => j.split(" ").map(Number))
		.map((i) => {
			return {
				destination: [i[0], i[0] + i[2]],
				source: [i[1], i[1] + i[2]],
			};
		})
);

const input = {
	seedPairs: rawInput[0][0].split(" ").slice(1).map(Number).batch(2),
	seedToSoil: mappedInput[0],
	soilToFertilizer: mappedInput[1],
	fertilizerToWater: mappedInput[2],
	waterToLight: mappedInput[3],
	lightToTemperature: mappedInput[4],
	temperatureToHumidity: mappedInput[5],
	humidityToLocation: mappedInput[6],
};

function lookup(key: Exclude<keyof typeof input, "seedPairs">, source: number) {
	const data = input[key];
	const result = data.find((i) => i.source[0] <= source && i.source[1] >= source);
	if (!result) return source;
	return source - result.source[0] + result.destination[0];
}

function lookupRev(key: Exclude<keyof typeof input, "seedPairs">, destination: number) {
	const data = input[key];
	const result = data.find(
		(i) => i.destination[0] <= destination && i.destination[1] >= destination
	);
	if (!result) return destination;
	return destination - result.destination[0] + result.source[0];
}

const intersectionPoints = (
	[
		"seedToSoil",
		"soilToFertilizer",
		"fertilizerToWater",
		"waterToLight",
		"lightToTemperature",
		"temperatureToHumidity",
		"humidityToLocation",
	] as Exclude<keyof typeof input, "seedPairs">[]
)
	.reverse()
	.reduce((a, b) => {
		const data = input[b];
		return [
			...a.map((dest) => {
				return lookupRev(b, dest);
			}),
			...data.flatMap((x) => [x.source[0], x.source[1] + 1]),
		];
	}, [] as number[])
	.sort((a, b) => a - b);

const seeds = [
	...new Set(
		input.seedPairs.flatMap(([start, length]) => {
			const arr: number[] = [];
			for (let i = start; i < start + length; i = intersectionPoints.find((p) => p > i)!) {
				arr.push(i);
			}
			return arr;
		})
	),
];

const results = seeds.map((seed) => {
	return (
		[
			"seedToSoil",
			"soilToFertilizer",
			"fertilizerToWater",
			"waterToLight",
			"lightToTemperature",
			"temperatureToHumidity",
			"humidityToLocation",
		] as Exclude<keyof typeof input, "seedPairs">[]
	).reduce((a, b) => lookup(b, a), seed);
});

output(results.min()).forTest(46).forActual(63179500);
