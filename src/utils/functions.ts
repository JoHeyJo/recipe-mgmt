import { jwtDecode } from "jwt-decode";

/** Checks if token is valid based on expiration */
export function isTokenValid(token: string | null) {
  if (!token) return null;
  const decodedToken = jwtDecode(token);
  const expirationTime = decodedToken.exp;
  const currentTime = Math.floor(Date.now() / 1000);
  return expirationTime >= currentTime;
}

export function scrollToElement(element: any, ref: any) {
  if (!ref) return;
  window.scroll({
    top: ref?.current.offsetTop,
    behavior: "smooth",
  });
}
