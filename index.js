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

let grid = [];
const GRID_LENGTH = 3;
const player = 'X';
const computer = 'O';
const playerNumber = 1;
const computerNumber = 2;
const messages = {
    playerWon: 'Game over: Player won the game',
    computerWon: 'Game over: Computer won the game',
    tie: 'Game Over: It is a tie'
}
// let turn = 'X';

function initializeGrid() {
    grid = [];
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
    console.log(grid);
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

    // check if there is an empty spot
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[i][j] === 0) {
                return false;
            } 
        }
    }

    // return null if it is a tie
    return null;
}

function computersTurn() {
    // make move to win if there is a chance to win in this turn
    let move = makeMove(computerNumber);
    if (move != null) {
        return move;
    }

    // make move to block if the player will win in the next turn
    move = makeMove(playerNumber);
    if (move != null) {
        return move;
    }

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

function makeMove(userNumber) {

    // checks row and returns the cell index to win or block
    for (let i = 0; i < grid.length; i++)  {
        const blockedCol = checkRowsToPlace(i, userNumber);
        if (blockedCol != null) {
            return {
                i: i,
                j: blockedCol
            }
        }
    }

    // checks columns and returns the cell index to win or block
    for (let i = 0; i < grid.length; i++)  {
        const blockedRow = checkColumnsToPlace(i, userNumber);
        if (blockedRow != null) {
            return {
                i: blockedRow,
                j: i
            }
        }
    }

    // check the top left bottom right diagonal
    const diagTlBr = checkTlBrPlace(userNumber);
    if (diagTlBr != null) {
        return {
            i: diagTlBr,
            j: diagTlBr
        }
    }

    // check the top right bottom left diagonal
    const diagTrBl = checkTrBlPlace(userNumber);
    if (diagTrBl != null) {
        return {
            i: diagTrBl,
            j: 2 - diagTrBl
        }
    }

    return null;
}

// function to check the top left bottom right diagonal
function checkTlBrPlace(userNumber) {
    if (grid[0][0] === userNumber
        && grid[1][1] === userNumber
        && grid[2][2] === 0) {
            return 2;
        }
    if (grid[0][0] === userNumber
        && grid[1][1] === 0
        && grid[2][2] === userNumber) {
            return 1;
        }
    if (grid[0][0] === 0
        && grid[1][1] === userNumber
        && grid[2][2] === userNumber) {
            return 0;
        }
    return null;
}

// function to check the top right bottom left diagonal
function checkTrBlPlace(userNumber) {
    if (grid[0][2] === userNumber
        && grid[1][1] === userNumber
        && grid[2][0] === 0) {
            return 2;
        }
    if (grid[0][2] === userNumber
        && grid[1][1] === 0
        && grid[2][0] === userNumber) {
            return 1;
        }
    if (grid[0][2] === 0
        && grid[1][1] === userNumber
        && grid[2][0] === userNumber) {
            return 0;
        }
    return null;
}

function checkRowsToPlace(i, userNumber) {
    if (grid[i][0] === userNumber
        && grid[i][1] === userNumber
        && grid[i][2] === 0) {
            return 2;
    } 
    if (grid[i][0] === userNumber
        && grid[i][1] === 0
        && grid[i][2] === userNumber) {
            return 1;
    }
    if (grid[i][0] === 0
        && grid[i][1] === userNumber
        && grid[i][2] === userNumber) {
            return 0;
    }
    return null;
}

function checkColumnsToPlace(i, userNumber) {
    if (grid[0][i] === userNumber
        && grid[1][i] === userNumber
        && grid[2][i] === 0) {
            return 2;
    } 
    if (grid[0][i] === userNumber
        && grid[1][i] === 0
        && grid[2][i] === userNumber) {
            return 1;
    }
    if (grid[0][i] === 0
        && grid[1][i] === userNumber
        && grid[2][i] === userNumber) {
            return 0;
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
    if (winner == null) {
        alert(messages.tie);
    } else if (winner) {
        displayAlert(winner);
        removeHandlers();
    } else {
        const compTurn = computersTurn();
        grid[compTurn.i][compTurn.j] = 2;
        renderMainGrid();
        addClickHandlers();
        winner = checkForWinner();
        if (winner == null) {
            alert(messages.tie);
        } else if (winner) {
            displayAlert(winner);
            removeHandlers();
        }
    }
    
}

function displayAlert(winner) {
    if (winner === 1) {
        alert(messages.playerWon);    
    } else {
        alert(messages.computerWon);    
    }
}

function removeHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].removeEventListener('click', onBoxClick, false);
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function addResetListener() {
    var reset = document.getElementById('resetButton');
    reset.addEventListener('click', resetGrid, false);
}

function resetGrid() {
    debugger;
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}

initializeGrid();
renderMainGrid();
addClickHandlers();
addResetListener();
