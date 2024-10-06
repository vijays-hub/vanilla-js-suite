import { checkClassExists } from "./utils.js";

// All the DOM elements
const date_picker_wrapper = document.querySelector(".date-picker-wrapper");
const selected_date = document.querySelector(".selected-date");
const dates_container = document.querySelector(".dates-container");
const month = document.querySelector(".month .month-item");
const next_month = document.querySelector(".month .next-month");
const prev_month = document.querySelector(".month .prev-month");
const days_container = document.querySelectorAll(".days-container");

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
