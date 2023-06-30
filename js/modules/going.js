import { getItemsFromLocalStorage, saveItemsToLocalStorage } from "../utils/localStorage.js";

export function isEventGoing(event) {
  const goingEvents = getItemsFromLocalStorage("goingEvents");
  return goingEvents.some((goingEvent) => goingEvent.id === event.id);
}

export function toggleGoing(event, goingButton) {
  const goingEvents = getItemsFromLocalStorage("goingEvents");
  const eventIndex = goingEvents.findIndex((goingEvent) => goingEvent.id === event.id);

  if (eventIndex > -1) {
    goingEvents.splice(eventIndex, 1);
    goingButton.textContent = "Going!"; // Restaurar el texto original
  } else {
    goingEvents.push(event);
    goingButton.textContent = "Remove going"; // Cambiar el texto a "Remove"
  }

  saveItemsToLocalStorage("goingEvents", goingEvents);
}
