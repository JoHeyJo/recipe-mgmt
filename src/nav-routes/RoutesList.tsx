
import { Routes, Route } from "react-router-dom";
import AuthTabs from "../components/views/ui/AuthTabs";
import NotFound from "../views/NotFound";
import { AuthProps } from "../utils/types";
import Home from "../views/Home";
import { UserContext } from "../auth/UserContext";
import { useContext } from "react";
import MainContainer from "../components/MainContainer";

function RoutesList({ signUp, login }: AuthProps) {
  const { user } = useContext(UserContext);
  return (
    <>
      {user ?
        <Routes>
          <Route path="/home" element={<MainContainer />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        :
        <Routes>
          {/* <Route path="/home" element={<MainContainer />} /> */}
          <Route path="/auth" element={<AuthTabs signUp={signUp} login={login} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      }
    </>
  )
}

export default RoutesList