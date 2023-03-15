const points = {
  x: -1,
  o: 1,
  tie: 0,
};

function minMax(newBoard, isMaximizing, rowIndex, columnIndex) {
  const result = checkWinner(newBoard, rowIndex, columnIndex);
  if (result !== null) {
    return points[result];
  }

  if (isMaximizing) {
    let bestPoints = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (newBoard[i][j] === "-") {
          newBoard[i][j] = "o";
          const point = minMax(newBoard, false, i, j);
          newBoard[i][j] = "-";
          bestPoints = Math.max(point, bestPoints);
        }
      }
    }
    return bestPoints;
  } else {
    let bestPoints = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (newBoard[i][j] === "-") {
          newBoard[i][j] = "x";
          const point = minMax(newBoard, true, i, j);
          newBoard[i][j] = "-";
          bestPoints = Math.min(point, bestPoints);
        }
      }
    }
    return bestPoints;
  }
}
