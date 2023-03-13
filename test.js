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
