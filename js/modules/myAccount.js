import { showCategory } from "../modules/eventsTabs.js";

const tabsContainer = document.getElementById("tabs-container");
const eventsGrid = document.getElementById("events-grid");

// Cargar eventos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  showEventsByTab("favorites");
});

// Agregar listeners a los botones de pestañas
tabsContainer.addEventListener("click", (event) => {
  const tabButton = event.target.closest(".tab-button");
  if (tabButton) {
    const category = tabButton.dataset.category;
    showEventsByTab(category);
  }
});

function showEventsByTab(category) {
  const events = getEventsFromLocalStorage(category);
  showEvents(events);
}


// Mostrar los eventos en la cuadrícula
function showEvents(events) {
  eventsGrid.innerHTML = "";

  if (events.length === 0) {
    const message = createMessage("There are no events in this category");
    eventsGrid.appendChild(message);
    return;
  }

  events.forEach((event) => {
    const eventDiv = document.createElement("div");
    eventDiv.className = "event";

    eventDiv.innerHTML = `
      <img src="${event.image}">
      <div class="event-title">${event.title}</div>
      <button class="event-remove-button">Remove</button>
    `;

    const removeButton = eventDiv.querySelector(".event-remove-button");
    removeButton.addEventListener("click", () => {
      removeEventFromList(event.category, event.id);
    });

    eventsGrid.appendChild(eventDiv);
  });
  console.log("Received events:", events);
}

// Crear un mensaje para mostrar en la cuadrícula
function createMessage(textContent) {
  const message = document.createElement("div");
  message.className = "message";
  message.textContent = textContent;
  return message;
}

// Remover un evento de la lista correspondiente
function removeEventFromList(category, eventId) {
  const events = getEventsFromLocalStorage(category);
  const updatedEvents = events.filter((event) => event.id !== eventId);
  saveEventsToLocalStorage(category, updatedEvents);
  showEventsByTab(category);
}

// Obtener los eventos de una lista específica desde localStorage
function getEventsFromLocalStorage(category) {
  const eventsJson = localStorage.getItem(category);
  return eventsJson ? JSON.parse(eventsJson) : [];
  
}

// Guardar los eventos de una lista específica en localStorage
function saveEventsToLocalStorage(category, events) {
  const eventsJson = JSON.stringify(events);
  localStorage.setItem(category, eventsJson);
}
