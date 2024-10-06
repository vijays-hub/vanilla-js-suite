import {
  selected_day_element,
  selected_month_element,
  selected_year_element,
} from "./constants.js";
import { updateCurrentDayViaInput } from "./date-picker.js";

selected_day_element.addEventListener("change", (e) => {
  const day = updateCurrentDayViaInput(e.target.value);
  if (day) {
    selected_day_element.value = day;

    // Focus on the month element
    selected_month_element.focus();
  }
});
