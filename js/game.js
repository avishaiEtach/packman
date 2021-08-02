'use strict'
const WALL = '🟫'
const FOOD = '◽'
const EMPTY = ' ';
const POWER_FOOD = '🌟';

var gcountFood;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    document.querySelector('.modal').style.display = 'none'
    gGame.score = 0
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    updateScore(gGame.score)
    gGame.isOn = true
}

function buildBoard() {
    gcountFood = 0;
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD
            gcountFood++;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gcountFood--;
            }
            if (i === 1 && j === 1 ||
                i === 1 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 ||
                i === SIZE - 2 && j === SIZE - 2) {
                board[i][j] = POWER_FOOD;
            }


            // if (board[i][j] === FOOD) {
            //     countFood++;
            // }
        }
    }
    return board;
}



function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
    if (gGame.score !== 0 && gGame.score === gcountFood - 5) {
        gameVin();
    }
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    document.querySelector('.modal').style.display = 'block'
    document.querySelector('.modal h2').innerText = 'You Lost'
}


function gameVin() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    document.querySelector('.modal').style.display = 'block'
    document.querySelector('.modal h2').innerText = 'You Win'
}
