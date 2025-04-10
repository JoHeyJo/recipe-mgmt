import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { isTokenValid } from "../utils/functions";

/** Handles redirect to public routes with invalid token */
const PublicRoutes = () => {
  const { token, userId } = useContext(UserContext);

  return !token && !isTokenValid(token) && !userId ? (
    <Outlet />
  ) : (
    <Navigate to="/home" />
  );
};

export default PublicRoutes;
