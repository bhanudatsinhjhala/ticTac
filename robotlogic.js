function robotsFirstTurn(positionsOccupied) {
  const playerPosition = positionsOccupied[0];
  const centerPositions = ["01", "10", "12", "21"];
  const isPositionCenter = centerPositions.includes(playerPosition);
  if (playerPosition === "11") {
    const robotSuitablePositions = ["00", "02", "20", "22"];
    const index = Math.round(0 + Math.random() * 3);
    return btnClick(robotSuitablePositions[index]);
  }
  if (isPositionCenter) {
    const rowIndex = playerPosition.split("")[0];
    const columnIndex = playerPosition.split("")[1];
    const robotSuitablePositions = ["0", "2"];
    const index = Math.round(0 + Math.random() * 1);
    if (rowIndex == 0 || rowIndex == 2)
      return btnClick(`${rowIndex}${robotSuitablePositions[index]}`);
    return btnClick(`${robotSuitablePositions[index]}${columnIndex}`);
  }
  return btnClick("11");
}

function robotsSecondTurn(robotPositions, playerPositions) {
  const indexVal = robotPositions[0];
  const rowIndex = +indexVal.split("")[0];
  const columnIndex = +indexVal.split("")[1];
  const cornerPositions = ["00", "20", "02", "22"];
  const centerPositions = ["01", "10", "12", "21"];
  if (
    cornerPositions.includes(playerPositions[1]) &&
    !centerPositions.includes(playerPositions[0])
  ) {
    console.log("corner");
    if (columnIndex == "2" && board[rowIndex][0] === "-")
      return btnClick(`${rowIndex}0`);
    if (board[rowIndex][2] === "-") return btnClick(`${rowIndex}2`);
  }
  const player1Row = rowIndex == 0 ? rowIndex + 1 : rowIndex - 1;
  const player1Column = columnIndex == 0 ? columnIndex + 1 : columnIndex - 1;
  if (
    centerPositions.includes(playerPositions[0]) &&
    centerPositions.includes(playerPositions[1])
  ) {
    console.log("besides robot");
    return btnClick(`11`);
  }
  if (
    centerPositions.includes(playerPositions[0]) ||
    cornerPositions.includes(playerPositions[1])
  ) {
    const rowIndex = playerPositions[1].split("")[0];
    if (robotPositions[0].split("")[0] == rowIndex) {
      const columnIndex = playerPositions[1].split("")[1];
      const rowIndex = playerPositions[0].split("")[0];
      return btnClick(`${rowIndex}${columnIndex}`);
    }
    return btnClick(`${rowIndex}${1}`);
  }
  // else if (board[1][0] == "x" || board[1][2] == "x") {
  //   console.log("middle row");
  //   const rowIndex = playerPositions[0].split("")[0];
  //   // return btnClick(`${rowIndex}1`);
  //   return btnClick(`11`);
  // }
  else if (board[rowIndex][1] === "-") return btnClick(`${rowIndex}1`);
  else return randomPosition();
}

function tacklePlayer1(tacklePosition, board) {
  for (let i = 0; i < 3; i++) {
    const position = tacklePosition[0][i];
    const rowIndex = position.split("")[0];
    const columnIndex = position.split("")[1];
    if (board[rowIndex][columnIndex] === "-") {
      return btnClick(`${position}`);
    }
  }
}

function getPlayerWinningPosition(positionsOccupied, player) {
  const playerWinningPositions = winningPositions.filter((positions) => {
    let count = 0;
    for (let i = 0; i < positions.length; i++) {
      const position = positions[i];
      const isUsersVal = positionsOccupied.includes(position);
      const rowIndex = position.split("")[0];
      const columnIndex = position.split("")[1];
      let isValRobotsValue;
      if (player === "robot")
        isValRobotsValue = board[rowIndex][columnIndex] === "x" ? true : false;
      else
        isValRobotsValue = board[rowIndex][columnIndex] === "o" ? true : false;

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

function randomPosition() {
  let rowIndex = Math.round(0 + Math.random() * (2 - 0));
  let columnIndex = Math.round(0 + Math.random() * (2 - 0));
  while (board[rowIndex][columnIndex] !== "-") {
    rowIndex = Math.round(0 + Math.random() * (2 - 0));
    columnIndex = Math.round(0 + Math.random() * (2 - 0));
  }
  btnClick(`${rowIndex}${columnIndex}`);
}
