import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { isTokenValid } from "../utils/functions";

/** Handles redirect to protected routes with valid token */
function PrivateRoutes ()  {
  const { token, userId } = useContext(UserContext);
  console.log("Go to Private Outlet....",token && isTokenValid(token) && userId);
  console.log("Private ROUTES......", token, !isTokenValid(token), userId);
  if (token && isTokenValid(token) && userId) return <Outlet />
  return token && isTokenValid(token) && userId ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoutes;
