const board = document.getElementById("board");
const status = document.getElementById("status");

let currentPlayer = "X";
let cells = Array(9).fill("");
let isGameOver = false;

function createBoard() {
  board.innerHTML = "";
  cells.forEach((_, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", onCellClick);
    board.appendChild(cell);
  });

  status.textContent = `Player ${currentPlayer} turn`;
  status.className = "win-status"; 
}

function onCellClick(e) {
  const index = e.target.dataset.index;

  if (cells[index] !== "" || isGameOver) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    status.textContent = `🎉 Player ${currentPlayer} wins!`;
    status.className = "status-win";
    highlightWinningCells(currentPlayer);
    isGameOver = true;
  } else if (cells.every(cell => cell !== "")) {
    status.textContent = "It's a draw!";
    status.className = "status-draw";
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer} turn`;
    status.className = "win-status";
  }
}

function checkWin(player) {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],  
    [0,3,6], [1,4,7], [2,5,8],  
    [0,4,8], [2,4,6]            
  ];

  return winCombos.some(combo =>
    combo.every(index => cells[index] === player)
  );
}

function highlightWinningCells(player) {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let combo of winCombos) {
    if (combo.every(index => cells[index] === player)) {
      combo.forEach(index => {
        board.children[index].style.backgroundColor = "#00ff88";
        board.children[index].style.color = "#1f1f1f";
      });
      break;
    }
  }
}

function restartGame() {
  cells = Array(9).fill("");
  currentPlayer = "X";
  isGameOver = false;
  createBoard();
}

createBoard();
