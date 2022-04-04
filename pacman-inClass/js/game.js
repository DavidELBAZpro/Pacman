'use strict'
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const SUPERFOOD = '🍫'
const CHERRY = '🍒';

var gisWin;
var gNumOfFood = 0;
var gBoard;
var gDeadGhosts = [];
var gIntervalCherry;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gIntervalCherry = setInterval(addCherry, 10000);
    gGame.isOn = true;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gNumOfFood++
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gNumOfFood--
            }
        }

    }
    board[1][1] = SUPERFOOD;
    board[1][board[0].length - 2] = SUPERFOOD;
    board[board[0].length - 2][1] = SUPERFOOD;
    board[board[0].length - 2][board[0].length - 2] = SUPERFOOD;


    gNumOfFood = gNumOfFood - 1;
    console.log(gNumOfFood);
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;

}

function gameOver() {
    console.log('Game Over');
    //openModal();
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    renderCell(gPacman.location, EMPTY);
    gisWin = false;
    openModal(gisWin);

}

function openModal(gisWin) {
    var elBtnModal = document.querySelector('.modal');
    var elMsg = document.querySelector('.modal h2');
    elBtnModal.style.display = 'block';

    elMsg.innerText = (gisWin) ? 'victorious 😌' : 'Game Over 😔';
}

function restartGame() {
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);

    gGame.score = 0;
    gNumOfFood = 0;
    gisWin = false;
    updateScore(gGame.score);

    init();
    var elBtnModal = document.querySelector('.modal');
    elBtnModal.style.display = 'none';
}

function checkVictory() {
    if (gNumOfFood === 0) gisWin = true;
    else return
    openModal(gisWin);
}

function addCherry() {
    var randPos = addElement(CHERRY)
    setTimeout(removeCherry, 5000, randPos);

}

function addElement(CHERRY) {
    var randPos = getRandomEmptyPos()
   
    renderCell(randPos, CHERRY);
    gBoard[randPos.i][randPos.j] = CHERRY;
    return randPos
}
function removeCherry(pos) {
    if (gBoard[pos.i][pos.j] === CHERRY) return
    gBoard[pos.i][pos.j] = EMPTY;
    renderCell(pos, EMPTY);
}
function getRandomEmptyPos() {
    var emptyPositions = []
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            var pos = { i: i, j: j }
            if (isCellEmpty(pos)) {
                emptyPositions.push(pos);
            }
        }
    }
    var randIdx = getRandomInt(0, emptyPositions.length);
    var randPos = emptyPositions[randIdx];
    return randPos
}

function isCellEmpty(pos) {
    return (gBoard[pos.i][pos.j] === EMPTY);

}

