function checkClassExists(elements, className) {
  console.log({ elements, className });

  /**
   * Each element in the elements array is a DOM element. We need to check if
   * this element has a classList property. If it does, we check if it contains
   * the className being passed. If it does, we return true. If it doesn't, we
   * return false.
   */

  return elements.some(
    (element) => element.classList && element.classList.contains(className)
  );
}

function checkIdExists(elements, id) {
  return elements.some((element) => element.id === id);
}

function getPrefixDay(day) {
  if (day < 10) {
    return `0${day}`;
  }
  return day;
}

function getPrefixMonth(month) {
  if (month < 10) {
    return `0${month}`;
  }
  return month;
}

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

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export {
  checkClassExists,
  checkIdExists,
  getPrefixDay,
  getPrefixMonth,
  months,
  days,
};
