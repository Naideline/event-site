const cache = new Proxy(
  {},
  {
    get: async function (target, category) {
      if (!(category in target)) {
        const events = await fetchEventData(category);
        target[category] = events;
      }
      return target[category];
    },
  }
);

async function fetchEventData(category) {
  try {
    const response = await fetch(
      `https://knassbani2.execute-api.us-east-2.amazonaws.com/events/${category}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events data:", error);
    return [];
  }
}

function formatPrice(price) {
  if (price === 0) {
    return "Free";
  } else {
    return "$" + price.toFixed(2);
  }
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

async function showCategory(category) {
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
      location.textContent = `${event.location.city} • ${event.location.state}, ${event.location.address}`;
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
