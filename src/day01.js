import { readInput, parseLines } from "./utils.js";

const mod = (n, m) => ((n % m) + m) % m;

const parseMoves = (rawInput) =>
  parseLines(rawInput).map((line) => {
    const value = Number(line.slice(1));
    return line.startsWith("L") ? -value : value;
  });

const countLandingZeros = (moves, start, max) =>
  moves.reduce(
    ({ pos, zeros }, move) => {
      const nextPos = mod(pos + move, max);
      return {
        pos: nextPos,
        zeros: zeros + (nextPos === 0 ? 1 : 0),
      };
    },
    { pos: start, zeros: 0 }
  ).zeros;

const countZeroClicks = (moves, start, max) =>
  moves.reduce(
    ({ pos, zeros }, move) => {
      const dist = Math.abs(move);
      const rotationHits = Math.floor(dist / max);
      const remainder = dist % max;

      const crossedRight = move > 0 && pos + remainder >= max;
      const crossedLeft = move < 0 && pos > 0 && remainder >= pos;

      return {
        pos: mod(pos + move, max),
        zeros: zeros + rotationHits + (crossedRight || crossedLeft ? 1 : 0),
      };
    },
    { pos: start, zeros: 0 }
  ).zeros;

const MAX_VALUE = 100;
const START_POS = 50;

const exampleInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

const exampleMoves = parseMoves(exampleInput);
const moves = parseMoves(readInput("day01.txt"));

const partOneResults = {
  Example: countLandingZeros(exampleMoves, START_POS, MAX_VALUE),
  Answer: countLandingZeros(moves, START_POS, MAX_VALUE),
};
console.log("--- Part 1 ---");
console.table(partOneResults);

const partTwoResults = {
  Example: countZeroClicks(exampleMoves, START_POS, MAX_VALUE),
  Answer: countZeroClicks(moves, START_POS, MAX_VALUE),
};
console.log("--- Part 2 ---");
console.table(partTwoResults);
