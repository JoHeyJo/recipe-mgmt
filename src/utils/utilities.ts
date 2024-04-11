import { jwtDecode } from "jwt-decode";
import { JWTPayload, User } from "../utils/types";

export function extractAndSetUser(token: string, setUser: (user: User) => void) {
  const { sub, is_admin }: JWTPayload = jwtDecode(token);
  setUser({ userName: sub as string, isAdmin: is_admin })
}

// export function toggleColorScheme() {
//   document.documentElement.classList.toggle('dark');
//   console.log("toggled")
// }

