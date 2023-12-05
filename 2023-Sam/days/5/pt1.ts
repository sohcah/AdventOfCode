import { p, loadLines, output } from "aocutils";

const mapEntry = p.num.list(" ")
  .map(i => ({
    destination: [i[0], i[0] + i[2]],
    source: [i[1], i[1] + i[2]],
  }))

const map = mapEntry.list("\n");
const input = load(
p`seeds: ${p.num.list(" ")("seeds")}

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

function lookup(key: Exclude<keyof typeof input, "seeds">, source: number) {
  const data = input[key];
  const result = data.find(i => i.source[0] <= source && i.source[1] >= source);
  if (!result) return source;
  return source - result.source[0] + result.destination[0];
}

const results = input.seeds.map(seed => {
  return ([
    "seedToSoil",
    "soilToFertilizer",
    "fertilizerToWater",
    "waterToLight",
    "lightToTemperature",
    "temperatureToHumidity",
    "humidityToLocation"
  ] as Exclude<keyof typeof input, "seeds">[]).reduce((a,b) => lookup(b, a), seed);
});

console.log(results);

output(results.min()).forTest(35).forActual(265018614);

