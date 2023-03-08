const playerXclass = "x";
const playerOclass = "circle";
const winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]"); //Brackets necessary for selecting all cells.
const boardElement = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningTextElement = document.getElementById("winningMessageText");
let playerOturn = false; //X goes first.

//First function to run.
startGame();

//Restart button runs startGame.
restartButton.addEventListener("click", startGame);

function startGame() {
  playerOturn = false; //Starts game. O turn false means X goes first.
  cellElements.forEach((cell) => {
    cell.classList.remove(playerXclass); //Removes both player classes from all cells.
    cell.classList.remove(playerOclass);
    cell.addEventListener("click", handleCellClick, { once: true }); //Adds click behavior to each cell.
  });
  setBoardHoverClass(); //Allows hovering.
  winningMessageElement.classList.remove("show"); //Hides win message.
}

function handleCellClick(event) {
  //Target is what the event acts on.
  const cell = event.target;
  const currentClass = playerOturn ? playerOclass : playerXclass;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    //If checkWin(currentClass) = true...
    endGame(false); //endGame(false) returns Win message.
  } else if (isDraw()) {
    //If checkWin = false and isDraw = true...
    endGame(true); //endGame(true) returns Draw message.
  } else {
    //If neither of those...
    swapTurns(); //Removes player O's turn, return to X turn.
    setBoardHoverClass(); //Removes hover class and checks the turn to determine new hover.
  }
}
//No win, no draw, next turn.

//Adds the player class to the class of the clicked cell. Mark is from CSS.
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

//Goes through and checks if some combos match, then if ALL combos match, then checks if each cell contains the player class.
//The classes taken from the final line get tested against the .some to check if the winning combination is found.
//All of these return booleans.
function checkWin(currentClass) {
  return winCombo.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

//The second condition is used if the first fails due to false.
function endGame(draw) {
  if (draw) {
    winningTextElement.innerText = "It's a draw!";
  } else {
    winningTextElement.innerText = `${playerOturn ? p2name : p1name} wins!`;
  }
  winningMessageElement.classList.add("show");
}

let form1 = document.getElementById("form1");
const p1box = document.getElementById("p1box");
let p1name = "";

function getValue1(event) {
  event.preventDefault(); //Prevents auto submit by the form.
  p1name = p1box.value;
}

form1.addEventListener("submit", getValue1);

let form2 = document.getElementById("form2");
const p2box = document.getElementById("p2box");
let p2name = "";

function getValue2(event) {
  event.preventDefault(); //Prevents auto submit by the form.
  p2name = p2box.value;
}

form2.addEventListener("submit", getValue2);

//Checks if EVERY cell is taken up, meaning no more possible turns.
//Spreads the cells out then checks if the classlist contains x or o.
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(playerXclass) ||
      cell.classList.contains(playerOclass)
    );
  });
}

//Swaps between the two turns after clicking the cells.
//X goes first, default board state will never be O class.
function swapTurns() {
  playerOturn = !playerOturn;
}

//Changes hover for cells, determined by CSS that checks for x or circle class.
function setBoardHoverClass() {
  boardElement.classList.remove(playerXclass);
  boardElement.classList.remove(playerOclass);
  if (playerOturn) {
    boardElement.classList.add(playerOclass);
  } else {
    boardElement.classList.add(playerXclass);
  }
}
