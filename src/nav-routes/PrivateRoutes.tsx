import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { isTokenValid } from "../utils/functions";

/** Handles redirect to protected routes with valid token.
 * If context has been initialized route render is prevented.
 */
function PrivateRoutes() {
  const { token, userId, isInitialized } = useContext(UserContext);

  if (!isInitialized) return null;
  console.log("isInitialied:",isInitialized)
  const isAuthenticated = token && isTokenValid(token) && userId;
  console.log("isAuthenticated in Privatetoutes:", isAuthenticated)
  console.log("PrivateRoutes-","token:",token, "isTokenValid:",isTokenValid(token), "userId:",userId)
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoutes;
