let board;
let winningPositions = [
  ["00", "01", "02"],
  ["10", "11", "12"],
  ["20", "21", "22"],
  ["00", "10", "20"],
  ["01", "11", "21"],
  ["02", "12", "22"],
  ["00", "11", "22"],
  ["02", "11", "20"],
];
let players = [
  {
    name: "player1",
    value: "x",
  },
  {
    name: "robot",
    value: "o",
  },
];

let player1 = document.querySelector(".player1");
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
/* User Input Form for player name and board form input Code */

function getPlayersName() {
  if (!player1.value) {
    alert("Please do not leave fields empty");
    player1.value = "";
    return;
  }
  players[0].name = player1.value.toLowerCase();
  playersForm.style.display = "none";
  boardForm.style.display = "block";
  displayPlayersTurn(0);
}

function btnClick(indexVal) {
  const rowIndex = indexVal.split("")[0];
  const columnIndex = indexVal.split("")[1];
  const cell = document.getElementById(indexVal);
  board[rowIndex][columnIndex] = playerTurnValue;
  const getWinner = checkWinner(board, rowIndex, columnIndex);

  cell.value = playerTurnValue;
  cell.setAttribute("disabled", true);

  if (getWinner === "x") return declareWin("x");
  else if (getWinner === "o") return declareWin("o");
  else if (getWinner === "tie")
    return (heading.innerText = `OOPs, the Game is Draw!!!!`);

  playerTurnValue = playerTurnValue == "x" ? "o" : "x";
  const nextPlayerIndex = playerTurnValue == "x" ? 0 : 1;

  displayPlayersTurn(nextPlayerIndex);
}

function displayPlayersTurn(nextPlayerIndex) {
  heading.innerText = `${players[nextPlayerIndex].name} place your ${players[nextPlayerIndex].value}`;
  if (nextPlayerIndex === 1) return robotPlay();
}

/* Checking Is Player Won */

function checkWinner(board, rowIndex, columnIndex) {
  let emptyCells = 0;
  board.flat(Infinity).forEach((value) => {
    if (value == "-") {
      emptyCells++;
    }
  });
  if (
    board[rowIndex][0] == board[rowIndex][1] &&
    board[rowIndex][0] == board[rowIndex][2]
  )
    return board[rowIndex][0];
  else if (
    board[0][columnIndex] === board[1][columnIndex] &&
    board[0][columnIndex] === board[2][columnIndex]
  )
    return board[0][columnIndex];
  else if (board[0][0] == board[1][1] && board[0][0] == board[2][2])
    return board[0][0];
  else if (board[0][2] == board[1][1] && board[0][2] == board[2][0])
    return board[0][2];
  else if (emptyCells === 0) return "tie";
  return null;
}

function declareWin(playerTurnValue) {
  const index = playerTurnValue == "x" ? 0 : 1;
  heading.innerText = `Hurray ${players[index].name} wins`;
  modifyCellsAttribute(true);
}

/* Robot's Turn */

function robotPlay() {
  let bestPoints = -Infinity;
  let bestPosition;
  const newBoard = board;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (newBoard[i][j] == "-") {
        newBoard[i][j] = "o";
        let point = minMax(newBoard, false, i, j);
        newBoard[i][j] = "-";
        if (point > bestPoints) {
          bestPosition = `${i}${j}`;
          bestPoints = point;
        }
      }
    }
  }
  return btnClick(bestPosition);
}
