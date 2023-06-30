import { getItemsFromLocalStorage, saveItemsToLocalStorage } from "../utils/localStorage.js";

export function isEventInterested(event) {
  const interestedEvents = getItemsFromLocalStorage("interestedEvents");
  return interestedEvents.some((interestedEvent) => interestedEvent.id === event.id);
}

export function toggleInterested(event, interestedButton) {
  const interestedEvents = getItemsFromLocalStorage("interestedEvents");
  const eventIndex = interestedEvents.findIndex((interestedEvent) => interestedEvent.id === event.id);

  if (eventIndex > -1) {
    interestedEvents.splice(eventIndex, 1);
    interestedButton.textContent = "Interested"; // Restaurar el texto original
  } else {
    interestedEvents.push(event);
    interestedButton.textContent = "Remove interested"; // Cambiar el texto a "Remove"
  }

  saveItemsToLocalStorage("interestedEvents", interestedEvents);
}
