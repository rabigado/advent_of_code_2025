// day5/index.js
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
const fileName = inputName.endsWith(".txt") ? inputName : `${inputName}.txt`;
const filePath = path.join(__dirname, fileName);
const sum = arr => arr.reduce((acc, x) => acc + x, 0);

if (!fs.existsSync(filePath)) {
    console.error(`Input file not found: ${fileName}`);
    process.exit(1);
}

const puzzle = fs.readFileSync(filePath, "utf8");
// console.log("puzzle", puzzle);

function puzzle_1() {
    const lines = puzzle.split(/\n\s*\n/);
    const ranges = lines[0].split('\n')
    .map(line=>{return [Number(line.split('-')[0]),Number(line.split('-')[1])]})
    .sort((a,b)=>{
        return a[0] - b[0]
    })
    const ids = lines[1]
    let count = 0
    // console.log(
    //     ranges
    // )
    ids.split('\n').forEach(id=>{
        if(ranges.some(([a,b])=>{
            return a <= id && b>=id
        })){
            count++
        }
    })
    console.log('count',count)
}

function puzzle_2() {
    const ranges = puzzle
    .trim()
    .split('\n')
    .filter(Boolean)
    .map(line => {
      const [aRaw, bRaw] = line.split('-');
      let a = Number(aRaw), b = Number(bRaw);
      if (!Number.isInteger(a) || !Number.isInteger(b) || a <= 0 || b <= 0) {
        throw new Error(`Bad range: "${line}"`);
      }
      if (a > b) [a, b] = [b, a];
      return [a, b];
    })
    .sort((x, y) => x[0] - y[0]);

  let total = 0n;              // BigInt so sums don’t overflow
  let curStart = null;
  let curEnd = null;

  for (const [a, b] of ranges) {
    if (curStart === null) {
      curStart = a;
      curEnd = b;
      continue;
    }

    if (a <= curEnd + 1) {     // overlap or touching (remove +1 if you don't want touching merged)
      curEnd = Math.max(curEnd, b);
    } else {
      total += BigInt(curEnd - curStart + 1);
      curStart = a;
      curEnd = b;
    }
  }

  if (curStart !== null) {
    total += BigInt(curEnd - curStart + 1);
  }

  console.log(total); // BigInt
}

if (_inputName.includes('puzzle_1')) {
    puzzle_1()
} else {
    puzzle_2()
}

