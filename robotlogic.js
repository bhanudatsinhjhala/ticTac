function robotsFirstTurn(positionsOccupied) {
  const playerPosition = positionsOccupied[0];
  const centerPositions = ["01", "10", "12", "21"];
  const isPositionCenter = centerPositions.includes(playerPosition);
  if (playerPosition === "11") {
    const robotSuitablePositions = ["00", "02", "20", "22"];
    const index = Math.round(0 + Math.random() * 3);
    return btnClick(robotSuitablePositions[index]);
  }
  return btnClick("11");
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
  return btnClick(`${rowIndex}${columnIndex}`);
}
