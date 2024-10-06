import {
  month_element,
  selected_date_element,
  selected_day_element,
  selected_month_element,
  selected_year_element,
  next_month_element,
  prev_month_element,
  days_container,
  date_input_element,
} from "./constants.js";
import { getPrefixDay, getPrefixMonth } from "./utils.js";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthsWith31Days = [0, 2, 4, 6, 7, 9, 11];
const monthsWith30Days = [3, 5, 8, 10];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

// Using extra duplicates for easy comparison later...
let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

next_month_element.addEventListener("click", goToNextMonth);
prev_month_element.addEventListener("click", goToPrevMonth);

function setSelectedDate() {
  selected_day_element.value = getPrefixDay(selectedDay);
  selected_month_element.value = getPrefixMonth(selectedMonth + 1);
  selected_year_element.value = selectedYear;
}

function setCurrentMonthAndYear() {
  month_element.textContent = `${months[month]} ${year}`;
}

// TODO: Rethink the updating dates via input. I think there is scope for re-usability here. -- START

// Function to set current date via input
export function updateCurrentDayViaInput(inputDay) {
  /**
   * When updating the date via input, we need to check if the date is valid.
   * Conditions:
   * 1. The day should be between 1 and 31. Anything outside this range is invalid.
   *      1.1 - Add an invalid class to the input element if the day is invalid.
   * 2. If user has given a day less than 10, we need to add a prefix 0 to it.
   * 3. Once day is set, we can focus on the month input.
   * 4. If the day is valid, we need to update the selected day and generate the dates.
   */
  const day = parseInt(inputDay);

  if (day > 31 || day < 1) {
    date_input_element.classList.add("invalid");
    return;
  }

  date_input_element.classList.remove("invalid");
  selectedDay = day;

  generateDates();

  return getPrefixDay(day);
}

export function updateCurrentMonthViaInput(inputMonth) {
  /**
   * When updating the month via input, we need to check if the month is valid.
   * Conditions:
   * 1. The month should be between 1 and 12. Anything outside this range is invalid.
   *      1.1 - Add an invalid class to the input element if the month is invalid.
   * 2. If user has given a month less than 10, we need to add a prefix 0 to it.
   * 3. Once month is set, we can focus on the year input.
   * 4. If the month is valid, we need to update the selected month and generate the dates.
   */
  const userMonth = parseInt(inputMonth);

  if (userMonth > 12 || userMonth < 1) {
    selected_month_element.classList.add("invalid");
    return;
  }

  selected_month_element.classList.remove("invalid");
  month = selectedMonth = userMonth - 1; // Since JS months are zero-based

  generateDates();
  setCurrentMonthAndYear(); // Update the month and year in the date picker UI.

  return getPrefixMonth(userMonth);
}

export function updateCurrentYearViaInput(inputYear) {
  /**
   * When updating the year via input, we need to check if the year is valid.
   * Conditions:
   * 1. The year should be between 1900 and 2100. Anything outside this range is invalid.
   *      1.1 - Add an invalid class to the input element if the year is invalid.
   * 2. If the year is valid, we need to update the selected year and generate the dates.
   */
  const userYear = parseInt(inputYear);

  if (userYear < 1900 || userYear > 2100) {
    selected_year_element.classList.add("invalid");
    return;
  }

  selected_year_element.classList.remove("invalid");
  year = selectedYear = userYear;

  generateDates();
  setCurrentMonthAndYear(); // Update the month and year in the date picker UI.

  return year;
}

// TODO: Rethink the updating dates via input. I think there is scope for re-usability here. -- START

function goToNextMonth() {
  month++;

  /**
   * If the month is greater than 11, it means we have reached December.
   * In this case, we need to reset the month to 0 (January) and increment the year by 1.
   */
  if (month > 11) {
    // Reset the month to January
    month = 0;

    // Increment the year by 1
    year++;
  }

  month_element.textContent = months[month] + " " + year;

  // Generate the dates for the new month
  generateDates();
}

function goToPrevMonth() {
  month--;

  /**
   * If the month is less than 0, it means we have reached January.
   * In this case, we need to set the month to 11 (December) and decrement the year by 1.
   */
  if (month < 0) {
    // Set the month to December
    month = 11;

    // Decrement the year by 1
    year--;
  }

  month_element.textContent = months[month] + " " + year;

  // Generate the dates for the new month
  generateDates();
}

export function generateDates() {
  // Reset the dates for every render. Useful to recreate the dates when the month is changed.
  days_container.innerHTML = "";

  let totalDays = 30;

  /**
   * Dates population rationale:
   * 1. Get to know the number of days for different months.
   *      1.1 - For February, we need to check if the year is a leap year,
   *              if yes, we have 29 days, if not, we have 28 days.
   *     1.2 - Since JavaScript months are zero-based, 0 corresponds to January,
   *             1 corresponds to February, and so on. So, we can check if the month
   *              is February by checking if the month is equal to 1.
   * 2. Use the monthsWith31Days and monthsWith30Days arrays to check if the month has 31 or 30 days.
   *
   */
  if (month === 1) {
    // Check if it's a leap year
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      totalDays = 29;
    } else {
      totalDays = 28;
    }
  } else {
    if (monthsWith31Days.includes(month)) {
      totalDays = 31;
    } else if (monthsWith30Days.includes(month)) {
      totalDays = 30;
    }
  }

  //   Loop over the totalDays and create the date elements
  for (let i = 1; i <= totalDays; i++) {
    const dayElement = document.createElement("div");

    dayElement.classList.add("day");
    dayElement.textContent = i;

    /**
     * As soon as the date-picker is toggled, we would ideally need to highlight the
     * current date. This can be done by checking if the current date is equal to the
     * selected date. If it is, we add the "selected" class to the date element.
     */
    if (selectedDay === i && selectedMonth === month && selectedYear === year) {
      dayElement.classList.add("selected");
    }

    /**
     * Add a click event listener to each date element. When a date is clicked, we need to
     * update the selected date and remove the "selected" class from the previously selected
     * date element. We then add the "selected" class to the newly selected date element.
     * Finally, we update the selected date, month, and year.
     */
    dayElement.addEventListener("click", () => {
      /**
       *  Alternatively, you can use string interpolation to set the selected date. Simply pass a
       *  string with the date, month, and year to the new Date() constructor.
       *  Ex: "2021-08-01", code: new Date(`${year}-${month + 1}-${i}`)
       */
      selectedDate = new Date(year, month, i);

      selectedDay = i;
      selectedMonth = month;
      selectedYear = year;

      setSelectedDate();

      /**
       * After setting the selected date, let's regenerate the dates to remove the "selected" class
       * from the previously selected date element and add the "selected" class to the newly selected
       * date element. Without this, the previously selected date element will still have the "selected"
       * class, even though it's not selected anymore.
       */
      generateDates();
    });

    days_container.appendChild(dayElement);
  }
}

// Set the selected date
setSelectedDate();

// Fill the current month and year
setCurrentMonthAndYear();
