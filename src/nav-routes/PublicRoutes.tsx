import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { isTokenValid } from "../utils/functions";

/** Handles redirect to public routes with invalid token.
 * If context has been initialized route render is prevented.
 */
const PublicRoutes = () => {
  const { token, userId, isInitialized } = useContext(UserContext);
  console.log("PublicRoutes",!token , !isTokenValid(token) , !userId)
  if (!isInitialized) return null;
  const isNotAuthenticated = !token && !isTokenValid(token) && !userId;
  return isNotAuthenticated ? <Outlet /> : null;
};

export default PublicRoutes;
