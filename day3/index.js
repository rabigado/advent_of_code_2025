// day3/index.js
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

if (!fs.existsSync(filePath)) {
    console.error(`Input file not found: ${fileName}`);
    process.exit(1);
}

const puzzle = fs.readFileSync(filePath, "utf8");

// console.log("puzzle", puzzle);
// 1: 357,16927
function maxNumberKeepOrder(input, n=2) {
    const arr = typeof input === "string" ? [...input].map(Number) : input;
    const res = [];
    let start = 0;

    for (let picksLeft = n; picksLeft > 0; picksLeft--) {
        const end = arr.length - picksLeft;

        let bestIdx = start;
        for (let i = start; i <= end; i++) {
            if (arr[i] > arr[bestIdx]) bestIdx = i;
            if (arr[bestIdx] === 9) break;
        }

        res.push(arr[bestIdx]);
        start = bestIdx + 1;
    }

    return Number(res.join(''));
}

function puzzle_1() {
    console.log(puzzle.split('\n')
        .filter(i => !!i)
        .map(s => maxNumberKeepOrder(s))
        .reduce((acc,curr)=>{return acc+curr},0)
    )
}

function puzzle_2() {
    console.log(puzzle.split('\n')
        .filter(i => !!i)
        .map(s => maxNumberKeepOrder(s,12))
        .reduce((acc,curr)=>{return acc+curr},0)
    )
}

if (_inputName.includes('puzzle_1')) {
    puzzle_1()
} else {
    puzzle_2()
}

