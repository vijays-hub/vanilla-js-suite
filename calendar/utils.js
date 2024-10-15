import {
  eventDetailsModalElement,
  eventTitleInputElement,
  modalBackDropElement,
  newEventModalElement,
} from "./constants.js";
import { load } from "./script.js";

// User events. Persistent.
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

export function openModal(date) {
  // Set the clicked state to date being passed. Essential for our actions like Save Event!
  clicked = date;

  // TODO: Don't allow events for past dates

  // Display new event form
  newEventModalElement.style.display = "block";

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

  if (title) {
    eventTitleInputElement.classList.remove("error");

    events.push({
      id: generateUUID(),
      date: clicked,
      title,
    });

    // Set the events in LocalStorage
    localStorage.setItem("events", JSON.stringify(events));

    closeModal();
  } else {
    // Need the title to save the Event.
    // TODO: Try disabling Save button when this is empty.
    eventTitleInputElement.classList.add("error");
  }
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
  eventTitleInputElement.classList.remove("error");

  // Clear the selected day
  clicked = null;

  //   Reload the calendar
  load();
}
