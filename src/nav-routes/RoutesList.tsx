
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthTabs from "../components/AuthTabs";
import NotFound from "../components/NotFound";
import { AuthProps } from "../utils/types";
import Home from "../components/Home";
import { UserContext } from "../auth/UserContext";
import { useContext } from "react";

function RoutesList({ signUp, login }: AuthProps) {
  const { user } = useContext(UserContext);
  console.log(user)
  return (
    <BrowserRouter>
      {user ?
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
        :
        <Routes>
          <Route path="/auth" element={<AuthTabs signUp={signUp} login={login} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      }
    </BrowserRouter>
  )
}

export default RoutesList