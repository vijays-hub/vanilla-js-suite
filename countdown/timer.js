const daysCard = document.getElementById("days");
const hoursCard = document.getElementById("hours");
const minutesCard = document.getElementById("minutes");
const secondsCard = document.getElementById("seconds");

export function validateCountdownInfo(countdownInfo) {
  if (
    countdownInfo.days === null ||
    countdownInfo.hours === null ||
    countdownInfo.minutes === null ||
    countdownInfo.seconds === null
  ) {
    return false;
  }

  const { days, hours, minutes, seconds } = countdownInfo;

  if (!days && !hours && !minutes && !seconds) {
    alert("Please enter at least one non-zero value");
    return false;
  }

  if (isNaN(days) || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    alert("Please enter valid numbers");
    return false;
  }

  if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
    alert("Please enter positive numbers");
    return false;
  }

  if (days > 365) {
    alert("Please enter valid days (max 365)");
    return false;
  }

  if (hours > 23) {
    alert("Please enter valid hours (0-23)");
    return false;
  }

  if (minutes > 59) {
    alert("Please enter valid minutes (0-59)");
    return false;
  }

  if (seconds > 59) {
    alert("Please enter valid seconds (0-59)");
    return false;
  }

  return true;
}

export const getTotalSeconds = (countdownInfo) => {
  const { days, hours, minutes, seconds } = countdownInfo;
  /**
   * The idea is to convert everything into seconds and then decrement the seconds.
   * We would also need to ensure that we are following time properly, like not showing
   * -1 seconds, but instead decrementing the minutes and setting seconds to 59. Same follows
   * for hours and days as well. We will display 24 hours and 365 days as the maximum limit.
   */
  const daysInSeconds = days * 24 * 60 * 60;
  const hoursInSeconds = hours * 60 * 60;
  const minutesInSeconds = minutes * 60;

  const total_seconds =
    daysInSeconds + hoursInSeconds + minutesInSeconds + seconds;

  return total_seconds;
};

function formatNumber(number) {
  return number.toString().padStart(2, "0");
}

export function updateTimer(totalSeconds, timer, intervalId) {
  if (totalSeconds <= 0) {
    clearInterval(intervalId);
    timer.innerHTML = "Countdown finished!";
    return;
  }

  /**
   * Converts a total number of seconds into days, hours, minutes, and seconds.
   *
   * This method progressively reduces the total number of seconds by calculating:
   * - Days: Total seconds divided by seconds in a day.
   * - Hours: Remaining seconds divided by seconds in an hour.
   * - Minutes: Remaining seconds divided by seconds in a minute.
   * - Seconds: Final remainder.
   *
   * Why Do This?
   * - totalSeconds %= SECONDS_IN_DAY;
   * - totalSeconds %= SECONDS_IN_HOUR;
   * - totalSeconds %= SECONDS_IN_MINUTE;
   *
   * When converting a total number of seconds into days, hours, minutes, and seconds, you need to
   * account only for the remaining seconds after each step (days, hours, minutes). This avoids
   * double-counting time units in subsequent calculations.
   */
  const SECONDS_IN_DAY = 86400; // 24 * 60 * 60
  const SECONDS_IN_HOUR = 3600; // 60 * 60
  const SECONDS_IN_MINUTE = 60;

  const days = Math.floor(totalSeconds / SECONDS_IN_DAY);
  totalSeconds %= SECONDS_IN_DAY;

  const hours = Math.floor(totalSeconds / SECONDS_IN_HOUR);
  totalSeconds %= SECONDS_IN_HOUR;

  const minutes = Math.floor(totalSeconds / SECONDS_IN_MINUTE);
  const seconds = totalSeconds % SECONDS_IN_MINUTE;

  daysCard.innerText = formatNumber(days);
  hoursCard.innerText = formatNumber(hours);
  minutesCard.innerText = formatNumber(minutes);
  secondsCard.innerText = formatNumber(seconds);
}
