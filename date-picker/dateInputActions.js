import {
  selected_day_element,
  selected_month_element,
  selected_year_element,
} from "./constants.js";
import {
  updateCurrentDayViaInput,
  updateCurrentMonthViaInput,
} from "./date-picker.js";

selected_day_element.addEventListener("change", (e) => {
  const day = updateCurrentDayViaInput(e.target.value);
  if (day) {
    selected_day_element.value = day;

    // Focus on the month element
    selected_month_element.focus();
  }
});

selected_month_element.addEventListener("change", (e) => {
  const month = updateCurrentMonthViaInput(e.target.value);
  if (month) {
    selected_month_element.value = month;

    // Focus on the year element
    selected_year_element.focus();
  }
});
