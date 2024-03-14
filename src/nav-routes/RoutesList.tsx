
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthTabs from "../components/AuthTabs";
import NotFound from "../components/NotFound";
import { UserSignUp } from "../utils/types";
import { AuthProps } from "../utils/types";
import Home from "../components/Home";

function RoutesList({ signUp, login }: AuthProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<AuthTabs signUp={signUp} login={login} />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesList