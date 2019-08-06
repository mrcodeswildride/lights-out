var rows = document.querySelectorAll(".row");
var squares = document.querySelectorAll(".row div");
var messageDisplay = document.getElementById("message");

var gameInProgress = true;

for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", clickSquare);
}

randomSetup();

function randomSetup() {
    while (lightsOut()) {
        for (var i = 0; i < 100; i++) {
            var randomSquareIndex = Math.floor(Math.random() * squares.length);
            selectSquare(squares[randomSquareIndex]);
        }
    }
}

function clickSquare() {
    if (gameInProgress) {
        selectSquare(this);

        if (lightsOut()) {
            gameInProgress = false;
            messageDisplay.innerHTML = "Good job!";
        }
    }
}

function selectSquare(square) {
    toggle(square);
    toggleNeighbor(square, -1, 0);
    toggleNeighbor(square, 0, -1);
    toggleNeighbor(square, 1, 0);
    toggleNeighbor(square, 0, 1);
}

function toggle(square) {
    if (square.classList.contains("on")) {
        square.classList.remove("on");
    }
    else {
        square.classList.add("on");
    }
}

function toggleNeighbor(square, xDiff, yDiff) {
    var x = parseInt(square.getAttribute("index"), 10);
    var y = parseInt(square.parentElement.getAttribute("index"), 10);

    var row = rows[y + yDiff];
    var neighbor = null;

    if (row) {
        neighbor = row.querySelector('div[index="' + (x + xDiff) + '"]');
    }

    if (neighbor) {
        toggle(neighbor);
    }
}

function lightsOut() {
    for (var i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains("on")) {
            return false;
        }
    }

    return true;
}
