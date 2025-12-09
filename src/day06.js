import { parseLines, readInput } from "./utils.js";

const parseInput = (raw) => {
  const lines = parseLines(raw);
  const breaks = lines[0]
    .split("")
    .reduce(
      (gutters, _, i) =>
        lines.every((line) => line[i] === " ") ? [...gutters, i] : gutters,
      []
    );

  const data = lines
    .slice(0, lines.length - 1)
    .map((line) =>
      [-1, ...breaks].map((start, i) => line.slice(start + 1, breaks[i]))
    );
  const ops = lines.at(-1).split(" ").filter(Boolean);
  return [...data, ops];
};

const transpose = (matrix) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));

const calc = (homework) => {
  const ops = homework.at(-1);
  const args = transpose(homework.slice(0, homework.length - 1));

  return args
    .map((row) => row.map(Number))
    .map((row, i) =>
      row.reduce(
        (total, x) => (ops[i] === "+" ? total + x : total * x),
        ops[i] === "+" ? 0 : 1
      )
    )
    .reduce((total, x) => total + x, 0);
};

const calcRtL = (homework) => {
  const ops = homework.at(-1);
  const args = transpose(homework.slice(0, homework.length - 1));

  const totals = [];
  for (const i in args) {
    const op =
      ops[i] === "+" ? (total, x) => x + total : (total, x) => x * total;
    const rtl = transpose(args[i].map((x) => (x.length > 0 ? x.split("") : x)));
    totals.push(rtl.map((col) => Number(col.join(""))).reduce(op));
  }

  return totals.reduce((total, x) => x + total);
};

const exampleInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
const example = parseInput(exampleInput);
const input = parseInput(readInput("day06.txt"));

const partOne = {
  Example: calc(example),
  Answer: calc(input),
};
console.log("--- Part 1 ---");
console.table(partOne);

const partTwo = {
  Example: calcRtL(example),
  Answer: calcRtL(input),
};
console.log("--- Part 2 ---");
console.table(partTwo);
