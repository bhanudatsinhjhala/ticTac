/* Reset or Start New Game Code */

function resetBoard() {
  modifyCellsAttribute(false, "");
  emptyBoard();
  displayPlayersTurn(0);
  playerTurnValue = "x";
  emptyPositionOccupied();
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
  emptyPositionOccupied();
}

function emptyPositionOccupied() {
  players[0].positionsOccupied = [];
  players[1].positionsOccupied = [];
}
