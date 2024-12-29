const gridContainer = document.querySelector(".grid_container");

const GRID_SIZE = 3;

function generateGridLayout() {
  gridContainer.style.setProperty("--grid-size", GRID_SIZE);

  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid_item");

    // The add icon to show that the user can add an image here
    const addIcon = document.createElement("div");
    addIcon.classList.add("add_icon");
    addIcon.textContent = "+";

    // The file input element to select an image
    const file = document.createElement("input");
    file.type = "file";
    file.className = "file";

    gridItem.appendChild(addIcon);
    gridItem.appendChild(file);

    gridContainer.appendChild(gridItem);
  }
}

generateGridLayout();
