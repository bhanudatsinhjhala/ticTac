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
  const getWinner = checkWinner(rowIndex, columnIndex, playerTurnValue);
  if (getWinner === "won") return declareWin(playerTurnValue);
  else if (getWinner === "tie")
    return (heading.innerText = `OOPs, the Game is Draw!!!!`);
  playerTurnValue = players[0].value === playerTurnValue ? "o" : "x";
  displayPlayersTurn(
    players.findIndex((player) => player.value === playerTurnValue)
  );
}

function displayPlayersTurn(index) {
  heading.innerText = `${players[index].name} place your ${players[index].value}`;
}

function checkWinner(rowIndex, columnIndex, playerTurnValue) {
  const isDraw = board.every((row) => row.every((value) => value !== "-"));
  if (isPlayerWin(rowIndex, columnIndex, playerTurnValue)) return "won";
  else if (isDraw) return "tie";
  return false;
}

function isPlayerWin(rowIndex, columnIndex, playerTurnValue) {
  if (checkRowAndColumn(rowIndex, columnIndex, playerTurnValue)) return true;
  else if (rowIndex !== columnIndex) return checkRightToLeft();
  else if (rowIndex === columnIndex && rowIndex === 1)
    return checkLeftToRight() || checkRightToLeft();
  else if (rowIndex === columnIndex) return checkLeftToRight();
  else return false;
}

function checkRowAndColumn(rowIndex, columnIndex, playerTurnValue) {
  return (
    board[rowIndex].every((cellVal) => cellVal === playerTurnValue) ||
    board.every((row) => row[columnIndex] === playerTurnValue)
  );
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

function newGame() {
  playersForm.style.display = "block";
  boardForm.style.display = "none";
  emptyBoard();
  modifyCellsAttribute(false, "");
  resetPlayersName();
}
function modifyCellsAttribute(disabled, value = null) {
  cells = [...cells];
  cells.forEach((cell) => {
    if (value !== null) cell.value = "";
    if (!disabled) return cell.removeAttribute("disabled");
    cell.setAttribute("disabled", true);
  });
}
