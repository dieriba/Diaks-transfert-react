import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../contextProvider';

const ProtectedRoute = ({ children }) => {
  const { user } = useGlobalContext();
  if (!user) return <Navigate to="/user/login" />;

  return children;
};
export default ProtectedRoute;
