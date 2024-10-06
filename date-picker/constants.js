// All the DOM elements
const whats_the_day_element = document.getElementById("whats-the-day");
const date_picker_wrapper = document.querySelector(".date-picker-wrapper");
const dates_container = document.querySelector(".dates-container");
const month_element = document.querySelector(".month .month-item");
const next_month_element = document.querySelector(".month .next-month");
const prev_month_element = document.querySelector(".month .prev-month");
const jump_prev_year_element = document.querySelector(".month .prev-year");
const jump_next_year_element = document.querySelector(".month .next-year");
const days_container = document.querySelector(".days-container");

const date_input_element = document.querySelector(".date-input");
const selected_date_element = document.querySelector(".selected-date");
const selected_day_element = document.getElementById("selected-day");
const selected_month_element = document.getElementById("selected-month");
const selected_year_element = document.getElementById("selected-year");

export {
  whats_the_day_element,
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
  jump_prev_year_element,
  jump_next_year_element,
  days_container,
};
