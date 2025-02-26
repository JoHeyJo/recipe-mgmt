import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const PublicRoutes = () => {
  const { token } = useContext(UserContext)
  console.log("token", token)
  return (
    !token ? <Outlet /> : <Navigate to='/home' />
  )
}

export default PublicRoutes;