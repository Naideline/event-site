import cache from "../proxy/proxy.js";
import { formatPrice } from "../utils/formatPrice.js";
import { formatDate } from "../utils/formatDate.js";
import { isEventFavorite } from "../modules/favorites.js";
import { isEventInterested, toggleInterested } from "../modules/interested.js";
import {isEventGoing} from "../modules/going.js"
import { setActiveTabButton } from "../modules/tabButton.js";
import { toggleFavorite } from "../modules/favorites.js";

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
        <span class="event-favorite-button">
          <i class="${isEventFavorite(event) ? 'fas fa-heart' : 'far fa-heart'}"></i>
        </span>
        <div class="event-title">${event.title}</div>
        <div class="event-details">${formatDate(event.date)}</div>
        <div class="event-details">${event.location.address} • ${event.location.city}, ${event.location.state}</div>
        <div class="event-details">${formatPrice(event.price)}</div>
        <button class="event-interested-button">${isEventInterested(event) ? 'Remove interested' : 'Interested'}</button>
        <button class="event-going-button">${isEventGoing(event) ? 'Remove going' : 'Going!'}</button>
      `;

      const eventFavoriteButton = eventDiv.querySelector(".event-favorite-button");
      eventFavoriteButton.addEventListener("click", () => {
        toggleFavorite(event, eventFavoriteButton);
      });

      const eventInterestedButton = eventDiv.querySelector(".event-interested-button");
      eventInterestedButton.addEventListener("click", () => {
        toggleInterested(event, eventInterestedButton, eventGoingButton);
      });

      const eventGoingButton = eventDiv.querySelector(".event-going-button");
      eventGoingButton.addEventListener("click", () => {
        toggleGoing(event, eventInterestedButton, eventGoingButton);
      });

      eventsGrid.appendChild(eventDiv);
    });
  } catch (error) {
    console.error("Error al recuperar los eventos:", error);
  }

  setActiveTabButton(category);
}