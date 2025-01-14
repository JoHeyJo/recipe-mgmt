import { useEffect, useState } from "react";

/** Custom hook to sync state user data with localStorage
 * 
 * When `storage` changes, effect re-runs:
 * - if new state is null, removes from localStorage
 * - else, updates localStorage
 *
 * Explicitly annotate return type of hook, otherwise React infers incorrect types for return value storage
 */
function useLocalStorage(key: string): [string | null, React.Dispatch<React.SetStateAction<string | null | number>>] {
  const initialValue = localStorage.getItem(key) || null;
  const [storage, setStorage] = useState(initialValue);
  const [keys, setKeys] = useState([]);
  console.log("keys in storage",keys)


  /** Removes storage when state is null. Else sets current user storage */
  useEffect(function setKeyInLocalStorage() {
    if (storage === null) {
      console.log("keys to remove", keys)
      keys.forEach(key => localStorage.removeItem(key))
    } else {
      localStorage.setItem(key, storage)
      setKeys(keys => [...keys,key])
    }
  }, [storage, key])

  return [storage, setStorage];
}

export default useLocalStorage;