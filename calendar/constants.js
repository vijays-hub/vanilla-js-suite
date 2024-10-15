// DOM Selectors
const calendar = document.getElementById("calendar");
const newEventModalElement = document.getElementById("newEventModal");
const eventDetailsModalElement = document.getElementById("eventDetailsModal");
const eventTitleInputElement = document.getElementById("eventTitleInput");
const modalBackDropElement = document.getElementById("modalBackDrop");

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

const week_days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export {
  week_days,
  calendar,
  newEventModalElement,
  eventDetailsModalElement,
  eventTitleInputElement,
  modalBackDropElement,
  months,
};
