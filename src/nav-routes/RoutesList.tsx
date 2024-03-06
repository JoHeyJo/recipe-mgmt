
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthTabs from "../components/AuthTabs";
import NotFound from "../components/NotFound";
import { UserSignUp } from "../utils/types";
import { SignUp } from "../utils/types";

function RoutesList({ signUp }: SignUp) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthTabs signUp={signUp}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesList