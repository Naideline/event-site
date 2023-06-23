import cache from "../api/api.js";
import { formatPrice, formatDate } from "../modules/config.js";

export async function showCategory(category) {
  const eventsGrid = document.getElementById("events-grid");
  eventsGrid.innerHTML = "";

  try {
    const events = await cache[category];
    events.forEach((event) => {
      const eventDiv = document.createElement("div");
      eventDiv.className = "event";

      eventDiv.innerHTML = `
        <img src="${event.image}">
        <div class="event-title">${event.title}</div>
        <div class="event-details">${formatDate(event.date)}</div>
        <div class="event-details">${event.location.address} • ${event.location.city}, ${event.location.state}</div>
        <div class="event-details">${formatPrice(event.price)}</div>`;

      eventsGrid.appendChild(eventDiv);
    });
  } catch (error) {
    console.error("Error retrieving events:", error);
  }

  const tabButtons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }
  document
    .querySelector(`.tab-button[data-category="${category}"]`)
    .classList.add("active");
}

window.showCategory = showCategory;
