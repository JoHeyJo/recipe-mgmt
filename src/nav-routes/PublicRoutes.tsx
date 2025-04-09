import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { isTokenValid } from "../utils/functions";

/** Handles redirect to public routes with invalid token */
const PublicRoutes = () => {
  const { token, userId } = useContext(UserContext);
  const isAuthenticated = token && isTokenValid(token) && userId;
  return !isAuthenticated && !isTokenValid(token) && !userId ? (
    <Outlet />
  ) : (
    <Navigate to="/home" />
  );
};

export default PublicRoutes;
