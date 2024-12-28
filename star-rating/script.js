const starsContainer = document.querySelector("#stars");

let currentActiveIndex = -1; // This will store the current active index of the star rating.
const NUMBER_OF_STARS = 5; // Get this value from the User, if needed!

function fillStar(rating) {
  const allStars = starsContainer.children;

  // Loops through all the stars and fills them accordingly.
  for (let i = 0; i < NUMBER_OF_STARS; i++) {
    if (i <= rating) {
      allStars[i].src = "./star_filled.png";
    } else {
      allStars[i].src = "./star_outline.png";
    }
  }
}

function onStarMouseOver(index) {
  /**
   * We would need to fill all the stars from the first star to the index being hovered.
   * So, let's loop through all the stars till the index and fill them accordingly.
   * We also need to make sure that, if the user is hovering on the filled star, we need to
   * reset it back to the empty star.
   */
  fillStar(index);
}

function onStarMouseLeave() {
  /**
   * When the user leaves the star rating container, we need to reset the stars to the
   * current active index.
   */
  fillStar(currentActiveIndex);
}

function onStarClick(index) {
  currentActiveIndex = index;
  document.getElementById("display-star-value").textContent = index + 1;

  fillStar(currentActiveIndex);
}

function createStars() {
  /**
   * For the star images, you can also use an SVG image and then change it's
   * fill color using CSS. But for now, we have used two images for the star
   * rating. One for the filled star and the other for the empty star.
   */
  for (let i = 0; i < NUMBER_OF_STARS; i++) {
    let starImage = document.createElement("img");

    // Add the empty star image by default
    starImage.src = "./star_outline.png";
    starImage.className = "star-style";
    starImage.style.cursor = "pointer";

    // Add event listener to the star image
    starImage.addEventListener("mouseover", () => onStarMouseOver(i));
    starImage.addEventListener("mouseleave", () => onStarMouseLeave());
    starImage.addEventListener("click", () => onStarClick(i));

    starsContainer.appendChild(starImage);
  }
}

createStars();
