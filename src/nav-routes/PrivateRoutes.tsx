import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { isTokenValid } from "../utils/functions";

/** Handles redirect to protected routes with valid token */
const PrivateRoutes = () => {
  const { token, userId } = useContext(UserContext);
  console.log("Private ROUTES......", token, !isTokenValid(token), userId);
  return (token && isTokenValid(token) && userId) && <Outlet />
  return (
    // Gate rendering for "loading state" - requires valid token and hydrated user data
    token && !isTokenValid(token) && userId ? (
      <Outlet />
    ) : (
      <Navigate to="/home" />
    )
  );
};

export default PrivateRoutes;
