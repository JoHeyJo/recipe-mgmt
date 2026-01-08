import { Routes, Route } from "react-router-dom";
import AuthTabs from "../components/ui/AuthTabs";
import NotFound from "../components/pages/NotFound";
import { AuthProps, RoutesListProps } from "../utils/types";
import MainContainer from "../components/pages/MainContainer";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
// import PasswordRecovery from "../components/PasswordRecovery";

function RoutesList({ signUp, login }: RoutesListProps) {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<AuthTabs signUp={signUp} login={login} />} />
        <Route path="/reset" element={<PasswordRecovery />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<MainContainer />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesList;
