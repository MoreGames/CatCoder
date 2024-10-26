// global variables -------------------------------------------

const debug = 0;
const level = 2;
const number = 5;

// helper functions:  ---------------

import fs from 'node:fs';

// Return file data
function readFile(level, number) {
    try {
        const path = 'in/level'+ level + '/level' + level + '_' + number + '.in'
        console.log('📖️: Reading File "' + path + '"')
        return fs.readFileSync(path, 'utf8')
    } catch (err) {
        console.error(err);
    }
}
// Return file data seperated by '\n'
function readFileLines(level, number) {
    try {
        const path = 'in/level'+ level + '/level' + level + '_' + number + '.in'
        console.log('📖️: Reading File "' + path + '"')
        return fs.readFileSync(path, 'utf8').split('\n')
    } catch (err) {
        console.error(err);
    }
}
// Write file to out/ directory, if folder does not exist a new one will be created
function writeFile(level, number, data) {
    try {
        const path = 'out/level'+ level + '/level' + level + '_' + number + '.out'
        if(!fs.existsSync('out/level' + level)) fs.mkdirSync('out/level' + level)
        console.log('✏️: Writing File "' + path + '"')
        fs.writeFileSync(path, data)
    } catch (err) {
        console.error(err);
    }
}

// ------------------------------------------------------------

const input = readFileLines(level, number);
let data = "";

const numOfRooms = parseInt(input[0]);
console.log(numOfRooms);
for (let i = 1; i<(numOfRooms+1); i++) {
    let line = input[i].split(' ');
    const x = parseInt(line[0]);
    const y = parseInt(line[1]);
    let count = parseInt(line[2]);
    const numOfDesksX = x/3;
    //console.log("x:"+x+" y:"+y+" count:"+count+" numOfDesksX:"+numOfDesksX);
    for (let j = 0; j<y; j++) { // rows
        for (let k = 0; k<numOfDesksX-1; k++) { // desk per row
            data += count+" "+count+" "+count+" ";
            count--;
        }
        data += count+" "+count+" "+count;
        count--;
        data += "\n";
    }
    data += "\n";
}
writeFile(level, number, data)
