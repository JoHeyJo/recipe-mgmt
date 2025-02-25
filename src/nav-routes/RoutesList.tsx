
import { Routes, Route } from "react-router-dom";
import AuthTabs from "../components/ui/AuthTabs";
import NotFound from "../components/pages/NotFound";
import { AuthProps } from "../utils/types";
import Home from "../components/pages/Home";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import MainContainer from "../components/pages/MainContainer";



function RoutesList({ signUp, login }: AuthProps) {
  const { user } = useContext(UserContext);
  console.log("USER>>>>",user)
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