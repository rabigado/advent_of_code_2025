// day2/index.js
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
/**
 *
 * @param range a string that looks like [0-9]+-[0-9]+
 * @return {number[]}
 */
const getAllRanges = (range)=>{
    const [start,end] = range.split('-')
    return new Array(end-start + 1).fill(0).map((_,i)=>Number(start)+i)
}

const puzzle_ranges = puzzle.split(',').map(getAllRanges).flat()

function puzzle_1() {
    // const getInvalidIds = (puzzle_range)=>{
    //     const ranges = getAllRanges(puzzle_range);
    // }
    const isInvalid = (entry)=>{
        let s = `${entry}`;
        if(s.length % 2 === 1){
            return false
        }
        const windowSize = Math.floor(s.length/2)
        return s.slice(0,windowSize) === s.slice(windowSize)
    }
    console.log(puzzle_ranges.filter(isInvalid).reduce((acc,curr)=>acc+curr,0))
}

function puzzle_2() {
    function splitNumber(num, n) {
        const s = String(num);
        const result = [];

        for (let i = 0; i < s.length; i += n) {
            result.push(s.slice(i, i + n));
        }

        return result;
    }
    const isInvalid = (entry)=>{
        let s = `${entry}`;
        const maxWindowSize = Math.floor(s.length/2)

        for(let i = 1; i <= maxWindowSize; i++){
            const temp = new Set(splitNumber(s,i))
            if(temp.size === 1) {
                return true;
            }
        }
        return false
    }
    console.log(puzzle_ranges.filter(isInvalid)
        .reduce((acc,curr)=>acc+curr,0))
}

if (_inputName.includes('puzzle_1')) {
    puzzle_1()
} else {
    puzzle_2()
}
