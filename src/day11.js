import { parseLines, readInput } from "./utils.js";

function parseInput(raw) {
  const graph = {};

  for (const line of parseLines(raw)) {
    const [n, e] = line.split(": ");
    graph[n] = e.split(" ");
  }

  return graph;
}

function countPaths(graph, start, end) {
  if (start === end) return 1;

  return graph[start].reduce(
    (total, node) => total + countPaths(graph, node, end),
    0
  );
}

function countPathsThrough(graph, start, end, through = [], memo = {}) {
  const stateKey = `${start}|${through.slice().sort().join(",")}`;
  if (stateKey in memo) return memo[stateKey];

  if (start === end) return through.length === 0 ? 1 : 0;

  const children = graph[start] || [];
  const totalPaths = children.reduce(
    (total, node) =>
      total +
      countPathsThrough(
        graph,
        node,
        end,
        through.filter((n) => n !== start),
        memo
      ),
    0
  );

  memo[stateKey] = totalPaths;
  return totalPaths;
}

const exampleInput = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

const exampleInput2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

const example = parseInput(exampleInput);
const example2 = parseInput(exampleInput2);
const input = parseInput(readInput("day11.txt"));

console.log(countPaths(example, "you", "out"));
console.log(countPaths(input, "you", "out"));

console.log(countPathsThrough(example2, "svr", "out", ["dac", "fft"]));
console.log(countPathsThrough(input, "svr", "out", ["dac", "fft"]));
