// DOM Selectors
const calendar = document.getElementById("calendar");
const newEventModalElement = document.getElementById("newEventModal");
const eventDetailsModalElement = document.getElementById("eventDetailsModal");
const eventTitleInputElement = document.getElementById("eventTitleInput");
const eventStartInputElement = document.getElementById("eventStartInput");
const eventEndInputElement = document.getElementById("eventEndInput");
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

const eventColors = [
  "#A3D8F4", // Soft Blue
  "#A8E6CF", // Mint Green
  "#FFB3BA", // Pale Pink
  "#D4B5E4", // Light Lavender
  "#FFF5BA", // Soft Yellow
  "#FFDAC1", // Coral Peach
  "#E0E0E0", // Cool Gray
  "#B3E5FC", // Powder Blue
  "#FFC3A0", // Light Apricot
  "#FF9AA2", // Soft Rose
  "#B5EAD7", // Pale Teal
  "#C7CEEA", // Lavender Gray
  "#F9E79F", // Soft Gold
  "#FAD9A1", // Warm Beige
  "#E6F2FF", // Icy Blue
];

export {
  eventColors,
  week_days,
  calendar,
  newEventModalElement,
  eventDetailsModalElement,
  eventTitleInputElement,
  eventStartInputElement,
  eventEndInputElement,
  modalBackDropElement,
  months,
};
