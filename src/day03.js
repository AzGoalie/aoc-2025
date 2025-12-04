import { parseLines, readInput } from "./utils.js";

const parseInput = (raw) => {
  return parseLines(raw).map((line) => line.split("").map((x) => parseInt(x)));
};

const maxJolts = (batteries) => {
  let a = 0;
  let b = 0;

  for (let i = 0; i < batteries.length - 1; i++) {
    const first = batteries[i];
    if (first > a) {
      a = first;
      b = 0;
    }
    for (let j = i + 1; j < batteries.length; j++) {
      const second = batteries[j];

      if (second > b) {
        b = second;
      }
    }
  }
  return parseInt(`${a}${b}`);
};

const twelveVolts = (batteries) => {
  return batteries.map((bank) => {
    const stack = [];
    const k = 12;
    let dropCount = bank.length - k;

    for (const num of bank) {
      while (
        dropCount > 0 &&
        stack.length > 0 &&
        stack[stack.length - 1] < num
      ) {
        stack.pop();
        dropCount--;
      }
      stack.push(num);
    }

    return Number(stack.slice(0, k).join(""));
  });
};

const sum = (total, x) => total + x;

const exampleInput = `987654321111111
811111111111119
234234234234278
818181911112111`;

const example = parseInput(exampleInput);
const input = parseInput(readInput("day03.txt"));

const partOneResults = {
  Example: example.map(maxJolts).reduce(sum),
  Answer: input.map(maxJolts).reduce(sum),
};
console.log("--- Part 1 ---");
console.table(partOneResults);

const partTwoResults = {
  Example: twelveVolts(example).reduce(sum),
  Answer: twelveVolts(input).reduce(sum),
};
console.log("--- Part 2 ---");
console.table(partTwoResults);
