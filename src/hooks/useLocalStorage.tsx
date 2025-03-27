import { useEffect, useState } from "react";

/** Custom hook to sync state user data with localStorage
 * Can handle multiple keys in localStorage
 * 
 * When `storage` changes, effect re-runs:
 * - if new state is null, removes from localStorage
 * - else, updates localStorage
 *
 * Explicitly annotate return type of hook, otherwise React infers incorrect types for return value storage
 */
function useLocalStorage(key: string): [string | null, React.Dispatch<React.SetStateAction<string | null | number>>] {
  const initialValue = JSON.parse(localStorage.getItem(key)) || undefined;
  const [storage, setStorage] = useState(initialValue);

  useEffect(() => {
    if (storage === null) {
      // Remove all keys tracked in "keys" from localStorage
      const storedKeys = JSON.parse(localStorage.getItem("keys") || "[]");
      storedKeys.forEach((trackedKey: string) => {
        localStorage.removeItem(trackedKey);
      });
      // Clear the "keys" array from localStorage
      localStorage.removeItem("keys");
    } else if (storage) {
      // Update the specific key's value in localStorage
      localStorage.setItem(key, JSON.stringify(storage))
      // create keys
      const storedKeys = JSON.parse(localStorage.getItem("keys") || "[]");
      //add to keys array if property doesn't exists
      if (!storedKeys.includes(key)) {
        storedKeys.push(key);
        localStorage.setItem("keys", JSON.stringify(storedKeys));
      }
    }
  }, [storage, key]);

  return [storage, setStorage];
}

export default useLocalStorage;