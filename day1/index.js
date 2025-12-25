// day1/index.js
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

const INIT_POSITION = 50;
const MAX_NUMBER = 100
const puzzle = fs.readFileSync(filePath, "utf8");
const lines = puzzle.split("\n").map(moveDirection)// L/R[0-9][0-9]

function moveDirection(str) {
    let number = Number(str.slice(1));
    return str[0] === "L" ? number * -1 : number
}

function puzzle_1() {

    function wrapIndex(i, N) {
        return Math.abs(i) < N ? i : ((i % N) + N) % N;
    }

    function move(cursor, delta, N) {
        return wrapIndex(cursor + delta, N);
    }

    const response = lines
        .reduce((acc, curr) => {
            acc.pos = move(acc.pos, curr, MAX_NUMBER)
            if (acc.pos === 0) acc.count++
            return acc;
        }, {pos: INIT_POSITION, count: 0})

    console.log("__________________________________")
    console.log(`result to puzzle is: ${response.count}`)
    console.log("__________________________________")
}
// Naive solution
function puzzle_2() {
    function hitZeroCount(s, d, N) {
        if (d === 0) return 0;
        const steps = Math.abs(d);

        let first;
        if (d > 0) {
            first = (N - s) % N;
            if (first === 0) first = N;
        } else {
            first = s % N;
            if (first === 0) first = N;
        }

        if (steps < first) return 0;
        return 1 + Math.floor((steps - first) / N);
    }

    function wrapPos(s, d, N) {
        return ((s + d) % N + N) % N;
    }
    let tempCount = 0;
    let pos = INIT_POSITION;

    for (const d of lines) {
        tempCount += hitZeroCount(pos, d, MAX_NUMBER);
        pos = wrapPos(pos, d, MAX_NUMBER);
    }

    console.log("__________________________________");
    console.log(`temp count: ${tempCount}`);
    console.log("__________________________________");
}

if (_inputName.includes('puzzle_1')) {
    puzzle_1()
} else {
    puzzle_2()
}

