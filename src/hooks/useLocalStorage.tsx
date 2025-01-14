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
  const initialValue = localStorage.getItem(key) || undefined;
  const [storage, setStorage] = useState(initialValue);

  /**  */
  // useEffect(() => {
  //   // Initialize "keys" array once
  //   const storedKeys = JSON.parse(localStorage.getItem("keys") || "[]");
  //   console.log("STORED KEYS", storedKeys)
  //   if (storedKeys.length === 0) {
  //     storedKeys.push(key);
  //     localStorage.setItem("keys", JSON.stringify(storedKeys));
  //     console.log("!!!!!!!!", localStorage.getItem("keys"))
  //   }
  // }, []);

  console.log("intiate storage hook", key, storage)
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
      localStorage.setItem(key, storage);
      const storedKeys = JSON.parse(localStorage.getItem("keys") || "[]");
      if (!storedKeys.includes(key)) {
        storedKeys.push(key);
        localStorage.setItem("keys", JSON.stringify(storedKeys));
      }
    }
  }, [storage, key]);

  return [storage, setStorage];
}

export default useLocalStorage;