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
export function styleRecipeRows(index, prevSectionRowCount) {
  console.log(prevSectionRowCount);
  if (prevSectionRowCount % 2 === 0) {
    return index % 2 === 0 ? "bg-accent" : "bg-secondary-accent";
  } else {
    return index % 2 === 0 ? "bg-secondary-accent" : "bg-accent";
  }
}
