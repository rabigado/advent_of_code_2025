// scripts/create-day.js
const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();

// Usage:
//   npm run create:day              -> creates next dayN
//   npm run create:day -- 7         -> creates day7
//   npm run create:day -- next      -> creates next dayN
const arg = process.argv[2] ?? "next";

function nextDayNumber() {
  const dirs = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^day\d+$/.test(d.name))
    .map((d) => Number(d.name.slice(3)))
    .filter(Number.isFinite);
  return dirs.length ? Math.max(...dirs) + 1 : 1;
}

const n = arg === "next" ? nextDayNumber() : Number(arg);
if (!Number.isInteger(n) || n <= 0) {
  console.error(`Invalid day number: ${arg}`);
  process.exit(1);
}

const dayName = `day${n}`;
const dayDir = path.join(root, dayName);

if (fs.existsSync(dayDir)) {
  console.error(`Already exists: ${dayName}/`);
  process.exit(1);
}

fs.mkdirSync(dayDir, { recursive: true });

// Create the 3 txt files
for (const file of ["example_1.txt","example_2.txt", "puzzle_1.txt", "puzzle_2.txt"]) {
  fs.writeFileSync(path.join(dayDir, file), "", { flag: "wx" });
}

// Create index.js template
const indexJs = `// ${dayName}/index.js
const fs = require("node:fs");
const path = require("node:path");

// Usage: node index.js <input_name>
// Example: node index.js puzzle_1
let _inputName = process.argv[2];
let inputName = process.argv[2];
const isExample = process.argv[3];

if (isExample === "true") {
    inputName = inputName.replace('puzzle', 'example')
}

if (!inputName) {
    console.error("Missing input name. Example: node index.js puzzle_1");
    process.exit(1);
}

// allow both "puzzle_1" and "puzzle_1.txt"
const fileName = inputName.endsWith(".txt") ? inputName : \`\${inputName}.txt\`;
const filePath = path.join(__dirname, fileName);

if (!fs.existsSync(filePath)) {
    console.error(\`Input file not found: \${fileName}\`);
    process.exit(1);
}

const puzzle = fs.readFileSync(filePath, "utf8");
console.log("puzzle", puzzle);

function puzzle_1() {

}

function puzzle_2() {

}

if (_inputName.includes('puzzle_1')) {
    puzzle_1()
} else {
    puzzle_2()
}

`;

fs.writeFileSync(path.join(dayDir, "index.js"), indexJs, { flag: "wx" });

console.log(`Created ${dayName}/ (index.js + example.txt + puzzle_1.txt + puzzle_2.txt)`);
