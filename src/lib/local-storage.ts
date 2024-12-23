export const saveToLocalStorage = <T>(value: T, localStorageKey: string) => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
};

export const getFromLocalStorage = <T>(localStorageKey: string): T | null => {
    const item = localStorage.getItem(localStorageKey);

    return item && JSON.parse(item);
};
