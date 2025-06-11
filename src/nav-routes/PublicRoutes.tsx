import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { isTokenValid } from "../utils/functions";

/** Handles redirect to public routes with invalid token.
 * If context has been initialized route render is prevented.
 */
const PublicRoutes = () => {
  const { token, userId, isInitialized } = useContext(UserContext);

  if (!isInitialized) return null;
  const isNotAuthenticated = !token && !isTokenValid(token) && !userId;
  console.log("isNotAuthenticated in Publictoutes:", isNotAuthenticated);
  console.log("PublicRoutes -",
    "token:",
    token,
    "isTokenValid:",
    isTokenValid(token),
    "userId:",
    userId
  );

  return isNotAuthenticated ? <Outlet /> : null;
};

export default PublicRoutes;
