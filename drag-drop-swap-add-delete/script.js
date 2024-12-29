const gridContainer = document.querySelector(".grid_container");

const GRID_SIZE = 3;

// This will be used to keep track of the dragged item
let draggedItem = null;

// This will be used to keep track of the parent of the dragged item
let draggedItemParent = null;

let imageExists = false;
let swappableImage = null;

function onFileDragStart(event) {
  draggedItem = this; // this refers to the image wrapper
  draggedItemParent = this.parentNode; // this refers to the grid item

  /**
   * When we start dragging an image, we will set the visibility of the image wrapper
   * to hidden. This way, user can feel that the image is being dragged from this grid item
   * to another. Also, let's do that inside a setTimeout function so that the browser can
   * register the drag event properly. Else, the image will be hidden immediately and you won't
   * be able to see the image being dragged. Try yourself by uncommenting the line below and
   * commenting the setTimeout function.
   */
  // this.style.visibility = "hidden";
  setTimeout(() => (this.style.visibility = "hidden"), 0);
}

function onFileDragEnd(event) {}

function onFileDragOver(event) {
  event.preventDefault(); // This helps to stop the dragover event from bubbling up to the parent element!

  // The dragover will be called many times, so let's make sure we are adding the class only once.
  if (!this.classList.contains("hovered")) {
    this.classList.add("hovered");
  }
}

function onFileDragEnter(event) {
  event.preventDefault();

  /**
   * When the dragged item enters the grid item, we will check for the existing image in the grid item.
   * If there is an image, we will store that in a variable, which will be handy for us to swap when the
   * drop event is triggered.
   *
   * Here, this refers to the grid item where the dragged item is being dropped.
   */
  const imageWrapper = this.querySelector(".image_wrapper");
  if (imageWrapper !== null) {
    imageExists = true;
    swappableImage = imageWrapper;
  } else {
    imageExists = false;
  }
}

function onFileDragLeave(event) {
  /**
   * When the dragged item leaves the grid item, we will remove the hovered class from the grid item.
   * This is essentially the only purpose of this function.
   */
  this.classList.remove("hovered");
}

function onFileDrop(event) {
  /**
   * When a file is dropped on a grid item, we will do a couple of things:
   * 1. Remove the hovered class from the grid item, so that the user can see that the image is dropped.
   * 2. Mark the visibility of the dragged item to visible, so that the user can see the image being dropped.
   * 3. Append the dragged item to the grid item where the file is dropped.
   *    - If there is an image in the grid item, we will swap the images.
   *    - If there is no image, we will simply append the dragged item.
   *    - We will also remove the dragged item from the parent grid item, since it's being dropped here.
   *
   * this -> refers to the grid item where the file is dropped.
   */
  this.classList.remove("hovered");
  draggedItem.style.visibility = "visible";

  if (imageExists) {
    draggedItemParent.appendChild(swappableImage);
  }

  draggedItemParent.removeChild(draggedItem);

  this.appendChild(draggedItem);
}

function onDeleteIconClick(imageWrapper, file) {
  /**
   * The idea is to simply remove the image wrapper from the grid item. Additionally,
   * we set the value of the file input to null so that the user can select a new image
   * on the same grid item.
   *
   */
  imageWrapper.remove();
  file.value = null;
}

function addDeleteIcon(imageWrapper, file) {
  const deleteIcon = document.createElement("div");
  deleteIcon.className = "delete_icon";
  deleteIcon.textContent = "x";

  deleteIcon.addEventListener("click", () =>
    onDeleteIconClick(imageWrapper, file)
  );

  imageWrapper.appendChild(deleteIcon);
}

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
    imageWrapper.addEventListener("dragstart", onFileDragStart);
    imageWrapper.addEventListener("dragend", onFileDragEnd);
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

    /**
     * Each Grid Item should respond to couple of events related to the drag and drop,
     * like dragover, dragenter, dragleave, and drop. We can make use of these events
     * for our utility functions like swapping the images, styling a grid item when
     * an image is dragged over it, etc.
     */
    gridItem.addEventListener("dragover", onFileDragOver);
    gridItem.addEventListener("dragenter", onFileDragEnter);
    gridItem.addEventListener("dragleave", onFileDragLeave);
    gridItem.addEventListener("drop", onFileDrop);

    gridContainer.appendChild(gridItem);
  }
}

generateGridLayout();
