/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
const player = 'X';
const computer = 'O';
// let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function checkForWinner() {
    // check rows
    for (let idx = 0; idx < grid.length; idx++) {
        if (grid[idx][0] !== 0 && 
            grid[idx][0] === grid[idx][1] && 
            grid[idx][1] === grid[idx][2]) {
            return grid[idx][0];
        }
    }

    // check columns
    for (let idx = 0; idx < grid.length; idx++) {
        if (grid[0][idx] !== 0 && 
            grid[0][idx] === grid[1][idx] && 
            grid[1][idx] === grid[2][idx]) {
            return grid[0][idx];
        }
    }

    // check diagonals
    // top right to bottom left
    if (grid[0][0] !== 0 && 
        grid[0][0] === grid[1][1] && 
        grid[1][1] === grid[2][2]) {
        return grid[0][0];
    }

    // top left to bottom right
    if (grid[0][2] !== 0 && 
        grid[0][2] === grid[1][1] && 
        grid[1][1] === grid[2][0]) {
        return grid[0][2];
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[i][j] === 0) {
                return false;
            } 
        }
    }
    return null;
}

function computersTurn() {
    // returns the first empty spot
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[i][j] === 0) {
                return {
                    i: i,
                    j: j
                };
            } 
        }
    }
    return null;
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();

    let winner = checkForWinner();
    if (winner) {
        alert('game over: ' + winner);
    } else {
        const compTurn = computersTurn();
        grid[compTurn.i][compTurn.j] = 2;
        renderMainGrid();
        addClickHandlers();

        winner = checkForWinner();
        if (winner) {
            alert('game over: ' + winner);
        }
    }
    
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
