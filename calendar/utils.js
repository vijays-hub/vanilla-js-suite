import {
  eventColors,
  eventDetailsModalElement,
  eventEndInputElement,
  eventStartInputElement,
  eventTitleInputElement,
  modalBackDropElement,
  newEventModalElement,
} from "./constants.js";
import { load } from "./script.js";

// User events. Persistent.

/**
 * - DS for our events:
 *    events = [
        {
          id: "id",
          date: "10/16/2024",
          title: "Meeting",
          startTime: "16:40",
          endTime: "17:20",
          eventColor: "random_color_hex"
        },
        ...
      ];
 */

export let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

let clicked = null; // Stores the current day box being clicked. Helpful for viewing events, setting date, etc.

export const getFirstDayOfMonthDateString = ({ year, month }) => {
  const firstDayOfMonth = new Date(year, month, 1);

  //   Output: "Tuesday, 10/1/2024" -> first day of October 2024.
  //   split at "," -> ["Tuesday", " 10/1/2024"]
  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    /**
     * weekday: "long" - Returns the user-friendly day of the week. Ex: Friday. This is essential
     * in order to start the month properly. For ex, November 1st starts on a Friday, so we should
     * start November month's rendering from Friday and pad the rest of the days in that week. i.e.,
     * from Sunday to Thursday.
     * TODO: Prefill previous month's date instead of just padding!
     */
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return dateString;
};

export function openEventCreateModal() {
  // TODO: Don't allow events for past dates

  // Display new event form
  newEventModalElement.style.display = "block";

  // Display the selected date for the event!
  document.getElementById("event_date_displayer").innerText = generateDayString(
    getViewingDate()
  );

  //   Show the backdrop
  modalBackDropElement.style.display = "block";
}

export function generateUUID() {
  /**
   * Returns the first 8 characters of a randomly generated string.
   * Passing 36 to the toString method tells it to return numbers 0-9 and every
   * letter in the alphabet, you can adjust the 8 in the substr method
   * if you want a longer or shorter ID!
   */
  return Math.random().toString(36).substring(0, 8);
}

export function saveEvent() {
  const title = eventTitleInputElement.value;
  const startTime = eventStartInputElement.value;
  const endTime = eventEndInputElement.value;

  // TODO: Try disabling Save button when fields are empty.
  if (!title) return eventTitleInputElement.classList.add("error");
  else eventTitleInputElement.classList.remove("error");
  if (!startTime) return eventStartInputElement.classList.add("error");
  else eventStartInputElement.classList.remove("error");
  if (!endTime) return eventEndInputElement.classList.add("error");
  else eventEndInputElement.classList.remove("error");

  events.push({
    id: generateUUID(),
    date: getViewingDate(),
    startTime,
    endTime,
    eventColor: getRandomColor(),
    title,
  });

  // Set the events in LocalStorage
  localStorage.setItem("events", JSON.stringify(events));

  closeModal();
}

export const expandEventDetails = (eventId) => {
  const eventForDay = events.find((event) => event.id === eventId);

  if (eventForDay) {
    document.getElementById("eventText").innerText = eventForDay.title;

    // Store the ID being viewed currently. Essential for edit/delete of this event!
    sessionStorage.setItem("eventId", eventForDay.id);

    // Open the details popup.
    eventDetailsModalElement.style.display = "block";

    // Show the backdrop
    modalBackDropElement.style.display = "block";
  }
};

export function deleteEvent() {
  // Retrieve the event id from session storage. This is set when viewing the event.
  const eventId = sessionStorage.getItem("eventId");

  events = events.filter((event) => event.id !== eventId);

  // Update the events list!
  localStorage.setItem("events", JSON.stringify(events));

  // Close the expanded view
  closeModal();

  // Refresh the calendar for fresh state!
  load();
}

export function closeModal() {
  newEventModalElement.style.display = "none";
  eventDetailsModalElement.style.display = "none";
  modalBackDropElement.style.display = "none";

  //   Clear the input
  eventTitleInputElement.value = "";
  eventStartInputElement.value = "";
  eventEndInputElement.value = "";
  eventTitleInputElement.classList.remove("error");

  // Clear the selected day
  clicked = null;

  //   Reload the calendar
  load();
}

export const setViewingDate = (dateString) =>
  sessionStorage.setItem("viewingDate", dateString);
export const getViewingDate = () => sessionStorage.getItem("viewingDate");

// Returns a date string of the format "10/16/2024". This is essential for querying events for the day!
export function generateDayString(date = null) {
  const dt = date ? new Date(date) : new Date();

  return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
}

export function getRandomColor() {
  return eventColors[Math.floor(Math.random() * eventColors.length)];
}
