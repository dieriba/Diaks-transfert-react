import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/context-provider/authContext';

const useAuth = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/user/login" state={{ from: location }} replace />
  );
};
export default useAuth;
