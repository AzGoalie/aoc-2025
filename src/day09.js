import { parseLines, readInput } from "./utils.js";

const parseInput = (raw) =>
  parseLines(raw).map((line) => line.trim().split(",").map(Number));

function area([x1, y1], [x2, y2]) {
  return (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
}

function maxArea(points) {
  let max = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const p1 = points[i];
      const p2 = points[j];

      const a = area(p1, p2);
      if (a > max) {
        max = a;
      }
    }
  }

  return max;
}

function isPointOnSegment([px, py], [x1, y1], [x2, y2]) {
  const cross = (px - x1) * (y2 - y1) - (py - y1) * (x2 - x1);
  if (Math.abs(cross) > 1e-10) return false;

  const dot = (px - x1) * (px - x2) + (py - y1) * (py - y2);
  return dot <= 0;
}

function isPointInPolygon([px, py], polygon) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    if (isPointOnSegment([px, py], polygon[i], polygon[j])) {
      return true;
    }

    const intersect =
      yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}

function makeRectangles(points) {
  const rectangles = [];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];

      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);

      const topLeft = [minX, maxY];
      const topRight = [maxX, maxY];
      const bottomLeft = [minX, minY];
      const bottomRight = [maxX, minY];

      rectangles.push([topLeft, topRight, bottomLeft, bottomRight]);
    }
  }

  return rectangles;
}

function segmentIntersectsSegment(p1, p2, q1, q2) {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const [x3, y3] = q1;
  const [x4, y4] = q2;

  const det = (x2 - x1) * (y4 - y3) - (y2 - y1) * (x4 - x3);
  if (det === 0) return false;

  const lambda = ((y4 - y3) * (x4 - x1) + (x3 - x4) * (y4 - y1)) / det;
  const gamma = ((y1 - y2) * (x4 - x1) + (x2 - x1) * (y4 - y1)) / det;

  return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
}

function isRectangleValid(rect, polygon) {
  const [minX, maxY] = rect[0];
  const [maxX, minY] = rect[3];

  if (!isPointInPolygon(rect[0], polygon)) return false;
  if (!isPointInPolygon(rect[1], polygon)) return false;
  if (!isPointInPolygon(rect[2], polygon)) return false;
  if (!isPointInPolygon(rect[3], polygon)) return false;

  for (const [px, py] of polygon) {
    if (px > minX && px < maxX && py > minY && py < maxY) {
      return false;
    }
  }

  const rectEdges = [
    [rect[2], rect[3]],
    [rect[3], rect[1]],
    [rect[1], rect[0]],
    [rect[0], rect[2]],
  ];

  for (let i = 0; i < polygon.length; i++) {
    const p1 = polygon[i];
    const p2 = polygon[(i + 1) % polygon.length];

    for (const edge of rectEdges) {
      if (segmentIntersectsSegment(p1, p2, edge[0], edge[1])) {
        return false;
      }
    }
  }

  return true;
}
function maxAreaInPolygon(points) {
  const rectangles = makeRectangles(points);

  return rectangles
    .filter((r) => isRectangleValid(r, points))
    .map((r) => area(r[0], r[3]))
    .sort((a, b) => b - a)[0];
}

const exampleInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;
const example = parseInput(exampleInput);
const input = parseInput(readInput("day09.txt"));

const partOne = {
  Example: maxArea(example),
  Answer: maxArea(input),
};
console.log("--- Part 1 ---");
console.table(partOne);

const partTwo = {
  Example: maxAreaInPolygon(example),
  Answer: maxAreaInPolygon(input),
};
console.log("--- Part 2 ---");
console.table(partTwo);
