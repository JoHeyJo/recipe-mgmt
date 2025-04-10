import { Routes, Route } from "react-router-dom";
import AuthTabs from "../components/ui/AuthTabs";
import NotFound from "../components/pages/NotFound";
import { AuthProps } from "../utils/types";
import MainContainer from "../components/pages/MainContainer";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

function RoutesList({ signUp, login }: AuthProps) {
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
