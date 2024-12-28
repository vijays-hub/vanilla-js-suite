import {
  getTotalSeconds,
  updateTimer,
  validateCountdownInfo,
} from "./timer.js";

const timer = document.getElementById("timer");

let intervalId;

let countdownInfo = {
  days: null,
  hours: null,
  minutes: null,
  seconds: null,
};

function setCountdownInfo() {
  const days = prompt("Enter the number of days (0-365)") || "0";
  const hours = prompt("Enter the number of hours (0-23)") || "0";
  const minutes = prompt("Enter the number of minutes (0-59)") || "0";
  const seconds = prompt("Enter the number of seconds (0-59)") || "0";

  countdownInfo = {
    days: parseInt(days),
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: parseInt(seconds),
  };
}

function initTimer() {
  // Clear any existing interval
  if (intervalId) {
    clearInterval(intervalId);
  }

  setCountdownInfo();
  const validInfo = validateCountdownInfo(countdownInfo);

  if (!validInfo) {
    timer.innerHTML = "Invalid countdown info";
    return;
  }

  let total_seconds = getTotalSeconds(countdownInfo);

  //   Initial Display
  timer.style.visibility = "visible";
  updateTimer(total_seconds, timer, intervalId);

  // Update the timer every second
  intervalId = setInterval(() => {
    total_seconds--;
    updateTimer(total_seconds, timer, intervalId);
  }, 1000);
}

initTimer();
