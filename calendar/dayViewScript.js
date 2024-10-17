import { expandEventDetails, getViewingDate } from "./utils.js";

const dayViewContainer = document.getElementById("day-view-container");

function getPrefixHour(hour) {
  if (hour < 10) {
    return `0${hour}`;
  }
  return hour;
}

// ? Alternatively, you could directly hardcode these div elements with respective label.
function generateDayHours() {
  // Reset the previous layout and generate a fresh one!
  dayViewContainer.innerHTML = "";

  const hourLabelSeparator = document.createElement("div");
  hourLabelSeparator.setAttribute("id", "hour-label-separator");

  const currentTimeIndicator = document.createElement("div");
  currentTimeIndicator.setAttribute("id", "current-time-indicator");

  dayViewContainer.appendChild(hourLabelSeparator);
  dayViewContainer.appendChild(currentTimeIndicator);

  for (let i = 0; i < 24; i++) {
    const hour = document.createElement("div");
    hour.classList.add("hour");
    hour.setAttribute("data-hour", i);

    if (i > 0 && i < 24) {
      const hourLabel = document.createElement("div");
      hourLabel.classList.add("hour-label");
      hourLabel.innerText = `${getPrefixHour(i)}:00`;

      hour.appendChild(hourLabel);
    }

    dayViewContainer.appendChild(hour);
  }
}

function getEventsForTheDay() {
  const _dbEvents = JSON.parse(localStorage.getItem("events"));

  if (!_dbEvents) return;

  return _dbEvents.filter((event) => event.date === getViewingDate());
}

export function renderDayView(viewingDate) {
  if (!viewingDate) return;

  generateDayHours();
  updateTimeIndicatorPosition();

  const events = getEventsForTheDay();

  let eventsCountLabel = "";

  const userFriendlyDay = new Date(viewingDate).toDateString();
  eventsCountLabel = `No events scheduled for ${userFriendlyDay}`;

  if (events && events.length > 0) {
    eventsCountLabel = `${events.length} events scheduled for ${userFriendlyDay}`;
    getEventsForTheDay().forEach((event) => renderEvent(event));
  }

  document.getElementById("events_count").innerText = eventsCountLabel;
}

/**
 * Input -> event -> {
          id: "id",
          date: "10/16/2024",
          title: "Meeting",
          startTime: "16:40",
          endTime: "17:20",
        };
 */
function renderEvent(event) {
  /**
   * Let's take an example of an event starting at 16:40 and ending at 17:20
   *
   * Thought Process:
   * - Each hour is 60 minutes long. So, an event starting at 16:40 is 40 minutes into the hour.
   * - calculate the top position of the event within the hour row by using a percentage formula:
   *
   *      Position Percentage = ( Minutes past the hour / 60 ) × 100
   *
   *    For 16:40, this would be (40 / 60) * 100; This means the event should start at roughly
   *    66.67% down from the top of the 16:00 row.
   *
   * - Similarly, Calculate how long the event (duration) should be by looking at the number of minutes
   *    between the start and end times.
   *    - In the case of an event from 16:40 to 17:20, it spans 40 minutes. As a percentage
   *      of 60 minutes, that’s: (40 / 60) * 100 => 66.67%. This would be the height of the event.
   *
   * - So now we have the top position of the event where it should start and the height for the same.
   *    Simply use CSS styling to position it in the respective hour using position:absolute.
   *
   * - We can have an data attribute for each hour. This would help us figure out the correct hour for
   *    our event placement.
   *
   *
   */

  const [startHour, startMinute] = event.startTime.split(":").map(Number); // "16:40".split(":") => ["16", "40"].map(Number) => [16,40]
  const [endHour, endMinute] = event.endTime.split(":").map(Number);

  const eventTopPositionPercentage = (startMinute / 60) * 100;

  // Calculate the duration
  const totalDuration =
    endHour * 60 + endMinute - (startHour * 60 + startMinute);
  const eventHeightPercentage = (totalDuration / 60) * 100;

  // Create event element
  const eventElement = document.createElement("div");
  eventElement.classList.add("day_event");
  eventElement.textContent = `${event.title} (${event.startTime} - ${event.endTime})`;

  // Apply styles based on start time and duration
  eventElement.style.top = `${eventTopPositionPercentage}%`;
  eventElement.style.height = `${eventHeightPercentage}%`;
  eventElement.style.backgroundColor = event.eventColor;

  eventElement.addEventListener("click", () => expandEventDetails(event.id));

  const hourRow = document.querySelector(`.hour[data-hour="${startHour}"]`);
  hourRow.append(eventElement);
}

function updateTimeIndicatorPosition() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  /**
   * Calculate top position for the current time. The idea is that in a day we have
   * 1440 minutes. So if we get to know the current minute, we can simply set the
   * top position to that minute.
   */
  const topPosition = currentHour * 60 + currentMinute;

  const timeIndicator = document.getElementById("current-time-indicator");

  // Set the top position in pixels based on the total height of an hour (assuming 60px per hour)
  timeIndicator.style.top = `${topPosition}px`;
}

generateDayHours();
updateTimeIndicatorPosition();
