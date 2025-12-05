import { parseLines, readInput } from "./utils.js";

const parseInput = (raw) => {
  const fresh = [];
  const inventory = [];

  parseLines(raw)
    .filter(Boolean)
    .forEach((line) => {
      if (line.includes("-")) {
        const [start, end] = line.split("-").map(Number);
        fresh.push([start, end]);
      } else {
        inventory.push(Number(line));
      }
    });

  return { fresh, inventory };
};

const withinRange = ([start, end], i) => start <= i && i <= end;

const countFreshIngredients = ({ fresh, inventory }) => {
  return inventory.filter((id) => fresh.some((range) => withinRange(range, id)))
    .length;
};

const countTotalFreshIngredients = ({ fresh }) => {
  const merged = [];
  const sorted = fresh.toSorted((a, b) => a[0] - b[0] || a[1] - b[1]);

  for (const [start, end] of sorted) {
    const prev = merged.at(-1);
    if (!prev || start > prev[1]) {
      merged.push([start, end]);
    } else {
      prev[1] = Math.max(prev[1], end);
    }
  }

  return merged.reduce((total, [start, end]) => total + end - start + 1, 0);
};

const exampleInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;
const example = parseInput(exampleInput);
const input = parseInput(readInput("day05.txt"));

const partOne = {
  Example: countFreshIngredients(example),
  Answer: countFreshIngredients(input),
};
console.log("--- Part 1 ---");
console.table(partOne);

const partTwo = {
  Example: countTotalFreshIngredients(example),
  Answer: countTotalFreshIngredients(input),
};
console.log("--- Part 2 ---");
console.table(partTwo);
