let board;
emptyBoard();
function emptyBoard() {
  board = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];
}
let players = [
  {
    name: "player1",
    value: "x",
  },
  {
    name: "player2",
    value: "o",
  },
];
let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
let playersForm = document.querySelector(".players-form");
let boardForm = document.querySelector(".board");
let heading = document.querySelector(".heading");
let cells = document.querySelectorAll(".cells");

let playerTurnValue = "x";

function resetPlayersName() {
  player1.value = "";
  player2.value = "";
}
function getPlayersName() {
  if (!player1.value || !player2.value) {
    alert("Please do not leave fields empty");
    resetPlayersName();
    return;
  }
  if (player1.value.toLowerCase() === player2.value.toLowerCase()) {
    alert("Please do not enter duplicate player names");
    resetPlayersName();
    return;
  }
  players[0].name = player1.value.toLowerCase();
  players[1].name = player2.value.toLowerCase();
  playersForm.style.display = "none";
  boardForm.style.display = "block";
  displayPlayersTurn(0);
}

function btnClick(indexVal) {
  let rowIndex = indexVal.split("")[0];
  let columnIndex = indexVal.split("")[1];
  let cell = document.getElementById(indexVal);
  cell.value = playerTurnValue;
  cell.setAttribute("disabled", true);
  board[rowIndex][columnIndex] = playerTurnValue;
  if (isPlayerWin(rowIndex, columnIndex, playerTurnValue)) {
    declareWin(playerTurnValue);
    return;
  }
  if (isGameDraw()) {
    heading.innerText = `OOPs, the Game is Draw!!!!`;
    setTimeout(() => {
      resetBoard();
    }, 3000);
    return;
  }
  playerTurnValue = players[0].value === playerTurnValue ? "o" : "x";
  displayPlayersTurn(
    players.findIndex((player) => player.value === playerTurnValue)
  );
}

function displayPlayersTurn(index) {
  heading.innerText = `${players[index].name} place your ${players[index].value}`;
}

function isPlayerWin(rowIndex, columnIndex, playerTurnValue) {
  if (checkRow(rowIndex, playerTurnValue)) return true;
  else if (checkColumn(columnIndex, playerTurnValue)) return true;
  else if (rowIndex !== columnIndex) return checkRightToLeft();
  else if (rowIndex === columnIndex && rowIndex === 1)
    return checkLeftToRight() || checkRightToLeft();
  else if (rowIndex === columnIndex) return checkLeftToRight();
  else return false;
}

function checkRow(rowIndex, playerTurnValue) {
  return board[rowIndex].every((cellVal) => cellVal === playerTurnValue);
}

function checkLeftToRight() {
  let count = 0;
  for (let i = 0; i < 3; i++) {
    if (board[i][i] === playerTurnValue) count++;
  }
  if (count === 3) return true;
}

function checkRightToLeft() {
  let count = 0;
  for (let i = 0; i < 3; i++) {
    if (board[i][2 - i] === playerTurnValue) count++;
  }
  if (count === 3) return true;
}

function checkColumn(columnIndex, playerTurnValue) {
  return board.every((row) => row[columnIndex] === playerTurnValue);
}
function declareWin(playerTurnValue) {
  let index = players.findIndex((player) => player.value === playerTurnValue);
  heading.innerText = `Hurray ${players[index].name} wins`;
  modifyCellsAttribute(true);
}

function resetBoard() {
  modifyCellsAttribute(false, "");
  emptyBoard();
  displayPlayersTurn(0);
}

function modifyCellsAttribute(disabled, value = null) {
  cells = [...cells];
  cells.forEach((cell) => {
    if (!disabled) cell.removeAttribute("disabled");
    cell.setAttribute("disabled", true);
    if (value !== null) cell.value = "";
  });
}

function newGame() {
  playersForm.style.display = "block";
  boardForm.style.display = "none";
  emptyBoard();
  modifyCellsAttribute(false, "");
  resetPlayersName();
}

function isGameDraw() {
  return board.every((row) => row.every((value) => value !== "-"));
}