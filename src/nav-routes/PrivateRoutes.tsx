import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { isTokenValid } from "../utils/functions";

/** Handles redirect to protected routes with valid token */
function PrivateRoutes() {
  const { token, userId } = useContext(UserContext);
   const isAuthenticated = token && isTokenValid(token) && userId;
     return token && isTokenValid(token) && userId ? (
     <Outlet />
   ) : (
     <Navigate to="/" />
   );
}

export default PrivateRoutes;
