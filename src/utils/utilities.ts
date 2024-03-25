import { jwtDecode } from "jwt-decode";
import { JWTPayload, User } from "../utils/types";

function extractAndSetUser(token: string, setUser: (user: User) => void) {
  console.log('triggered')
  const { sub, is_admin }: JWTPayload = jwtDecode(token);
  setUser({ userName: sub as string, isAdmin: is_admin })
}

export default extractAndSetUser;