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

      const image = document.createElement("img");
      image.src = event.image;
      eventDiv.appendChild(image);

      const title = document.createElement("div");
      title.className = "event-title";
      title.textContent = event.title;
      eventDiv.appendChild(title);

      const date = document.createElement("div");
      date.className = "event-details";
      date.textContent = formatDate(event.date);
      eventDiv.appendChild(date);

      const location = document.createElement("div");
      location.className = "event-details";
      location.textContent = `${event.location.address} • ${event.location.city}, ${event.location.state}`;
      eventDiv.appendChild(location);

      const price = document.createElement("div");
      price.className = "event-details";
      price.textContent = formatPrice(event.price);
      eventDiv.appendChild(price);

      eventsGrid.appendChild(eventDiv);
    });
  } catch (error) {
    console.error("Error retrieving events:", error);
  }

  const tabButtons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }
  document.querySelector(`.tab-button[data-category="${category}"]`);
}

window.showCategory = showCategory;
