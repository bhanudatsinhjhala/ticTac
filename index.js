let board;
emptyBoard();
function emptyBoard() {
  board = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];
}
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
    positionsOccupied: [],
  },
  {
    name: "robot",
    value: "o",
  },
];
let player1 = document.querySelector(".player1");
// let player2 = document.querySelector(".player2");
let playersForm = document.querySelector(".players-form");
let boardForm = document.querySelector(".board");
let heading = document.querySelector(".heading");
let cells = document.querySelectorAll(".cells");

let playerTurnValue = "x";

/* User Input Form for player name and board form input Code */

function resetPlayersName() {
  player1.value = "";
  // player2.value = "";
}
function getPlayersName() {
  if (!player1.value) {
    alert("Please do not leave fields empty");
    resetPlayersName();
    return;
  }
  // if (player1.value.toLowerCase() === player2.value.toLowerCase()) {
  //   alert("Please do not enter duplicate player names");
  //   resetPlayersName();
  //   return;
  // }
  players[0].name = player1.value.toLowerCase();
  // players[1].name = player2.value.toLowerCase();
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
    console.log("is Player win ---", "yes");
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
  if (playerTurnValue === "x") players[0].positionsOccupied.push(indexVal);
  playerTurnValue = players[0].value === playerTurnValue ? "o" : "x";
  let nextPlayerIndex = players.findIndex(
    (player) => player.value === playerTurnValue
  );
  displayPlayersTurn(nextPlayerIndex, rowIndex, columnIndex);
}

function displayPlayersTurn(nextPlayerIndex) {
  heading.innerText = `${players[nextPlayerIndex].name} place your ${players[nextPlayerIndex].value}`;
  if (nextPlayerIndex === 1) return robotPlay();
}

/* Checking Is Player Won and declare it Code. */

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

/* Robot and User Board checking */

function robotPlay() {
  let tacklePosition = checkPlayerWinningPosition();
  console.log(
    "🚀 ~line number file: index.js:140 ~line number robotPlay ~line number tacklePosition:",
    tacklePosition
  );
  let positionsOccupied = players[0].positionsOccupied;
  console.log(
    "🚀 ~line number file: index.js:145 ~line number robotPlay ~line number positionsOccupied:",
    positionsOccupied
  );
  if (tacklePosition.length !== 0) {
    putRobotsValue(tacklePosition, positionsOccupied);
  } else {
    let rowIndex = Math.round(0 + Math.random() * (2 - 0));
    let columnIndex = Math.round(0 + Math.random() * (2 - 0));
    console.log(rowIndex, columnIndex);
    while (board[rowIndex][columnIndex] !== "-") {
      rowIndex = Math.round(0 + Math.random() * (2 - 0));
      columnIndex = Math.round(0 + Math.random() * (2 - 0));
      console.log("while works -----", rowIndex, columnIndex);
    }
    btnClick(`${rowIndex}${columnIndex}`);
  }
}

function putRobotsValue(tacklePosition, positionsOccupied) {
  let indexVal;
  indexVal = tacklePosition[0].filter((value) => {
    // console.log(
    //   "🚀 ~line number file: index.js:151 ~line number robotPlay ~line number value:",
    //   value
    // );
    // console.log(
    //   "find--------",
    //   tacklePosition.find((item) => item === value)
    // );
    let resultIndex = positionsOccupied.includes(value);
    // console.log(
    //   "🚀 ~line number file: index.js:161 ~line number indexVal ~line number resultIndex:",
    //   resultIndex
    // );
    if (!resultIndex) {
      return value;
    }
  });
  console.log(
    "🚀 ~line number file: index.js:168 ~line number indexVal ~line number indexVal:",
    indexVal
  );
  let rowIndex = indexVal[0].split("")[0];
  let columnIndex = indexVal[0].split("")[1];
  if (board[rowIndex][columnIndex]) {
    btnClick(`${indexVal}`);
  } else {
    putRobotsValue();
  }
}

function checkPlayerWinningPosition() {
  let positionsOccupied = players[0].positionsOccupied;
  console.log("positionsOccupied----", positionsOccupied);
  let playerWinningPositions = winningPositions.filter((positions) => {
    let count = 0;
    console.log("positions----", positions);
    positions.forEach((position) => {
      console.log("particular position ----", position);
      let isUsersVal =
        positionsOccupied.find((value) => value === position) !== undefined;
      // console.log("isUsersVal:", isUsersVal);
      let rowIndex = position.split("")[0];
      let columnIndex = position.split("")[1];
      let isValRobotsValue =
        board[rowIndex][columnIndex] === "o" ? true : false;
      // console.log("isValRobotsValue:", isValRobotsValue);
      if (isValRobotsValue) return (count = 0);
      if (isUsersVal) return count++;
    });
    console.log("count position----", count);
    if (count >= 2) {
      console.log("---- positions selected:", positions);
      return positions;
    }
  });
  console.log("----- player winning positions -----", playerWinningPositions);
  return playerWinningPositions;
}
/* Reset or Start New Game Code */

function resetBoard() {
  modifyCellsAttribute(false, "");
  emptyBoard();
  displayPlayersTurn(0);
  players[0].positionsOccupied = [];
}

function modifyCellsAttribute(disabled, value = null) {
  cells = [...cells];
  cells.forEach((cell) => {
    if (value !== null) cell.value = "";
    if (!disabled) return cell.removeAttribute("disabled");
    cell.setAttribute("disabled", true);
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
