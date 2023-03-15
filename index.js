let board;
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

emptyBoard();
function emptyBoard() {
  board = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];
}

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
  const rowIndex = indexVal.split("")[0];
  const columnIndex = indexVal.split("")[1];
  const cell = document.getElementById(indexVal);

  cell.value = playerTurnValue;
  cell.setAttribute("disabled", true);

  board[rowIndex][columnIndex] = playerTurnValue;
  const getWinner = checkWinner(rowIndex, columnIndex);

  if (getWinner == "x") return declareWin(getWinner);
  else if (getWinner == "o") return declareWin(getWinner);
  else if (getWinner == "tie")
    return (heading.innerText = `OOPs, the Game is Draw!!!!`);

  playerTurnValue = players[0].value === playerTurnValue ? "o" : "x";
  const index = playerTurnValue == "x" ? 0 : 1;
  displayPlayersTurn(index);
}

function displayPlayersTurn(index) {
  heading.innerText = `${players[index].name} place your ${players[index].value}`;
}

function checkWinner(rowIndex, columnIndex) {
  let emptyCells;
  board.flat(Infinity).forEach((value) => {
    if (value == "-") emptyCells++;
  });
  if (
    board[rowIndex][0] == board[rowIndex][1] &&
    board[rowIndex][0] == board[rowIndex][2]
  )
    return board[rowIndex][0];
  else if (
    board[0][columnIndex] == board[1][columnIndex] &&
    board[0][columnIndex] == board[2][columnIndex]
  )
    return board[0][columnIndex];
  else if (board[0][0] == board[1][1] && board[0][0] == board[2][2])
    return board[0][0];
  else if (board[0][2] == board[1][1] && board[2][0] == board[0][2])
    return board[0][2];
  else if (emptyCells == 0) return "tie";
  return null;
}

function declareWin(playerTurnValue) {
  const index = playerTurnValue == "x" ? 0 : 1;
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
