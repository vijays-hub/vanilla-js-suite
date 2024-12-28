let cellClickOrder = [];
let isResetting = false; // Helps avoid onclick event during reset

const layoutContainer = document.querySelector(".layout");
const GRID_SIZE = 3;
const GRID_ELEMENTS = GRID_SIZE * GRID_SIZE;
const CELLS_TO_SKIP = 2;

function handleCellClick(event) {
  if (isResetting) return;

  const cellElement = event.target;

  if (!cellElement.classList.contains("active")) {
    cellElement.classList.add("active");
    cellClickOrder.push(cellElement);

    // To cater to the requirement of skipping some cells, we need to check if we have clicked all other cells!
    if (cellClickOrder.length === GRID_ELEMENTS - CELLS_TO_SKIP) {
      isResetting = true;
      resetColors();
    }
  }
}

function resetColors() {
  /**
   * Loop through each box in the click order array, and reset it's color. While doing the
   * reset, we don't want to reset all at once. Let's have a delay of 0.5s between each reset.
   * This way the user can see the color change.
   */
  cellClickOrder.forEach((cell, index) => {
    setTimeout(() => {
      cell.classList.remove("active");

      //   If this is the last cell, reset the click order array and mark resetting as false
      if (index === cellClickOrder.length - 1) {
        cellClickOrder = [];
        isResetting = false;
      }
    }, index * 500);
  });
}

// TODO: Generate layout based on gridSize taken from user input!
function generateLayout(gridSize) {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement("div");
      /**
       * As per the updated README.md, we should avoid rendering some boxes in row 2.
       * So basically, we should not render any box in row 2 except the first one.
       * And render all boxes in row 1 and 3. So, we simply add a box without the
       * cell class in it!
       */
      if (i === 1 && j > 0) {
        cell.classList.add("empty-cell");
        // Don't do anything on click
        cell.addEventListener("click", () => {});
        layoutContainer.appendChild(cell);

        // Very Important. Don't use RETURN here. We need to continue the loop for other cells.
        continue;
      }

      cell.classList.add("cell");
      cell.setAttribute("data-index", `${i}-${j}`);

      // Attack a click event to each cell
      cell.addEventListener("click", handleCellClick);

      layoutContainer.appendChild(cell);
    }
  }
}

generateLayout(3);
