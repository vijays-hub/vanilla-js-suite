// All the DOM elements
const date_picker_wrapper = document.querySelector(".date-picker-wrapper");
const dates_container = document.querySelector(".dates-container");
const month_element = document.querySelector(".month .month-item");
const next_month_element = document.querySelector(".month .next-month");
const prev_month_element = document.querySelector(".month .prev-month");
const days_container = document.querySelector(".days-container");

const date_input_element = document.querySelector(".date-input");
const selected_date_element = document.querySelector(".selected-date");
const selected_day_element = document.getElementById("selected-day");
const selected_month_element = document.getElementById("selected-month");
const selected_year_element = document.getElementById("selected-year");

export {
  date_picker_wrapper,
  date_input_element,
  selected_date_element,
  selected_day_element,
  selected_month_element,
  selected_year_element,
  dates_container,
  month_element,
  next_month_element,
  prev_month_element,
  days_container,
};
