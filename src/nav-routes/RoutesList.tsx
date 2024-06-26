
import { Routes, Route } from "react-router-dom";
import AuthTabs from "../components/AuthTabs";
import NotFound from "../components/NotFound";
import { AuthProps } from "../utils/types";
import Home from "../components/Home";
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