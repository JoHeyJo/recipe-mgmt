import { jwtDecode } from "jwt-decode";
import { JWTPayload, User } from "../utils/types";

export function extractAndSetUser(token: string, setUser: (user: User) => void) {
  const { user, user_id, is_admin }: JWTPayload = jwtDecode(token);
  setUser({ userName: user, userId: user_id, isAdmin: is_admin, currentBook: undefined, books: [] })
  return user_id
}

// export function toggleColorScheme() {
//   document.documentElement.classList.toggle('dark');
//   console.log("toggled")
// }

