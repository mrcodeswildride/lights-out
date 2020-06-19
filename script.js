let rows = document.getElementsByClassName(`row`)
let squares = document.getElementsByClassName(`square`)
let messageParagraph = document.getElementById(`messageParagraph`)

let gameOver = false

randomSetup()

for (let square of squares) {
  square.addEventListener(`click`, clickSquare)
}

function randomSetup() {
  for (let i = 0; i < 100; i++) {
    let randomNumber = Math.floor(Math.random() * squares.length)
    selectSquare(squares[randomNumber])
  }
}

function clickSquare() {
  if (!gameOver) {
    selectSquare(this)

    if (isSolved()) {
      messageParagraph.innerHTML = `Good job!`
      gameOver = true
    }
  }
}

function selectSquare(square) {
  square.classList.toggle(`on`)

  let squareToLeft = getNeighbor(square, -1, 0)
  let squareToRight = getNeighbor(square, 1, 0)
  let squareAbove = getNeighbor(square, 0, -1)
  let squareBelow = getNeighbor(square, 0, 1)

  if (squareToLeft != null) {
    squareToLeft.classList.toggle(`on`)
  }

  if (squareToRight != null) {
    squareToRight.classList.toggle(`on`)
  }

  if (squareAbove != null) {
    squareAbove.classList.toggle(`on`)
  }

  if (squareBelow != null) {
    squareBelow.classList.toggle(`on`)
  }
}

function getNeighbor(square, xDiff, yDiff) {
  let row = square.parentElement // row of square
  let y // y coordinate of square, set below
  let x // x coordinate of square, set below

  // loop through rows to determine y
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] == row) {
      y = i // found matching row, so set y
    }
  }

  // loop through squares in row to determine x
  for (let i = 0; i < row.children.length; i++) {
    if (row.children[i] == square) {
      x = i // found matching square, so set x
    }
  }

  // row of neighbor square
  let neighborRow = rows[y + yDiff]

  if (neighborRow == null) {
    // row is beyond edge, so no neighbor square
    return null
  }
  else {
    // if x + xDiff is beyond edge, will be null
    return neighborRow.children[x + xDiff]
  }
}

function isSolved() {
  for (let square of squares) {
    if (square.classList.contains(`on`)) {
      return false
    }
  }

  return true
}