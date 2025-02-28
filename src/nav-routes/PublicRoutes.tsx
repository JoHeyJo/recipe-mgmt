import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import { isTokenValid } from '../utils/functions';

const PublicRoutes = () => {
  const { token } = useContext(UserContext)
  return (
    !token || isTokenValid(token) ? <Outlet /> : <Navigate to='/home' />
  )
}

export default PublicRoutes;