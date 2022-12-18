function setItem<T>(key: string, value: T): T {
  localStorage.setItem(key, JSON.stringify(value));

  return value;
}

function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item && JSON.parse(item);
}

function removeItem(key: string): void {
  localStorage.removeItem(key);
}

const localStorageProvider = {
  setItem,
  getItem,
  removeItem,
};

export { localStorageProvider };
