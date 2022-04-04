'use strict'
const PACMAN = '😷';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 7
        },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell

    var nextLocation = getNextLocation(ev);
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j];
    // console.log('nextCell', nextCell)

    // return if cannot move
    if (nextCell === WALL) return

    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver();
            return
        }
        pacmanEatGhost(nextLocation);
    }
    if (nextCell === CHERRY) {
        updateScore(10);

    }
    if (nextCell === FOOD || nextCell === SUPERFOOD) {
        if (nextCell === SUPERFOOD) {
            gPacman.isSuper = true;
            setTimeout(function () {
                gPacman.isSuper = false;
                for (var i = 0; i < gDeadGhosts.length; i++) {
                    gGhosts.push(gDeadGhosts.pop(i));
                }
            }, 5000)
        }
        gNumOfFood--
        updateScore(1);
        checkVictory();

    }




    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY);

    // Move the pacman to new location
    // update the model
    gPacman.location.i = nextLocation.i;
    gPacman.location.j = nextLocation.j;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    // console.log('eventKeyboard.code', eventKeyboard.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}

function pacmanEatGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        if (nextLocation.i === ghost.location.i && nextLocation.j === ghost.location.j) {
            if (ghost.currCellContent === FOOD || ghost.currCellContent === SUPERFOOD) {
                ghost.currCellContent === EMPTY;
                gNumOfFood--;
                updateScore(1);
                checkVictory();
            }
            gDeadGhosts.push(gGhosts[i]);
            gGhosts.splice(i, 1);
        }

    }
}

