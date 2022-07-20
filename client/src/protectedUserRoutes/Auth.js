import { useLocation, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/context-provider/authContext';

const Auth = ({ children, role }) => {
  const { user, userRole } = useAuthContext();
  const location = useLocation();

  if (role) {
    return user ? (
      role.includes(userRole) ? (
        children
      ) : (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      )
    ) : (
      <Navigate to="/user/login" state={{ from: location }} replace />
    );
  }

  return user ? (
    children
  ) : (
    <Navigate to="/user/login" state={{ from: location }} replace />
  );
};
export default Auth;
