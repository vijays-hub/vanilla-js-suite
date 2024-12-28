const boardContainer = document.getElementById("container");
const gameResult = document.getElementById("game-result");
const restartButton = document.getElementById("restart");

let boxes;
let turnX = true;
let GRID_SIZE = 3; // Default grid size

// This helps us to style the winning combination.
let correctCombination = null;

// TODO: If the board has to be dynamic, we might need to follow a different approach!
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Horizontal
  [3, 4, 5], // Horizontal
  [6, 7, 8], // Horizontal
  [0, 3, 6], // Vertical
  [1, 4, 7], // Vertical
  [2, 5, 8], // Vertical
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Diagonal
];

function isGameDraw() {
  /**
   * The condition to check if the game is a draw is just to check if all the boxes are filled.
   * We don't need to check for the winning status because the function will be called if there
   * is no winner.
   */
  const boardBoxes = document.querySelectorAll(".box");

  return [...boardBoxes].every((box) => box.textContent);
}

function paintWinningCombination() {
  const boardBoxes = document.querySelectorAll(".box");

  correctCombination.forEach((index) => {
    boardBoxes[index].classList.add("winning-box");
  });
}

// type: "victory" | "draw"; currentSelection: "X" | "O"
function gameOver(type, currentSelection) {
  /**
   * The function should display the game result.
   * If the game is a draw, display "It's a draw!"
   * If the game is a victory, display "Player X wins!" or "Player O wins!"
   *
   *
   * Also, you should disable the click event listener on the boxes when the game is over.
   * And, clear the board and reset the game.
   */
  if (type === "draw") {
    gameResult.textContent = "It's a draw!";
  } else if (type === "victory") {
    gameResult.textContent = `Player ${currentSelection} wins!`;
    paintWinningCombination();
  }

  boardContainer.style.pointerEvents = "none";
  restartButton.classList.add("show");
}

function checkVictory(currentSelection) {
  const boardBoxes = document.querySelectorAll(".box");

  /**
   * The function should return the status of the game.
   * How do you know the game is over?
   * 1. If there is a winner
   *      - You should find the winning combination, if there is any, and call the gameOver function with the
   *          appropriate parameters.
   *      - To find the winning combination, you should check if the current selection has the same value in the
   *          indexes of the winning combinations. So iterate over the winning combinations and check if the
   *          current selection has the same value in the indexes of the board.
   * 2. If the game is a draw
   *      - If there is no winner and all the boxes are filled, the game is a draw.
   *
   * If the game is over, you should call the gameOver function with the appropriate parameters.
   */

  return WINNING_COMBINATIONS.some((combination) => {
    // Save the correct combination to style it later.
    correctCombination = combination;

    /**
     * Each combination is an array of indexes. So we can use this index to check the value of the box.
     */
    return combination.every(
      (index) => boardBoxes[index].textContent === currentSelection
    );
  });
}

function handleCellClick(event) {
  const currentBox = event.target;

  if (turnX) {
    currentBox.textContent = "X";
  } else {
    currentBox.textContent = "O";
  }

  turnX = !turnX;

  const currentSelection = currentBox.textContent;
  const isVictory = checkVictory(currentSelection);

  if (isVictory) gameOver("victory", currentSelection);
  else if (isGameDraw()) gameOver("draw", currentSelection);
}

function clearBoard() {
  boardContainer.innerHTML = "";
  // Reset the pointer events so that after the game is over, the user can play again on the new board.
  boardContainer.style.pointerEvents = "auto";
  gameResult.textContent = "";
  restartButton.classList.remove("show");

  // Let the first player be X
  turnX = true;
}

function generateBoard() {
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const box = document.createElement("div");
    box.classList.add("box");

    /**
     * Check if box is in last column (e.g., for 3x3 grid: index 2, 5, 8)
     * Example: 3x3 grid
     * Index 7:
     *  (7 + 1) % 3 -> 8 % 3 -> 2 (False)
     * Index 8:
     * (8 + 1) % 3 -> 9 % 3 -> 0 (True) -> Last Column -> So remove the right border
     */
    if ((i + 1) % GRID_SIZE === 0) {
      box.style.borderRight = "none";
    }

    /**
     * Check if box is in last row (e.g., for 3x3 grid: index 6, 7, 8)
     * Example: 3x3 grid
     * Index 7:
     * 5 >= 3 * (3 - 1) -> 5 >= 6 (False)
     * Index 6:
     * 6 >= 3 * (3 - 1) -> 6 >= 6 (True) -> Last Row -> So remove the bottom border
     */
    if (i >= GRID_SIZE * (GRID_SIZE - 1)) {
      box.style.borderBottom = "none";
    }

    boardContainer.appendChild(box);

    // Add click event listener. Accept only one click
    box.addEventListener("click", handleCellClick, { once: true });
  }
}

function startGame(type) {
  if (type === "restart") clearBoard();
  generateBoard();
}

function setGridSize(size) {
  // Update CSS variable for styling
  const container = document.querySelector(".container");
  container.style.setProperty("--grid-size", size);

  GRID_SIZE = size;

  // Restart the game with the new grid size
  startGame("restart");
}

restartButton.addEventListener("click", () => startGame("restart"));

// TODO: Get the grid size from the user and set the grid size.
setGridSize(4);
