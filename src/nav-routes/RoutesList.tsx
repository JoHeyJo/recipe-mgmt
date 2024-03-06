
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthTabs from "../components/AuthTabs";
import NotFound from "../components/NotFound";
function RoutesList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthTabs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesList