import { jwtDecode } from "jwt-decode";

/** Checks if token is valid based on expiration */
export function isTokenValid(token: string | null) {
  if (!token) return null;
  const decodedToken = jwtDecode(token);
  const expirationTime = decodedToken.exp;
  const currentTime = Math.floor(Date.now() / 1000);
  return expirationTime >= currentTime;
}

/** fill recipe rows with alternating styles  */
export function styleRecipeRows(index: number, prevSectionRowCount: number) {
  if (prevSectionRowCount % 2 === 0) {
    return index % 2 === 0 ? "bg-accent" : "bg-accent-secondary";
  } else {
    return index % 2 === 0 ? "bg-accent-secondary" : "bg-accent";
  }
}
