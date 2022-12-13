function setItem<T>(key: string, value: T): T {
  localStorage.setItem(key, JSON.stringify(value));

  return value;
}

function getItem<T>(key: string): T {
  return JSON.parse(localStorage.getItem(key));
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
