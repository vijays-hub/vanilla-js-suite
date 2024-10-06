import { checkClassExists } from "./utils.js";
import { date_picker_wrapper, dates_container } from "./constants.js";

// Import the date-picker module to run the non-function code. Ex: Setting current month and year!
import "./date-picker.js";
import { generateDates } from "./date-picker.js";

// Toggle the date picker on click of the date_picker_wrapper
date_picker_wrapper.addEventListener("click", toggleDatePicker);

function toggleDatePicker(e) {
  /**
   * Since everything is date_picker_wrapper, we need to stop hiding the
   * date picker when we click on the date picker wrapper. This can be done
   * using the e.path property. This is renamed to composedPath() in the
   * latest versions of the JS documentations. This method returns an array
   * of all the elements that were clicked on. We can then check if the
   * dates-container is in the array of elements that were clicked on. If it
   * is, we don't hide the date picker. If it's not, we hide the date picker.
   */
  const path = e.composedPath();
  if (!checkClassExists(e.composedPath(), "dates-container")) {
    // toggle will add the class if it's not there and remove it if it's there.
    // Try add if you want to always add the class
    dates_container.classList.toggle("active");
  }
}

generateDates();
