export function formatPrice(price) {
    if (price === 0) {
      return "Free";
    } else {
      return "$" + price.toFixed(2);
    }
  }
  
  export function formatDate(timestamp) {
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
  