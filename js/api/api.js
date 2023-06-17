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
      console.log(`Fetching events for category: ${category}`);
      const response = await fetch(
        `https://knassbani2.execute-api.us-east-2.amazonaws.com/events/${category}`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching events data:", error);
      return [];
    }
  }
  
  export default cache;
  