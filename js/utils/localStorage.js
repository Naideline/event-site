export function getItemsFromLocalStorage(key) {
    const itemsJson = localStorage.getItem(key);
    return itemsJson ? JSON.parse(itemsJson) : [];
  }
  
  export function saveItemsToLocalStorage(key, items) {
    const itemsJson = JSON.stringify(items);
    localStorage.setItem(key, itemsJson);
  }
  