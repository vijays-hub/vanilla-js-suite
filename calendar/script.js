import { calendar, months, week_days } from "./constants.js";
import { renderDayView } from "./dayViewScript.js";
import {
  closeModal,
  deleteEvent,
  events,
  getFirstDayOfMonthDateString,
  generateDayString,
  openEventCreateModal,
  saveEvent,
  setViewingDate,
} from "./utils.js";

let navMonth = 0; // Stores the current month being displayed.

export function load() {
  const dt = new Date();

  /**
   * When navMonth is not equal to 0, that means user is trying to either forward
   * or backward. So depending on the navMonth we can set the calendar's month.
   * Fort ex, let's say navMonth is 0, this means we are viewing current month's
   * calendar. When user clicks on Next or Back, this value would be changed. So we
   * are setting the month in view by adding that to current month.
   * Example: This is October, when user clicks on Back, the navMonth is -1. So,
   * dt.getMonth() returns 9 and when we add -1 => 9 + (-1) => 9 - 1 => 8, which is September.
   *
   * Playing with months will also ensure that the years are changed accordingly as well.
   */
  if (navMonth !== 0) {
    dt.setMonth(dt.getMonth() + navMonth);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  /**
   * The last argument is the day of the month. Ideally this will be 1 to suggest the first day of
   * the month. When we specify as 0, we are telling it as the LAST day of the previous month. -1 will be
   * second last and so on. Since we have specified 0, we will get full days of this month accurately.
   * If you specify 1 as the value, it would return the days till this date. So days will be 1.
   *
   * For the month, we are saying month + 1, So when we pass day as 0 for the next month, we are essentially
   * querying for current month's last day.
   *
   * What's happening:
   * Let's say current month is October and the year is 2024. So when we try getDate() by passing day as 0,
   * month as November, we are actually checking what's the last date in October.
   *
   * ChatGPT:
   * Passing 0 as the day makes JavaScript interpret this as the last day of the previous month.
   * Since the month has been incremented by 1, 0 here actually refers to the last day of the
   * current month.
   */
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = getFirstDayOfMonthDateString({ month, year });

  //   Returns the index of the current day. This helps to identify how many days we have to pad before rendering days.
  const paddingDays = week_days.indexOf(dateString.split(",")[0]);

  //   Display current Month
  document.getElementById(
    "monthDisplay"
  ).innerText = `${months[month]}  ${year}`;

  /**
   * We would want to pad the previous month's days in order to start current month properly.
   * Hence, we would add that to our daysInMonth value. Additionally, we will reset existing
   * calendar and generate a fresh one. This is essential when you are changing the months.
   * Without this, you would add on top of the existing calendar, which is not desirable.
   */
  calendar.innerHTML = "";
  for (let index = 1; index <= paddingDays + daysInMonth; index++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    if (index > paddingDays) {
      // Render current month's day
      daySquare.innerText = index - paddingDays; // Ex: 6 - 5 => 1. index will always be greater here, since we have padded already.

      const dayString = `${month + 1}/${index - paddingDays}/${year}`;

      // Highlight current day on the Calendar. We want to highlight only current month's day, so check for navMonth
      if (index - paddingDays === day && navMonth === 0) {
        daySquare.id = "currentDay";

        // store the current day! Handy for creating events for the day
        setViewingDate(dayString);
      }

      daySquare.addEventListener("click", () => {
        // store the current clicked day! Handy for creating events for the day
        setViewingDate(dayString);
        renderDayView(dayString);
      });

      /**
       * This is a good place to add any events present in this day as well.
       * Simply lookup for the events in the storage and populate them.
       */
      const eventsForDay =
        events.filter((event) => event.date === dayString) || [];

      if (eventsForDay && eventsForDay.length > 0) {
        // Create a parent holder for all events
        const eventsDiv = document.createElement("div");
        eventsDiv.setAttribute("id", "events_container");

        eventsForDay.slice(0, 2).forEach((event) => {
          const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");

          eventDiv.style.backgroundColor = event.eventColor;

          eventsDiv.appendChild(eventDiv);
        });

        // TODO: Handle how to display more than 3 events for a day! Day view?

        daySquare.appendChild(eventsDiv);
      }
    } else {
      // If we are iterating a padding day, leave it empty.
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare);
  }
}

export function initActions() {
  document.getElementById("nextButton").addEventListener("click", () => {
    navMonth++;

    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    navMonth--;

    load();
  });

  document.getElementById("saveButton").addEventListener("click", saveEvent);
  document.getElementById("cancelButton").addEventListener("click", closeModal);

  document
    .getElementById("deleteButton")
    .addEventListener("click", deleteEvent);
  document.getElementById("closeButton").addEventListener("click", closeModal);
  document
    .getElementById("new_event_button")
    .addEventListener("click", openEventCreateModal);
}

initActions();
load();

// Render today's day view by default
renderDayView(generateDayString());
