import { parseLines, readInput } from "./utils.js";

function parseInput(raw) {
  return parseLines(raw).map((line) => ({
    goalState: line
      .match(/\[(.*?)\]/)[1]
      .split("")
      .map((c) => (c === "#" ? 1 : 0))
      .reduce((bitmask, x, i) => (x === 1 ? bitmask | (1 << i) : bitmask), 0),

    buttons: [...line.matchAll(/\((.*?)\)/g)].map((m) =>
      m[1].split(",").reduce((bitmask, x) => bitmask | (1 << Number(x)), 0)
    ),
    joltage: line
      .match(/\{(.*?)\}/)[1]
      .split(",")
      .map(Number),
  }));
}

function countPresses(goalState, buttons) {
  const visited = new Set([0]);
  const queue = [{ state: 0, presses: 0 }];

  while (queue.length > 0) {
    const { state, presses } = queue.shift();
    if (state === goalState) {
      return presses;
    }

    for (const button of buttons) {
      const newState = state ^ button;
      if (!visited.has(newState)) {
        visited.add(newState);
        queue.push({ state: newState, presses: presses + 1 });
      }
    }
  }

  return -1;
}

const exampleInput = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;
const example = parseInput(exampleInput);
const input = parseInput(readInput("day10.txt"));

console.log(JSON.stringify(example));

const partOne = {
  Example: example
    .map(({ goalState, buttons }) => countPresses(goalState, buttons))
    .reduce((a, b) => a + b, 0),
  Answer: input
    .map(({ goalState, buttons }) => countPresses(goalState, buttons))
    .reduce((a, b) => a + b, 0),
};
console.log("--- Part 1 ---");
console.table(partOne);

console.log("--- Part 1 ---");
console.log("AAA");
