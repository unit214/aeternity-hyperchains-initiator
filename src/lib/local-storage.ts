export const saveToLocalStorage = <T>(data: T, localStorageKey: string) => {
    localStorage.setItem(
        localStorageKey,
        JSON.stringify(data, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
    );
};

export const getFromLocalStorage = <T>(localStorageKey: string): T | null => {
    const item = localStorage.getItem(localStorageKey);

    return item && JSON.parse(item);
};

/*
 * Remove provided keys from local storage
 * */
export function clearLocalStorage(keys: string[]) {
    keys.forEach((key) => localStorage.removeItem(key));
}
