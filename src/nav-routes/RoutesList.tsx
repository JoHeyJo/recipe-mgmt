import { Routes, Route } from "react-router-dom";
import AuthTabs from "../components/ui/AuthTabs";
import NotFound from "../components/pages/NotFound";
import { AuthProps } from "../utils/types";
import Home from "../components/pages/Home";
import MainContainer from "../components/pages/MainContainer";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { useLocation } from "react-router-dom";

function RoutesList({ signUp, login }: AuthProps) {

    const location = useLocation();
    console.log("Current path:", location.pathname)
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<MainContainer />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
      {/* <Route element={<PublicRoutes />}>  */}
        {/* <Route
          path="/auth"
          element={<AuthTabs signUp={signUp} login={login} />}
        /> */}
        <Route path="*" element={<NotFound />} />
      {/* </Route> */}
    </Routes>
  );
}

export default RoutesList;
