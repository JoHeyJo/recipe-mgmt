import { useEffect, useState } from "react";

/** Custom hook to sync state user data with localStorage
 * 
 * When `token` changes, effect re-runs:
 * - if new state is null, removes from localStorage
 * - else, updates localStorage
 *
 * Explicitly annotate return type of hook, otherwise React infers incorrect types for return value token
 */
function useLocalStorage(key: string): [string | null, React.Dispatch<React.SetStateAction<string | null>>] {
  const initialValue = localStorage.getItem(key) || null;
  const [token, setToken] = useState(initialValue);


  /** Removes token when state is null. Else sets current user token */
  useEffect(function setKeyInLocalStorage() {
    if (token === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem("user-token", token)
    }
  }, [token, key])

  return [token, setToken];
}

export default useLocalStorage;