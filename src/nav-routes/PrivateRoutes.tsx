import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { isTokenValid } from "../utils/functions";

/** Handles redirect to protected routes with valid token.
 * If context has been initialized route render is prevented.
 */
function PrivateRoutes() {
  const { token, userId, isContextInitialized, isAuthenticated } =
    useContext(UserContext);
  console.log("context:", isContextInitialized)
    if (!isContextInitialized) return null;
    console.log("inprivate")
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoutes;
