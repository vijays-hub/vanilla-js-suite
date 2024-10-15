import { load } from "./script.js";
import { closeModal, deleteEvent, saveEvent } from "./utils.js";

export function initActions({ navMonth } = { navMonth: 0 }) {
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
}
