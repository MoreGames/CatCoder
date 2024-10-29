// global variables -------------------------------------------

const debug = 0;
const level = 4;
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
    const desks = parseInt(line[2]);
    let numOfDesksX = Math.trunc(x/4);
    if ((x-numOfDesksX*4) === 3) numOfDesksX++;
    let numOfDesksY = Math.trunc(y/4);
    if ((y-numOfDesksY*4) === 3) numOfDesksY++;

    let room = new Array(y);
    for (let j = 0; j<y; j++) {
        room[j] = new Array(x).fill(".");
    }

    //console.log("x:"+x+" y:"+y+" desks:"+desks+" numOfDesksX:"+numOfDesksX);

    let tableNum = desks;
    for (let j = 0; j<y; j+=2) { // rows
        for (let k = 0; k<numOfDesksX; k++) { // desks per row
            room[j][k*4] = "X";
            room[j][k*4+1] = "X";
            room[j][k*4+2] = "X";
            tableNum--;
        }
    }

    for (let j = numOfDesksX*4; j<x; j+=2) { // columns
        for (let k = 0; k<numOfDesksY; k++) { // desks per column
            room[k*4][j] = "X";
            room[k*4+1][j] = "X";
            room[k*4+2][j] = "X";
            tableNum--;
        }
    }

    console.log("check (should be 0):"+tableNum+" room"+i);

    for (let j = 0; j<y; j++) { // rows
        for (let k = 0; k<x; k++) { // desks per row
            data += room[j][k];
        }
        data += "\n";
    }
    data += "\n";
}
writeFile(level, number, data)
