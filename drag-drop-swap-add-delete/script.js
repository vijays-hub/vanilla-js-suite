const gridContainer = document.querySelector(".grid_container");

const GRID_SIZE = 3;

function addDeleteIcon(imageWrapper, file) {}

function appendImageToGridItem(file, gridItem) {
  const selectedFile = file.files[0];

  /**
   * The idea is that we will have a separate div that holds the image and we
   * append it to the grid item. This way we can easily drag/drop/swap the image with
   * other grid items, without actually moving the main grid item!
   */
  const image = document.createElement("img");
  const imageWrapper = document.createElement("div");

  image.className = "image";
  imageWrapper.className = "image_wrapper";

  /**
   * We are also having a delete icon to delete the image from the grid item. So,
   * let's have it appended to the image wrapper. We are passing the file as an argument
   * to the addDeleteIcon function because we need to remove the file later on.
   */
  addDeleteIcon(imageWrapper, file);

  // Let's use the FileReader API to read the image file
  const reader = new FileReader();
  reader.onloadend = function () {
    image.src = reader.result;
  };

  // Append the image to the grid item only if a file is selected
  if (selectedFile) {
    reader.readAsDataURL(selectedFile);
    imageWrapper.appendChild(image);

    // Add the drag/drop event listeners
    imageWrapper.addEventListener("dragstart", () => {});
    imageWrapper.addEventListener("dragend", () => {});
  }

  gridItem.appendChild(imageWrapper);
}

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
    // Let's restrict the user to select only images for now.
    file.accept = "image/*";
    file.addEventListener("change", () =>
      appendImageToGridItem(file, gridItem)
    );

    gridItem.appendChild(addIcon);
    gridItem.appendChild(file);

    gridContainer.appendChild(gridItem);
  }
}

generateGridLayout();
