// scripts/run-day.js
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

// Usage:
//   npm run day -- day1 puzzle_1
const day = process.argv[2];   // "day1"
const input = process.argv[3]; // "puzzle_1"
const example = process.argv[4]; // "example"

if (!day || !input) {
  console.error("Usage: npm run day -- day1 puzzle_1");
  process.exit(1);
}

const dir = path.resolve(process.cwd(), day);
const entry = path.join(dir, "index.js");

if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
  console.error(`Folder not found: ${day}`);
  process.exit(1);
}
if (!fs.existsSync(entry)) {
  console.error(`Missing file: ${day}/index.js`);
  process.exit(1);
}

const res = spawnSync(process.execPath, [entry, input, !!example], { stdio: "inherit" });
process.exit(res.status ?? 1);
