const progress_element = document.querySelector(".progress-done");
const progress_label_element = document.querySelector(".progress-label");
const input_element = document.querySelector("#input");
const max_input_element = document.querySelector("#max-input");
const simulate_progress_button = document.querySelector(".simulate_progress");

let simulateInterval = null;
let finalValue = 0; // Stores the value entered by the user
let maxValue = max_input_element.value; // Stores the Max. Value entered by user.

input_element.addEventListener("keyup", (e) => {
  const inputValue = input_element.value;

  if (!inputValue) return;

  //   You can try e.target.value as well
  finalValue = parseInt(input_element.value);
  updateProgress();
});

max_input_element.addEventListener("keyup", (e) => {
  const inputValue = max_input_element.value;

  if (!inputValue) return;

  //   You can try e.target.value as well
  maxValue = parseInt(max_input_element.value);
  updateProgress();
});

function updateProgress() {
  /**
   * 1. Find out the percentage of finalValue to maxValue. This will give us a
   *    percentage between 0 and 100.
   * 2. Change the width of progress bar to the obtained percentage
   */
  const progressPercentage = (finalValue / maxValue) * 100;
  progress_element.style.width = `${progressPercentage}%`;
  progress_element.innerText = `${Math.ceil(progressPercentage)}%`;
}

function resetSimulationToDefault() {
  // Reset to default for playing back.
  simulate_progress_button.innerHTML = "Simulate Progress";
  simulate_progress_button.setAttribute("onclick", "simulateProgress()");
}

function simulateProgress() {
  simulateInterval = setInterval(() => {
    finalValue = finalValue + 1;

    if (finalValue > maxValue) {
      return resetSimulationToDefault();
    }

    input_element.value = finalValue;
    simulate_progress_button.innerHTML = "Pause Progress";
    simulate_progress_button.setAttribute("onclick", "pauseSimulation()");
    updateProgress();
  }, 100);
}

function pauseSimulation() {
  if (simulateInterval) {
    // Clear the ongoing interval.
    clearInterval(simulateInterval);

    resetSimulationToDefault();
  }
}

/**
 * TODO:
 * 1. Floating Values
 * 2. Validations - Value can't be greater than max Value; No Negative Values, etc.
 * 
 */
