import {
  RouterProvider,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AuthTabs from "../components/ui/AuthTabs";
import NotFound from "../components/pages/NotFound";
import { AuthProps } from "../utils/types";
import Home from "../components/pages/Home";
import MainContainer from "../components/pages/MainContainer";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { useLocation } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { isTokenValid } from "../utils/functions";

function RoutesList({ signUp, login }: AuthProps) {
  const { token, userId, isLoading } = useContext(UserContext);
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<AuthTabs signUp={signUp} login={login} />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<MainContainer />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesList;
