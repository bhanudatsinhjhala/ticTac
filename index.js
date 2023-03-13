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
  console.log("----- playersTurnValue ----- ", playerTurnValue);
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
  let robot = players[1];
  let robotPosition = robot.positionsOccupied;
  let getWinningPositionOfRobot = getPlayerWinningPosition(
    robotPosition,
    "robot"
  );
  let tacklePosition = getPlayerWinningPosition(
    players[0].positionsOccupied,
    "player1"
  );
  let positionsOccupied = players[0].positionsOccupied;
  console.log("---- getWinningPositionOfRobot:", getWinningPositionOfRobot);
  console.log("-------==== getWinningPositionOfPlayer:===== ", tacklePosition);
  console.log("positionsOccupied:", positionsOccupied);
  let player1 = players[0];
  if (player1.positionsOccupied.length === 1) {
    console.log("--- robot first turn -----");
    robotPlaceFirstPosition(player1.positionsOccupied);
    return;
  }
  if (getWinningPositionOfRobot.length !== 0) {
    console.log("--- robot winning turn -----");
    let indexVal = getWinningPositionOfRobot[0].find((value, index) => {
      let rowIndex = value.split("")[0];
      let columnIndex = value.split("")[1];
      if (board[rowIndex][columnIndex] === "-") {
        robot.positionsOccupied.push(value);
        return [rowIndex, columnIndex];
      }
    });
    console.log("indexVal", indexVal);
    if (indexVal) {
      btnClick(`${indexVal[0]}${indexVal[1]}`);
    }
    return;
  }
  if (tacklePosition.length !== 0) {
    console.log("--- robot losing turn -----");
    return putRobotsValue(tacklePosition, positionsOccupied);
  }
  if (robot.positionsOccupied.length == 1 && tacklePosition.length === 0) {
    console.log("--- robot second turn -----");
    let indexVal = robot.positionsOccupied[0];
    let rowIndex = indexVal.split("")[0];
    let columnIndex = indexVal.split("")[1];
    if (columnIndex == 2 && board[rowIndex][0] === "-") {
      robot.positionsOccupied.push(`${rowIndex}0`);
      btnClick(`${rowIndex}0`);
      return;
    } else if (columnIndex == 0 && board[rowIndex][2] === "-") {
      robot.positionsOccupied.push(`${rowIndex}2`);
      btnClick(`${rowIndex}2`);
      return;
    }
  }
  console.log("--- robot random turn -----");
  let rowIndex = Math.round(0 + Math.random() * (2 - 0));
  let columnIndex = Math.round(0 + Math.random() * (2 - 0));
  console.log("random index----", rowIndex, columnIndex);
  while (board[rowIndex][columnIndex] !== "-") {
    rowIndex = Math.round(0 + Math.random() * (2 - 0));
    columnIndex = Math.round(0 + Math.random() * (2 - 0));
  }
  robot.positionsOccupied.push(`${rowIndex}${columnIndex}`);
  btnClick(`${rowIndex}${columnIndex}`);
}

function robotPlaceFirstPosition(positionsOccupied) {
  console.log("---- Robot's First Position -----");
  let playerPosition = positionsOccupied[0];
  let cornerPositions = ["00", "02", "20", "22"];
  let centerPositions = ["01", "10", "12", "21"];
  let isPositionCenter = centerPositions.includes(playerPosition);
  let isPositionCorner = cornerPositions.includes(playerPosition);
  if (playerPosition === "11") {
    let robotSuitablePositions = ["00", "02", "20", "22"];
    let index = Math.round(0 + Math.random() * 4);
    players[1].positionsOccupied.push(robotSuitablePositions[index]);
    btnClick(robotSuitablePositions[index]);
    return;
  }
  if (isPositionCorner) {
    players[1].positionsOccupied.push("11");
    btnClick("11");
    return;
  }
  if (isPositionCenter) {
    let rowIndex = playerPosition.split("")[0];
    let columnIndex = playerPosition.split("")[1];
    console.log("isPositionCenter=-=-=-=-=", rowIndex, columnIndex);
    if (rowIndex == 0 || rowIndex == 2) {
      console.log("====== row ====", playerPosition);
      let robotSuitablePositions = ["0", "2"];
      let index = Math.round(0 + Math.random() * 1);
      console.log(
        "isPositionCenter (rowIndex)-=-=-=-",
        rowIndex,
        robotSuitablePositions[index]
      );
      players[1].positionsOccupied.push(
        `${rowIndex}${robotSuitablePositions[index]}`
      );
      btnClick(`${rowIndex}${robotSuitablePositions[index]}`);
      return;
    }
    if (columnIndex == 0 || columnIndex == 2) {
      console.log("====== column ====", playerPosition);
      let robotSuitablePositions = ["0", "2"];
      let index = Math.round(0 + Math.random() * 1);
      console.log(
        "isPositionCenter (columnIndex)-=-=-=-",
        robotSuitablePositions[index],
        columnIndex
      );
      players[1].positionsOccupied.push(
        `${robotSuitablePositions[index]}${columnIndex}`
      );
      btnClick(`${robotSuitablePositions[index]}${columnIndex}`);
      return;
    }
  }
}
function putRobotsValue(tacklePosition, positionsOccupied) {
  let indexVal;
  indexVal = tacklePosition[0].filter((value) => {
    console.log("value:", value);
    let resultIndex = positionsOccupied.includes(value);
    console.log(" resultIndex:", resultIndex);
    if (!resultIndex) {
      return value;
    }
  });
  console.log("indexVal:", indexVal);
  let rowIndex = indexVal[0].split("")[0];
  let columnIndex = indexVal[0].split("")[1];
  if (board[rowIndex][columnIndex]) {
    players[1].positionsOccupied.push(indexVal[0]);
    btnClick(`${indexVal}`);
  } else {
    putRobotsValue();
  }
}

function getPlayerWinningPosition(positionsOccupied, player) {
  console.log(`[${player}] positionsOccupied----`, positionsOccupied);
  let playerWinningPositions = winningPositions.filter((positions) => {
    let count = 0;
    console.log(`[${player}] positions----`, positions);
    for (let i = 0; i < positions.length; i++) {
      let position = positions[i];
      console.log(`[${player}] particular position ----`, position);
      let isUsersVal =
        positionsOccupied.find((value) => {
          console.log("value, positiion", value, position);
          return value === position;
        }) !== undefined;
      console.log("isUsersVal:", isUsersVal);
      let rowIndex = position.split("")[0];
      let columnIndex = position.split("")[1];
      let isValRobotsValue;
      if (player === "robot") {
        isValRobotsValue = board[rowIndex][columnIndex] === "x" ? true : false;
      } else {
        isValRobotsValue = board[rowIndex][columnIndex] === "o" ? true : false;
      }
      console.log("isValRobotsValue:", isValRobotsValue);
      if (isValRobotsValue) {
        count = 0;
        break;
      }
      if (isUsersVal) {
        count++;
        console.log("count increased", count);
      }
    }
    console.log(`[${player}] count position----`, count);
    if (count >= 2) {
      console.log(` [${player}] ---- positions selected:`, positions);
      return positions;
    }
  });
  // console.log(`[${player}] ----- player winning positions -----`, playerWinningPositions);
  console.log(`-------- ${player} end-----------`);
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

function isGameDraw() {
  return board.every((row) => row.every((value) => value !== "-"));
}
