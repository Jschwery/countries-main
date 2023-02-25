import { useState } from "react";

interface LocalStorageHook<T> {
    (key: string, initialValue: T): [T, (value: T) => void];
  }
  
  const useLocalStorage: LocalStorageHook<string> = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item:string|null = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });
  
    const setValue = (value: string) => {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    };
  
    return [storedValue, setValue];
  };
  
  export default useLocalStorage;
  