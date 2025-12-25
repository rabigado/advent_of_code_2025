// day4/index.js
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

const puzzle = fs.readFileSync(filePath, "utf8").split('\n').filter(o=>!!o).map(item=>item.split(''));
// console.log("puzzle", puzzle);
const types = {
    0: '.',
    1: '@',
    2: 'x'
}
function howManyRollsAround(grid,i,j){
    const rows = grid.length;
    const cols = grid[0]?.length ?? 0;

    const out = [];
    if(grid[i][j] !== types[1]) return 8
    for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
            if (di === 0 && dj === 0) continue;
            const ni = i + di, nj = j + dj;
            if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
                out.push(grid[ni][nj]);
            }
        }
    }
    return out.map(item => item === types[1] ? 1 : 0).reduce((acc,curr)=> {return acc + curr},0)
}


function puzzle_1() {
    const res = puzzle.map((row,row_index)=>{
        return row.map((_,c_index)=>{
            return howManyRollsAround(puzzle,row_index,c_index)
        }).filter(item=>item < 4)
    })
    console.log(res.flat().length)
}

function puzzle_2() {
    function clearRolls(grid){
        return  grid.map((row,row_index)=>{
            return row.map((c,c_index)=>{
                const around = howManyRollsAround(grid,row_index,c_index)
                return  around < 4 ? types[2] : c
            })
        })
    }
    const countCleared = (grid)=>{
        return grid.flat().reduce((acc,curr)=>{if(curr===types[2]){return acc+1} return acc },0)
    }
    let lastCount= 0;
    let res = clearRolls(puzzle)
    let currentCount = countCleared(res)
    let max_iterations = 300
    while(currentCount !== lastCount && max_iterations > 0){
        lastCount = countCleared(res)
        res = clearRolls(res)
        currentCount = countCleared(res)
        max_iterations--
    }
    console.log(max_iterations)
    console.log(currentCount);
}

if (_inputName.includes('puzzle_1')) {
    puzzle_1()
} else {
    puzzle_2()
}

