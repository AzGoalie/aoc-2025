import { readInput } from "./utils.js";

const parseIds = (raw) =>
  raw.split(",").flatMap((range) => {
    const [start, end] = range.split("-").map((n) => parseInt(n));
    return Array.from({ length: end - start + 1 }, (_, i) =>
      (start + i).toString()
    );
  });

const isRepeated = (id) => {
  const a = id.substring(0, id.length / 2);
  const b = id.substring(id.length / 2);
  return a === b;
};

const hasRepeatedSequence = (id) => {
  for (let i = 1; i <= id.length / 2; i++) {
    const pattern = id.slice(0, i);
    if (pattern.repeat(id.length / i) === id) {
      return true;
    }
  }
  return false;
};

const sumIds = (ids) => ids.map(Number).reduce((a, b) => a + b, 0);

const part1 = (ids) => sumIds(ids.filter(isRepeated));
const part2 = (ids) => sumIds(ids.filter(hasRepeatedSequence));

const exampleInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;
const exampleIds = parseIds(exampleInput);
const ids = parseIds(readInput("day02.txt"));

console.log("--- Part 1 ---");
console.table({
  Example: part1(exampleIds),
  Answer: part1(ids),
});

console.log("--- Part 2 ---");
console.table({
  Example: part2(exampleIds),
  Answer: part2(ids),
});
