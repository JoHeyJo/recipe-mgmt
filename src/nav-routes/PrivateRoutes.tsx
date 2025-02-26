import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

const PrivateRoutes = () => {
  const { token } = useContext(UserContext)
  return (
    token ? <Outlet /> : <Navigate to='/auth' />
  )
}

export default PrivateRoutes;