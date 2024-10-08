import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { User } from "../utils/types";

/** Custom hook to sync state user data with localStorage
 * 
 * When `storage` changes, effect re-runs:
 * - if new state is null, removes from localStorage
 * - else, updates localStorage
 *
 * Explicitly annotate return type of hook, otherwise React infers incorrect types for return value token
 */
function useLocalStorage<T>( key: string ): [T, Dispatch<SetStateAction<T>>] {
  const initialValue = localStorage.getItem(key) || null;
  const [storage, setStorage] = useState(initialValue ? JSON.parse(initialValue) : initialValue);

  
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