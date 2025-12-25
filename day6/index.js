// day6/index.js
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
const operations_calc = {
    "+": (a,b)=>{
        console.log(`preforming ${a}+${b}`)
        return Number(a)+Number(b)},
    "*": (a,b)=>{
        console.log(`preforming ${a}*${b}`)
        return Number(a)*Number(b)}
}
function puzzle_1() {
    const lines = puzzle.split('\n').map(l=>l.replace(/ +/g, ',').split(',').filter(i=>!!i))
    console.log(lines)
    const operations = lines.splice(lines.length-1,1)[0]
    let total = 0;
    console.log('operations',operations)
    operations.forEach((op,index)=>{
        console.log('op,index',op,index)
        const calc = operations_calc[op];
        let result = lines[0][index]
        for(let i = 1; i<lines.length;i++){
            result = calc(result,lines[i][index])
        }
        total+=result;
    })
    console.log(total)
}
function spacesAfterEachItemWithIndex(str) {
    const out = [];
    const re = /(\S)(\s*)(?=\S|$)/g;

    let m;
    while ((m = re.exec(str)) !== null) {
        out.push({
            item: m[1],
            index: m.index,
            spacesToNextOrEnd: m[2].length
        });
    }

    return out;
}

function puzzle_2() {
    const lines = puzzle.split('\n').reverse()

    const operations = lines.splice(0,1)

    let total = 0;
    let data = spacesAfterEachItemWithIndex(operations[0]);
    console.log(data[0],lines[0].split("").reverse().slice(data[0].index,data[0].spacesToNextOrEnd-1))
    //
    data.forEach(o =>{
        for(let i = o.spacesToNextOrEnd-1; i >= 0; i--){

        }
    })

    // operations.forEach((op,index)=>{
    //     const calc = operations_calc[op];
    //     let result = lines[0][index]
    //     for(let i = 1; i<lines.length;i++){
    //         result = calc(result,lines[i][index])
    //     }
    //     total+=result;
    // })
    // console.log(total)
}

if (_inputName.includes('puzzle_1')) {
    puzzle_1()
} else {
    puzzle_2()
}

