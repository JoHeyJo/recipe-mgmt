import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const token = localStorage.getItem("user-token")
  console.log("TOEKN in Private Routes>>>",token) 
  return (
    token ? <Outlet /> : <Navigate to='/auth' />
  )
}

export default PrivateRoutes;