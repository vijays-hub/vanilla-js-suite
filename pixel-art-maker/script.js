/**
 * What are we trying to achieve?
 * We have a grid, and when user hovers over the grid, we mark all the grids he hovered on
 * with some color (picked by him using a color picker). Once user stops hovering and clicks on
 * any grid, we stop painting the color on the grid. User can reset the board, pick any color of
 * his wish and also set the Grid size.
 * 
 * TODO: This is a very simple implementation. Add enhancements as needed.
 */

// DOM Selectors
const reset_button = document.querySelector(".reset_button");
const color_picker = document.querySelector(".color_picker");
const grid_size_element = document.querySelector(".grid_size");
const grid_container = document.querySelector(".grid_container");

// Pick the default value on load.
let gridSize = grid_size_element.value;

let shouldDraw = false;

reset_button.addEventListener("click", resetBoard);
function resetBoard() {
  // Reset everything inside.
  grid_container.innerHTML = "";

  //   Generate the board again for the selected size.
  generateGrid();
}

// Trigger when user changes the values without enter
grid_size_element.addEventListener("keyup", () => updateGridSize());

// Trigger when user presses enter or changes the value using arrows of input type="number"
grid_size_element.addEventListener("change", () => updateGridSize());
function updateGridSize() {
  gridSize = grid_size_element.value;

  //   Reset the Board, which will clear existing grid and generates a fresh one with the new size.
  resetBoard();
}

function generateGrid() {
  // Update the CSS Variable value set in stylesheet
  grid_container.style.setProperty("--grid_size", gridSize);

  /**
   * You are generating a square grid (matrix). So if the user enters 20 as the grid size,
   * we would need to generate 20 columns and 20 rows. So the total grids would be 20*20=400
   */
  for (let index = 0; index < gridSize * gridSize; index++) {
    const gridBox = document.createElement("div");

    gridBox.classList.add("grid");

    gridBox.addEventListener("mouseover", () => onMouseOver(gridBox));

    // Called when user clicks on the grid. We would want to paint even if he clicks on a single cell.
    gridBox.addEventListener("mousedown", () => onMouseDown(gridBox));

    grid_container.appendChild(gridBox);
  }
}

function onMouseOver(grid) {
  if (!shouldDraw) return;

  grid.style.backgroundColor = color_picker.value;
}

function onMouseDown(grid) {
  grid.style.backgroundColor = color_picker.value;
}

/**
 * Add event listeners for mousedown and mouseup for setting the draw state.
 * So we keep setting draw to true when user has clicked on the mouse and keeps hovering.
 * And once we detect mouseup, set the draw state to false to stop drawing.
 */
window.addEventListener("mousedown", () => (shouldDraw = true));
window.addEventListener("mouseup", () => (shouldDraw = false));

generateGrid();
