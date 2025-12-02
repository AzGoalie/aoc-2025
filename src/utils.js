import fs from "fs";
import path from "path";

export function readInput(filename) {
  try {
    const inputPath = path.join(import.meta.dirname, "..", "input", filename);
    return fs.readFileSync(inputPath, "utf8").trim();
  } catch (e) {
    console.error(`Could not read file: ${filename}`);
    process.exit(1);
  }
}

export const parseLines = (rawInput) => rawInput.split(/\r?\n/);
