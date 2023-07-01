import { initializeTabs } from "../js/modules_myAccount/tabs.js";
import { showEventsByTab } from "../js/modules_myAccount/events.js";
import { removeEventFromList } from "../js/modules_myAccount/events.js";
import { getEventsFromLocalStorage, saveEventsToLocalStorage } from "../js/utils/localStorage.js";

document.addEventListener("DOMContentLoaded", () => {
  showEventsByTab("favorites");
});

initializeTabs();