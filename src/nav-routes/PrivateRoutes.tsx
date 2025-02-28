import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import { isTokenValid } from '../utils/functions';

/** Handles redirect to protected routes with valid token */
const PrivateRoutes = () => {
  const { token } = useContext(UserContext)
  return (
      token && !isTokenValid(token) ? <Outlet /> : <Navigate to='/auth' />
  )
}

export default PrivateRoutes;