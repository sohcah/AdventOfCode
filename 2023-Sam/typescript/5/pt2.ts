import { p, output } from "aocutils";

const mapEntry = p.num.list(" ").map((i) => ({
	destination: [i[0], i[0] + i[2]],
	source: [i[1], i[1] + i[2]],
}));

const map = mapEntry.list("\n");
const input = load(
	p`seeds: ${p`${p.num} ${p.num}`.list(" ")("seedPairs")}

seed-to-soil map:
${map("seedToSoil")}

soil-to-fertilizer map:
${map("soilToFertilizer")}

fertilizer-to-water map:
${map("fertilizerToWater")}

water-to-light map:
${map("waterToLight")}

light-to-temperature map:
${map("lightToTemperature")}

temperature-to-humidity map:
${map("temperatureToHumidity")}

humidity-to-location map:
${map("humidityToLocation")}`
);

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
		// console.log(data);
		return [
			...a.map((dest) => {
				return lookupRev(b, dest);
			}),
			...data.flatMap((x) => [x.source[0], x.source[1] + 1]),
		];
	}, [] as number[])
	.sort((a, b) => a - b);

// console.log(input.seedPairs);

const seeds = input.seedPairs.flatMap(([start, length]) => {
	const arr: number[] = [];
	for (let i = start; i < start + length; i = intersectionPoints.find((p) => p > i)!) {
		arr.push(i);
	}
	return arr;
});
// console.log(input.seedPairs, seeds, intersectionPoints);

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

// console.log(results);

output(results.min()).forTest(46).forActual(63179500);
