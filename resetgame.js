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
