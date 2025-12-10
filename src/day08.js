import { parseLines, readInput } from "./utils.js";

const parseInput = (raw) =>
  parseLines(raw).map((line) => line.split(",").map(Number));

const dist = (a, b) => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2];

  return dx * dx + dy * dy + dz * dz;
};

const createEdges = (vertices) =>
  vertices.flatMap((a, i) =>
    vertices.slice(i + 1).map((b) => [dist(a, b), a, b])
  );

const connect = (edges, n) => {
  const circuits = [];
  for (let i = 0; i < n && i < edges.length; i++) {
    const [_, a, b] = edges[i];

    if (circuits.some((c) => c.has(a) && c.has(b))) {
      continue;
    }

    const cA = circuits.find((c) => c.has(a));
    const cB = circuits.find((c) => c.has(b));

    if (cA && cB) {
      circuits.push(cA.union(cB));
      circuits.splice(circuits.indexOf(cA), 1);
      circuits.splice(circuits.indexOf(cB), 1);
    } else if (cA) {
      cA.add(b);
    } else if (cB) {
      cB.add(a);
    } else {
      circuits.push(new Set([a, b]));
    }
  }

  return circuits.sort((a, b) => b.size - a.size);
};

const connectAll = (vertices) => {
  const circuits = [];
  const edges = createEdges(vertices).sort(([a], [b]) => a - b);

  for (let i = 0; i < edges.length; i++) {
    const [_, a, b] = edges[i];

    if (circuits.some((c) => c.has(a) && c.has(b))) {
      continue;
    }

    const cA = circuits.find((c) => c.has(a));
    const cB = circuits.find((c) => c.has(b));

    if (cA && cB) {
      circuits.push(cA.union(cB));
      circuits.splice(circuits.indexOf(cA), 1);
      circuits.splice(circuits.indexOf(cB), 1);
    } else if (cA) {
      cA.add(b);
    } else if (cB) {
      cB.add(a);
    } else {
      circuits.push(new Set([a, b]));
    }

    if (circuits.length === 1 && circuits[0].size === vertices.length) {
      return [a, b];
    }
  }
};

const exampleInput = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

const example = parseInput(exampleInput);
const input = parseInput(readInput("day08.txt"));

const partOneProduct = (edges, n) =>
  connect(
    createEdges(edges).sort(([a], [b]) => a - b),
    n
  )
    .slice(0, 3)
    .reduce((total, x) => x.size * total, 1);

const partOne = {
  Example: partOneProduct(example, 10),
  Answer: partOneProduct(input, 1000),
};

console.log("--- Part 1 ---");
console.table(partOne);

const partTwo = {
  Example: connectAll(example).reduce((total, [x]) => total * x, 1),
  Answer: connectAll(input).reduce((total, [x]) => total * x, 1),
};

console.log("--- Part 2 ---");
console.table(partTwo);
