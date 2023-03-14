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
    positionsOccupied: [],
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
  const getWinner = checkWinner(rowIndex, columnIndex, playerTurnValue);
  if (getWinner === "won") return declareWin(playerTurnValue);
  else if (getWinner === "tie")
    return (heading.innerText = `OOPs, the Game is Draw!!!!`);
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
  let robot = players[1];
  let robotPositions = robot.positionsOccupied;
  let getWinningPositionOfRobot = getPlayerWinningPosition(
    robotPositions,
    "robot"
  );
  let player1 = players[0];
  let player1PositionsOccupied = player1.positionsOccupied;
  let tacklePosition = getPlayerWinningPosition(
    player1PositionsOccupied,
    "player1"
  );
  if (player1PositionsOccupied.length === 1) {
    return robotPlaceFirstPosition(player1PositionsOccupied);
  }
  if (getWinningPositionOfRobot.length !== 0) {
    let indexVal = getWinningPositionOfRobot[0].find((value, index) => {
      let rowIndex = value.split("")[0];
      let columnIndex = value.split("")[1];
      if (board[rowIndex][columnIndex] === "-") {
        robot.positionsOccupied.push(value);
        return [rowIndex, columnIndex];
      }
    });
    if (indexVal) {
      btnClick(`${indexVal[0]}${indexVal[1]}`);
    }
    return;
  }
  if (tacklePosition.length !== 0) {
    return putRobotsValue(tacklePosition, player1PositionsOccupied);
  }
  if (robotPositions.length == 1) {
    console.log("robot's Second position");
    let indexVal = robotPositions[0];
    let rowIndex = indexVal.split("")[0];
    let columnIndex = indexVal.split("")[1];

    if (player1PositionsOccupied.includes("00")) {
      if (columnIndex == "2") {
        console.log("columnIndex 2----");
        robotPositions.push(`${rowIndex}0`);
        return btnClick(`${rowIndex}0`);
      }
      robotPositions.push(`${rowIndex}2`);
      return btnClick(`${rowIndex}2`);
    }
    robotPositions.push(`${rowIndex}1`);
    return btnClick(`${rowIndex}1`);
  }

  let rowIndex = Math.round(0 + Math.random() * (2 - 0));
  let columnIndex = Math.round(0 + Math.random() * (2 - 0));
  while (board[rowIndex][columnIndex] !== "-") {
    rowIndex = Math.round(0 + Math.random() * (2 - 0));
    columnIndex = Math.round(0 + Math.random() * (2 - 0));
  }
  robot.positionsOccupied.push(`${rowIndex}${columnIndex}`);
  btnClick(`${rowIndex}${columnIndex}`);
}

function robotPlaceFirstPosition(positionsOccupied) {
  let playerPosition = positionsOccupied[0];
  let cornerPositions = ["00", "02", "20", "22"];
  let centerPositions = ["01", "10", "12", "21"];
  let isPositionCenter = centerPositions.includes(playerPosition);
  let isPositionCorner = cornerPositions.includes(playerPosition);
  if (playerPosition === "11") {
    let robotSuitablePositions = ["00", "02", "20", "22"];
    let index = Math.round(0 + Math.random() * 4);
    players[1].positionsOccupied.push(robotSuitablePositions[index]);
    return btnClick(robotSuitablePositions[index]);
  }
  if (isPositionCorner) {
    players[1].positionsOccupied.push("11");
    return btnClick("11");
  }
  if (isPositionCenter) {
    let rowIndex = playerPosition.split("")[0];
    let columnIndex = playerPosition.split("")[1];
    let robotSuitablePositions = ["0", "2"];
    let index = Math.round(0 + Math.random() * 1);
    if (rowIndex == 0 || rowIndex == 2) {
      players[1].positionsOccupied.push(
        `${rowIndex}${robotSuitablePositions[index]}`
      );
      return btnClick(`${rowIndex}${robotSuitablePositions[index]}`);
    }
    players[1].positionsOccupied.push(
      `${robotSuitablePositions[index]}${columnIndex}`
    );
    btnClick(`${robotSuitablePositions[index]}${columnIndex}`);
  }
}
function putRobotsValue(tacklePosition, positionsOccupied) {
  let indexVal = tacklePosition[0].find((value) => {
    let isPositionIncluded = positionsOccupied.includes(value);
    if (!isPositionIncluded) {
      return value;
    }
  });
  let rowIndex = indexVal.split("")[0];
  let columnIndex = indexVal.split("")[1];
  if (board[rowIndex][columnIndex] === "-") {
    players[1].positionsOccupied.push(indexVal);
    return btnClick(`${indexVal}`);
  }
}

function getPlayerWinningPosition(positionsOccupied, player) {
  let playerWinningPositions = winningPositions.filter((positions) => {
    let count = 0;
    for (let i = 0; i < positions.length; i++) {
      let position = positions[i];
      let isUsersVal = positionsOccupied.find((value) => {
        return value === position;
      });
      let rowIndex = position.split("")[0];
      let columnIndex = position.split("")[1];
      let isValRobotsValue;
      if (player === "robot") {
        isValRobotsValue = board[rowIndex][columnIndex] === "x" ? true : false;
      } else {
        isValRobotsValue = board[rowIndex][columnIndex] === "o" ? true : false;
      }
      if (isValRobotsValue) {
        count = 0;
        break;
      }
      if (isUsersVal) count++;
    }
    if (count >= 2) return positions;
  });
  return playerWinningPositions;
}
/* Reset or Start New Game Code */

function resetBoard() {
  modifyCellsAttribute(false, "");
  emptyBoard();
  displayPlayersTurn(0);
  playerTurnValue = "x";
  players[0].positionsOccupied = [];
  players[1].positionsOccupied = [];
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
  players[0].positionsOccupied = [];
}
