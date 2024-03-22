import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "../utils/types";

function extractAndSetUser(token:any,setUser:any){
  const { sub, is_admin }: JWTPayload = jwtDecode(token);
  setUser({ userName: sub, isAdmin: is_admin })
}

export default extractAndSetUser;