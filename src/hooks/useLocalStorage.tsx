import { useEffect, useState, Dispatch, SetStateAction } from "react";

/** Custom hook to sync state user data with localStorage
 * 
 * When `storage` changes, effect re-runs:
 * - if new state is null, removes from localStorage
 * - else, updates localStorage
 *
 * Explicitly annotate return type of hook, otherwise React infers incorrect types for return value token
 */
function useLocalStorage<T>(key: string, initialValue: T ): [T, Dispatch<SetStateAction<T>>] {
  const storedValue = localStorage.getItem(key) || null;
  const [storage, setStorage] = useState<T>(() => {
    try {
      return storedValue ? JSON.parse(storedValue) as T : initialValue;
    } catch (error) {
      console.error('Error parsing stored value', error);
      return initialValue;
    }
  });


  /** Removes storage when state is null. Else sets current user storage */
  useEffect(function setKeyInLocalStorage() {
    if (storage === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(storage))
    }
  }, [storage, key])

  return [storage, setStorage];
}

export default useLocalStorage;