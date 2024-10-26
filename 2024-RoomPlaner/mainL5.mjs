// global variables -------------------------------------------

const debug = 0;
const level = 5;
const number = 4;

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

function fillInX(x, y, room, desks) {

    let numOfDesksHorizontalX = Math.trunc(x/3);
    if ((x-numOfDesksHorizontalX*3) === 2) numOfDesksHorizontalX++;
    if ((x-numOfDesksHorizontalX*3) === 0) numOfDesksHorizontalX--;
    let numOfDesksHorizontalY = Math.trunc(y/2);
    if ((y-numOfDesksHorizontalY*2) === 1) numOfDesksHorizontalY++;
    if ((y-numOfDesksHorizontalY*2) === 0) numOfDesksHorizontalY--;

    let numOfDesksVerticalX = Math.trunc((numOfDesksHorizontalX*3-1)/2);
    if ((x-numOfDesksVerticalX*2) === 1) numOfDesksVerticalX++;
    if (x !== (numOfDesksHorizontalX*3-1) && (x-numOfDesksVerticalX*2) === 0) numOfDesksVerticalX--;
    let numOfDesksVerticalY = Math.trunc(y/3);
    if ((y-numOfDesksVerticalY*3) === 2) numOfDesksVerticalY++;
    if (y !== (numOfDesksHorizontalY*2-1) && (y-numOfDesksVerticalY*3) === 0) numOfDesksVerticalY--;

    let tableNum = desks;
    // horizontal desks
    for (let j = 0; j<numOfDesksHorizontalY*2; j+=2) { // rows
        for (let k = 0; k<numOfDesksHorizontalX; k++) { // desks per row
            room[j][k*3] = "X";
            room[j][k*3+1] = "X";
            tableNum--;
        }
    }

    if (tableNum !== 0) {
        // vertical desks
        for (let j = numOfDesksHorizontalX*3; j<x; j+=2) { // columns
            for (let k = 0; k<numOfDesksVerticalY; k++) { // desks per column
                room[k*3][j] = "X";
                room[k*3+1][j] = "X";
                tableNum--;
            }
        }

        for (let j = 0; j<numOfDesksVerticalX*2; j+=2) { // columns
            for (let k = numOfDesksHorizontalY*2; k<y; k+=2) { // desks per column
                if (j+1 >= x) {
                    room[k][j] = "X";
                    room[k+1][j] = "X";
                    tableNum--;
                } else if (j+1 < x && (room[k-1][j+1] !== "X" || room[k-1][j] !== "X")) {
                    room[k][j] = "X";
                    room[k+1][j] = "X";
                    tableNum--;                
                }
            }
        }

        // maybe one horizontal desk
        //Math.max(numOfDesksVerticalY*3, numOfDesksHorizontalY*2)
        for (let j = numOfDesksVerticalY*3; j<y; j+=2) { // columns
            for (let k = numOfDesksVerticalX*2; k<x; k+=3) { // desks per column
                if (room[j-1][k-1] !== "X" ) {
                    room[j][k] = "X";
                    room[j][k+1] = "X";
                    tableNum--;
                }
            }
        }
    }

    return tableNum;
}
function fillInY(x, y, room, desks) {

    let numOfDesksX = Math.trunc(x/3);
    if ((x-numOfDesksX*3) === 2) numOfDesksX++;
    let numOfDesksY = Math.trunc(y/3);
    if ((y-numOfDesksY*3) === 2) numOfDesksY++;
    if ((y-numOfDesksY*3) === 0) numOfDesksY--;

    let tableNum = desks;
    for (let j = 0; j<x; j+=2) { // columns
        for (let k = 0; k<numOfDesksY; k++) { // desks per columns
            room[k*3][j] = "X";
            room[k*3+1][j] = "X";
            tableNum--;
        }
    }

    for (let j = numOfDesksY*3; j<y; j+=2) { // columns
        for (let k = 0; k<numOfDesksX; k++) { // desks per column
            room[j][k*3] = "X";
            room[j][k*3+1] = "X";
            tableNum--;
        }
    }

    return tableNum;
}

function printRoom(x, y, room) {
    let data = "";
    for (let j = 0; j<y; j++) { // rows
        for (let k = 0; k<x; k++) { // desks per row
            data += room[j][k];
        }
        data += "\n";
    }
    data += "\n";
    console.log(data);
}

const numOfRooms = parseInt(input[0]);
console.log(numOfRooms);
for (let i = 1; i<(numOfRooms+1); i++) {
    let line = input[i].split(' ');
    const x = parseInt(line[0]);
    const y = parseInt(line[1]);
    const desks = parseInt(line[2]);
    
    //console.log("x:"+x+" y:"+y+" desks:"+desks);

    let room1 = new Array(y);
    for (let j = 0; j<y; j++) {
        room1[j] = new Array(x).fill(".");
    }
    let room2 = new Array(y);
    for (let j = 0; j<y; j++) {
        room2[j] = new Array(x).fill(".");
    }

    const r1 = fillInX(x, y, room1, desks);
    const r2 = fillInY(x, y, room2, desks);

    console.log("r1:"+r1+" r2:"+r2+" room"+i);

    //printRoom(x, y, room1)
    //printRoom(x, y, room2)

    if (r1 === 0) {
        for (let j = 0; j<y; j++) { // rows
            for (let k = 0; k<x; k++) { // desks per row
                data += room1[j][k];
            }
            data += "\n";
        }
        data += "\n";
    } else {
        for (let j = 0; j<y; j++) { // rows
            for (let k = 0; k<x; k++) { // desks per row
                data += room2[j][k];
            }
            data += "\n";
        }
        data += "\n";
    }

}
writeFile(level, number, data)
