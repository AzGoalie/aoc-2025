import { parseLines, readInput } from "./utils.js";

const parseInput = (raw) => {
  return parseLines(raw).map((l) => l.split(""));
};

const countNeighbors = (grid, x, y) => {
  const width = grid[0].length;
  const height = grid.length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  let neighbors = 0;

  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;

    if (newY >= 0 && newY < height && newX >= 0 && newX < width) {
      if (grid[newY][newX] === "@") {
        neighbors++;
      }
    }
  }

  return neighbors;
};

const countRemovable = (grid) => {
  const width = grid[0].length;
  const height = grid.length;

  let total = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === ".") continue;

      if (countNeighbors(grid, x, y) < 4) {
        total++;
      }
    }
  }

  return total;
};

const reduceGrid = (grid) => {
  let finished = false;
  const width = grid[0].length;
  const height = grid.length;

  let total = 0;

  while (!finished) {
    finished = true;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y][x] === ".") continue;

        const neighbors = countNeighbors(grid, x, y);
        if (neighbors < 4) {
          grid[y][x] = ".";
          finished = false;
          total++;
        }
      }
    }
  }

  return total;
};

const exampleInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;
const example = parseInput(exampleInput);
const input = parseInput(readInput("day04.txt"));

console.log("--- Part 1 ---");
const partOne = {
  Example: countRemovable(example),
  Answer: countRemovable(input),
};
console.table(partOne);

console.log("--- Part 2 ---");
const partTwo = {
  Example: reduceGrid(example),
  Answer: reduceGrid(input),
};
console.table(partTwo);
