import { parseLines, readInput } from "./utils.js";

const parseInput = (raw) => {
  return parseLines(raw).map((line) => line.split(""));
};

const findBeams = (row) =>
  row.reduce(
    (acc, x, i) => (x === "S" || x === "|" || Number(x) ? [...acc, i] : acc),
    []
  );

const countSplits = (state) => {
  let splits = 0;

  for (let i = 1; i < state.length - 1; i++) {
    const beams = findBeams(state[i - 1]);

    for (const beam of beams) {
      switch (state[i].at(beam)) {
        case ".":
          state[i][beam] = "|";
          break;
        case "^":
          splits++;
          state[i][beam - 1] = "|";
          state[i][beam + 1] = "|";
          break;
      }
    }
  }

  return splits;
};

const countPaths = (state) => {
  for (let i = 1; i < state.length - 1; i++) {
    const beams = findBeams(state[i - 1]);

    for (const beam of beams) {
      const prev = Number(state[i - 1].at(beam)) || 1;

      switch (state[i][beam]) {
        case ".":
          state[i][beam] = prev;
          break;
        case "^":
          const a = (Number(state[i][beam - 1]) || 0) + prev;
          const b =
            (Number(state[i - 1][beam + 1]) || 0) +
            (Number(state[i][beam + 1]) || 0) +
            prev;

          state[i][beam - 1] = a;
          state[i][beam + 1] = b;
          break;
      }
    }
  }

  return state
    .at(-2)
    .filter(Number)
    .reduce((total, x) => x + total);
};

const exampleInput = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............
`;

const partOne = {
  Example: countSplits(parseInput(exampleInput)),
  Answer: countSplits(parseInput(readInput("day07.txt"))),
};
console.log("--- Part 1 ---");
console.table(partOne);

const partTwo = {
  Example: countPaths(parseInput(exampleInput)),
  Answer: countPaths(parseInput(readInput("day07.txt"))),
};
console.log("--- Part 2 ---");
console.table(partTwo);
